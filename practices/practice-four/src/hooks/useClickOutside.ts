import { useCallback } from 'react';

/**
 * React 19 ref-style useClickOutside
 * Returns a ref callback that handles click outside behavior and cleans up.
 */
export const useClickOutside = (callback: () => void) => {
  const refCallback = useCallback(
    (node: HTMLElement | null) => {
      if (!node) return;

      const handleClick = (event: MouseEvent) => {
        if (!node.contains(event.target as Node)) {
          callback();
        }
      };

      document.addEventListener('mousedown', handleClick);

      // Cleanup function for ref
      return () => {
        document.removeEventListener('mousedown', handleClick);
      };
    },

    [callback]
  );

  return refCallback;
};
