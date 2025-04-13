import { type FC } from 'react';

import { PlusIcon } from 'lucide-react';
import Link from 'next/link';

import { type GetAllLocationsQuery } from '@/api/types';
import { RawTableEmptyState } from '@/shared/components/empty-states/raw-table-empty-state';
import { Badge } from '@/shared/components/ui/badge';
import { Button } from '@/shared/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/shared/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/shared/components/ui/table';

export const LocationsTable: FC<Props> = ({ locations }) => {
  if (!locations.length) {
    return (
      <RawTableEmptyState
        illustration={<div></div>}
        description="You haven't created any location yet. Locations are use it to show in store pickup shipping."
        action={{
          label: 'Add Location',
          href: '/settings/locations/new'
        }}
      />
    );
  }

  return (
    <Card>
      <CardHeader className="flex justify-between flex-row items-center">
        <div>
          <CardTitle>Locations</CardTitle>
          <CardDescription>Locations are used to show in store pickup shipping.</CardDescription>
        </div>
        <div>
          <Link href="locations/new">
            <Button variant="secondary" size="sm" className="gap-2">
              <PlusIcon size={16} />
              Add Location
            </Button>
          </Link>
        </div>
      </CardHeader>

      {Boolean(locations.length) && (
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Location</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {locations.map(location => (
                <TableRow key={location.id}>
                  <TableCell>
                    <Link
                      href={`locations/${location.id}`}
                      className="flex flex-col gap-1 w-full text-nowrap"
                    >
                      <span className="text-sm font-normal">{location.name}</span>
                      <span className="text-sm font-normal text-muted-foreground">
                        {location.streetLine1}, {location.city} {location.province},{' '}
                        {location.country}
                      </span>
                    </Link>
                  </TableCell>
                  <TableCell>
                    <Badge variant={location.isActive ? 'default' : 'secondary'}>
                      {location.isActive ? 'Active' : 'Inactive'}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      )}
    </Card>
  );
};

type Props = {
  locations: GetAllLocationsQuery['locations']['items'];
};
