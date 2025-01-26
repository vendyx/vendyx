import { useEffect, useState, useTransition } from 'react';

import { type CommonShippingHandlersFragment, type CommonZoneFragment } from '@/api/types';
import { useDialogContext } from '@/shared/components/ui/dialog';
import { useEntityContext } from '@/shared/contexts/entity-context';
import { notification } from '@/shared/notifications/notifications';

import { createShippingMethod } from '../../actions/create-shipping-method';
import { updateShippingMethod } from '../../actions/update-shipping-method';
import { type ShipmentContext } from '../../contexts/shipment-context';

export const useShippingMethodForm = (
  shippingHandlers: CommonShippingHandlersFragment[],
  methodToUpdate?: CommonZoneFragment['shippingMethods'][0]
) => {
  const isEditing = methodToUpdate;

  const [isLoading, startTransition] = useTransition();
  const [isSuccess, setIsSuccess] = useState(false);
  const [handler, setHandler] = useState(shippingHandlers[0]);

  const {
    entity: { zone }
  } = useEntityContext<ShipmentContext>();
  const { setIsOpen } = useDialogContext();

  const [method, setMethod] = useState<FormInput>({
    handlerCode: methodToUpdate?.code ?? '',
    name: methodToUpdate?.name ?? '',
    description: methodToUpdate?.description ?? '',
    enabled: methodToUpdate?.enabled ?? true,
    args: methodToUpdate?.args ?? {}
  });

  useEffect(() => {
    if (!isLoading && isSuccess) {
      notification.success(
        isEditing ? `Method ${methodToUpdate.name} updated` : 'Shipping method created'
      );
      setIsOpen(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess, isLoading]);

  const setValue = (input: SetValueInput) => {
    setMethod(prev => {
      return {
        ...prev,
        [input.key]: input.value
      };
    });
  };

  const exec = () => {
    const isNameEmpty = !method.name;

    const isAnyArgNotFilled =
      Object.values(handler.args).length !== Object.keys(method.args).length;

    const isAnyArgWithEmptyValue = Object.values(method.args).some(arg => arg === '');

    if (isNameEmpty || isAnyArgWithEmptyValue || isAnyArgNotFilled) {
      notification.error('Please fill all the fields');
      return;
    }

    startTransition(async () => {
      if (isEditing) {
        await updateShippingMethod(zone.id, methodToUpdate.id, {
          name: method.name,
          description: method.description,
          enabled: method.enabled,
          args: method.args
        });
      } else {
        const result = await createShippingMethod({
          name: method.name,
          description: method.description,
          enabled: method.enabled,
          zoneId: zone.id,
          handler: {
            code: handler.code,
            args: method.args
          }
        });

        if (result?.error) {
          notification.error(result.error);
          return;
        }
      }

      setIsSuccess(true);
    });
  };

  return {
    method,
    setValue,
    handler,
    setHandler,
    createShippingMethod: exec,
    isLoading
  };
};

type SetValueInput =
  | {
      key: 'name' | 'description' | 'handlerId';
      value: string;
    }
  | {
      key: 'enabled';
      value: boolean;
    }
  | {
      key: 'args';
      value: any;
    };

type FormInput = {
  handlerCode: string;
  name: string;
  description: string;
  enabled: boolean;
  args: Record<string, string>;
};
