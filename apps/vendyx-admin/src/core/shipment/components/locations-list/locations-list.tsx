'use client';

import { type FC } from 'react';

import { ChevronRightIcon, MapPinIcon } from 'lucide-react';
import Link from 'next/link';

import { type GetAllLocationsForPickupInStoreListQuery } from '@/api/types';
import { Badge } from '@/shared/components/ui/badge';
import { Card, CardHeader, CardTitle } from '@/shared/components/ui/card';
import { useBase } from '@/shared/hooks/use-base';
import { add3dots } from '@/shared/utils/formatters';

export const LocationsList: FC<Props> = ({ locations }) => {
  const base = useBase();

  return (
    <Card className="overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Your locations</CardTitle>
        <Link
          href={`${base}/settings/locations`}
          className="text-distinct text-sm hover:opacity-80 transition-opacity"
        >
          Manage
        </Link>
      </CardHeader>
      {locations.map(location => {
        const description = `${location.streetLine1}, ${location.postalCode} ${location.city}, ${location.province}, ${location.country}`;
        return (
          <Link
            href={`pickup-in-store/${location.id}`}
            className="p-4 border-t flex items-center justify-between gap-4 hover:bg-muted/50 transition-colors"
            key={location.id}
          >
            <div className="flex items-center gap-3">
              <MapPinIcon size={20} />

              <div>
                <p>{location.name}</p>
                <p className="text-muted-foreground text-sm">{add3dots(description, 60)}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {location.inStorePickup.isAvailable ? (
                <Badge className="text-nowrap">Offers pickup</Badge>
              ) : (
                <Badge variant="secondary" className="text-nowrap">
                  Doesn’t offers pickup
                </Badge>
              )}
              <ChevronRightIcon size={20} />
            </div>
          </Link>
        );
      })}
    </Card>
  );
};

type Props = {
  locations: GetAllLocationsForPickupInStoreListQuery['locations']['items'];
};
