/**
 * Constantes de navigation pour l'application IAS
 */

import type { NavLink, SocialLink } from "@/types";

export const NAV_LINKS: NavLink[] = [
  { href: "/", label: "Accueil" },
  { href: "/services", label: "Nos services" },
  { href: "/mission", label: "Notre mission" },
  { href: "/contact", label: "Contact" },
];

export const FOOTER_NAV_LINKS: NavLink[] = [
  { href: "/", label: "Accueil" },
  { href: "/services", label: "Nos services" },
  { href: "/mission", label: "Notre mission" },
  { href: "/contact", label: "Contact" },
];

export const FOOTER_LEGAL_LINKS: NavLink[] = [
  { href: "/mentions-legales", label: "Mentions légales" },
  { href: "/mentions-legales#confidentialite", label: "Confidentialité" },
];

export const SOCIAL_LINKS: SocialLink[] = [
  {
    href: "https://linkedin.com/company/ias-africa",
    label: "LinkedIn",
    icon: "linkedin",
  },
  {
    href: "https://twitter.com/ias_africa",
    label: "Twitter",
    icon: "twitter",
  },
];

export const CONTACT_INFO = {
  email: "contact@ias-africa.com",
  phone: "+221 77 123 45 67",
  phoneRaw: "+221771234567",
  address: {
    city: "Dakar, Sénégal",
    street: "Boulevard du Centenaire, Plateau",
  },
  hours: "Lun - Ven : 8h00 - 18h00",
} as const;
