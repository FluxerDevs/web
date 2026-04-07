import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import redirectsConfig from './redirects.json';

const APEX_HOST = 'fluxer.games';
const WWW_HOST = 'www.fluxer.games';
const ROOT_REDIRECT_URL = 'https://fluxer.gg/eDfgY33P';
const EMBED_ROOT_PATH = '/embed-root';

const PREVIEW_BOT_PATTERN =
  /(discordbot|whatsapp|twitterbot|slackbot|linkedinbot|facebookexternalhit|telegrambot|skypeuripreview|fluxerbot)/i;

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
    const userAgent = request.headers.get('user-agent') ?? '';
    if (PREVIEW_BOT_PATTERN.test(userAgent)) {
      return NextResponse.rewrite(new URL(EMBED_ROOT_PATH, request.url));
    }

    return NextResponse.redirect(new URL(ROOT_REDIRECT_URL), 308);
  }

  // Match only single-segment aliases: /cookie, /c, /whatever
  const rawAlias = pathname.replace(/^\/+|\/+$/g, '');
  if (rawAlias && !rawAlias.includes('/')) {
    let normalizedAlias = rawAlias;

    try {
      normalizedAlias = decodeURIComponent(rawAlias);
    } catch {
      normalizedAlias = rawAlias;
    }

    const result = aliasToResult.get(normalizedAlias.toLowerCase());
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
