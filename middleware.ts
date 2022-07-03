import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { redis } from './lib/redis';

const getValidUrl = (link: string) => {
  if (link.indexOf('http://') === 0 || link.indexOf('https://') === 0) {
    return link;
  } else {
    return `https://${link}`;
  }
};

export async function middleware(req: NextRequest) {
  const substr = req.nextUrl.pathname.substring(1);

  if (substr && /^[A-Za-z0-9_-]*$/.test(substr)) {
    if (substr.length === 7) {
      const longUrl: string | null = await redis.hget('links', substr);
      if (longUrl) {
        const validUrl = getValidUrl(longUrl);
        return NextResponse.redirect(validUrl);
      }
    }
    return NextResponse.redirect(req.nextUrl.origin);
  }
}
