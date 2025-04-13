import { ChevronRightIcon, StoreIcon } from 'lucide-react';
import Link from 'next/link';

import { Badge } from '@/shared/components/ui/badge';
import { Card, CardHeader, CardTitle } from '@/shared/components/ui/card';
import { useBase } from '@/shared/hooks/use-base';

import { useLocationContext } from '../../contexts/location-context';

export const InStorePickupCard = () => {
  const { location } = useLocationContext();
  const base = useBase();

  if (!location) return null;

  return (
    <Link href={`${base}/settings/shipments/${location.id}/in-store-pickup`}>
      <Card className="hover:bg-muted/50 transition-colors cursor-pointer">
        <CardHeader className="flex flex-row items-center justify-between p-4">
          <div className="flex items-center gap-3">
            <StoreIcon size={20} />
            <CardTitle>Available for in store pickup</CardTitle>
          </div>

          <div className="flex items-center gap-2">
            {location.inStorePickup.isAvailable ? (
              <Badge>On</Badge>
            ) : (
              <Badge variant="secondary">Off</Badge>
            )}
            <ChevronRightIcon size={20} />
          </div>
        </CardHeader>
      </Card>
    </Link>
  );
};
