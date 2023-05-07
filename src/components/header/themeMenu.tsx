import ThemeIcon from '../svg/themeIcon';
import { useEffect, useRef, useState } from 'react';
import { useLocalStorage } from '@/helpers/hooks';
import Dropdown from '../dropdown';

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
    <Dropdown>
      <Dropdown.Button className="btn-icon h-12 w-12">
        <ThemeIcon icon={colorScheme} activeTheme={colorScheme} />
      </Dropdown.Button>

      <Dropdown.Menu>
        <Dropdown.Option
          className="flex items-center justify-end"
          disabled={theme === 'light'}
          data-current={theme === 'light'}
          onClick={() => setTheme('light')}
        >
          <div className="h-10 p-1">
            <ThemeIcon icon="light" activeTheme={colorScheme} />
          </div>
          Lightmode
        </Dropdown.Option>
        <Dropdown.Option
          className="flex items-center justify-end"
          disabled={theme === 'dark'}
          data-current={theme === 'dark'}
          onClick={() => setTheme('dark')}
        >
          <div className="h-10 p-1">
            <ThemeIcon icon="dark" activeTheme={colorScheme} />
          </div>
          Darkmode
        </Dropdown.Option>
        <Dropdown.Option
          className="flex items-center justify-end"
          disabled={theme === 'system'}
          data-current={theme === 'system'}
          onClick={() => setTheme('system')}
        >
          <div className="h-10 p-1">
            <ThemeIcon icon={systemTheme} activeTheme={colorScheme} />
          </div>
          Use system default
        </Dropdown.Option>
      </Dropdown.Menu>
    </Dropdown>
  );
}
