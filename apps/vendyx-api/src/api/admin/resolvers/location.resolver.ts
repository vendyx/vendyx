import { Inject } from '@nestjs/common';
import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';

import {
  CreateLocationInput,
  Location,
  LocationListInput,
  UpdateInStorePickupPreferencesInput
} from '@/api/shared/types/gql.types';
import { ListResponse } from '@/api/shared/utils/list-response';
import { LocationService } from '@/business/location/location.service';
import { isErrorResult } from '@/business/shared/utils/error-result.utils';
import {
  PRISMA_FOR_SHOP,
  PrismaForShop
} from '@/persistence/prisma-clients/prisma-for-shop.provider';
import { ID } from '@/persistence/types/scalars.type';

@Resolver('Location')
export class LocationResolver {
  constructor(
    @Inject(PRISMA_FOR_SHOP) private readonly prisma: PrismaForShop,
    private readonly locationService: LocationService
  ) {}

  @Query('locations')
  async locations(@Args('input') input: LocationListInput) {
    const [locations, total] = await Promise.all([
      this.locationService.find(input),
      this.locationService.count(input)
    ]);

    return new ListResponse(locations, locations.length, { total });
  }

  @Query('location')
  async location(@Args('id') id: ID) {
    return await this.locationService.findById(id);
  }

  @Mutation('createLocation')
  async createLocation(@Args('input') input: CreateLocationInput) {
    const result = await this.locationService.create(input);

    return isErrorResult(result) ? { apiErrors: [result] } : { apiErrors: [], location: result };
  }

  @Mutation('updateLocation')
  async updateLocation(@Args('id') id: ID, @Args('input') input: CreateLocationInput) {
    const result = await this.locationService.update(id, input);

    return isErrorResult(result) ? { apiErrors: [result] } : { apiErrors: [], location: result };
  }

  @Mutation('removeLocation')
  async removeLocation(@Args('id') id: ID) {
    const result = await this.locationService.remove(id);

    return isErrorResult(result)
      ? { apiErrors: [result], success: false }
      : { apiErrors: [], success: true };
  }

  @Mutation('updateInStorePickupPreferences')
  async updateInStorePickupPreferences(
    @Args('locationId') locationId: ID,
    @Args('input') input: UpdateInStorePickupPreferencesInput
  ) {
    const result = await this.locationService.updateInStorePickupPreferences(locationId, input);

    return isErrorResult(result)
      ? { apiErrors: [result], location: result }
      : { apiErrors: [], location: result };
  }

  @ResolveField('inStorePickup')
  async inStorePickup(@Parent() location: Location) {
    return await this.prisma.inStorePickup.findUnique({ where: { locationId: location.id } });
  }
}
