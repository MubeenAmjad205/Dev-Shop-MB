import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MdSpaceDashboard, MdInventory, MdSettings, MdLogout } from 'react-icons/md';
import Logo from '@/shared/Logo/Logo';

const AdminSidebar = () => {
  const pathname = usePathname();

  const links = [
    { name: 'Dashboard', href: '/admin/dashboard', icon: <MdSpaceDashboard /> },
    { name: 'Products', href: '/admin/products', icon: <MdInventory /> },
    { name: 'Settings', href: '/admin/settings', icon: <MdSettings /> },
  ];

  return (
    <div className="w-64 bg-white dark:bg-neutral-900 border-r border-neutral-200 dark:border-neutral-800 h-screen flex flex-col transition-colors duration-300">
      <div className="h-20 flex items-center px-8 border-b border-neutral-200 dark:border-neutral-800">
        <Logo />
      </div>
      
      <div className="flex-1 py-8 px-4 flex flex-col gap-2">
        {links.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link 
              key={link.name} 
              href={link.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${isActive ? 'bg-primary/10 text-primary font-semibold' : 'text-neutral-500 hover:bg-neutral-100 dark:hover:bg-neutral-800'}`}
            >
              <span className="text-xl">{link.icon}</span>
              {link.name}
            </Link>
          );
        })}
      </div>

      <div className="p-4 border-t border-neutral-200 dark:border-neutral-800">
        <button className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-all duration-200">
          <MdLogout className="text-xl" />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default AdminSidebar;
