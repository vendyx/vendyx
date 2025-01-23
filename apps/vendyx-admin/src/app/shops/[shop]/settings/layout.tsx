import { type ReactNode } from 'react';

import { SettingsLayoutGoBack } from '@/shared/components/layout/settings-layout/settings-layout-go-back';
import { SettingsSidebarNav } from '@/shared/components/layout/settings-layout/settings-sidebar-nav';
import { Separator } from '@/shared/components/ui/separator';

export default function SettingsLayout({ children }: { children: ReactNode }) {
  return (
    <div className="mx-8 my-8 flex flex-col gap-6">
      <header className="px-4 flex justify-between items-start">
        <div>
          <h1>Settings</h1>
          <p className="text-muted-foreground text-base">
            Manage your account settings, payments and shipments.
          </p>
        </div>
        <div>
          <SettingsLayoutGoBack />
        </div>
      </header>
      <Separator className="mx-4" />
      <div className="grid lg:grid-cols-[260px_1fr] xl:grid-cols-[320px_1fr]">
        <SettingsSidebarNav />
        <main>{children}</main>
      </div>
    </div>
  );
}
