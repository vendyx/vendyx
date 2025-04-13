import { forwardRef } from 'react';

import { ChevronRightIcon, MapPinIcon } from 'lucide-react';

import { Card, CardDescription, CardHeader, CardTitle } from '@/shared/components/ui/card';
import { useDialogContext } from '@/shared/components/ui/dialog';

import { useLocationContext } from '../../contexts/location-context';

export const LocationAddressCard = forwardRef<HTMLDivElement>((_, ref) => {
  const { location } = useLocationContext();
  const { setIsOpen } = useDialogContext();

  if (!location) return null;

  return (
    <Card
      ref={ref}
      onClick={() => setIsOpen(true)}
      className="hover:bg-muted/50 transition-colors cursor-pointer"
    >
      <CardHeader className="flex flex-row items-center justify-between p-4">
        <div className="flex items-center gap-3">
          <MapPinIcon size={20} />
          <div className="flex flex-col gap-1">
            <CardTitle>Address</CardTitle>
            <CardDescription>
              {location.streetLine1}, {location.postalCode} {location.city} {location.province},{' '}
              {location.country}
            </CardDescription>
          </div>
        </div>

        <ChevronRightIcon size={20} />
      </CardHeader>
    </Card>
  );
});

LocationAddressCard.displayName = 'LocationAddressCard';
