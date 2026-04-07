import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import redirectsConfig from './redirects.json';

const APEX_HOST = 'fluxer.games';
const WWW_HOST = 'www.fluxer.games';
const ROOT_REDIRECT_URL = 'https://fluxer.gg/eDfgY33P';

type RedirectEntry = {
  aliases?: string[];
  result: string;
};

const aliasToResult = new Map<string, string>();

for (const [key, entry] of Object.entries(
  redirectsConfig as Record<string, RedirectEntry>
)) {
  if (!entry?.result) {
    continue;
  }

  aliasToResult.set(key.toLowerCase(), entry.result);

  for (const alias of entry.aliases ?? []) {
    aliasToResult.set(alias.toLowerCase(), entry.result);
  }
}

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

  // Match only single-segment aliases: /cookie, /c, /whatever
  const maybeAlias = pathname.slice(1);
  if (maybeAlias && !maybeAlias.includes('/')) {
    const result = aliasToResult.get(maybeAlias.toLowerCase());
    if (result) {
      return NextResponse.redirect(new URL(result), 308);
    }
  }

  return NextResponse.redirect(`https://${WWW_HOST}${pathname}${search}`, 308);
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)',
  ],
};
