// Libraries
import { useEffect, RefObject } from 'react';

/**
 * Custom hook to detect clicks outside a specified element and trigger a callback.
 *
 * @param ref - A React ref object pointing to the element to detect outside clicks on.
 * @param callback - A callback function to be called when a click outside the referenced element is detected.
 */
export const useClickOutside = (ref: RefObject<HTMLElement | null>, callback: () => void) => {
  useEffect(() => {
    // Handle clicks outside the popover to close it
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    };

    // Add an event listener to detect clicks outside the referenced element.
    document.addEventListener('mousedown', handleClickOutside);

    // Clean up the event listener when the component unmounts.
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [callback, ref]);
};
