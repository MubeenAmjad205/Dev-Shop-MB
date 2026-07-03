import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function proxy(request: NextRequest) {
  const isAdminRoute = request.nextUrl.pathname.startsWith('/admin');
  const isLoginRoute = request.nextUrl.pathname === '/admin/login';
  
  // Call the Better Auth session endpoint
  let session = null;
  try {
    const sessionRes = await fetch(`${request.nextUrl.origin}/api/auth/get-session`, {
      headers: {
        cookie: request.headers.get('cookie') || '',
      },
    });
    if (sessionRes.ok) {
      session = await sessionRes.json();
    }
  } catch (error) {
    console.error('Proxy session check failed', error);
  }

  // Route Protection Logic
  if (isAdminRoute && !isLoginRoute) {
    if (!session) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  if (isLoginRoute && session) {
    return NextResponse.redirect(new URL('/admin/dashboard', request.url));
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: '/admin/:path*',
};
