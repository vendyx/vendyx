'use client';

import { Fragment } from 'react';

import { BarChart2 } from 'lucide-react';
import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';

import { isFirst, isLast } from '@/shared/utils/arrays';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '../../ui/breadcrumb';

export const AdminBreadcrumb = () => {
  const pathname = usePathname();
  const params = useParams();

  const shop = Array.isArray(params.shop) ? params.shop[0] : params.shop;
  const id = Array.isArray(params.id) ? params.id[0] : params.id;

  const pathnameWithoutBase = pathname.replace(`/shops/${shop}`, '').replace(id, '');

  const breadcrumbItems = [
    { label: 'Dashboard', href: '/' },
    ...getBreadcrumbItems(pathnameWithoutBase)
  ];

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {breadcrumbItems.map(({ label, href }, i) =>
          isLast(i, breadcrumbItems) ? (
            <BreadcrumbItem key={label}>
              {isFirst(i) && <BarChart2 className="h-4 w-4 mr-1" />}
              <BreadcrumbPage>{label}</BreadcrumbPage>
            </BreadcrumbItem>
          ) : (
            <Fragment key={label}>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href={`/shops/${shop}${href ?? ''}`} className="flex items-center">
                    {isFirst(i) && <BarChart2 className="h-4 w-4 mr-1" />}
                    {label}
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
            </Fragment>
          )
        )}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

const BREADCRUMBS: Record<string, TBreadcrumbItem[]> = {
  '/': [],
  '/products': [{ href: '/products', label: 'Products' }, { label: 'All products' }],
  '/products/': [{ href: '/products', label: 'Products' }, { label: 'Product details' }],
  '/products/new': [{ href: '/products', label: 'Products' }, { label: 'Create product' }],
  '/collections': [{ href: '/collections', label: 'Collections' }, { label: 'All collections' }],
  '/collections/': [
    { href: '/collections', label: 'Collections' },
    { label: 'Collection details' }
  ],
  '/collections/new': [
    { href: '/collections', label: 'Collections' },
    { label: 'Create collection' }
  ],
  '/orders': [{ href: '/orders', label: 'Orders' }, { label: 'All orders' }],
  '/orders/': [{ href: '/orders', label: 'Orders' }, { label: 'Order details' }],
  '/customers': [{ href: '/customers', label: 'Customers' }, { label: 'All customers' }],
  '/customers/': [{ href: '/customers', label: 'Customers' }, { label: 'Customer details' }],
  '/discounts': [{ href: '/discounts', label: 'Discounts' }, { label: 'All discounts' }],
  '/discounts/': [{ href: '/discounts', label: 'Discounts' }, { label: 'Discount details' }]
};

type TBreadcrumbItem = {
  href?: string;
  label: string;
};

const getBreadcrumbItems = (pathname: string) => {
  return BREADCRUMBS[pathname] ?? [];
};
