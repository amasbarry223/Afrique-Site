"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Linkedin, Twitter } from "lucide-react";

// Import des constantes centralisées
import { 
  FOOTER_NAV_LINKS, 
  FOOTER_LEGAL_LINKS, 
  CONTACT_INFO 
} from "@/constants/navigation";

// Mapping des icônes sociales (local au Footer)
const socialLinksData = [
  { 
    href: "https://linkedin.com/company/ias-africa", 
    label: "LinkedIn",
    icon: Linkedin 
  },
  { 
    href: "https://twitter.com/ias_africa", 
    label: "Twitter",
    icon: Twitter 
  },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-card border-t border-border mt-auto">
      <div className="container mx-auto px-4 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {/* Logo & Tagline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            <Link href="/" className="inline-block focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A227] rounded-lg">
              <div className="flex flex-col">
                <span className="text-xl font-bold text-foreground tracking-tight">
                  Intelligence Africaine
                </span>
                <span className="text-sm text-[#C9A227] -mt-1">
                  du Sahel
                </span>
              </div>
            </Link>
            <p className="text-[#C9A227] text-sm font-medium tracking-wider">
              I.A.S • Intelligence • Afrique • Sahel
            </p>
            <p className="text-muted-foreground text-sm max-w-xs">
              Former des leaders au service du développement des institutions africaines.
            </p>
            {/* Social Links */}
            <div className="flex items-center gap-4 pt-2">
              {socialLinksData.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:text-[#C9A227] hover:bg-muted/80 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A227]"
                  aria-label={`Suivez-nous sur ${social.label}`}
                >
                  <social.icon size={18} />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-4"
          >
            <h4 className="text-foreground font-semibold text-lg">Navigation</h4>
            <nav className="flex flex-col gap-3" aria-label="Navigation secondaire">
              {FOOTER_NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-muted-foreground hover:text-[#C9A227] transition-colors text-sm focus:outline-none focus-visible:text-[#C9A227] focus-visible:underline"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <div className="pt-4 border-t border-border mt-4">
              <nav className="flex flex-col gap-3" aria-label="Liens légaux">
                {FOOTER_LEGAL_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-muted-foreground/60 hover:text-[#C9A227] transition-colors text-sm focus:outline-none focus-visible:text-[#C9A227] focus-visible:underline"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>
          </motion.div>

          {/* Coordonnées */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-4"
          >
            <h4 className="text-foreground font-semibold text-lg">Coordonnées</h4>
            <address className="not-italic space-y-3">
              <a
                href={`mailto:${CONTACT_INFO.email}`}
                className="flex items-center gap-3 text-muted-foreground hover:text-[#C9A227] transition-colors text-sm focus:outline-none focus-visible:text-[#C9A227] focus-visible:underline"
              >
                <Mail size={18} className="text-[#C9A227] flex-shrink-0" aria-hidden="true" />
                <span>{CONTACT_INFO.email}</span>
              </a>
              <a
                href={`tel:${CONTACT_INFO.phoneRaw}`}
                className="flex items-center gap-3 text-muted-foreground hover:text-[#C9A227] transition-colors text-sm focus:outline-none focus-visible:text-[#C9A227] focus-visible:underline"
              >
                <Phone size={18} className="text-[#C9A227] flex-shrink-0" aria-hidden="true" />
                <span>{CONTACT_INFO.phone}</span>
              </a>
              <div className="flex items-start gap-3 text-muted-foreground text-sm">
                <MapPin size={18} className="text-[#C9A227] mt-0.5 flex-shrink-0" aria-hidden="true" />
                <span>
                  {CONTACT_INFO.address.city}<br />
                  {CONTACT_INFO.address.street}
                </span>
              </div>
            </address>

            {/* Horaires */}
            <div className="pt-4 border-t border-border">
              <p className="text-muted-foreground text-sm">
                <span className="font-medium text-foreground">Horaires :</span><br />
                {CONTACT_INFO.hours}
              </p>
            </div>
          </motion.div>
        </div>

        {/* Gold Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-[#C9A227]/30 to-transparent my-8" />

        {/* Copyright */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <p className="text-muted-foreground/60 text-sm">
            © {currentYear} Intelligence Africaine du Sahel. Tous droits réservés.
          </p>
          <p className="text-muted-foreground/40 text-xs">
            Conçu avec passion pour le développement institutionnel africain
          </p>
        </div>
      </div>
    </footer>
  );
}
