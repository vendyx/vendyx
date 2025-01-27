import { type FC } from 'react';

import { type LucideIcon } from 'lucide-react';

import { cn } from '@/shared/utils/theme';

import { Link } from '../../link/link';

export const AdminSidebarNavItem: FC<Props> = ({ href, label, icon: Icon, isActive }) => {
  return (
    <Link
      href={href}
      className={cn(
        'text-sm font-medium text-muted-foreground gap-2 flex items-center justify-start py-2 px-4 rounded-md hover:bg-muted hover:text-foreground transition-colors',
        isActive && 'bg-muted text-foreground'
      )}
    >
      <Icon size={16} />
      <span>{label}</span>
    </Link>
  );
};

type Props = {
  href: string;
  icon: LucideIcon;
  label: string;
  isActive: boolean;
};
