import React from 'react';
import { MdAdd, MdEdit, MdDelete } from 'react-icons/md';
import shopifyAdminClient from '@/lib/shopifyAdminClient';
import { GET_ADMIN_PRODUCTS } from '@/queries/shopifyAdminQueries';

export const dynamic = 'force-dynamic'; // Prevent caching for real-time inventory

export default async function AdminProducts() {
  let products = [];
  let errorMsg = null;

  try {
    if (!process.env.SHOPIFY_ADMIN_ACCESS_TOKEN) {
      errorMsg = "SHOPIFY_ADMIN_ACCESS_TOKEN is not configured in your environment variables. Please add it to view real inventory.";
    } else {
      const { data } = await shopifyAdminClient.query({
        query: GET_ADMIN_PRODUCTS,
        variables: { first: 20 },
        fetchPolicy: 'no-cache'
      });
      products = data?.products?.edges || [];
    }
  } catch (error: any) {
    console.error("Admin API Error:", error);
    errorMsg = "Failed to fetch products from Shopify Admin API. Verify your API token and permissions.";
  }

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-neutral-900 dark:text-white">Product Management</h1>
          <p className="text-neutral-500 mt-1">Manage your storefront inventory and pricing via Shopify Admin API.</p>
        </div>
        <button className="flex items-center gap-2 bg-primary text-white px-5 py-3 rounded-full font-medium hover:bg-orange-600 transition-colors shadow-md">
          <MdAdd className="text-xl" />
          Add Product
        </button>
      </div>

      {errorMsg ? (
        <div className="bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 p-6 rounded-2xl">
          <h3 className="font-bold text-lg mb-2">Configuration Required</h3>
          <p>{errorMsg}</p>
        </div>
      ) : (
        <div className="bg-white dark:bg-neutral-900 rounded-2xl shadow-sm border border-neutral-100 dark:border-neutral-800 overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-neutral-50 dark:bg-neutral-800/50 border-b border-neutral-200 dark:border-neutral-800">
                <th className="p-4 font-semibold text-sm text-neutral-600 dark:text-neutral-400">Product</th>
                <th className="p-4 font-semibold text-sm text-neutral-600 dark:text-neutral-400">Type</th>
                <th className="p-4 font-semibold text-sm text-neutral-600 dark:text-neutral-400">Status</th>
                <th className="p-4 font-semibold text-sm text-neutral-600 dark:text-neutral-400">Price (First Variant)</th>
                <th className="p-4 font-semibold text-sm text-neutral-600 dark:text-neutral-400">Inventory Total</th>
                <th className="p-4 font-semibold text-sm text-neutral-600 dark:text-neutral-400 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800">
              {products.length === 0 ? (
                 <tr><td colSpan={6} className="p-8 text-center text-neutral-500">No products found.</td></tr>
              ) : products.map(({ node: product }: any) => {
                const firstVariant = product.variants?.edges[0]?.node;
                
                return (
                  <tr key={product.id} className="hover:bg-neutral-50 dark:hover:bg-neutral-800/20 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-neutral-100 dark:bg-neutral-800 rounded-lg overflow-hidden flex-shrink-0">
                          {product.featuredImage && (
                            <img src={product.featuredImage.url} alt={product.title} className="w-full h-full object-cover" />
                          )}
                        </div>
                        <span className="font-medium text-sm line-clamp-2 max-w-[250px]">{product.title}</span>
                      </div>
                    </td>
                    <td className="p-4 text-sm text-neutral-500">{product.productType || 'Uncategorized'}</td>
                    <td className="p-4">
                      <span className={`text-xs px-2 py-1 rounded-full font-medium ${product.status === 'ACTIVE' ? 'bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-500' : 'bg-neutral-200 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-400'}`}>
                        {product.status}
                      </span>
                    </td>
                    <td className="p-4 font-medium text-sm">
                      ${firstVariant?.price || '0.00'}
                    </td>
                    <td className="p-4">
                      <span className={`text-xs px-2 py-1 rounded-full font-medium ${product.totalInventory > 10 ? 'bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-500' : 'bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-500'}`}>
                        {product.totalInventory} in stock
                      </span>
                    </td>
                    <td className="p-4 flex justify-end gap-2">
                      <button className="p-2 text-neutral-400 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-500/10 rounded-lg transition-colors">
                        <MdEdit className="text-xl" />
                      </button>
                      <button className="p-2 text-neutral-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors">
                        <MdDelete className="text-xl" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
