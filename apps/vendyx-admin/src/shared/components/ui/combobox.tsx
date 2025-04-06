'use client';

import {
  type FC,
  type KeyboardEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState
} from 'react';

import { Command as CommandPrimitive } from 'cmdk';
import { CheckIcon, PlusCircleIcon, XIcon } from 'lucide-react';

import { cn } from '@/shared/utils/theme';

import { LoaderSpiner } from '../loaders/loader-spiner';
import { Badge } from './badge';
import { Button } from './button';
import { Command, CommandGroup, CommandItem, CommandList } from './command';
import { Label } from './label';

export const Combobox: FC<Props> = ({
  items,
  isLoading,
  label,
  onSelectedChange,
  defaultSelected
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState<Item[]>(defaultSelected ?? []);

  useEffect(() => {
    onSelectedChange(selected);
  }, [selected]);

  const handleKeyDown = useCallback((e: KeyboardEvent<HTMLDivElement>) => {
    const input = inputRef.current;
    if (input) {
      // This is not a default behavior of the <input /> field
      if (e.key === 'Escape') {
        input.blur();
      }
    }
  }, []);

  const itemsToDisplay = useMemo(() => {
    return (
      [...items, ...selected]
        .filter(tag => tag.label.toLowerCase().includes(query.toLowerCase()))
        // when select, we do not remove the selected tags from the list so we need to filter them out
        .filter((tag, index, self) => index === self.findIndex(t => t.label === tag.label))
        .slice(0, 5)
    );
  }, [items, query, selected]);

  const shouldRenderAddTagButton = query && !items.some(item => item.label === query) && !isLoading;

  return (
    <Command
      // Command filtering works in a weird way (or maybe I don't understand it). so i disabled it
      shouldFilter={false}
      onKeyDown={handleKeyDown}
      className="overflow-visible bg-transparent"
    >
      {/* Radix ui adds its own id to input, TODO: replace it to use htmlFor instead of onclick */}
      <Label className="mb-2" onClick={() => inputRef.current?.focus()}>
        {label}
      </Label>
      <div className="group rounded-md border border-input px-3 py-2 text-sm h-9 focus-within:outline-none focus-within:ring-1 focus-within:ring-ring">
        <CommandPrimitive.Input
          id="tags-input"
          ref={inputRef}
          onBlur={() => setIsOpen(false)}
          onFocus={() => setIsOpen(true)}
          value={query}
          onValueChange={setQuery}
          placeholder="Select tags..."
          className="flex-1 bg-transparent outline-none placeholder:text-muted-foreground w-full"
        />
      </div>
      <div className="relative mt-2">
        <CommandList>
          {isOpen && (
            <div className="absolute top-0 z-10 w-full rounded-md border bg-popover text-popover-foreground shadow-md outline-none animate-in">
              <CommandGroup className="h-full overflow-auto p-2">
                <div className="flex flex-col gap-1">
                  {shouldRenderAddTagButton && (
                    <CommandItem
                      forceMount
                      onMouseDown={e => {
                        e.preventDefault();
                        e.stopPropagation();
                      }}
                      onSelect={() => {
                        const alreadyExists = selected.some(
                          item => item.label.toLowerCase() === query.toLowerCase()
                        );

                        if (alreadyExists) {
                          return;
                        }

                        setSelected([
                          ...selected,
                          // TODO: instead of only do Math.random().toString(), also mark this object as new (isNew: true)
                          { value: Math.random().toString(), label: query }
                        ]);
                        setQuery('');
                      }}
                      className={cn('cursor-pointer flex items-center gap-2 p-2')}
                    >
                      <PlusCircleIcon size={16} />
                      Add &quot;{query}&quot;
                    </CommandItem>
                  )}
                  {itemsToDisplay.map(item => {
                    const isSelected = selected.some(s => s.value === item.value);

                    return (
                      <CommandItem
                        key={item.value}
                        onMouseDown={e => {
                          e.preventDefault();
                          e.stopPropagation();
                        }}
                        value={item.label}
                        onSelect={() => {
                          const selectedTags = isSelected
                            ? selected.filter(s => s.value !== item.value)
                            : [...selected, item];

                          setSelected(selectedTags);
                        }}
                        className={cn(
                          'cursor-pointer flex items-center gap-2 p-2',
                          isSelected && 'bg-accent'
                        )}
                      >
                        <div
                          className={cn(
                            'peer h-4 w-4 shrink-0 rounded-sm border border-primary shadow text-primary-foreground flex items-center justify-center ',
                            isSelected && 'bg-primary'
                          )}
                        >
                          {isSelected && <CheckIcon size={12} />}
                        </div>
                        <Label className="m-0">{item.label}</Label>
                      </CommandItem>
                    );
                  })}
                  {isLoading && (
                    <div className="p-2 flex items-center justify-center">
                      <LoaderSpiner />
                    </div>
                  )}
                </div>
              </CommandGroup>
            </div>
          )}
        </CommandList>
      </div>
      {!!selected.length && (
        <div className="flex items-center gap-1 flex-wrap">
          {selected.map(item => (
            <Badge key={item.value} variant="secondary" className="flex items-center gap-1 px-2">
              {item.label}
              <Button
                className="p-0 h-3"
                variant="link"
                onClick={() => setSelected(selected.filter(t => t.value !== item.value))}
              >
                <XIcon size={12} />
              </Button>
            </Badge>
          ))}
        </div>
      )}
    </Command>
  );
};

type Props = {
  /**
   * Array of all items to be displayed in the combobox
   * filtering is done internally
   */
  items: Item[];
  /**
   * Boolean to show loading state
   */
  isLoading: boolean;
  /**
   * Function to be called when selected items change.
   *
   * Selected items are passed as an array of {@link Item} objects
   * the value is the value of the item you passed in the items prop
   * but if is a new item, the value will be a `Math.random().toString()`
   */
  onSelectedChange: (selected: Item[]) => void;
  /**
   * Label for the combobox
   */
  label: string;
  /**
   * Default selected items
   */
  defaultSelected?: Item[];
};

type Item = {
  /**
   * Unique identifier for the item, usually the entity id
   */
  value: string;
  /**
   * Label to be displayed for the item
   */
  label: string;
};
