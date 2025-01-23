import Link from 'next/link';

import { ThemeSwitcher } from '@/shared/components/theme-switcher/theme-switcher';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid pt-40 h-screen">
      <div>
        <div className="fixed top-6 right-6">
          <ThemeSwitcher />
        </div>
        <h1 className="text-center text-2xl font-medium mb-12">
          <Link href="/">Vendyx</Link>
        </h1>
        {children}
      </div>
    </div>
  );
}
