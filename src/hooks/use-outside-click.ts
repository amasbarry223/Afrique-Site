/**
 * Hook pour détecter les clics en dehors d'un élément
 */

import { useEffect, useRef } from "react";

export function useOutsideClick<T extends HTMLElement>(
  callback: () => void,
  isActive: boolean = true
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    if (!isActive) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [callback, isActive]);

  return ref;
}
