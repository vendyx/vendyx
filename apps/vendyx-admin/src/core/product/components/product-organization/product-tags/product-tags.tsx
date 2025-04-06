import { Input } from '@/shared/components/ui/input';
import { Label } from '@/shared/components/ui/label';
import useClickOutside from '@/shared/hooks/use-click-outside';

export const ProductTags = () => {
  const containerRef = useClickOutside<HTMLDivElement>(() => console.log('clicked outside'));

  return (
    <div ref={containerRef} className="flex flex-col gap-2">
      <Label htmlFor="product-tags-input">Tags</Label>
      <Input id="product-tags-input" onFocus={() => console.log('focus')} />
    </div>
  );
};
