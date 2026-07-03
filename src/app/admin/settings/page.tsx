import React from 'react';

export default function AdminSettings() {
  return (
    <div className="p-8 max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-neutral-900 dark:text-white">Store Settings</h1>
        <p className="text-neutral-500 mt-1">Configure global store preferences and admin access.</p>
      </div>

      <div className="bg-white dark:bg-neutral-900 rounded-2xl shadow-sm border border-neutral-100 dark:border-neutral-800 p-6 space-y-6">
        <div>
          <h3 className="text-lg font-bold mb-4 border-b border-neutral-100 dark:border-neutral-800 pb-2">General Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Store Name</label>
              <input type="text" defaultValue="Dev Shop MB" className="w-full bg-surface dark:bg-black border border-neutral-200 dark:border-neutral-700 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary/50" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Contact Email</label>
              <input type="email" defaultValue="admin@devshopmb.com" className="w-full bg-surface dark:bg-black border border-neutral-200 dark:border-neutral-700 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary/50" />
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-bold mb-4 border-b border-neutral-100 dark:border-neutral-800 pb-2">Shopify API Configuration</h3>
          <div className="space-y-4">
             <div className="space-y-2">
              <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Storefront API Access Token</label>
              <input type="password" defaultValue="************************" className="w-full bg-surface dark:bg-black border border-neutral-200 dark:border-neutral-700 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary/50" />
            </div>
             <div className="space-y-2">
              <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Admin API Access Token</label>
              <input type="password" placeholder="Enter Admin API Token..." className="w-full bg-surface dark:bg-black border border-neutral-200 dark:border-neutral-700 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary/50" />
              <p className="text-xs text-neutral-500">Required for inventory management and write access.</p>
            </div>
          </div>
        </div>

        <div className="pt-4 flex justify-end">
          <button className="bg-primary text-white px-6 py-3 rounded-full font-medium hover:bg-orange-600 transition-colors shadow-md">
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );
}
