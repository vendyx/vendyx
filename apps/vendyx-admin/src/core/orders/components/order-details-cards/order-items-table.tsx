'use client';
import { type FC } from 'react';

import { TagIcon } from 'lucide-react';
import Link from 'next/link';

import { type CommonOrderFragment } from '@/api/types';
import { ImagePlaceholder } from '@/shared/components/placeholders/image-placeholder';
import { OrderStatusBadge } from '@/shared/components/status-badges/order-status-badge';
import { InfoTooltip } from '@/shared/components/tooltips/info-tooltip';
import { Badge } from '@/shared/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui/card';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/shared/components/ui/table';
import { useBase } from '@/shared/hooks/use-base';
import { isFirst } from '@/shared/utils/arrays';
import { formatPrice } from '@/shared/utils/formatters';
import { cn } from '@/shared/utils/theme';

export const OrderItemsTable: FC<Props> = ({ order }) => {
  const base = useBase();

  const lines = order.lines.items;
  const { shipment, discounts } = order;
  const subtotalBeforeDiscounts = lines.reduce((acc, line) => acc + line.lineTotal, 0);

  return (
    <Card>
      <CardHeader className="flex items-center flex-row justify-between space-y-0">
        <CardTitle>Products</CardTitle>
        <OrderStatusBadge status={order.state} />
      </CardHeader>

      <CardContent>
        <Table>
          <TableCaption>Order breakdown.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-max text-nowrap">Product</TableHead>
              <TableHead className="w-max text-nowrap">Unit price</TableHead>
              <TableHead className="w-max text-nowrap">Quantity</TableHead>
              <TableHead className="w-max text-nowrap">Total</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {lines.map(line => {
              const { product, asset, optionValues, deletedAt } = line.productVariant ?? {};
              const productImage = product.assets.items[0]?.source;
              const variantImage = asset?.source;

              const itemImage = variantImage ?? productImage;

              const productUrl = `${base}/products/${product.id}`;

              const lineDiscountsMsg = line.discounts
                .map(d => `${d.handle} (-$${formatPrice(d.discountedAmount)})`)
                .join(', ');

              return (
                <TableRow key={line.id}>
                  <TableCell className="flex items-center gap-2 w-max">
                    {itemImage ? (
                      <img
                        src={itemImage}
                        alt={product.name}
                        className="h-12 w-12 object-cover rounded-md"
                      />
                    ) : (
                      <ImagePlaceholder initial={product.name} />
                    )}
                    <div
                      className={cn('flex flex-col justify-between', optionValues.length && 'h-12')}
                    >
                      {!deletedAt ? (
                        <Link href={productUrl}>
                          <span className="text-nowrap hover:underline">{product.name}</span>
                        </Link>
                      ) : (
                        <span className="text-nowrap">{product.name}</span>
                      )}
                      {Boolean(optionValues?.length) && (
                        <Badge variant="secondary" className="py-0 px-1 w-fit text-xs">
                          {optionValues?.map(v => v.name).join(' / ')}
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>{formatPrice(line.unitPrice, { withCurrencyIcon: true })}</TableCell>
                  <TableCell>{line.quantity}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <span>{formatPrice(line.lineTotal, { withCurrencyIcon: true })}</span>
                      {!!line.discounts.length && (
                        <InfoTooltip message={lineDiscountsMsg}>
                          <TagIcon size={16} className="text-muted-foreground" />
                        </InfoTooltip>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}

            <TableRow className="border-transparent">
              <TableCell>Subtotal</TableCell>
              <TableCell>
                {order.totalQuantity} {order.totalQuantity === 1 ? 'Product' : 'Products'}
              </TableCell>
              <TableCell></TableCell>
              <TableCell>
                {formatPrice(subtotalBeforeDiscounts, { withCurrencyIcon: true })}
              </TableCell>
            </TableRow>

            {discounts.map((d, i) => (
              <TableRow key={d.handle} className="border-transparent">
                <TableCell>{isFirst(i) && 'Discounts'}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <TagIcon size={16} />
                    <span>{d.handle}</span>
                  </div>
                </TableCell>
                <TableCell></TableCell>
                <TableCell>
                  -{formatPrice(d.discountedAmount, { withCurrencyIcon: true })}
                </TableCell>
              </TableRow>
            ))}

            <TableRow className="border-transparent">
              <TableCell>Shipment</TableCell>
              <TableCell>{shipment?.method ?? ''}</TableCell>
              <TableCell></TableCell>
              <TableCell>
                <div className="flex items-center gap-1">
                  <span>{formatPrice(shipment?.total ?? 0, { withCurrencyIcon: true })}</span>
                  {!!shipment?.discounts.length && (
                    <InfoTooltip
                      message={shipment.discounts
                        .map(d => `${d.handle} (-$${formatPrice(d.discountedAmount)})`)
                        .join(', ')}
                    >
                      <TagIcon size={16} className="text-muted-foreground" />
                    </InfoTooltip>
                  )}
                </div>
              </TableCell>
            </TableRow>

            <TableRow className="border-transparent">
              <TableCell className="font-semibold">Total</TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell className="font-semibold">{formatPrice(order.total)}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

type Props = {
  order: CommonOrderFragment;
};
