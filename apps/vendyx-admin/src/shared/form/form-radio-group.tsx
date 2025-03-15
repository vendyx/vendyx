import { type FieldPath, type FieldValues } from 'react-hook-form';

import { RadioGroup, RadioGroupItem } from '../components/ui/radio-group';
import {
  FormControl,
  FormDescription,
  FormField,
  type FormFieldProps,
  FormItem,
  FormLabel,
  FormMessage
} from './form';

export const FormRadioGroup = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  name,
  items,
  label,
  ...rest
}: Props<TFieldValues, TName>) => {
  return (
    <FormField
      name={name}
      {...rest}
      render={({ field }) => (
        <FormItem className="space-y-3">
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <RadioGroup
              onValueChange={field.onChange}
              defaultValue={field.value}
              className="flex flex-col gap-4"
            >
              {items.map(item => (
                <FormItem key={item.value} className="flex flex-col gap-1">
                  <div className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value={item.value} />
                    </FormControl>
                    <FormLabel className="font-normal">{item.label}</FormLabel>
                  </div>
                  {item.description && <FormDescription>{item.description}</FormDescription>}
                </FormItem>
              ))}
            </RadioGroup>
          </FormControl>

          <FormMessage />
        </FormItem>
      )}
    />
  );
};

type Props<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = FormFieldProps<TFieldValues, TName> & {
  items: { label: string; value: string; description?: string }[];
  label?: string;
};
