import { NextResponse } from 'next/server';
import shopifyClient from '@/lib/shopifyClient';
import { CUSTOMER_CREATE, CUSTOMER_ACCESS_TOKEN_CREATE } from '@/queries/shopifyQueries';
import { cookies } from 'next/headers';

export async function POST(req: Request) {
  try {
    const { firstName, lastName, email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
    }

    // 1. Create the customer
    const { data: createData } = await shopifyClient.mutate({
      mutation: CUSTOMER_CREATE,
      variables: {
        input: { firstName, lastName, email, password },
      },
    });

    const createPayload = createData.customerCreate;
    if (createPayload.customerUserErrors && createPayload.customerUserErrors.length > 0) {
      return NextResponse.json(
        { error: createPayload.customerUserErrors[0].message },
        { status: 400 }
      );
    }

    // 2. Login the customer right away
    const { data: loginData } = await shopifyClient.mutate({
      mutation: CUSTOMER_ACCESS_TOKEN_CREATE,
      variables: {
        input: { email, password },
      },
    });

    const loginPayload = loginData.customerAccessTokenCreate;
    if (loginPayload.customerAccessToken) {
      const token = loginPayload.customerAccessToken.accessToken;
      const expiresAt = loginPayload.customerAccessToken.expiresAt;

      // Set HttpOnly cookie
      ;(await cookies()).set({
        name: 'customerAccessToken',
        value: token,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        expires: new Date(expiresAt),
      });

      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json({ success: true, warning: 'Created but could not auto-login' });
    }
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}
