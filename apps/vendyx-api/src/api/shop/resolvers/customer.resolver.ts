import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import {
  CurrentCustomer,
  TCurrentCustomer
} from '@/api/shared/decorator/current-customer.decorator';
import { CustomerJwtAuthGuard } from '@/api/shared/guards/customer.guard';
import { ShopApiKeyGuard } from '@/api/shared/guards/shop-api-key.guard';
import {
  CreateCustomerInput,
  UpdateCustomerInput,
  UpdateCustomerPasswordInput
} from '@/api/shared/types/gql.types';
import { CustomerService } from '@/business/customer/customer.service';
import { isErrorResult } from '@/business/shared/utils/error-result.utils';

@UseGuards(ShopApiKeyGuard)
@Resolver('Customer')
export class CustomerResolver {
  constructor(private readonly customerService: CustomerService) {}

  @UseGuards(CustomerJwtAuthGuard)
  @Query('me')
  async me(@CurrentCustomer() customer: TCurrentCustomer) {
    return this.customerService.findById(customer.id);
  }

  @Mutation('createCustomer')
  async createCustomer(@Args('input') input: CreateCustomerInput) {
    const result = await this.customerService.create(input);

    return isErrorResult(result) ? { apiErrors: [result] } : { customer: result, apiErrors: [] };
  }

  @UseGuards(CustomerJwtAuthGuard)
  @Mutation('updateCustomer')
  async updateCustomer(
    @CurrentCustomer() customer: TCurrentCustomer,
    @Args('input') input: UpdateCustomerInput
  ) {
    const result = await this.customerService.update(customer.id, input);

    return isErrorResult(result) ? { apiErrors: [result] } : { customer: result, apiErrors: [] };
  }

  @UseGuards(CustomerJwtAuthGuard)
  @Mutation('updateCustomerPassword')
  async updateCustomerPassword(
    @CurrentCustomer() customer: TCurrentCustomer,
    @Args('input') input: UpdateCustomerPasswordInput
  ) {
    const result = await this.customerService.updatePassword(customer.id, input);

    return isErrorResult(result) ? { apiErrors: [result] } : { customer: result, apiErrors: [] };
  }

  @Mutation('generateCustomerAccessToken')
  async generateCustomerAccessToken(
    @Args('email') email: string,
    @Args('password') password: string
  ) {
    const result = await this.customerService.generateAccessToken(email, password);

    return isErrorResult(result) ? { apiErrors: [result] } : { accessToken: result, apiErrors: [] };
  }

  @UseGuards(CustomerJwtAuthGuard)
  @Mutation('disableCustomer')
  async disableCustomer(@CurrentCustomer() customer: TCurrentCustomer) {
    const result = await this.customerService.disable(customer.id);

    return isErrorResult(result) ? { apiErrors: [result] } : { customer: result, apiErrors: [] };
  }
}
