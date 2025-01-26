import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import { ThemeProvider } from '@/shared/components/theme-provider';
import {
  BlockBrowserNavigation,
  NavigationBlockerProvider
} from '@/shared/hooks/use-navigation-block';
import { Notification } from '@/shared/notifications/notification';
import { TopProgressBar } from '@/shared/progress-bar/top-progress-bar';

import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

export const metadata: Metadata = {
  title: 'Vendyx',
  description:
    'A functional and scalable minimal e-commerce admin that can be adjusted to any user`s requirement.'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning className={inter.className}>
        <NavigationBlockerProvider>
          <ThemeProvider attribute="class" defaultTheme="dark" disableTransitionOnChange>
            <Notification />
            <TopProgressBar />
            <BlockBrowserNavigation />
            {children}
          </ThemeProvider>
        </NavigationBlockerProvider>
      </body>
    </html>
  );
}
