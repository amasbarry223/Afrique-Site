"use client";

import { motion } from "framer-motion";
import { Mail, Phone, MapPin, AlertCircle, CheckCircle, Loader2, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FAQAccordionItem } from "@/components/ui/accordion-card";
import { BridgeCTA } from "@/components/sections/CTASections";
import { useContactForm, useAccordion } from "@/hooks";
import { toast } from "@/hooks/use-toast";

// Import des données centralisées
import { contactSubjects, validContactSubjects } from "@/data/contact";
import { contactFAQs } from "@/data/faqs";
import { CONTACT_INFO } from "@/constants/navigation";

// Composant FormField réutilisable
interface FormFieldProps {
  label: string;
  id: string;
  required?: boolean;
  error?: string;
  hint?: string;
  children: React.ReactNode;
}

function FormField({ label, id, required = true, error, hint, children }: FormFieldProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id} className="text-foreground flex items-center gap-1 text-sm">
        {label}
        {required && (
          <>
            <span className="text-[#C9A227]" aria-hidden="true">*</span>
            <span className="sr-only">(obligatoire)</span>
          </>
        )}
      </Label>
      {children}
      {error ? (
        <motion.p
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-destructive text-sm flex items-center gap-1"
          role="alert"
        >
          <AlertCircle size={14} aria-hidden="true" />
          {error}
        </motion.p>
      ) : hint ? (
        <p className="text-muted-foreground text-xs">{hint}</p>
      ) : null}
    </div>
  );
}

export default function ContactPage() {
  const { openIndex, toggle, isOpen } = useAccordion();
  
  const {
    formData,
    touched,
    isSubmitting,
    isSuccess,
    errors,
    updateField,
    touchField,
    handleSubmit,
    setIsSuccess,
  } = useContactForm({
    onSuccess: () => {
      toast({
        title: "Message envoyé ✓",
        description: "Nous vous répondrons dans les 48 heures.",
      });
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    onError: () => {
      toast({
        title: "Erreur d'envoi",
        description: "Une erreur est survenue. Veuillez réessayer ou nous appeler.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Marquer tous les champs comme touchés avant validation
    const result = await handleSubmit();
    
    if (!result.success && result.errors) {
      toast({
        title: "Formulaire incomplet",
        description: "Veuillez corriger les erreurs avant d'envoyer.",
        variant: "destructive",
      });
    }
  };

  return (
    <>
      {/* Hero Section */}
      <section className="py-16 lg:py-20 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto"
          >
            <span className="text-[#C9A227] text-sm font-semibold tracking-wider uppercase">
              CONTACT
            </span>
            <h1 className="text-4xl lg:text-5xl font-bold text-foreground mt-4 mb-6">
              Parlons de votre projet
            </h1>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              Notre équipe vous répond sous 48h. Partagez-nous vos enjeux, 
              nous construirons ensemble la solution adaptée.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Form & Info Section */}
      <section className="py-12 lg:py-16 bg-muted/30">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-10 lg:gap-14 max-w-6xl mx-auto">
            {/* Left Column - Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-3"
            >
              <div className="bg-card border border-border rounded-2xl p-6 lg:p-8 shadow-sm">
                <h2 className="text-2xl font-bold text-foreground mb-1">Envoyez-nous un message</h2>
                <p className="text-muted-foreground text-sm mb-6">
                  <span className="text-[#C9A227]">*</span> Champs obligatoires
                </p>

                {isSuccess ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-8"
                  >
                    <div className="w-16 h-16 rounded-full bg-[#1A7A8A]/10 flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="w-8 h-8 text-[#1A7A8A]" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      Message envoyé !
                    </h3>
                    <p className="text-muted-foreground mb-6 max-w-sm mx-auto">
                      Merci pour votre message. Notre équipe vous répondra dans les 48 heures.
                    </p>
                    <Button
                      onClick={() => setIsSuccess(false)}
                      variant="outline"
                      className="border-[#C9A227] text-[#C9A227] hover:bg-[#C9A227]/10"
                    >
                      Envoyer un autre message
                    </Button>
                  </motion.div>
                ) : (
                  <form onSubmit={onSubmit} className="space-y-5" noValidate>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <FormField label="Nom" id="lastName" error={touched.lastName ? errors.lastName : undefined}>
                        <Input
                          id="lastName"
                          type="text"
                          placeholder="Ex: Diallo"
                          value={formData.lastName}
                          onChange={(e) => updateField("lastName", e.target.value)}
                          onBlur={() => touchField("lastName")}
                          aria-required
                          aria-invalid={!!errors.lastName}
                          className={`bg-background h-11 ${
                            errors.lastName && touched.lastName ? "border-destructive focus:border-destructive" : ""
                          }`}
                        />
                      </FormField>
                      <FormField label="Prénom" id="firstName" error={touched.firstName ? errors.firstName : undefined}>
                        <Input
                          id="firstName"
                          type="text"
                          placeholder="Ex: Amadou"
                          value={formData.firstName}
                          onChange={(e) => updateField("firstName", e.target.value)}
                          onBlur={() => touchField("firstName")}
                          aria-required
                          aria-invalid={!!errors.firstName}
                          className={`bg-background h-11 ${
                            errors.firstName && touched.firstName ? "border-destructive focus:border-destructive" : ""
                          }`}
                        />
                      </FormField>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <FormField label="Email" id="email" error={touched.email ? errors.email : undefined}>
                        <Input
                          id="email"
                          type="email"
                          placeholder="amadou@exemple.com"
                          value={formData.email}
                          onChange={(e) => updateField("email", e.target.value)}
                          onBlur={() => touchField("email")}
                          aria-required
                          aria-invalid={!!errors.email}
                          className={`bg-background h-11 ${
                            errors.email && touched.email ? "border-destructive focus:border-destructive" : ""
                          }`}
                        />
                      </FormField>
                      <FormField label="Téléphone" id="phone" required={false} error={touched.phone ? errors.phone : undefined} hint="Format: +221 77 123 45 67">
                        <Input
                          id="phone"
                          type="tel"
                          placeholder="+221 77 123 45 67"
                          value={formData.phone}
                          onChange={(e) => updateField("phone", e.target.value)}
                          onBlur={() => touchField("phone")}
                          aria-invalid={!!errors.phone}
                          className={`bg-background h-11 ${
                            errors.phone && touched.phone ? "border-destructive focus:border-destructive" : ""
                          }`}
                        />
                      </FormField>
                    </div>

                    <FormField label="Organisation" id="organization" required={false}>
                      <Input
                        id="organization"
                        type="text"
                        placeholder="Nom de votre entreprise ou institution"
                        value={formData.organization}
                        onChange={(e) => updateField("organization", e.target.value)}
                        className="bg-background h-11"
                      />
                    </FormField>

                    <FormField label="Objet" id="subject" error={touched.subject ? errors.subject : undefined}>
                      <Select
                        value={formData.subject}
                        onValueChange={(value) => {
                          updateField("subject", value);
                          touchField("subject");
                        }}
                      >
                        <SelectTrigger 
                          className={`bg-background h-11 ${
                            errors.subject && touched.subject ? "border-destructive focus:border-destructive" : ""
                          }`}
                          aria-required
                          aria-invalid={!!errors.subject}
                        >
                          <SelectValue placeholder="Sélectionnez un objet..." />
                        </SelectTrigger>
                        <SelectContent className="bg-card border-border">
                          {validContactSubjects.map((subject) => (
                            <SelectItem
                              key={subject.value}
                              value={subject.value}
                              className="text-foreground hover:bg-muted focus:bg-muted cursor-pointer"
                            >
                              {subject.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormField>

                    <FormField label="Message" id="message" error={touched.message ? errors.message : undefined}>
                      <div className="relative">
                        <Textarea
                          id="message"
                          placeholder="Décrivez votre projet, vos besoins ou posez-nous votre question..."
                          value={formData.message}
                          onChange={(e) => updateField("message", e.target.value)}
                          onBlur={() => touchField("message")}
                          aria-required
                          aria-invalid={!!errors.message}
                          rows={5}
                          maxLength={2000}
                          className={`bg-background resize-none ${
                            errors.message && touched.message ? "border-destructive focus:border-destructive" : ""
                          }`}
                        />
                        <span className="absolute bottom-2 right-3 text-xs text-muted-foreground">
                          {formData.message.length}/2000
                        </span>
                      </div>
                    </FormField>

                    <Button
                      type="submit"
                      size="lg"
                      disabled={isSubmitting}
                      className="w-full bg-[#1A7A8A] hover:bg-[#1A7A8A]/90 text-white h-12 text-base active:scale-[0.99] transition-all"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Envoi en cours...
                        </>
                      ) : (
                        <>
                          <Send className="mr-2 h-4 w-4" />
                          Envoyer le message
                        </>
                      )}
                    </Button>

                    <p className="text-muted-foreground text-xs text-center">
                      En soumettant ce formulaire, vous acceptez notre{" "}
                      <a href="/mentions-legales#confidentialite" className="text-[#C9A227] hover:underline focus:outline-none focus-visible:text-[#1A7A8A]">
                        politique de confidentialité
                      </a>.
                    </p>
                  </form>
                )}
              </div>
            </motion.div>

            {/* Right Column - Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-2 space-y-4"
            >
              <h2 className="text-xl font-bold text-foreground mb-4">Coordonnées</h2>

              {/* Contact Cards */}
              <a
                href={`mailto:${CONTACT_INFO.email}`}
                className="group flex items-start gap-4 p-4 bg-card border border-border rounded-xl hover:border-[#C9A227]/50 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A227]"
              >
                <div className="w-10 h-10 rounded-full bg-[#C9A227]/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#C9A227]/20 transition-colors">
                  <Mail className="text-[#C9A227]" size={18} aria-hidden="true" />
                </div>
                <div>
                  <div className="text-foreground font-medium">Email</div>
                  <span className="text-muted-foreground group-hover:text-[#C9A227] transition-colors">
                    {CONTACT_INFO.email}
                  </span>
                </div>
              </a>

              <a
                href={`tel:${CONTACT_INFO.phoneRaw}`}
                className="group flex items-start gap-4 p-4 bg-card border border-border rounded-xl hover:border-[#C9A227]/50 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A227]"
              >
                <div className="w-10 h-10 rounded-full bg-[#C9A227]/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#C9A227]/20 transition-colors">
                  <Phone className="text-[#C9A227]" size={18} aria-hidden="true" />
                </div>
                <div>
                  <div className="text-foreground font-medium">Téléphone</div>
                  <span className="text-muted-foreground group-hover:text-[#C9A227] transition-colors">
                    {CONTACT_INFO.phone}
                  </span>
                </div>
              </a>

              <div className="flex items-start gap-4 p-4 bg-card border border-border rounded-xl">
                <div className="w-10 h-10 rounded-full bg-[#C9A227]/10 flex items-center justify-center flex-shrink-0">
                  <MapPin className="text-[#C9A227]" size={18} aria-hidden="true" />
                </div>
                <div>
                  <div className="text-foreground font-medium">Bureau</div>
                  <p className="text-muted-foreground text-sm">
                    {CONTACT_INFO.address.city}<br />
                    {CONTACT_INFO.address.street}
                  </p>
                </div>
              </div>

              {/* Urgent Contact Card */}
              <div className="bg-gradient-to-br from-[#1A7A8A]/10 to-transparent border border-[#1A7A8A]/20 rounded-xl p-5">
                <div className="flex items-center gap-3 mb-3">
                  <AlertCircle className="text-[#1A7A8A]" size={20} aria-hidden="true" />
                  <span className="text-foreground font-semibold">Besoin urgent ?</span>
                </div>
                <p className="text-muted-foreground text-sm mb-4">
                  Appelez-nous directement. Disponible du lundi au vendredi, de 8h à 18h.
                </p>
                <Button
                  className="bg-[#1A7A8A] hover:bg-[#1A7A8A]/90 text-white w-full active:scale-[0.99]"
                  asChild
                >
                  <a href={`tel:${CONTACT_INFO.phoneRaw}`}>
                    <Phone className="mr-2" size={16} aria-hidden="true" />
                    Appelez-nous
                  </a>
                </Button>
              </div>

              {/* Response time */}
              <div className="flex items-center gap-2 text-sm text-muted-foreground p-4 bg-muted/50 rounded-lg">
                <CheckCircle className="text-[#C9A227]" size={16} aria-hidden="true" />
                Réponse garantie sous 48h
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 lg:py-20 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-10"
          >
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-2">
              Questions fréquentes
            </h2>
            <p className="text-muted-foreground text-sm">
              Réponses rapides à vos interrogations
            </p>
          </motion.div>

          <div className="max-w-2xl mx-auto space-y-3">
            {contactFAQs.map((faq, index) => (
              <FAQAccordionItem
                key={faq.question}
                question={faq.question}
                answer={faq.answer}
                isOpen={isOpen(index)}
                onToggle={() => toggle(index)}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Bridge CTA to Services */}
      <BridgeCTA />
    </>
  );
}
