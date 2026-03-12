"use client";

/**
 * Composant Accordion générique et réutilisable
 * Remplace les implémentations dupliquées de ServiceAccordion et FAQAccordion
 */

import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface AccordionItemProps {
  /** ID unique pour l'accessibilité */
  id: string;
  /** Contenu de l'en-tête */
  header: React.ReactNode;
  /** Contenu du corps (affiché quand ouvert) */
  children: React.ReactNode;
  /** État d'ouverture */
  isOpen: boolean;
  /** Callback au clic sur l'en-tête */
  onToggle: () => void;
  /** Icône optionnelle à gauche du titre */
  icon?: React.ReactNode;
  /** Délai d'animation pour l'entrée */
  animationDelay?: number;
  /** Classes CSS additionnelles pour le conteneur */
  className?: string;
}

export function AccordionItem({
  id,
  header,
  children,
  isOpen,
  onToggle,
  icon,
  animationDelay = 0,
  className,
}: AccordionItemProps) {
  const headerId = `accordion-header-${id}`;
  const contentId = `accordion-content-${id}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: animationDelay }}
      className={cn(
        "bg-card border border-border rounded-xl overflow-hidden",
        className
      )}
    >
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={contentId}
        id={headerId}
        className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-muted/50 transition-colors focus:outline-none focus-visible:bg-muted/50 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#C9A227]"
      >
        <div className="flex items-center gap-4">
          {icon && <span className="text-3xl" aria-hidden="true">{icon}</span>}
          <span className="text-foreground font-medium">{header}</span>
        </div>
        <ChevronDown
          className={cn(
            "text-[#C9A227] transition-transform duration-300 flex-shrink-0",
            isOpen && "rotate-180"
          )}
          size={20}
          aria-hidden="true"
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            id={contentId}
            role="region"
            aria-labelledby={headerId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-4 pt-2 border-t border-border">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ============================================
// Variants spécifiques
// ============================================

interface FAQAccordionItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
  index: number;
}

export function FAQAccordionItem({
  question,
  answer,
  isOpen,
  onToggle,
  index,
}: FAQAccordionItemProps) {
  return (
    <AccordionItem
      id={`faq-${index}`}
      header={question}
      isOpen={isOpen}
      onToggle={onToggle}
      animationDelay={index * 0.1}
    >
      <p className="text-muted-foreground">{answer}</p>
    </AccordionItem>
  );
}

interface ServiceAccordionItemProps {
  service: {
    icon: string;
    title: string;
    description: string;
    details?: {
      objectifs: string[];
      publicCible: string;
      format: string;
      livrables: string[];
    };
  };
  isOpen: boolean;
  onToggle: () => void;
  index: number;
}

export function ServiceAccordionItem({
  service,
  isOpen,
  onToggle,
  index,
}: ServiceAccordionItemProps) {
  return (
    <AccordionItem
      id={`service-${index}`}
      header={
        <h3 className="text-lg font-semibold text-foreground">{service.title}</h3>
      }
      icon={service.icon}
      isOpen={isOpen}
      onToggle={onToggle}
      animationDelay={index * 0.05}
    >
      <ServiceAccordionContent service={service} />
    </AccordionItem>
  );
}

// Composant interne pour le contenu détaillé des services
import { CheckCircle, Users, Clock, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

function ServiceAccordionContent({ service }: { service: ServiceAccordionItemProps["service"] }) {
  if (!service.details) {
    return <p className="text-muted-foreground">{service.description}</p>;
  }

  const { details } = service;

  return (
    <>
      <p className="text-muted-foreground mb-6">{service.description}</p>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Objectifs */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-[#C9A227] font-medium">
            <CheckCircle size={18} aria-hidden="true" />
            <span>Objectifs</span>
          </div>
          <ul className="space-y-2">
            {details.objectifs.map((obj, i) => (
              <li key={i} className="text-muted-foreground text-sm flex items-start gap-2">
                <span className="text-[#1A7A8A] mt-1" aria-hidden="true">•</span>
                {obj}
              </li>
            ))}
          </ul>
        </div>

        {/* Public cible */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-[#C9A227] font-medium">
            <Users size={18} aria-hidden="true" />
            <span>Public cible</span>
          </div>
          <p className="text-muted-foreground text-sm">{details.publicCible}</p>
        </div>

        {/* Format */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-[#C9A227] font-medium">
            <Clock size={18} aria-hidden="true" />
            <span>Format</span>
          </div>
          <p className="text-muted-foreground text-sm">{details.format}</p>
        </div>

        {/* Livrables */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-[#C9A227] font-medium">
            <FileText size={18} aria-hidden="true" />
            <span>Livrables</span>
          </div>
          <ul className="space-y-2">
            {details.livrables.map((liv, i) => (
              <li key={i} className="text-muted-foreground text-sm flex items-start gap-2">
                <span className="text-[#1A7A8A] mt-1" aria-hidden="true">•</span>
                {liv}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* CTAs */}
      <div className="flex flex-col sm:flex-row gap-3 mt-6 pt-6 border-t border-border">
        <Button
          className="bg-[#1A7A8A] hover:bg-[#1A7A8A]/90 text-white active:scale-[0.98]"
          asChild
        >
          <Link href="/contact">Obtenir un devis</Link>
        </Button>
        <Button
          variant="outline"
          className="border-[#C9A227] text-[#C9A227] hover:bg-[#C9A227]/10"
          asChild
        >
          <Link href="/contact">Planifier un échange</Link>
        </Button>
      </div>
    </>
  );
}
