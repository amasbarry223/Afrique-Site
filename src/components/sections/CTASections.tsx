"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface PartnershipCTAProps {
  title?: string;
  description?: string;
  buttonText?: string;
  buttonHref?: string;
}

export function PartnershipCTA({
  title = "Explorez les horizons du partenariat",
  description = "Collaborons ensemble pour former vos leaders et transformer vos institutions.",
  buttonText = "Contactez-nous",
  buttonHref = "/contact",
}: PartnershipCTAProps) {
  return (
    <section className="py-16 lg:py-20 bg-gradient-to-br from-card via-card to-muted/50 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-[#C9A227]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#1A7A8A]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col lg:flex-row items-center justify-between gap-6 max-w-4xl mx-auto"
        >
          <div className="text-center lg:text-left">
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-2">
              {title}
            </h2>
            <p className="text-muted-foreground max-w-lg">{description}</p>
          </div>
          <Button
            size="lg"
            className="bg-[#1A7A8A] hover:bg-[#1A7A8A]/90 text-white px-8 whitespace-nowrap active:scale-[0.98] shadow-lg shadow-[#1A7A8A]/20"
            asChild
          >
            <Link href={buttonHref}>{buttonText}</Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}

interface ContactTeaserProps {
  email?: string;
}

export function ContactTeaser({ email = "contact@ias-africa.com" }: ContactTeaserProps) {
  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto"
        >
          <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-4">
            Prêt à transformer votre organisation ?
          </h2>
          <p className="text-muted-foreground mb-6">
            Contactez-nous à{" "}
            <a 
              href={`mailto:${email}`} 
              className="text-[#C9A227] hover:text-[#1A7A8A] focus:outline-none focus-visible:text-[#1A7A8A] font-medium transition-colors"
            >
              {email}
            </a>
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              variant="outline"
              size="lg"
              className="border-[#C9A227] text-[#C9A227] hover:bg-[#C9A227]/10 px-8"
              asChild
            >
              <Link href="/services">
                Découvrir nos services
              </Link>
            </Button>
            <Button
              size="lg"
              className="bg-[#1A7A8A] hover:bg-[#1A7A8A]/90 text-white px-8 active:scale-[0.98]"
              asChild
            >
              <Link href="/contact">Nous contacter</Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

interface ReadyToStartCTAProps {
  title?: string;
  description?: string;
  buttonText?: string;
  buttonHref?: string;
}

export function ReadyToStartCTA({
  title = "Prêt à démarrer ?",
  description = "Notre équipe vous répond sous 48h. Parlons de votre projet.",
  buttonText = "Accéder au formulaire",
  buttonHref = "/contact",
}: ReadyToStartCTAProps) {
  return (
    <section className="py-16 lg:py-24 bg-muted/50">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto text-center bg-gradient-to-br from-[#1A7A8A]/10 via-card to-[#C9A227]/5 border border-border rounded-2xl p-8 lg:p-12 shadow-sm"
        >
          <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-3">
            {title}
          </h2>
          <p className="text-muted-foreground mb-6">
            {description}
          </p>
          <Button
            size="lg"
            className="bg-[#1A7A8A] hover:bg-[#1A7A8A]/90 text-white px-8 active:scale-[0.98]"
            asChild
          >
            <Link href={buttonHref}>{buttonText}</Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}

interface BridgeCTAProps {
  title?: string;
  description?: string;
  buttonText?: string;
  buttonHref?: string;
}

export function BridgeCTA({
  title = "Découvrez nos services",
  description = "Explorez notre offre complète de formation, coaching et accompagnement stratégique.",
  buttonText = "Voir nos services",
  buttonHref = "/services",
}: BridgeCTAProps) {
  return (
    <section className="py-10 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-between gap-5 p-5 bg-card border border-border rounded-xl max-w-3xl mx-auto"
        >
          <div className="text-center sm:text-left">
            <h3 className="text-base font-semibold text-foreground">{title}</h3>
            <p className="text-muted-foreground text-sm">{description}</p>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="border-[#C9A227] text-[#C9A227] hover:bg-[#C9A227]/10 whitespace-nowrap"
            asChild
          >
            <Link href={buttonHref}>{buttonText}</Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
