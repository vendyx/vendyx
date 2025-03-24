'use client';

import {
  BoxesIcon,
  PackageIcon,
  SettingsIcon,
  ShoppingCartIcon,
  TagIcon,
  UserIcon
} from 'lucide-react';
import { useParams, usePathname } from 'next/navigation';

import { AdminSidebarNavItem } from './admin-sidebar-nav-item';

export const AdminLayoutNav = () => {
  const pathname = usePathname();
  const params = useParams();

  const shop = Array.isArray(params.shop) ? params.shop[0] : params.shop;

  const isInProducts = pathname.includes('/products');
  const isInCollections = pathname.includes('/collections');
  const isInOrders = pathname.includes('/orders');
  const isInCustomers = pathname.includes('/customers');
  const isInDiscounts = pathname.includes('/discounts');
  const isInSettings = pathname.includes('/settings');

  const SIDEBAR_ITEMS = [
    {
      icon: PackageIcon,
      to: `/shops/${shop}/products`,
      label: 'Products',
      isActive: isInProducts
    },
    {
      icon: BoxesIcon,
      to: `/shops/${shop}/collections`,
      label: 'Collections',
      isActive: isInCollections
    },
    {
      icon: ShoppingCartIcon,
      to: `/shops/${shop}/orders`,
      label: 'Orders',
      isActive: isInOrders
    },
    {
      icon: UserIcon,
      to: `/shops/${shop}/customers`,
      label: 'Customers',
      isActive: isInCustomers
    },
    {
      icon: TagIcon,
      to: `/shops/${shop}/discounts`,
      label: 'Discounts',
      isActive: isInDiscounts
    }
  ];

  return (
    <nav className="px-4 mt-2 flex flex-1 flex-col justify-between">
      <div className="flex flex-col gap-1">
        {SIDEBAR_ITEMS.map(item => (
          <AdminSidebarNavItem
            key={item.to}
            href={item.to}
            label={item.label}
            icon={item.icon}
            isActive={item.isActive}
          />
        ))}
      </div>
      <div className="pb-6">
        <AdminSidebarNavItem
          href={`/shops/${shop}/settings/shop-details`}
          label="Settings"
          icon={SettingsIcon}
          isActive={isInSettings}
        />
      </div>
    </nav>
  );
};
