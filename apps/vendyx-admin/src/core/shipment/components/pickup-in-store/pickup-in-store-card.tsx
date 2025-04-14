import { type FC } from 'react';

import { ChevronRightIcon, StoreIcon } from 'lucide-react';

import { type GetAllLocationNamesQuery } from '@/api/types';
import { Link } from '@/shared/components/link/link';
import { Card, CardDescription, CardHeader, CardTitle } from '@/shared/components/ui/card';
import { add3dots } from '@/shared/utils/formatters';

export const PickupInStoreCard: FC<Props> = ({ locations }) => {
  const description = locations.map(l => l.name).join(', ');
  const anyIsAvailable = locations.some(l => l.inStorePickup.isAvailable);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between p-4">
        <div className="flex items-center gap-3">
          <StoreIcon size={20} />
          <div className="flex flex-col gap-1">
            <CardTitle>Pickup in store</CardTitle>
            {description && <CardDescription>{add3dots(description, 50)}</CardDescription>}
          </div>
        </div>

        <Link
          href="shipments/pickup-in-store"
          className="text-distinct flex items-center gap-2 hover:opacity-80 transition-opacity"
        >
          <span className="-mt-[1px] text-sm">{anyIsAvailable ? 'Manage' : 'Setup'}</span>
          <ChevronRightIcon size={16} />
        </Link>
      </CardHeader>
    </Card>
  );
};

type Props = {
  locations: GetAllLocationNamesQuery['locations']['items'];
};
