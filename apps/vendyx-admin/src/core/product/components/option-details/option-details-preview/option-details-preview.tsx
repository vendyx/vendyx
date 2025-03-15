import { type FC } from 'react';

import { useVariantContext, type VariantContext } from '@/core/product/contexts/variant.context';
import { Badge } from '@/shared/components/ui/badge';
import { Label } from '@/shared/components/ui/label';

export const OptionDetailsPreview: FC<Props> = ({ option }) => {
  const { updateOption } = useVariantContext();

  return (
    <button
      type="button"
      className="hover:bg-muted/50 w-full flex flex-col gap-4 p-4 "
      onClick={() =>
        updateOption(option.id, {
          ...option,
          isEditing: true,
          values: [...option.values, { id: Math.random().toString(), name: '' }]
        })
      }
    >
      <Label className="text-left">{option.name}</Label>
      <div className="flex items-center gap-2">
        {option.values.map(value => (
          <Badge key={value.id} variant="secondary">
            {value.name}
          </Badge>
        ))}
      </div>
    </button>
  );
};

type Props = {
  option: VariantContext['options'][0];
};
