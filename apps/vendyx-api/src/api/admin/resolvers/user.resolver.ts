import { Inject, UseGuards } from '@nestjs/common';
import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { User } from '@prisma/client';

import { CurrentUser, TCurrentUser } from '@/api/shared/decorator/current-user.decorator';
import { UserJwtAuthGuard } from '@/api/shared/guards/user.guard';
import {
  CreateUserInput,
  GenerateUserAccessTokenInput,
  ListInput,
  UpdateUserInput
} from '@/api/shared/types/gql.types';
import { ListResponse } from '@/api/shared/utils/list-response';
import { clean } from '@/business/shared/utils/clean.utils';
import { isErrorResult } from '@/business/shared/utils/error-result.utils';
import { UserService } from '@/business/user/user.service';
import {
  PRISMA_FOR_SHOP,
  PrismaForShop
} from '@/persistence/prisma-clients/prisma-for-shop.provider';

@Resolver('User')
export class UserResolver {
  constructor(
    private readonly userService: UserService,
    @Inject(PRISMA_FOR_SHOP) private readonly prisma: PrismaForShop
  ) {}

  @UseGuards(UserJwtAuthGuard)
  @Query('whoami')
  async user(@CurrentUser() user: TCurrentUser) {
    return this.userService.findById(user.id);
  }

  @UseGuards(UserJwtAuthGuard)
  @Query('validateAccessToken')
  async validateAccessToken() {
    return true;
  }

  @Mutation('createUser')
  async createUser(@Args('input') input: CreateUserInput) {
    const result = await this.userService.create(input);

    return isErrorResult(result) ? { apiErrors: [result] } : { user: result, apiErrors: [] };
  }

  @UseGuards(UserJwtAuthGuard)
  @Mutation('updateUser')
  async updateUser(@Args('id') id: string, @Args('input') input: UpdateUserInput) {
    const result = await this.userService.update(id, input);

    return isErrorResult(result) ? { apiErrors: [result] } : { user: result, apiErrors: [] };
  }

  @Mutation('generateUserAccessToken')
  async generateUserAccessToken(@Args('input') input: GenerateUserAccessTokenInput) {
    const result = await this.userService.generateAccessToken(input.email, input.password);

    return isErrorResult(result) ? { apiErrors: [result] } : { accessToken: result, apiErrors: [] };
  }

  @ResolveField('shops')
  async owner(@Parent() user: User, @Args('input') input?: ListInput) {
    const query = {
      where: { ownerId: user.id }
    };

    const [result, total] = await Promise.all([
      this.prisma.shop.findMany({ ...query, ...clean(input ?? {}) }),
      this.prisma.shop.count(query)
    ]);

    return new ListResponse(result, result?.length, { total });
  }
}
