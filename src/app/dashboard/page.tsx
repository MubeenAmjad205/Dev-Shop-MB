import React from 'react';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import shopifyClient from '@/lib/shopifyClient';
import { GET_CUSTOMER } from '@/queries/shopifyQueries';
import ButtonPrimary from '@/shared/Button/ButtonPrimary';
import ButtonSecondary from '@/shared/Button/ButtonSecondary';

async function getCustomerData(token: string) {
  try {
    const { data } = await shopifyClient.query({
      query: GET_CUSTOMER,
      variables: { customerAccessToken: token },
      fetchPolicy: 'no-cache',
    });
    return data.customer;
  } catch (error) {
    console.error('Failed to fetch customer:', error);
    return null;
  }
}

export default async function DashboardPage() {
  const token = cookies().get('customerAccessToken')?.value;

  if (!token) {
    redirect('/login');
  }

  const customer = await getCustomerData(token);

  if (!customer) {
    // Token might be expired or invalid
    redirect('/login');
  }

  return (
    <div className="container py-16 lg:pb-28 lg:pt-20">
      <div className="mb-14">
        <h2 className="block text-2xl font-medium sm:text-3xl lg:text-4xl">
          Welcome back, {customer.firstName || 'User'}!
        </h2>
      </div>
      <hr className="my-10 border-neutral-300 xl:my-12" />
      <div className="flex flex-col lg:flex-row">
        {/* Sidebar */}
        <div className="w-full shrink-0 lg:w-1/4">
          <ul className="space-y-4">
            <li>
              <a href="#orders" className="block font-medium text-primary">
                Order History
              </a>
            </li>
            <li>
              <a href="#profile" className="block text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100">
                Profile Information
              </a>
            </li>
            <li>
              <form action="/api/auth/logout" method="POST">
                <button type="submit" className="text-red-500 hover:text-red-700">
                  Logout
                </button>
              </form>
            </li>
          </ul>
        </div>
        
        {/* Main Content */}
        <div className="mt-10 flex-1 lg:ml-10 lg:mt-0 xl:ml-16">
          <div className="mb-10">
            <h3 className="text-xl font-semibold mb-6" id="profile">Profile Information</h3>
            <div className="bg-neutral-50 dark:bg-neutral-800 p-6 rounded-2xl border border-neutral-200 dark:border-neutral-700">
              <p><strong>Name:</strong> {customer.firstName} {customer.lastName}</p>
              <p className="mt-2"><strong>Email:</strong> {customer.email}</p>
              <p className="mt-2"><strong>Phone:</strong> {customer.phone || 'Not provided'}</p>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-6" id="orders">Order History</h3>
            {customer.orders?.edges?.length > 0 ? (
              <div className="space-y-6">
                {customer.orders.edges.map((edge: any) => {
                  const order = edge.node;
                  return (
                    <div key={order.id} className="bg-neutral-50 dark:bg-neutral-800 p-6 rounded-2xl border border-neutral-200 dark:border-neutral-700">
                      <div className="flex justify-between items-center mb-4">
                        <h4 className="font-semibold text-lg">Order #{order.orderNumber}</h4>
                        <span className="text-sm text-neutral-500">{new Date(order.processedAt).toLocaleDateString()}</span>
                      </div>
                      <div className="divide-y divide-neutral-200 dark:divide-neutral-700">
                        {order.lineItems.edges.map((lineEdge: any, i: number) => (
                          <div key={i} className="py-3 flex justify-between">
                            <span>{lineEdge.node.title} (x{lineEdge.node.quantity})</span>
                          </div>
                        ))}
                      </div>
                      <div className="mt-4 text-right">
                        <strong>Total: {order.totalPrice.amount} {order.totalPrice.currencyCode}</strong>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="bg-neutral-50 dark:bg-neutral-800 p-6 rounded-2xl border border-neutral-200 dark:border-neutral-700 text-center">
                <p className="text-neutral-500 mb-4">You haven't placed any orders yet.</p>
                <ButtonPrimary href="/products">Start Shopping</ButtonPrimary>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
