import { NextResponse } from 'next/server';
import shopifyClient from '@/lib/shopifyClient';
import { CUSTOMER_ACCESS_TOKEN_CREATE } from '@/queries/shopifyQueries';
import { cookies } from 'next/headers';

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
    }

    const { data } = await shopifyClient.mutate({
      mutation: CUSTOMER_ACCESS_TOKEN_CREATE,
      variables: {
        input: { email, password },
      },
    });

    const payload = data.customerAccessTokenCreate;

    if (payload.customerUserErrors && payload.customerUserErrors.length > 0) {
      return NextResponse.json(
        { error: payload.customerUserErrors[0].message },
        { status: 401 }
      );
    }

    const token = payload.customerAccessToken.accessToken;
    const expiresAt = payload.customerAccessToken.expiresAt;

    // Set HttpOnly cookie
    cookies().set({
      name: 'customerAccessToken',
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      expires: new Date(expiresAt),
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}
