import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const isAdminRoute = pathname.startsWith('/admin') && pathname !== '/admin/login';
  const isAdminLoginRoute = pathname === '/admin/login';
  const isAuthRoute = pathname === '/login' || pathname === '/signup' || pathname === '/forgot-pass';
  const isProtectedRoute = pathname.startsWith('/checkout');
  
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
  if (isAdminRoute) {
    if (!session) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  if (isAdminLoginRoute && session) {
    return NextResponse.redirect(new URL('/admin/dashboard', request.url));
  }

  if (isProtectedRoute && !session) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (isAuthRoute && session) {
    return NextResponse.redirect(new URL('/', request.url));
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/login', '/signup', '/forgot-pass', '/checkout/:path*'],
};
