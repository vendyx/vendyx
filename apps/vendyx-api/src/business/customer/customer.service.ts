import { Inject, Injectable } from '@nestjs/common';

import {
  CreateCustomerInput,
  UpdateCustomerInput,
  UpdateCustomerPasswordInput
} from '@/api/shared/types/gql.types';
import { AuthService } from '@/auth/auth.service';
import { JwtPayload } from '@/auth/strategies/jwt/jwt.types';
import { EventBusService } from '@/event-bus/event-bus.service';
import { CustomerRegisteredEvent } from '@/event-bus/events/customer.event';
import {
  PRISMA_FOR_SHOP,
  PrismaForShop
} from '@/persistence/prisma-clients/prisma-for-shop.provider';
import { ID } from '@/persistence/types/scalars.type';

import { CustomerFinder } from './customer-finder';
import {
  DisabledCustomer,
  EmailAlreadyExists,
  InvalidCredentials,
  InvalidEmail,
  PasswordsDoNotMatch
} from './customer.errors';
import { clean } from '../shared/utils/clean.utils';
import { validateEmail } from '../shared/utils/validators.utils';

@Injectable()
export class CustomerService extends CustomerFinder {
  constructor(
    @Inject(PRISMA_FOR_SHOP) private readonly prisma: PrismaForShop,
    private readonly authService: AuthService,
    private readonly eventBus: EventBusService
  ) {
    super(prisma);
  }

  async findById(id: ID) {
    return this.prisma.customer.findUnique({ where: { id } });
  }

  async create(input: CreateCustomerInput) {
    if (!validateEmail(input.email)) {
      return new InvalidEmail();
    }

    const customerExists = await this.findByEmail(input.email);

    // Customer could exist without a password because we save the customer when
    // addCustomerToOrder mutation is called and we don't save the password in that case,
    // so the user can complete the registration later.
    // When trying to create an account and found a customer with the same email
    // we need to verify if the customer has password, if not is just a customer
    // who has bought and now tries to create an account.
    // If the customer found has a password, that means that some other customer
    // already has an account in the store so that is not allowed.
    if (customerExists && customerExists.password) {
      return new EmailAlreadyExists();
    }

    const hashedPassword = await this.authService.hash(input.password);

    const customer = await this.prisma.customer.upsert({
      where: { email: input.email },
      create: {
        ...clean(input),
        password: hashedPassword
      },
      update: {
        ...clean(input),
        password: hashedPassword
      }
    });

    this.eventBus.emit(new CustomerRegisteredEvent(customer.id));

    return customer;
  }

  async update(id: ID, input: UpdateCustomerInput) {
    if (input.email) {
      if (!validateEmail(input.email)) {
        return new InvalidEmail();
      }

      const customerWithSameEmail = await this.findByEmail(input.email);

      if (customerWithSameEmail && customerWithSameEmail.id !== id) {
        return new EmailAlreadyExists();
      }
    }

    return await this.prisma.customer.update({
      where: { id },
      data: clean(input)
    });
  }

  async updatePassword(id: ID, input: UpdateCustomerPasswordInput) {
    if (input.newPassword !== input.confirmPassword) {
      return new PasswordsDoNotMatch();
    }

    const newPasswordHashed = await this.authService.hash(input.newPassword);

    return await this.prisma.customer.update({
      where: { id: id },
      data: {
        password: newPasswordHashed
      }
    });
  }

  async generateAccessToken(email: string, password: string) {
    const customer = await this.findByEmail(email);

    if (customer && !customer.enabled) {
      return new DisabledCustomer();
    }

    // Customer exists but has no password because it was created when adding the customer to an order
    // So the customer needs to create an account first to be able to login
    // or just the customer was not found
    if (!customer?.password) {
      return new InvalidCredentials();
    }

    const passwordsMatch = await this.authService.compare(password, customer.password);

    if (!passwordsMatch) {
      return new InvalidCredentials();
    }

    const { accessToken } = await this.authService.generateToken<CustomerJwtPayloadInput>({
      email: customer.email,
      sub: customer.id
    });

    return accessToken;
  }

  async disable(id: ID) {
    return await this.prisma.customer.update({
      where: { id },
      data: { enabled: false }
    });
  }

  private async findByEmail(email: string) {
    return await this.prisma.customer.findUnique({ where: { email } });
  }
}

type CustomerJwtPayloadInput = Pick<JwtPayload, 'sub' | 'email'>;
