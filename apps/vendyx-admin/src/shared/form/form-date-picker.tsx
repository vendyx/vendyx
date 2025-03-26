import { type ComponentProps } from 'react';
import { type FieldPath, type FieldValues } from 'react-hook-form';

import { DatePicker } from '../components/ui/date-picker';
import { cn } from '../utils/theme';
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from './form';

export const FormDatePicker = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  name,
  label,
  description,
  placeholder,
  className,
  ...rest
}: Props<TFieldValues, TName>) => {
  return (
    <FormField
      {...rest}
      name={name}
      render={({ field }) => (
        <FormItem className={cn('w-full', className)}>
          {label && (
            <div className="flex items-center justify-between">
              <FormLabel className="flex items-center h-[14px]">{label}</FormLabel>
            </div>
          )}
          <DatePicker
            value={field.value}
            onChange={field.onChange}
            placeholder={placeholder}
            formControl={FormControl}
          />
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

type Props<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = Pick<
  ComponentProps<typeof FormField<TFieldValues, TName>>,
  'control' | 'defaultValue' | 'disabled' | 'name'
> & {
  label?: string;
  description?: string;
  placeholder?: string;
  className?: string;
};
