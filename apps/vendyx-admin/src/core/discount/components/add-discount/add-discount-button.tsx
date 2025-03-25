import { BoxesIcon, PackageIcon, ShoppingCartIcon, TruckIcon } from 'lucide-react';

import { DiscountType } from '@/api/types';
import { Button } from '@/shared/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/shared/components/ui/dialog';

import { AddDiscountOption } from './add-discount-option';

export const AddDiscountButton = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button type="button">Add Discount</Button>
      </DialogTrigger>

      <DialogContent className="p-0">
        <DialogHeader className="px-6 pt-6">
          <DialogTitle>Select discount type</DialogTitle>

          <DialogDescription>Choose the type of discount you want to create</DialogDescription>
        </DialogHeader>

        <div className="flex flex-col border-t divide-y">
          <AddDiscountOption
            title="Order discount"
            description="Apply a discount to the entire order."
            icon={ShoppingCartIcon}
            type={DiscountType.Order}
          />

          <AddDiscountOption
            title="Product discount"
            description="Apply a discount to specific products."
            icon={PackageIcon}
            type={DiscountType.Product}
          />

          <AddDiscountOption
            title="Shipping discount"
            description="Apply a discount to the shipping cost."
            icon={TruckIcon}
            type={DiscountType.Shipping}
          />

          <AddDiscountOption
            title="Buy x get y"
            description="Apply a discount based on customer's cart contents."
            icon={BoxesIcon}
            type={DiscountType.BuyXGetY}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};
