import React from 'react';
import { MdTrendingUp, MdOutlineAttachMoney, MdShoppingCart, MdPeopleOutline } from 'react-icons/md';

const StatCard = ({ title, value, icon, trend }: { title: string, value: string, icon: React.ReactNode, trend: string }) => (
  <div className="bg-white dark:bg-neutral-900 p-6 rounded-2xl shadow-sm border border-neutral-100 dark:border-neutral-800">
    <div className="flex justify-between items-start mb-4">
      <div className="text-3xl text-primary p-3 bg-primary/10 rounded-xl">{icon}</div>
      <span className="text-sm font-medium text-green-500 bg-green-50 dark:bg-green-500/10 px-2 py-1 rounded-full">{trend}</span>
    </div>
    <h3 className="text-neutral-500 text-sm font-medium">{title}</h3>
    <p className="text-3xl font-bold text-neutral-900 dark:text-white mt-1">{value}</p>
  </div>
);

export default function AdminDashboard() {
  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-neutral-900 dark:text-white">Dashboard Overview</h1>
        <p className="text-neutral-500">Welcome back, Admin</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Revenue" value="$45,231" icon={<MdOutlineAttachMoney />} trend="+12.5%" />
        <StatCard title="Active Orders" value="152" icon={<MdShoppingCart />} trend="+8.2%" />
        <StatCard title="Total Customers" value="2,405" icon={<MdPeopleOutline />} trend="+2.4%" />
        <StatCard title="Sales Growth" value="14.2%" icon={<MdTrendingUp />} trend="+4.1%" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white dark:bg-neutral-900 p-6 rounded-2xl shadow-sm border border-neutral-100 dark:border-neutral-800 h-96 flex items-center justify-center">
           <p className="text-neutral-500">Revenue Chart (Coming Soon)</p>
        </div>
        <div className="bg-white dark:bg-neutral-900 p-6 rounded-2xl shadow-sm border border-neutral-100 dark:border-neutral-800 h-96 overflow-y-auto">
          <h3 className="font-bold text-lg mb-4">Recent Orders</h3>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex justify-between items-center p-3 hover:bg-neutral-50 dark:hover:bg-neutral-800 rounded-xl transition-colors">
                <div>
                  <p className="font-medium text-sm">Order #100{i}</p>
                  <p className="text-xs text-neutral-500">2 mins ago</p>
                </div>
                <span className="font-bold text-sm">$129.00</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
