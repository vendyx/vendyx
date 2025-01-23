import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { validateAccessToken } from './core/auth/actions/validate-access-token';
import { getActiveShop } from './shared/cookies/cookies';

const ALLOWED_PATHS = ['/login'];

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  if (shouldExclude(request)) return NextResponse.next();

  const isAuth = await validateAccessToken();
  const isInAllowedPaths = ALLOWED_PATHS.includes(pathname);

  // Redirect to shops if authenticated and not in allowed paths
  if (isAuth && isInAllowedPaths) {
    return NextResponse.redirect(new URL('/shops', request.url));
  }

  // Redirect to login if not authenticated and not in allowed paths
  if (!isAuth && !isInAllowedPaths) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  const [, , shopSlug] = pathname.split('/');
  const activeShop = getActiveShop();

  // Redirect to shops if active shop is not the same as the shop in the URL
  // Petitions works depending on the active shop in cookies, so
  // we need to make sure that the active shop in cookies is the same as the shop in the URL
  if (shopSlug && shopSlug !== 'new' && activeShop?.slug !== shopSlug) {
    return NextResponse.redirect(new URL('/shops', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|logo.svg).*)']
};

function shouldExclude(request: NextRequest) {
  const path = request.nextUrl.pathname;

  return (
    path.startsWith('/api') || //  exclude all API routes
    path.startsWith('/static') || // exclude static files
    path.includes('.') // exclude all files in the public folder
  );
}
