import { type FC, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useFormContext } from 'react-hook-form';

import { Command as CommandPrimitive } from 'cmdk';
import { CheckIcon, PlusCircleIcon, XIcon } from 'lucide-react';

import { type CommonProductFragment, type CommonTagFragment } from '@/api/types';
import { LoaderSpiner } from '@/shared/components/loaders/loader-spiner';
import { Badge } from '@/shared/components/ui/badge';
import { Button } from '@/shared/components/ui/button';
import { Command, CommandGroup, CommandItem, CommandList } from '@/shared/components/ui/command';
import { Label } from '@/shared/components/ui/label';
import { cn } from '@/shared/utils/theme';
import { isUUID } from '@/shared/utils/validators';

import { type ProductDetailsFormInput } from '../../product-details/use-product-details-form';
import { useProductTags } from './use-product-tags';

export const ProductTags: FC<Props> = ({ product }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<CommonTagFragment[]>(product?.tags ?? []);
  const [inMemoryQuery, setInMemoryQuery] = useState('');

  const { setValue } = useFormContext<ProductDetailsFormInput>();
  const { isLoading, allTags } = useProductTags();

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLDivElement>) => {
    const input = inputRef.current;
    if (input) {
      // This is not a default behavior of the <input /> field
      if (e.key === 'Escape') {
        input.blur();
      }
    }
  }, []);

  useEffect(() => {
    setValue(
      'tags',
      selected.map(tag => (isUUID(tag.id) ? tag.id : tag.name))
    );
  }, [selected]);

  const tagsToDisplay = useMemo(() => {
    return (
      [...allTags, ...selected]
        .filter(tag => tag.name.toLowerCase().includes(inMemoryQuery.toLowerCase()))
        // when select, we do not remove the selected tags from the list so we need to filter them out
        .filter((tag, index, self) => index === self.findIndex(t => t.name === tag.name))
        .slice(0, 5)
    );
  }, [allTags, inMemoryQuery, selected]);

  const shouldRenderAddTagButton =
    inMemoryQuery && !tagsToDisplay.some(tag => tag.name === inMemoryQuery) && !isLoading;

  return (
    <Command
      // Command filtering works in a weird way (or maybe I don't understand it). so i disabled it
      shouldFilter={false}
      onKeyDown={handleKeyDown}
      className="overflow-visible bg-transparent"
    >
      {/* Radix ui adds its own id to input, TODO: replace it to use htmlFor instead of onclick */}
      <Label className="mb-2" onClick={() => inputRef.current?.focus()}>
        Tags
      </Label>
      <div className="group rounded-md border border-input px-3 py-2 text-sm h-9 focus-within:outline-none focus-within:ring-1 focus-within:ring-ring">
        <CommandPrimitive.Input
          id="tags-input"
          ref={inputRef}
          onBlur={() => setIsOpen(false)}
          onFocus={() => setIsOpen(true)}
          value={inMemoryQuery}
          onValueChange={search => {
            setInMemoryQuery(search);
          }}
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
                          item => item.name.toLowerCase() === inMemoryQuery.toLowerCase()
                        );

                        if (alreadyExists) {
                          return;
                        }

                        setSelected([
                          ...selected,
                          { id: Math.random().toString(), name: inMemoryQuery }
                        ]);
                        setInMemoryQuery('');
                      }}
                      className={cn('cursor-pointer flex items-center gap-2 p-2')}
                    >
                      <PlusCircleIcon size={16} />
                      Add &quot;{inMemoryQuery}&quot;
                    </CommandItem>
                  )}
                  {tagsToDisplay.map(tag => {
                    const isSelected = selected.some(item => item.id === tag.id);

                    return (
                      <CommandItem
                        key={tag.id}
                        onMouseDown={e => {
                          e.preventDefault();
                          e.stopPropagation();
                        }}
                        value={tag.name}
                        onSelect={() => {
                          const selectedTags = isSelected
                            ? selected.filter(selected => selected.id !== tag.id)
                            : [...selected, tag];

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
                        <Label className="m-0">{tag.name}</Label>
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
          {selected.map(tag => (
            <Badge key={tag.id} variant="secondary" className="flex items-center gap-1 px-2">
              {tag.name}
              <Button
                className="p-0 h-3"
                variant="link"
                onClick={() => setSelected(selected.filter(t => t.id !== tag.id))}
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
  product: CommonProductFragment | undefined;
};
