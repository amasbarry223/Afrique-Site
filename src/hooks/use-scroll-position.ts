/**
 * Hook personnalisé pour suivre la position de scroll
 * Utilisé pour la navbar sticky
 */

import { useState, useEffect } from "react";

interface UseScrollPositionOptions {
  threshold?: number;
}

export function useScrollPosition(options: UseScrollPositionOptions = {}) {
  const { threshold = 20 } = options;
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > threshold);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [threshold]);

  return { isScrolled };
}
