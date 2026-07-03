'use client';

import * as React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import ButtonCircle3 from '@/shared/Button/ButtonCircle3';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <ButtonCircle3 className="w-10 h-10 opacity-0" />;
  }

  return (
    <ButtonCircle3
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="w-10 h-10 bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-200 transition-all hover:bg-neutral-200 dark:hover:bg-neutral-700"
    >
      {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
    </ButtonCircle3>
  );
}
