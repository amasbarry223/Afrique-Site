"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ReadyToStartCTA } from "@/components/sections/CTASections";
import Link from "next/link";
import ServiceCard from "@/components/sections/ServiceCard";
import { ServiceAccordionItem } from "@/components/ui/accordion-card";
import { useAccordion } from "@/hooks";

// Import des données centralisées
import { services } from "@/data/services";

export default function ServicesPage() {
  const { openIndex, toggle, isOpen } = useAccordion();

  return (
    <>
      {/* Hero Section */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Une architecture simple :{" "}
              <span className="text-gold-gradient">offres → détails → devis</span>
            </h1>
            <p className="text-muted-foreground text-lg">
              Explorez nos services d&apos;accompagnement et trouvez la solution adaptée à vos besoins. 
              Chaque prestation est conçue pour un impact mesurable.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Personalization Banner */}
      <section className="py-8 bg-gradient-to-r from-[#C9A227]/10 to-[#1A7A8A]/10 border-y border-border">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-between gap-4"
          >
            <p className="text-foreground font-medium">
              💡 Besoin d&apos;un parcours personnalisé ?
            </p>
            <Button
              variant="outline"
              className="border-[#C9A227] text-[#C9A227] hover:bg-[#C9A227]/10"
              asChild
            >
              <Link href="/contact">
                Parler de mon besoin
                <ArrowRight className="ml-2" size={16} />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Services Overview Grid */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <ServiceCard 
                key={service.id} 
                icon={service.icon} 
                title={service.title} 
                description={service.description}
                href="/services"
                index={index} 
              />
            ))}
          </div>
        </div>
      </section>

      {/* Detailed Accordion Section */}
      <section className="py-16 lg:py-20 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-3">
              Détails de nos prestations
            </h2>
            <p className="text-muted-foreground">
              Cliquez sur chaque service pour découvrir les détails de notre offre
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto space-y-4">
            {services.map((service, index) => (
              <ServiceAccordionItem
                key={service.id}
                service={service}
                isOpen={isOpen(index)}
                onToggle={() => toggle(index)}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Ready to Start CTA */}
      <ReadyToStartCTA />
    </>
  );
}
