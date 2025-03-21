'use client';
import { startTransition } from 'react';

import NextLink from 'next/link';
import { useRouter } from 'next/navigation';

import { useIsBlocked } from '@/shared/hooks/use-navigation-block';

/**
 * A custom Link component that wraps Next.js's next/link component.
 */
export function Link({ href, children, replace, ...rest }: Parameters<typeof NextLink>[0]) {
  const router = useRouter();
  const isBlocked = useIsBlocked();

  return (
    <NextLink
      href={href}
      onClick={e => {
        e.preventDefault();
        e.stopPropagation();

        // Cancel navigation
        if (isBlocked && !window.confirm('Do you really want to leave?')) {
          return;
        }

        startTransition(() => {
          // eslint-disable-next-line @typescript-eslint/no-base-to-string
          const url = href.toString();
          if (replace) {
            router.replace(url);
          } else {
            router.push(url);
          }
        });
      }}
      {...rest}
    >
      {children}
    </NextLink>
  );
}
