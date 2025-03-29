import { useTransition } from 'react';
import { useForm, useFormContext } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { type ProductDiscountMetadata } from '@/api/scalars/scalars.type';
import {
  type CommonDiscountFragment,
  type CommonEnhancedProductForSelectorFragment,
  DiscountApplicationMode,
  DiscountType,
  DiscountValueType,
  OrderRequirementType
} from '@/api/types';

import { createDiscount } from '../../actions/create-discount';

export const useDiscountDetailsForm = (type: DiscountType, discount?: CommonDiscountFragment) => {
  const [isLoading, startTransition] = useTransition();

  const form = useForm<DiscountDetailsFormInput>({
    resolver: zodResolver(schema),
    defaultValues: {
      applicationMode: discount?.applicationMode ?? DiscountApplicationMode.Code,
      handle: discount?.handle ?? '',
      enabled: discount?.enabled ?? true,
      discountValueType: discount?.discountValueType ?? DiscountValueType.Percentage,
      discountValue: discount?.discountValue ?? 0,
      startsAt: discount?.startsAt ?? new Date(),
      appliesTo: DiscountAppliesTo.Collections,
      endsAt: discount?.endsAt,
      orderRequirementType: discount?.orderRequirementType ?? undefined,
      orderRequirementValue: discount?.orderRequirementValue ?? undefined,
      perCustomerLimit: discount?.perCustomerLimit ?? undefined,
      metadata: discount?.metadata ?? {},
      availableCombinations: []
    }
  });

  async function onSubmit(input: DiscountDetailsFormInput) {
    startTransition(async () => {
      const isCreation = !discount;

      if (!isCreation) return;

      const generalInput = {
        applicationMode: input.applicationMode,
        handle: input.handle,
        enabled: input.enabled,
        discountValueType: input.discountValueType,
        discountValue: input.discountValue,
        startsAt: input.startsAt,
        endsAt: input.endsAt,
        orderRequirementType: input.orderRequirementType,
        orderRequirementValue: input.orderRequirementValue,
        perCustomerLimit: input.perCustomerLimit,
        type,
        availableCombinations: []
      };

      if (type === DiscountType.Order) {
        await createDiscount(generalInput);
      } else if (type === DiscountType.Product) {
        const metadata = input.metadata as InMemoryProductDiscountMetadata;

        const metadataToSave: ProductDiscountMetadata = {
          variants: metadata.inMemoryProductsSelected
            .map(p => p.variants.items)
            .flat()
            .map(v => v.id)
        };

        await createDiscount({
          ...generalInput,
          metadata: metadataToSave
        });
      }
    });
  }

  return {
    ...form,
    isLoading,
    onSubmit: form.handleSubmit(onSubmit)
  };
};

export enum DiscountAppliesTo {
  Products = 'PRODUCTS',
  Collections = 'COLLECTIONS'
}

const schema = z.object({
  handle: z.string().min(1),
  enabled: z.boolean(),
  applicationMode: z.enum([DiscountApplicationMode.Automatic, DiscountApplicationMode.Code]),
  discountValueType: z.enum([DiscountValueType.FixedAmount, DiscountValueType.Percentage]),
  discountValue: z.preprocess(v => Number(v), z.number().min(0)),
  startsAt: z.date(),
  endsAt: z.date().optional(),
  orderRequirementType: z.preprocess(
    val => (val === 'None' ? undefined : val),
    z.enum([OrderRequirementType.MinimumAmount, OrderRequirementType.MinimumItems]).optional()
  ),
  orderRequirementValue: z.number().min(0).optional(),
  perCustomerLimit: z.number().min(0).optional(),
  metadata: z.record(z.any(), z.any()),
  availableCombinations: z
    .array(
      z.enum([
        DiscountType.BuyXGetY,
        DiscountType.Order,
        DiscountType.Product,
        DiscountType.Shipping
      ])
    )
    .optional(),
  appliesTo: z.enum([DiscountAppliesTo.Products, DiscountAppliesTo.Collections])
});

export type DiscountDetailsFormInput = z.infer<typeof schema>;

export const useDiscountDetailsFormContext = () => useFormContext<DiscountDetailsFormInput>();

export type InMemoryProductDiscountMetadata = {
  inMemoryProductsSelected: CommonEnhancedProductForSelectorFragment[];
};
