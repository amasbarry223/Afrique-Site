"use client";

/**
 * ServiceCard - Carte de service réutilisable
 * Affiche un aperçu d'un service avec lien vers la page détaillée
 */

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

interface ServiceCardProps {
  /** Emoji ou icône représentant le service */
  icon: string;
  /** Titre du service */
  title: string;
  /** Description courte du service */
  description: string;
  /** Lien vers la page détaillée (défaut: /services) */
  href?: string;
  /** Index pour l'animation (délai progressif) */
  index?: number;
}

export default function ServiceCard({ 
  icon, 
  title, 
  description, 
  href = "/services", 
  index = 0 
}: ServiceCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className="group relative bg-card border border-border rounded-xl p-6 hover:border-[#C9A227]/50 transition-all duration-300 focus-within:border-[#C9A227]/50 shadow-sm hover:shadow-md"
    >
      {/* Icon */}
      <div className="text-4xl mb-4" aria-hidden="true">{icon}</div>
      
      {/* Title */}
      <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-[#C9A227] transition-colors">
        {title}
      </h3>
      
      {/* Description */}
      <p className="text-muted-foreground text-sm leading-relaxed mb-4">
        {description}
      </p>
      
      {/* Link */}
      <Link
        href={href}
        className="inline-flex items-center gap-2 text-[#1A7A8A] text-sm font-medium hover:gap-3 transition-all group/link focus:outline-none focus-visible:text-[#C9A227] focus-visible:underline"
      >
        <span>Voir les détails</span>
        <ArrowRight 
          size={16} 
          className="group-hover/link:translate-x-1 transition-transform" 
          aria-hidden="true"
        />
        <span className="sr-only">de {title}</span>
      </Link>

      {/* Hover gradient overlay */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-[#C9A227]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" aria-hidden="true" />
    </motion.article>
  );
}
