import { useTransition } from 'react';
import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import {
  type CommonPaymentHandlerFragment,
  type CommonPaymentMethodFragment,
  PaymentMethodErrorCode
} from '@/api/types';
import { FormMessages } from '@/shared/form/form-messages';
import { notification } from '@/shared/notifications/notifications';

import { createPaymentMethod } from '../../actions/create-payment-method';
import { updatePaymentMethod } from '../../actions/update-payment-method';

export const usePaymentMethodForm = (
  handlers: CommonPaymentHandlerFragment[],
  method?: CommonPaymentMethodFragment
) => {
  const [isLoading, startTransition] = useTransition();

  const defaultIntegration = method
    ? (handlers.find(i => i.name === method.name) ?? handlers[0])
    : handlers[0];

  const form = useForm<PaymentMethodFormInput>({
    resolver: zodResolver(schema),
    defaultValues: {
      handlerCode: defaultIntegration?.code,
      args: method?.args ?? {},
      enabled: method?.enabled ?? true
    }
  });

  async function onSubmit(values: PaymentMethodFormInput) {
    const handlerSelected = handlers.find(i => i.code === values.handlerCode);

    const handlerValues = Object.values(handlerSelected?.args);

    const allMetadataIsFilled =
      Object.values(values.args).every(value => !!value) &&
      handlerValues.length === Object.values(values.args).length;

    if (!Object.values(values.args).length || !allMetadataIsFilled) {
      notification.error('Provider args are required');
      return;
    }

    startTransition(async () => {
      if (method) {
        await updatePaymentMethod(method.id, values);

        notification.success('Payment method updated');
      } else {
        const result = await createPaymentMethod({
          enabled: values.enabled,
          handlerCode: values.handlerCode,
          args: values.args
        });

        if (result.error) {
          if (result.errorCode === PaymentMethodErrorCode.HandlerAlreadySelected) {
            form.setError('handlerCode', { message: result.error });
            return;
          }

          notification.error(result.error);
        }
      }
    });
  }

  return {
    ...form,
    isLoading,
    onSubmit: form.handleSubmit(onSubmit)
  };
};

const schema = z.object({
  handlerCode: z.string().min(1, FormMessages.required),
  args: z.record(z.any(), z.any()),
  enabled: z.boolean().optional().default(true)
});

export type PaymentMethodFormInput = z.infer<typeof schema>;
