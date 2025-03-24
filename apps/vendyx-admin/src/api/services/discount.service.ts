import { GET_ALL_DISCOUNTS_QUERY } from '../operations/discount.operations';
import { type DiscountListInput } from '../types';
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
}
