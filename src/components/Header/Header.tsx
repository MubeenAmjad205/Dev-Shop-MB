import type { FC } from 'react';
import React from 'react';

import MainNav from './MainNav';
import TopNav from './TopNav';

export interface HeaderProps {}

const Header: FC<HeaderProps> = () => {
  return (
    <div className="nc-Header sticky inset-x-0 top-0 z-50 w-full border-b border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 transition-colors">
      <TopNav />
      <MainNav />
    </div>
  );
};

export default Header;
