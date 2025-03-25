import { type FC } from 'react';

import { ChevronRightIcon, type LucideIcon } from 'lucide-react';
import Link from 'next/link';

import { DiscountType } from '@/api/types';

export const AddDiscountOption: FC<Props> = ({ title, description, icon: Icon, type }) => {
  return (
    <Link
      href={`/discounts/new?type=${type}`}
      className="py-3 px-6 flex justify-between items-center hover:bg-muted/50"
    >
      <div>
        <div className="flex items-center gap-2">
          <h3 className="font-normal">{title}</h3>
          <Icon size={type === DiscountType.BuyXGetY ? 20 : 18} />
        </div>
        <p className="font-normal text-muted-foreground text-sm">{description}</p>
      </div>
      <ChevronRightIcon size={18} />
    </Link>
  );
};

type Props = {
  type: DiscountType;
  icon: LucideIcon;
  title: string;
  description: string;
};
