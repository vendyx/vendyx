'use client';

import { type ColumnDef } from '@tanstack/react-table';
import Link from 'next/link';

import { DataTableColumnHeader } from '@/shared/components/data-table/data-table-column-header';
import { Badge } from '@/shared/components/ui/badge';
import { Checkbox } from '@/shared/components/ui/checkbox';
import { formatPrice } from '@/shared/utils/formatters';

import { type CustomersTableRow } from './customers-table';

export const CustomersTableColumns: ColumnDef<CustomersTableRow>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={value => table.toggleAllPageRowsSelected(Boolean(value))}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={value => row.toggleSelected(Boolean(value))}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false
  },

  {
    accessorKey: 'name',
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Customer" />;
    },
    cell: ({ row }) => {
      return (
        <Link
          href={`customers/${row.original.id}`}
          className="flex flex-col gap-1 w-full text-nowrap"
        >
          <span className="text-sm font-normal">{row.original.name}</span>
          <span className="text-sm font-normal text-muted-foreground">{row.original.email}</span>
        </Link>
      );
    }
  },

  {
    accessorKey: 'orders',
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Order" />;
    },
    cell: ({ row }) => {
      return (
        <span>
          {row.original.orders} {row.original.orders === 1 ? 'order' : 'orders'}
        </span>
      );
    }
  },

  {
    accessorKey: 'totalSpent',
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Total spent" />;
    },
    cell: ({ row }) => {
      return <span>{formatPrice(row.original.totalSpent)}</span>;
    }
  },
  {
    accessorKey: 'enabled',
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Status" />;
    },
    cell: ({ row }) => {
      return (
        <Badge variant={row.original.enabled ? 'default' : 'secondary'}>
          {row.original.enabled ? 'Enabled' : 'Disabled'}
        </Badge>
      );
    },
    enableSorting: false
  }
];
