import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hasVisited = request.cookies.get('designer_has_visited');

  // If the user visits the profile page, just ensure the cookie is set
  // so they are marked as having visited the site.
  if (pathname === '/profile') {
    const response = NextResponse.next();
    if (!hasVisited) {
      response.cookies.set('designer_has_visited', 'true', {
        path: '/',
        maxAge: 60 * 60 * 24 * 365, // 1 year
      });
    }
    return response;
  }

  // If they visit ANY other page for the first time (incognito, new device, etc.)
  // and haven't visited before, redirect them to the Profile Landing page
  if (!hasVisited) {
    const url = request.nextUrl.clone();
    url.pathname = '/profile';
    const response = NextResponse.redirect(url);

    // Set the cookie on the redirect response so they don't get trapped in a loop
    response.cookies.set('designer_has_visited', 'true', {
      path: '/',
      maxAge: 60 * 60 * 24 * 365,
    });

    return response;
  }

  // Otherwise, let them proceed normally
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - general media files
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|css|scss)$).*)',
  ],
};
