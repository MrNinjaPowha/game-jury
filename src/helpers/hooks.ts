import { useEffect, useState } from 'react';

function useLocalStorage<T>(key: string, fallbackValue: T) {
  const [hasLoaded, setHasLoaded] = useState(false);
  const [value, setValue] = useState(fallbackValue);

  useEffect(() => {
    const stored = localStorage.getItem(key);

    setValue(stored ? JSON.parse(stored) : fallbackValue);
    setHasLoaded(true);
  }, [fallbackValue, key]);

  useEffect(() => {
    if (hasLoaded) {
      localStorage.setItem(key, JSON.stringify(value));
    }
  }, [key, value, hasLoaded]);

  return [value, setValue] as const;
}

export { useLocalStorage };
