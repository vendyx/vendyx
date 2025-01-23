import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import NextTopLoader from 'nextjs-toploader';

import { ThemeProvider } from '@/shared/components/theme-provider';
import { Notification } from '@/shared/notifications/notification';

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
        <ThemeProvider attribute="class" defaultTheme="dark" disableTransitionOnChange>
          <Notification />
          <NextTopLoader color="hsl(var(--primary))" />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
