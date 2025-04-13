import { RemoveEntityButton } from '@/shared/components/remove-entity/remove-entity-button';

import { useLocationContext } from '../../contexts/location-context';
import { useRemoveLocation } from './use-remove-location';

export const RemoveLocationButton = () => {
  const { location } = useLocationContext();
  const { isLoading, removeLocation } = useRemoveLocation();

  if (!location) return null;

  return (
    <RemoveEntityButton
      title={`Remove location ${location.name}`}
      description="By removing this location you will not be able to receive in-store pickup orders for this location."
      isLoading={isLoading}
      onRemove={async () => await removeLocation(location.id)}
    />
  );
};
