import ThemeIcon from '../svg/themeIcon';
import { useEffect, useRef, useState } from 'react';
import { useLocalStorage } from '@/helpers/hooks';

export default function ThemeMenu() {
  const dropdown = useRef<HTMLDivElement>(null);
  const [expanded, setExpanded] = useState<boolean>(false);

  const [systemTheme, setSystemTheme] = useState<string>('dark');
  const [colorScheme, setColorScheme] = useState<string>('dark');
  const [theme, setTheme] = useLocalStorage<string>('theme', 'system');

  useEffect(() => {
    setSystemTheme(window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

    if (theme === 'dark' || (theme === 'system' && systemTheme === 'dark')) {
      document.querySelector('html')?.classList.add('dark');
      setColorScheme('dark');
    } else {
      document.querySelector('html')?.classList.remove('dark');
      setColorScheme('light');
    }

    setExpanded(false);
  }, [theme, systemTheme]);

  function handleBlur(event: React.FocusEvent<HTMLDivElement, HTMLButtonElement>) {
    let blurred = true;
    dropdown.current?.childNodes.forEach((child) => {
      if (child === event.relatedTarget) {
        blurred = false;
      }
    });

    setExpanded(!blurred);
  }

  return (
    <div className="relative" onBlur={handleBlur}>
      <button
        className="h-12 w-12 rounded-full bg-black bg-opacity-0 p-2 transition-all duration-100 hover:bg-opacity-5 focus-visible:bg-opacity-5 active:bg-opacity-10 dark:bg-white dark:bg-opacity-0 dark:hover:bg-opacity-5 dark:focus-visible:bg-opacity-5 dark:active:bg-opacity-10"
        onClick={() => setExpanded(!expanded)}
      >
        <ThemeIcon icon={colorScheme} activeTheme={colorScheme} />
      </button>

      <div
        className="bg absolute right-0 z-10 mt-2 max-w-max rounded-md border border-gray-300 bg-gray-200 py-2 shadow-md transition-opacity duration-150 data-[expanded=false]:opacity-0 dark:border-slate-700 dark:bg-slate-800"
        data-expanded={expanded}
        ref={dropdown}
      >
        <button
          className="flex w-full min-w-max items-center justify-end bg-black bg-opacity-0 p-4 py-1 text-right data-[current=false]:hover:bg-opacity-5 data-[current=false]:focus-visible:bg-opacity-5 data-[current=false]:active:bg-opacity-10 dark:bg-white dark:bg-opacity-0"
          disabled={theme === 'light' || !expanded}
          data-current={theme === 'light'}
          onClick={() => setTheme('light')}
        >
          <div className="h-10 p-1">
            <ThemeIcon icon="light" activeTheme={colorScheme} />
          </div>
          Lightmode
        </button>
        <button
          className="flex w-full min-w-max items-center justify-end bg-black bg-opacity-0 p-4 py-1 data-[current=false]:hover:bg-opacity-5 data-[current=false]:focus-visible:bg-opacity-5 data-[current=false]:active:bg-opacity-10 dark:bg-white dark:bg-opacity-0"
          disabled={theme === 'dark' || !expanded}
          data-current={theme === 'dark'}
          onClick={() => setTheme('dark')}
        >
          <div className="h-10 p-1">
            <ThemeIcon icon="dark" activeTheme={colorScheme} />
          </div>
          Darkmode
        </button>
        <button
          className="flex w-full min-w-max items-center justify-end bg-black bg-opacity-0 p-4 py-1 text-right data-[current=false]:hover:bg-opacity-5 data-[current=false]:focus-visible:bg-opacity-5 data-[current=false]:active:bg-opacity-10 dark:bg-white dark:bg-opacity-0"
          disabled={theme === 'system' || !expanded}
          data-current={theme === 'system'}
          onClick={() => setTheme('system')}
        >
          <div className="h-10 p-1">
            <ThemeIcon icon={systemTheme} activeTheme={colorScheme} />
          </div>
          Use system default
        </button>
      </div>
    </div>
  );
}
