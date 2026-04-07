import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const APEX_HOST = 'fluxer.games';
const WWW_HOST = 'www.fluxer.games';
const ROOT_REDIRECT_URL = 'https://fluxer.gg/eDfgY33P';

export function proxy(request: NextRequest) {
  const hostHeader = request.headers.get('host') ?? '';
  const hostname = hostHeader.split(':')[0].toLowerCase();

  if (hostname !== APEX_HOST) {
    return NextResponse.next();
  }

  const { pathname, search } = request.nextUrl;

  if (pathname === '/') {
    return NextResponse.redirect(new URL(ROOT_REDIRECT_URL), 308);
  }

  return NextResponse.redirect(`https://${WWW_HOST}${pathname}${search}`, 308);
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)',
  ],
};
