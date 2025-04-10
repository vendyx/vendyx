import { Inject, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import {
  CreateLocationInput,
  LocationListInput,
  UpdateInStorePickupPreferencesInput,
  UpdateLocationInput
} from '@/api/shared/types/gql.types';
import {
  PRISMA_FOR_SHOP,
  PrismaForShop
} from '@/persistence/prisma-clients/prisma-for-shop.provider';
import { ID } from '@/persistence/types/scalars.type';

import { LocationIsDefault, LocationNameAlreadyExists } from './location.error';
import { clean } from '../shared/utils/clean.utils';

@Injectable()
export class LocationService {
  constructor(@Inject(PRISMA_FOR_SHOP) private readonly prisma: PrismaForShop) {}

  async find(input: LocationListInput) {
    return await this.prisma.location.findMany({
      ...clean({ skip: input?.skip, take: input?.take }),
      where: {
        ...clean(input?.filters ?? {}),
        name: input?.filters?.name ? { ...clean(input.filters.name), mode: 'insensitive' } : {}
      }
    });
  }

  async count(input: LocationListInput) {
    return await this.prisma.location.count({
      where: {
        ...clean(input?.filters ?? {}),
        name: input?.filters?.name ? { ...clean(input.filters.name), mode: 'insensitive' } : {}
      }
    });
  }

  async findById(id: ID) {
    return await this.prisma.location.findUnique({ where: { id } });
  }

  /**
   * @description
   * Create a new location avoiding repetition of names.
   * If the location is default, we need to remove the default flag from the current default location.
   * If the location is the first location, we set it as default.
   */
  async create(input: CreateLocationInput) {
    const nameAlreadyExists = await this.prisma.location.findUnique({
      where: { name: input.name }
    });

    if (nameAlreadyExists) {
      return new LocationNameAlreadyExists();
    }

    const hasDefault = await this.prisma.location.findFirst({ where: { isDefault: true } });

    if (input.isDefault && hasDefault) {
      await this.prisma.location.update({
        where: { id: hasDefault.id },
        data: { isDefault: false }
      });

      return await this._create(clean(input));
    }

    return await this._create({
      ...clean(input),
      isDefault: !hasDefault,
      inStorePickup: {
        create: { instructions: 'Bring your email receipt to the store.' }
      }
    });
  }

  /**
   * @description
   * Update a location avoiding repetition of names.
   * If the location is default, we need to remove the default flag from the current default location.
   */
  async update(id: ID, input: UpdateLocationInput) {
    if (input.name) {
      const nameAlreadyExists = await this.prisma.location.findUnique({
        where: { name: input.name }
      });

      if (nameAlreadyExists && nameAlreadyExists.id !== id) {
        return new LocationNameAlreadyExists();
      }
    }

    if (input.isDefault) {
      const hasDefault = await this.prisma.location.findFirst({
        where: { isDefault: true, id: { not: id } }
      });

      if (hasDefault) {
        await this.prisma.location.update({
          where: { id: hasDefault.id },
          data: { isDefault: false }
        });
      }
    }

    return await this.prisma.location.update({
      where: { id },
      data: {
        ...clean(input),
        isDefault: input.isDefault === false ? undefined : input.isDefault ?? undefined
      }
    });
  }

  /**
   * @description
   * Remove a location.
   * If the location is default, throw `LocationIsDefault` error.
   */
  async remove(id: ID) {
    const location = await this.prisma.location.findUnique({ where: { id } });

    if (location?.isDefault) {
      return new LocationIsDefault();
    }

    await this.prisma.inStorePickup.deleteMany({ where: { locationId: id } });
    await this.prisma.location.delete({ where: { id } });

    return true;
  }

  /**
   * @description
   * Update in-store pickup preferences for a location.
   *
   * @note Pickup preferences are always created when a location is created.
   */
  async updateInStorePickupPreferences(locationId: ID, input: UpdateInStorePickupPreferencesInput) {
    const result = await this.prisma.inStorePickup.update({
      where: { locationId },
      data: { ...clean(input) },
      select: { location: true }
    });

    return result.location;
  }

  private async _create(input: Prisma.LocationCreateInput) {
    return await this.prisma.location.create({
      data: {
        ...input,
        inStorePickup: {
          create: { instructions: 'Bring your email receipt to the store.' }
        }
      }
    });
  }
}
