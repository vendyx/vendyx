import Link from 'next/link';
import { redirect } from 'next/navigation';

import { UserService } from '@/api/services/user.service';
import { CreateShopForm } from '@/core/shop/components/create-shop/create-shop-form';
import { UserAvatar } from '@/shared/components/user-avatar/user-avatar';

export default async function NewShopPage() {
  const user = await UserService.whoami();

  if (!user.emailVerified) {
    redirect('/shops');
  }

  return (
    <div className="grid h-screen">
      <div className="py-32">
        <div className="fixed top-6 right-6">
          <UserAvatar />
        </div>

        <h1 className="text-center text-2xl font-medium mb-12 w-screen">
          <Link href="/shops">Vendyx</Link>
        </h1>
        <CreateShopForm />
      </div>
    </div>
  );
}
