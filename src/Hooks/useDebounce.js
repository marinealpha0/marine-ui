import React,  { useEffect } from 'react';

/**
 * A custom hook that debounces a value.
 * @param value - The value to debounce.
 * @param delay - The delay in milliseconds.
 * @returns The debounced value.
 */
export const useDebounce = (value, delay = 500) => {
  const [debouncedValue, setDebouncedValue] = React.useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};