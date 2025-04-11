'use client';

import { useMemo } from 'react';

import { CreditCardIcon, MapPinHouseIcon, StoreIcon, TruckIcon } from 'lucide-react';
import { useParams, usePathname } from 'next/navigation';

import { LayoutSidebarItem } from '../layout-sidebar-item';

export const SettingsSidebarNav = () => {
  const pathname = usePathname();
  const params = useParams();

  const shop = Array.isArray(params.shop) ? params.shop[0] : params.shop;

  const [isInShopDetails, isInPayments, isInShipments, isInLocations] = useMemo(
    () => [
      pathname.includes('/settings/shop-details'),
      pathname.includes('/settings/payments'),
      pathname.includes('/settings/shipments'),
      pathname.includes('/settings/locations')
    ],
    [pathname]
  );

  const SIDEBAR_ITEMS = [
    {
      icon: StoreIcon,
      to: `/shops/${shop}/settings/shop-details`,
      label: 'Shop Details',
      isActive: isInShopDetails
    },
    {
      icon: CreditCardIcon,
      to: `/shops/${shop}/settings/payments`,
      label: 'Payments',
      isActive: isInPayments
    },
    {
      icon: TruckIcon,
      to: `/shops/${shop}/settings/shipments`,
      label: 'Shipments',
      isActive: isInShipments
    },
    {
      icon: MapPinHouseIcon,
      to: `/shops/${shop}/settings/locations`,
      label: 'Locations',
      isActive: isInLocations
    }
  ];

  return (
    <aside className="flex flex-1 flex-col justify-between">
      <div className="flex flex-col gap-1">
        {SIDEBAR_ITEMS.map(({ label, to, icon, isActive }) => (
          <LayoutSidebarItem key={to} href={to} label={label} icon={icon} isActive={isActive} />
        ))}
      </div>
    </aside>
  );
};
