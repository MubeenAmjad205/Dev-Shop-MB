import Link from 'next/link';
import type { FC } from 'react';
import React from 'react';
import { RiMicrosoftLoopFill } from 'react-icons/ri';
import globalConfig from '@/core/config/global.json';

interface LogoProps {
  className?: string;
}

const Logo: FC<LogoProps> = ({ className = 'hidden' }) => {
  return (
    <Link className="flex cursor-pointer items-center gap-2" href="/">
      <RiMicrosoftLoopFill className="text-3xl text-primary" />{' '}
      <span className={`${className} text-2xl font-bold`}>{globalConfig.brandName}</span>
    </Link>
  );
};

export default Logo;
