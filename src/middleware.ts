import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname === '/cancel' || request.nextUrl.pathname === '/success') {
    const headers = new Headers(request.headers);
    
    if (headers.get('origin') === 'null') {
      headers.delete('origin');
      headers.set('origin', request.nextUrl.origin);
    }

    return NextResponse.next({
      request: {
        headers
      }
    });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/cancel', '/success']
};