import { BellIcon } from 'lucide-react';

import { AdminLayoutNav } from '@/shared/components/layout/admin-layout/admin-sidebar-nav';
import { Logo } from '@/shared/components/logo/logo';
import { Button } from '@/shared/components/ui/button';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-[320px_1fr] min-h-screen w-full">
      <aside className="border-r flex flex-col bg-background h-screen sticky top-0">
        <header className="h-16 flex items-center justify-between px-6 border-b">
          <div className="flex gap-2">
            <Logo />
            <span>Vendyx</span>
          </div>
          <div>
            <Button size={'icon'} variant="outline">
              <BellIcon size={16} />
            </Button>
          </div>
        </header>
        <AdminLayoutNav />
      </aside>
      <main className="bg-muted/40 flex flex-col gap-2">{children}</main>
    </div>
  );
}
