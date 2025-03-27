import { getDiscountError } from '../errors/discount.errors';
import {
  CREATE_DISCOUNT_MUTATION,
  GET_ALL_DISCOUNTS_QUERY,
  REMOVE_DISCOUNT_MUTATION,
  UPDATE_DISCOUNT_MUTATION
} from '../operations/discount.operations';
import { type ID } from '../scalars/scalars.type';
import {
  type CreateDiscountInput,
  type DiscountErrorCode,
  type DiscountListInput,
  type UpdateDiscountInput
} from '../types';
import { serviceGqlFetcher } from './service-fetchers/service-gql-fetchers';

export class DiscountService {
  static Tags = {
    discounts: 'discounts'
  };

  static async getAll(input?: DiscountListInput) {
    const { discounts } = await serviceGqlFetcher(
      GET_ALL_DISCOUNTS_QUERY,
      { input },
      { tags: [DiscountService.Tags.discounts] }
    );

    return discounts;
  }

  static async create(input: CreateDiscountInput): Promise<Result> {
    const { createDiscount } = await serviceGqlFetcher(CREATE_DISCOUNT_MUTATION, { input });

    const error = getDiscountError(createDiscount.apiErrors[0]);

    if (error) {
      return { success: false, error, errorCode: createDiscount.apiErrors[0].code };
    }

    return { success: true, discountId: createDiscount?.discount?.id ?? '' };
  }

  static async update(id: ID, input: UpdateDiscountInput): Promise<Result> {
    const { updateDiscount } = await serviceGqlFetcher(UPDATE_DISCOUNT_MUTATION, { id, input });

    const error = getDiscountError(updateDiscount.apiErrors[0]);

    if (error) {
      return { success: false, error, errorCode: updateDiscount.apiErrors[0].code };
    }

    return { success: true, discountId: updateDiscount?.discount?.id ?? '' };
  }

  static async remove(ids: ID[]) {
    const { removeDiscounts } = await serviceGqlFetcher(REMOVE_DISCOUNT_MUTATION, { ids });

    return removeDiscounts;
  }
}

type Result =
  | {
      success: true;
      discountId: ID;
    }
  | {
      success: false;
      error: string;
      errorCode: DiscountErrorCode;
    };
