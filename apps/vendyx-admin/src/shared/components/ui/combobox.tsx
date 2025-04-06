'use client';

import { type FC, useEffect, useState } from 'react';

import { CheckIcon } from 'lucide-react';

import { cn } from '@/shared/utils/theme';

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from './command';
import { Popover, PopoverContent } from './popover';

export const Combobox: FC<Props> = ({
  items,
  onValueChange,
  onQuerySearchChange,
  isLoading,
  defaultValue,
  isOpen,
  onOpenChange
}) => {
  const [value, setValue] = useState(defaultValue ?? '');

  useEffect(() => {
    onValueChange(value);
  }, [value, onValueChange]);

  return (
    <Popover open={isOpen} onOpenChange={onOpenChange}>
      <PopoverContent className="w-[200px] p-0" align="start">
        <Command shouldFilter={false}>
          <CommandInput
            onValueChange={value => onQuerySearchChange(value)}
            placeholder="Buscar..."
          />
          <CommandList>
            <CommandGroup>
              {isLoading && <CommandEmpty>Cargando...</CommandEmpty>}
              {!isLoading && <CommandEmpty>No hay resultados</CommandEmpty>}
              {!isLoading &&
                items.map(item => (
                  <CommandItem
                    key={item.value}
                    value={item.value}
                    onSelect={currentValue => {
                      setValue(currentValue === value ? '' : currentValue);
                      onOpenChange(false);
                    }}
                  >
                    <CheckIcon
                      className={cn(
                        'mr-2 h-4 w-4',
                        value === item.value ? 'opacity-100' : 'opacity-0'
                      )}
                    />
                    {item.label}
                  </CommandItem>
                ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

type Props = {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  items: ComboboxItem[];
  onValueChange: (value: ComboboxItem['value']) => void;
  onQuerySearchChange: (query: string) => void;
  isLoading?: boolean;
  placeholder?: string;
  className?: string;
  id?: string;
  error?: string;
  disabled?: boolean;
  defaultValue?: ComboboxItem['value'];
};

type ComboboxItem = { value: string; label: string };
