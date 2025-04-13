import { AlertDialogTitle } from '@radix-ui/react-alert-dialog';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTrigger
} from '@/shared/components/ui/alert-dialog';
import { Button } from '@/shared/components/ui/button';

import { useLocationContext } from '../../contexts/location-context';
import { useToggleActiveLocation } from './use-toggle-active-location';

export const ToggleActiveLocationButton = () => {
  const { location } = useLocationContext();
  const { isLoading, toggleActiveLocation } = useToggleActiveLocation(location?.isActive ?? true);

  if (!location) return null;

  if (!location.isActive) {
    return (
      <Button
        isLoading={isLoading}
        onClick={() => toggleActiveLocation(location.id)}
        type="button"
        variant="secondary"
        size="sm"
      >
        Activate Location
      </Button>
    );
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          isLoading={isLoading}
          disabled={isLoading}
          type="button"
          variant="secondary"
          size="sm"
        >
          Deactivate Location
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="sm:max-w-[425px]">
        <AlertDialogHeader>
          <AlertDialogTitle className="font-medium">
            Deactivate location &quot;{location.name}&quot;
          </AlertDialogTitle>
          <AlertDialogDescription>
            By deactivating this location you will not be able to receive in-store pickup orders for
            this location but you will still have access to the location settings.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel type="button">Cancel</AlertDialogCancel>
          <AlertDialogAction type="button" onClick={() => toggleActiveLocation(location.id)}>
            Deactivate
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
