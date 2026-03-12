"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { 
  ArrowRight, 
  Target, 
  Eye, 
  Heart, 
  Users, 
  Globe, 
  Award,
  CheckCircle,
  TrendingUp
} from "lucide-react";

// Données de la mission
const missionData = {
  title: "Notre Mission",
  subtitle: "Former des leaders au service du développement des institutions africaines",
  description: `L'Intelligence Africaine du Sahel (IAS) est une firme de formation en leadership et coaching exécutif dédiée à l'accompagnement des organisations africaines dans leur quête d'excellence institutionnelle.`,
  vision: {
    title: "Notre Vision",
    content: "Devenir le partenaire de référence pour le développement du leadership institutionnel en Afrique, en contribuant à l'émergence d'une nouvelle génération de dirigeants éthiques, compétents et engagés.",
  },
  values: [
    {
      icon: Target,
      title: "Excellence",
      description: "Nous visons l'excellence dans tout ce que nous entreprenons, avec des standards de qualité élevés.",
    },
    {
      icon: Heart,
      title: "Intégrité",
      description: "L'honnêteté et l'éthique sont au cœur de nos pratiques professionnelles.",
    },
    {
      icon: Users,
      title: "Contextualisation",
      description: "Nos programmes sont adaptés aux réalités culturelles et institutionnelles africaines.",
    },
    {
      icon: Globe,
      title: "Impact durable",
      description: "Chaque accompagnement vise à créer un impact positif et mesurable.",
    },
  ],
  differentiators: [
    {
      title: "Approche pragmatique",
      description: "Nous privilégions les solutions concrètes et applicables immédiatement.",
      stat: "98%",
      statLabel: "Satisfaction client",
    },
    {
      title: "Experts de terrain",
      description: "Nos formateurs sont des praticiens avec une expérience avérée sur le continent.",
      stat: "50+",
      statLabel: "Experts certifiés",
    },
    {
      title: "Mesure de l'impact",
      description: "Chaque programme inclut des indicateurs de performance mesurables.",
      stat: "1000+",
      statLabel: "Leaders formés",
    },
  ],
  approach: [
    {
      step: "01",
      title: "Diagnostic",
      description: "Analyse approfondie de vos besoins et du contexte organisationnel.",
    },
    {
      step: "02",
      title: "Personnalisation",
      description: "Conception de solutions sur mesure adaptées à vos enjeux spécifiques.",
    },
    {
      step: "03",
      title: "Accompagnement",
      description: "Mise en œuvre avec suivi régulier et ajustements en temps réel.",
    },
    {
      step: "04",
      title: "Mesure d'impact",
      description: "Évaluation des résultats et recommandations pour la suite.",
    },
  ],
};

// Animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export default function MissionPage() {
  return (
    <>
      {/* Hero Banner */}
      <section className="relative h-[50vh] min-h-[400px] overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/mission-banner.png"
            alt="Leadership africain - Formation et développement"
            fill
            className="object-cover"
            priority
          />
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0d1117]/90 via-[#0d1117]/70 to-[#0d1117]/50" />
        </div>

        {/* Banner Content */}
        <div className="relative z-10 container mx-auto px-4 lg:px-8 h-full flex items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <span className="inline-block px-4 py-2 bg-[#C9A227]/20 border border-[#C9A227]/30 rounded-full text-[#C9A227] text-sm font-medium mb-6">
              NOTRE MISSION
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              Construire une{" "}
              <span className="text-gold-gradient">excellence durable</span>
            </h1>
            <p className="text-white/80 text-lg md:text-xl max-w-xl">
              Former des leaders au service du développement des institutions africaines.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-20 lg:py-28 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Text Content */}
            <motion.div
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="space-y-6"
            >
              <span className="text-[#C9A227] text-sm font-semibold tracking-wider uppercase">
                QUI SOMMES-NOUS
              </span>
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground leading-tight">
                Une expertise au service de l&apos;Afrique
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                {missionData.description}
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Notre mission est de contribuer à l&apos;émergence d&apos;une nouvelle génération 
                de leaders africains, capables de transformer leurs institutions et de créer 
                un impact positif et durable pour leurs communautés.
              </p>
              <div className="pt-4">
                <Button
                  size="lg"
                  className="bg-[#1A7A8A] hover:bg-[#1A7A8A]/90 text-white px-8 active:scale-[0.98]"
                  asChild
                >
                  <Link href="/contact">
                    Discutons de votre projet
                    <ArrowRight className="ml-2" size={18} />
                  </Link>
                </Button>
              </div>
            </motion.div>

            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-border shadow-xl">
                <Image
                  src="/mission-vision-new.png"
                  alt="Vision IAS - Leadership africain"
                  fill
                  className="object-cover"
                />
                {/* Decorative element */}
                <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-[#C9A227]/10 rounded-full blur-2xl" />
              </div>
              {/* Floating card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="absolute -bottom-6 -left-6 bg-card border border-border rounded-xl p-5 shadow-xl max-w-xs"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-full bg-[#1A7A8A]/10 flex items-center justify-center">
                    <Eye className="text-[#1A7A8A]" size={20} />
                  </div>
                  <span className="text-foreground font-semibold">Notre Vision</span>
                </div>
                <p className="text-muted-foreground text-sm">
                  Devenir le partenaire de référence pour le leadership institutionnel en Afrique.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 lg:py-28 bg-muted/30">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <span className="text-[#C9A227] text-sm font-semibold tracking-wider uppercase">
              NOS VALEURS
            </span>
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mt-3 mb-4">
              Les piliers de notre engagement
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Des valeurs fortes qui guident chacune de nos actions et accompagnements.
            </p>
          </motion.div>

          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {missionData.values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group bg-card border border-border rounded-xl p-6 hover:border-[#C9A227]/50 transition-all duration-300 hover:shadow-lg"
              >
                <div className="w-14 h-14 rounded-xl bg-[#1A7A8A]/10 flex items-center justify-center mb-5 group-hover:bg-[#1A7A8A]/20 transition-colors">
                  <value.icon className="text-[#1A7A8A]" size={28} />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3 group-hover:text-[#C9A227] transition-colors">
                  {value.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Differentiators with Stats */}
      <section className="py-20 lg:py-28 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative order-2 lg:order-1"
            >
              <div className="relative aspect-square rounded-2xl overflow-hidden border border-border shadow-xl">
                <Image
                  src="/mission-coaching.png"
                  alt="Coaching IAS - Accompagnement personnalisé"
                  fill
                  className="object-cover"
                />
              </div>
              {/* Decorative elements */}
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-[#C9A227]/10 rounded-full blur-xl" />
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-[#1A7A8A]/10 rounded-full blur-xl" />
            </motion.div>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-8 order-1 lg:order-2"
            >
              <div>
                <span className="text-[#C9A227] text-sm font-semibold tracking-wider uppercase">
                  NOS POINTS FORTS
                </span>
                <h2 className="text-3xl lg:text-4xl font-bold text-foreground mt-3 mb-4">
                  Ce qui nous distingue
                </h2>
                <p className="text-muted-foreground">
                  Une approche unique construite sur l&apos;expérience et l&apos;écoute de nos partenaires.
                </p>
              </div>

              <div className="space-y-6">
                {missionData.differentiators.map((diff, index) => (
                  <motion.div
                    key={diff.title}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="flex items-start gap-5"
                  >
                    <div className="flex-shrink-0 text-center">
                      <div className="text-3xl font-bold text-[#C9A227]">{diff.stat}</div>
                      <div className="text-xs text-muted-foreground">{diff.statLabel}</div>
                    </div>
                    <div className="flex-1 pt-1">
                      <h3 className="text-foreground font-semibold mb-1">{diff.title}</h3>
                      <p className="text-muted-foreground text-sm">{diff.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Approach */}
      <section className="py-20 lg:py-28 bg-gradient-to-br from-[#0d1117] via-[#0d1117] to-[#1A7A8A]/20">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <span className="text-[#C9A227] text-sm font-semibold tracking-wider uppercase">
              NOTRE APPROCHE
            </span>
            <h2 className="text-3xl lg:text-4xl font-bold text-white mt-3 mb-4">
              Un processus éprouvé
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto">
              Une méthodologie rigoureuse pour des résultats concrets et mesurables.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {missionData.approach.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="relative group"
              >
                {/* Connector line */}
                {index < 3 && (
                  <div className="hidden lg:block absolute top-12 left-full w-full h-0.5 bg-gradient-to-r from-[#C9A227]/50 to-transparent z-0" />
                )}
                
                <div className="relative z-10 bg-white/5 border border-white/10 rounded-xl p-6 backdrop-blur-sm hover:bg-white/10 transition-all duration-300">
                  <div className="text-5xl font-bold text-[#C9A227]/20 mb-4">{step.step}</div>
                  <h3 className="text-xl font-semibold text-white mb-2">{step.title}</h3>
                  <p className="text-white/60 text-sm">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-28 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative overflow-hidden bg-gradient-to-br from-[#1A7A8A] to-[#1A7A8A]/80 rounded-3xl p-8 lg:p-16 text-center"
          >
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#C9A227]/20 rounded-full blur-2xl" />
            
            <div className="relative z-10 max-w-2xl mx-auto">
              <Award className="text-[#C9A227] mx-auto mb-6" size={48} />
              <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
                Prêt à transformer votre organisation ?
              </h2>
              <p className="text-white/80 text-lg mb-8 max-w-xl mx-auto">
                Rejoignez les nombreuses organisations qui nous font confiance pour développer leurs talents.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button
                  size="lg"
                  className="bg-white text-[#1A7A8A] hover:bg-white/90 px-8 h-12 active:scale-[0.98]"
                  asChild
                >
                  <Link href="/contact">
                    Demander un devis
                    <ArrowRight className="ml-2" size={18} />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white/10 px-8 h-12"
                  asChild
                >
                  <Link href="/services">
                    Voir nos services
                  </Link>
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
