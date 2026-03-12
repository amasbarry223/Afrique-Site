"use client";

import { motion } from "framer-motion";
import { ArrowRight, CheckCircle, Phone, Target, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import ServiceCard from "@/components/sections/ServiceCard";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import { PartnershipCTA, ContactTeaser } from "@/components/sections/CTASections";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

// Import des données centralisées
import { services } from "@/data/services";

// Données spécifiques à cette page (non réutilisables)
const trustBadges = [
  "Programmes sur mesure",
  "Experts de terrain",
  "Impact mesurable",
];

export default function HomePage() {
  const [heroImageLoading, setHeroImageLoading] = useState(true);

  return (
    <>
      {/* Skip link for accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-20 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-[#C9A227] focus:text-[#0d1117] focus:rounded-lg focus:font-medium"
      >
        Aller au contenu principal
      </a>

      {/* Hero Section */}
      <section className="min-h-[90vh] relative overflow-hidden bg-background pattern-african" aria-labelledby="hero-heading">
        {/* Gradient overlays */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#1A7A8A]/5 to-transparent pointer-events-none dark:from-[#1A7A8A]/10" />
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-t from-[#C9A227]/5 to-transparent pointer-events-none" />

        <div className="container mx-auto px-4 lg:px-8 py-16 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center min-h-[70vh]">
            {/* Left Column - Text */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              {/* Eyebrow */}
              <span className="inline-block px-4 py-2 bg-[#C9A227]/10 border border-[#C9A227]/20 rounded-full text-[#C9A227] text-sm font-medium">
                PROGRAMME &amp; ACCOMPAGNEMENT
              </span>

              {/* H1 */}
              <h1 id="hero-heading" className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                Former des leaders au service du{" "}
                <span className="text-gold-gradient">développement des institutions</span>
              </h1>

              {/* Subtitle */}
              <p className="text-muted-foreground text-lg max-w-xl">
                IAS accompagne les organisations africaines dans le développement de leurs talents 
                et l&apos;optimisation de leur performance institutionnelle.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button
                  size="lg"
                  className="bg-[#1A7A8A] hover:bg-[#1A7A8A]/90 text-white px-8 active:scale-[0.98]"
                  asChild
                >
                  <Link href="/services">
                    Découvrir nos services
                    <ArrowRight className="ml-2" size={18} aria-hidden="true" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-[#C9A227] text-[#C9A227] hover:bg-[#C9A227]/10 px-8"
                  asChild
                >
                  <Link href="/contact">Contact</Link>
                </Button>
              </div>

              {/* Trust Badges */}
              <div className="flex flex-wrap gap-6 pt-8 border-t border-border">
                {trustBadges.map((badge) => (
                  <div key={badge} className="flex items-center gap-2 text-muted-foreground text-sm">
                    <CheckCircle className="text-[#C9A227]" size={16} aria-hidden="true" />
                    {badge}
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right Column - Image with floating card */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              {/* Main image */}
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-border bg-muted shadow-lg">
                {/* Loading skeleton */}
                {heroImageLoading && (
                  <div className="absolute inset-0 bg-gradient-to-br from-[#1A7A8A]/30 via-muted to-[#C9A227]/20 animate-pulse" />
                )}
                <Image
                  src="/hero-leadership.png"
                  alt="Leadership Africain - Formation et coaching"
                  fill
                  className="object-cover transition-opacity duration-500"
                  priority
                  onLoad={() => setHeroImageLoading(false)}
                />
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
              </div>

              {/* Floating Card - Hidden on mobile to avoid overlap issues */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="hidden md:block absolute -bottom-6 -left-6 lg:-left-12 bg-card border border-border rounded-xl p-6 shadow-2xl max-w-xs"
              >
                <div className="text-[#C9A227] font-semibold mb-2">
                  Accélérer la performance
                </div>
                <div className="text-muted-foreground text-sm mb-4">
                  Formations • Coaching • Conseil
                </div>
                <Button
                  size="sm"
                  className="bg-[#1A7A8A] hover:bg-[#1A7A8A]/90 text-white w-full active:scale-[0.98]"
                  asChild
                >
                  <Link href="/contact">
                    <Phone className="mr-2" size={16} aria-hidden="true" />
                    Parler à un expert
                  </Link>
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Preview Section */}
      <section id="main-content" className="py-20 lg:py-28 bg-muted/50" aria-labelledby="services-heading">
        <div className="container mx-auto px-4 lg:px-8">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <span className="text-[#C9A227] text-sm font-semibold tracking-wider uppercase">
              NOS SERVICES
            </span>
            <h2 id="services-heading" className="text-3xl lg:text-4xl font-bold text-foreground mt-3 mb-4">
              Une offre claire, modulable, orientée résultats
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Découvrez nos solutions d&apos;accompagnement conçues pour répondre aux défis 
              spécifiques des organisations africaines.
            </p>
          </motion.div>

          {/* Services Grid - Utilise les données centralisées */}
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

          {/* View All CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-center mt-12"
          >
            <Button
              size="lg"
              variant="outline"
              className="border-[#C9A227] text-[#C9A227] hover:bg-[#C9A227]/10 px-8 active:scale-[0.98]"
              asChild
            >
              <Link href="/services">
                Explorer nos services en détail
                <ArrowRight className="ml-2" size={18} aria-hidden="true" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Mission Teaser Section */}
      <section className="py-20 lg:py-28 bg-background" aria-labelledby="mission-teaser-heading">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0d1117] via-[#0d1117] to-[#1A7A8A]/20"
          >
            {/* Background pattern */}
            <div className="absolute inset-0 pattern-african opacity-30" />
            
            <div className="relative z-10 grid lg:grid-cols-2 gap-8 lg:gap-0 items-center">
              {/* Left - Content */}
              <div className="p-8 lg:p-12 xl:p-16">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-full bg-[#C9A227]/20 flex items-center justify-center">
                    <Target className="text-[#C9A227]" size={24} />
                  </div>
                  <span className="text-[#C9A227] text-sm font-semibold tracking-wider uppercase">
                    NOTRE MISSION
                  </span>
                </div>
                
                <h2 id="mission-teaser-heading" className="text-3xl lg:text-4xl font-bold text-white mb-4">
                  Construire une excellence durable
                </h2>
                
                <p className="text-white/70 text-lg mb-6 max-w-lg">
                  Contribuer à l&apos;émergence d&apos;une nouvelle génération de leaders africains, 
                  capables de transformer leurs institutions.
                </p>
                
                <div className="flex flex-wrap gap-4 mb-8">
                  <div className="flex items-center gap-2 text-white/80 text-sm">
                    <CheckCircle className="text-[#C9A227]" size={16} />
                    Contextualisation
                  </div>
                  <div className="flex items-center gap-2 text-white/80 text-sm">
                    <CheckCircle className="text-[#C9A227]" size={16} />
                    Approche pragmatique
                  </div>
                  <div className="flex items-center gap-2 text-white/80 text-sm">
                    <CheckCircle className="text-[#C9A227]" size={16} />
                    Impact mesurable
                  </div>
                </div>
                
                <Button
                  size="lg"
                  className="bg-[#C9A227] hover:bg-[#C9A227]/90 text-[#0d1117] font-semibold px-8 active:scale-[0.98]"
                  asChild
                >
                  <Link href="/mission">
                    Découvrir notre mission
                    <ArrowRight className="ml-2" size={18} />
                  </Link>
                </Button>
              </div>
              
              {/* Right - Image */}
              <div className="relative h-64 lg:h-full min-h-[300px]">
                <Image
                  src="/mission-banner.png"
                  alt="Mission IAS - Leadership africain"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#0d1117] via-[#0d1117]/50 to-transparent lg:from-[#0d1117]/80" />
                
                {/* Floating stat card */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="absolute bottom-6 right-6 lg:bottom-8 lg:right-8 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-5"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#1A7A8A]/50 flex items-center justify-center">
                      <Eye className="text-white" size={20} />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-white">1000+</div>
                      <div className="text-white/70 text-sm">Leaders formés</div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* Partnership CTA */}
      <PartnershipCTA />

      {/* Contact Teaser */}
      <ContactTeaser />
    </>
  );
}
