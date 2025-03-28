import { useEffect, useState, useTransition } from 'react';
import { useForm, useFormContext } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import {
  DiscountApplicationMode,
  DiscountType,
  DiscountValueType,
  OrderRequirementType
} from '@/api/types';
import { notification } from '@/shared/notifications/notifications';

export const useDiscountDetailsForm = () => {
  const [isLoading, startTransition] = useTransition();
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm<DiscountDetailsFormInput>({
    resolver: zodResolver(schema),
    defaultValues: {
      applicationMode: DiscountApplicationMode.Code,
      handle: '',
      enabled: true,
      discountValueType: DiscountValueType.Percentage,
      discountValue: 0,
      startsAt: new Date(),
      appliesTo: DiscountAppliesTo.Collections,
      endsAt: undefined,
      orderRequirementType: undefined,
      orderRequirementValue: undefined,
      perCustomerLimit: undefined,
      metadata: {},
      availableCombinations: []
    }
  });

  useEffect(() => {
    if (!isLoading && isSuccess) {
      notification.success('Discount saved');
    }
  }, [isSuccess, isLoading]);

  async function onSubmit(input: DiscountDetailsFormInput) {
    startTransition(async () => {
      console.log(input);
      setIsSuccess(true);
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
  discountValue: z.number().min(0),
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
