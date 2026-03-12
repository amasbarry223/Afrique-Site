/**
 * Types centralisés pour l'application IAS
 * Ce fichier contient toutes les interfaces TypeScript partagées
 */

// ============================================
// SERVICES
// ============================================

export interface ServiceDetails {
  objectifs: string[];
  publicCible: string;
  format: string;
  livrables: string[];
}

export interface Service {
  id: string;
  icon: string;
  title: string;
  description: string;
  details?: ServiceDetails;
}

// ============================================
// TÉMOIGNAGES
// ============================================

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  avatar?: string;
}

// ============================================
// CONTACT & FORMULAIRES
// ============================================

export interface ContactFormData {
  lastName: string;
  firstName: string;
  email: string;
  phone: string;
  organization: string;
  subject: string;
  message: string;
}

export interface FormFieldState {
  value: string;
  touched: boolean;
  error?: string;
}

export interface Subject {
  value: string;
  label: string;
}

// ============================================
// FAQ
// ============================================

export interface FAQ {
  question: string;
  answer: string;
}

// ============================================
// NAVIGATION
// ============================================

export interface NavLink {
  href: string;
  label: string;
}

export interface SocialLink {
  href: string;
  label: string;
  icon: string;
}

// ============================================
// DIFFÉRENCIATEURS (Points forts)
// ============================================

export interface Differentiator {
  title: string;
  description: string;
}

// ============================================
// CTA SECTIONS
// ============================================

export interface CTAProps {
  title?: string;
  description?: string;
  buttonText?: string;
  buttonHref?: string;
}
