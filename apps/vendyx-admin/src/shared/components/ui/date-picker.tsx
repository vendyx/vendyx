import { type FC } from 'react';

import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';

import { cn } from '@/shared/utils/theme';

import { Button } from './button';
import { Calendar } from './calendar';
import { Popover, PopoverContent, PopoverTrigger } from './popover';

export const DatePicker: FC<Props> = ({
  value,
  onChange,
  placeholder,
  formControl: FormControl
}) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        {FormControl ? (
          <FormControl>
            <DatePickerButton value={value} placeholder={placeholder} />
          </FormControl>
        ) : (
          <DatePickerButton value={value} placeholder={placeholder} />
        )}
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={value}
          onSelect={onChange}
          disabled={date => date > new Date() || date < new Date('1900-01-01')}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
};

type Props = {
  value: Date;
  onChange: (date: Date | undefined) => void;
  placeholder?: string;
  formControl?: React.ForwardRefExoticComponent<any>;
};

const DatePickerButton = ({ value, placeholder }: { value: Date; placeholder?: string }) => {
  return (
    <Button
      variant={'outline'}
      className={cn(
        'w-[240px] justify-start text-left font-normal',
        !value && 'text-muted-foreground'
      )}
    >
      <CalendarIcon />
      {value ? format(value, 'PPP') : <span>{placeholder}</span>}
    </Button>
  );
};
