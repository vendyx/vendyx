'use client';

import { type ColumnDef } from '@tanstack/react-table';
import Link from 'next/link';

import { DiscountApplicationMode, DiscountType, DiscountValueType } from '@/api/types';
import { DataTableColumnHeader } from '@/shared/components/data-table/data-table-column-header';
import { Badge } from '@/shared/components/ui/badge';
import { Checkbox } from '@/shared/components/ui/checkbox';
import { formatPrice } from '@/shared/utils/formatters';

import { type DiscountsTableRow } from './discounts-table';

export const DiscountsTableColumns: ColumnDef<DiscountsTableRow>[] = [
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
    id: 'handle',
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Discount" />;
    },
    cell: ({ row }) => {
      return (
        <Link
          href={`discounts/${row.original.id ?? ''}`}
          className="flex flex-col gap-2 w-full text-nowrap"
        >
          <span className="text-nowrap font-normal">{row.original.handle}</span>
          {row.original.type === DiscountType.Order && (
            <span className="text-nowrap font-normal text-muted-foreground">
              {row.original.discountValueType === DiscountValueType.Percentage
                ? `${row.original.discountValue}% off for order`
                : `${formatPrice(row.original.discountValue)} off for order`}
            </span>
          )}

          {row.original.type === DiscountType.Product && (
            <span className="text-nowrap font-normal text-muted-foreground">
              {row.original.discountValueType === DiscountValueType.Percentage
                ? `${row.original.discountValue}% off for selected products` // TODO: add exact number of products
                : `${formatPrice(row.original.discountValue)} off for selected products`}
            </span>
          )}

          {row.original.type === DiscountType.Shipping && (
            <span className="text-nowrap font-normal text-muted-foreground">
              {row.original.discountValueType === DiscountValueType.Percentage
                ? `${row.original.discountValue}% off for shipping`
                : `${formatPrice(row.original.discountValue)} off for shipping`}
            </span>
          )}

          {row.original.type === DiscountType.BuyXGetY && (
            <span className="text-nowrap font-normal text-muted-foreground">
              {row.original.discountValueType === DiscountValueType.Percentage
                ? `${row.original.discountValue}% off for selected products` // TODO: add format Buy 2 items, get 2 items at 10% off
                : `${formatPrice(row.original.discountValue)} off for selected products`}
            </span>
          )}
        </Link>
      );
    }
  },
  {
    accessorKey: 'applicationMode',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Method" />,
    cell: ({ row }) => {
      const { applicationMode } = row.original;
      const isAutomatic = applicationMode === DiscountApplicationMode.Automatic;

      return <p className="text-nowrap">{isAutomatic ? 'Automatic' : 'Manual'}</p>;
    }
  },
  {
    accessorKey: 'type',
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Type" />;
    },
    cell: ({ row }) => {
      const { type } = row.original;

      const TYPES = {
        [DiscountType.Order]: 'Order',
        [DiscountType.Product]: 'Product',
        [DiscountType.Shipping]: 'Shipping',
        [DiscountType.BuyXGetY]: 'Buy X Get Y'
      };

      return <p className="text-nowrap">{TYPES[type]}</p>;
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
