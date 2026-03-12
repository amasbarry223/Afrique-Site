/**
 * Hook personnalisé pour gérer l'état des accordéons
 * Permet un seul accordéon ouvert à la fois (mode exclusif)
 */

import { useState, useCallback } from "react";

export function useAccordion(initialOpen: number | null = null) {
  const [openIndex, setOpenIndex] = useState<number | null>(initialOpen);

  const toggle = useCallback((index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  }, []);

  const isOpen = useCallback(
    (index: number) => openIndex === index,
    [openIndex]
  );

  const close = useCallback(() => {
    setOpenIndex(null);
  }, []);

  return {
    openIndex,
    toggle,
    isOpen,
    close,
  };
}
