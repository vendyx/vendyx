import { type FC, type PropsWithChildren, type ReactElement } from 'react';

import { SettingsPageLayoutGoBack } from './settings-page-layout-go-back';

export const SettingsPageLayout: FC<Props> = ({
  title,
  subtitle,
  backUrl,
  actions,
  className,
  children
}) => {
  return (
    <div className="flex flex-col gap-6 max-w-3xl px-6 pb-6">
      <header className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          {backUrl && <SettingsPageLayoutGoBack url={backUrl} />}
          <div>
            <h2 className="text-lg font-medium">{title}</h2>
            <p className="text-muted-foreground text-sm font-light">{subtitle}</p>
          </div>
        </div>
        <div className="flex gap-3">{actions}</div>
      </header>
      <hr />
      <main className={className}>{children}</main>
    </div>
  );
};

type Props = PropsWithChildren & {
  title?: string;
  subtitle?: string;
  backUrl?: string;
  actions?: ReactElement;
  className?: string;
};
