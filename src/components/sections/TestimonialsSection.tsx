"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence, PanInfo } from "framer-motion";
import { ChevronLeft, ChevronRight, Pause, Play, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Link from "next/link";

const testimonials = [
  {
    quote: "L'accompagnement d'IAS a transformé notre approche du leadership. Une expertise rare et précieuse pour nos institutions.",
    author: "Amadou Diallo",
    role: "Directeur des Ressources Humaines",
    organization: "BCEAO",
  },
  {
    quote: "Les formations sur mesure ont eu un impact mesurable sur la performance de nos équipes dirigeantes. Je recommande vivement.",
    author: "Fatou Ndiaye",
    role: "Secrétaire Générale",
    organization: "Ministère de l'Économie Numérique",
  },
  {
    quote: "Une approche pragmatique et contextualisée qui a fait la différence dans notre transformation organisationnelle.",
    author: "Ibrahima Sow",
    role: "Directeur Exécutif",
    organization: "ONG Sahel Développement",
  },
  {
    quote: "Le coaching exécutif proposé par IAS m'a permis de développer une vision stratégique claire pour mon organisation.",
    author: "Mariama Ba",
    role: "Présidente",
    organization: "Fédération des Entreprises du Sahel",
  },
];

interface TestimonialCardProps {
  quote: string;
  author: string;
  role: string;
  organization: string;
}

function TestimonialCard({ quote, author, role, organization }: TestimonialCardProps) {
  const initials = author.split(" ").map((n) => n[0]).join("").slice(0, 2);

  return (
    <div className="relative bg-card border border-border rounded-xl p-6 lg:p-8 shadow-sm">
      {/* Quote Icon */}
      <Quote className="absolute top-4 right-4 lg:top-6 lg:right-6 text-[#C9A227]/20" size={32} aria-hidden="true" />
      
      {/* Quote Text */}
      <blockquote className="text-foreground/90 text-base lg:text-lg leading-relaxed mb-6 relative z-10">
        &ldquo;{quote}&rdquo;
      </blockquote>
      
      {/* Author Info */}
      <div className="flex items-center gap-4">
        <Avatar className="w-12 h-12 border-2 border-[#C9A227]/30">
          <AvatarFallback className="bg-[#1A7A8A] text-white font-medium text-sm">
            {initials}
          </AvatarFallback>
        </Avatar>
        <div>
          <div className="text-foreground font-semibold">{author}</div>
          <div className="text-muted-foreground text-sm">{role}</div>
          <div className="text-[#C9A227] text-sm font-medium">{organization}</div>
        </div>
      </div>
    </div>
  );
}

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false); // Désactivé par défaut
  const [isPaused, setIsPaused] = useState(false);
  const [direction, setDirection] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const nextTestimonial = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  }, []);

  const prevTestimonial = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, []);

  const goToTestimonial = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  // Swipe handlers
  const handleDragEnd = (_: unknown, info: PanInfo) => {
    const threshold = 50;
    if (info.offset.x > threshold) {
      prevTestimonial();
    } else if (info.offset.x < -threshold) {
      nextTestimonial();
    }
  };

  // Auto-play (optionnel, désactivé par défaut)
  useEffect(() => {
    if (!isAutoPlaying || isPaused) return;

    const interval = setInterval(() => {
      nextTestimonial();
    }, 6000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, isPaused, nextTestimonial]);

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      prevTestimonial();
    } else if (e.key === "ArrowRight") {
      nextTestimonial();
    }
  };

  // Animation variants
  const variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      x: dir < 0 ? 300 : -300,
      opacity: 0,
    }),
  };

  return (
    <section 
      className="py-20 lg:py-28 bg-muted/50"
      aria-labelledby="testimonials-heading"
    >
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
            Témoignages
          </span>
          <h2 id="testimonials-heading" className="text-3xl lg:text-4xl font-bold text-foreground mt-3">
            Ils nous font confiance
          </h2>
          <p className="text-muted-foreground mt-2 max-w-xl mx-auto">
            Découvrez les retours d&apos;expérience de nos partenaires et clients
          </p>
        </motion.div>

        {/* Testimonial Carousel */}
        <div 
          ref={containerRef}
          className="relative max-w-3xl mx-auto"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onFocus={() => setIsPaused(true)}
          onBlur={() => setIsPaused(false)}
          onKeyDown={handleKeyDown}
          role="region"
          aria-label="Carousel de témoignages"
          aria-roledescription="carousel"
        >
          {/* Swipeable Container */}
          <motion.div
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={handleDragEnd}
            className="touch-pan-y cursor-grab active:cursor-grabbing"
          >
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ 
                  type: "spring", 
                  stiffness: 300, 
                  damping: 30 
                }}
                role="group"
                aria-roledescription="slide"
                aria-label={`Témoignage ${currentIndex + 1} sur ${testimonials.length}`}
              >
                <TestimonialCard {...testimonials[currentIndex]} />
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* Swipe indicator (mobile) */}
          <div className="flex items-center justify-center gap-1 mt-4 lg:hidden">
            <span className="text-xs text-muted-foreground">Balayer pour naviguer</span>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-3 mt-8">
            <button
              onClick={prevTestimonial}
              className="w-11 h-11 rounded-full border border-border bg-card flex items-center justify-center text-muted-foreground hover:text-[#C9A227] hover:border-[#C9A227] transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A227] focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              aria-label="Témoignage précédent"
            >
              <ChevronLeft size={20} />
            </button>

            {/* Dots */}
            <div className="flex items-center gap-2" role="tablist" aria-label="Sélection du témoignage">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToTestimonial(index)}
                  className={`transition-all rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A227] focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
                    index === currentIndex
                      ? "w-6 h-2.5 bg-[#C9A227]"
                      : "w-2.5 h-2.5 bg-muted-foreground/30 hover:bg-[#C9A227]/50"
                  }`}
                  role="tab"
                  aria-selected={index === currentIndex}
                  aria-label={`Voir le témoignage ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={nextTestimonial}
              className="w-11 h-11 rounded-full border border-border bg-card flex items-center justify-center text-muted-foreground hover:text-[#C9A227] hover:border-[#C9A227] transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A227] focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              aria-label="Témoignage suivant"
            >
              <ChevronRight size={20} />
            </button>

            {/* Play/Pause button (optional) */}
            <button
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              className={`w-9 h-9 rounded-full border flex items-center justify-center transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A227] focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
                isAutoPlaying 
                  ? "border-[#C9A227] text-[#C9A227]" 
                  : "border-border text-muted-foreground hover:text-[#C9A227] hover:border-[#C9A227]"
              }`}
              aria-label={isAutoPlaying ? "Arrêter le défilement automatique" : "Démarrer le défilement automatique"}
              aria-pressed={isAutoPlaying}
            >
              {isAutoPlaying ? <Pause size={14} /> : <Play size={14} />}
            </button>
          </div>

          {/* Screen reader announcement */}
          <div className="sr-only" aria-live="polite" aria-atomic="true">
            Témoignage {currentIndex + 1} sur {testimonials.length} : {testimonials[currentIndex].author}, {testimonials[currentIndex].role}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mt-12"
        >
          <Button
            size="lg"
            className="bg-[#1A7A8A] hover:bg-[#1A7A8A]/90 text-white px-8 active:scale-[0.98]"
            asChild
          >
            <Link href="/contact">Demander un devis</Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
