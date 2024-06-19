import { type FC } from 'react';
import { Outlet } from 'react-router-dom';

import { Button, Input } from '@ebloc/theme';
import { BellIcon } from 'lucide-react';

import { Logo, UserAvatar } from '../items';
import { AdminSidebar } from '../sections';

export const AdminLayout: FC = () => {
  return (
    <div className="grid min-h-screen w-full grid-cols-[320px_1fr]">
      <aside className="flex flex-col border-r gap-4">
        <div className="flex justify-between h-16 items-center border-b px-4">
          <div className="flex gap-2">
            <Logo />
            <h1 className="text-base font-medium">EBloc</h1>
          </div>
          <div>
            <Button size="icon" variant="outline">
              <BellIcon size={16} />
            </Button>
          </div>
        </div>
        <AdminSidebar />
      </aside>
      <div className="flex flex-col">
        <header className="flex justify-between items-center h-16 px-4 border-b">
          <Input placeholder="Search..." className="bg-background w-60" />
          <UserAvatar />
        </header>
        <main className="flex-1 w-full bg-background">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
