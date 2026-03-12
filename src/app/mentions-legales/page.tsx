"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, FileText, Lock } from "lucide-react";
import { CONTACT_INFO } from "@/constants/navigation";

export default function MentionsLegalesPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="py-16 lg:py-20 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto"
          >
            <Link href="/">
              <Button
                variant="ghost"
                className="text-muted-foreground hover:text-foreground mb-8"
              >
                <ArrowLeft className="mr-2" size={16} />
                Retour à l&apos;accueil
              </Button>
            </Link>

            <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-8">
              Mentions légales &amp; conditions d&apos;utilisation
            </h1>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Conditions d'utilisation */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="bg-card border border-border rounded-xl p-6"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-[#C9A227]/20 flex items-center justify-center">
                    <FileText className="text-[#C9A227]" size={20} />
                  </div>
                  <h2 className="text-xl font-semibold text-foreground">
                    Conditions d&apos;utilisation
                  </h2>
                </div>

                <div className="space-y-4 text-muted-foreground text-sm">
                  <p>
                    Le site Intelligence Africaine du Sahel est édité et mis à disposition 
                    pour informer sur nos services de formation et d&apos;accompagnement.
                  </p>

                  <div className="space-y-3">
                    <div>
                      <div className="text-[#C9A227] font-medium mb-1">Éditeur</div>
                      <p>Intelligence Africaine du Sahel (IAS)</p>
                      <p>Société à responsabilité limitée</p>
                      <p>Capital social : 10 000 000 FCFA</p>
                    </div>

                    <div>
                      <div className="text-[#C9A227] font-medium mb-1">Directeur de publication</div>
                      <p>Le Directeur Général de IAS</p>
                    </div>

                    <div>
                      <div className="text-[#C9A227] font-medium mb-1">Hébergeur</div>
                      <p>Le site est hébergé par :</p>
                      <p>Vercel Inc.</p>
                      <p>San Francisco, CA, USA</p>
                    </div>
                  </div>

                  <p className="pt-4 border-t border-border">
                    L&apos;utilisation de ce site implique l&apos;acceptation pleine et entière 
                    des conditions générales d&apos;utilisation décrites ci-après.
                  </p>
                </div>
              </motion.div>

              {/* Confidentialité */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                id="confidentialite"
                className="bg-card border border-border rounded-xl p-6"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-[#1A7A8A]/20 flex items-center justify-center">
                    <Lock className="text-[#1A7A8A]" size={20} />
                  </div>
                  <h2 className="text-xl font-semibold text-foreground">
                    Politique de confidentialité
                  </h2>
                </div>

                <div className="space-y-4 text-muted-foreground text-sm">
                  <p>
                    Nous attachons une grande importance à la protection de vos données 
                    personnelles. Cette politique décrit comment nous collectons, utilisons 
                    et protégeons vos informations.
                  </p>

                  <div className="space-y-3">
                    <div>
                      <div className="text-[#1A7A8A] font-medium mb-1">Données collectées</div>
                      <p>Nom, prénom, adresse email, numéro de téléphone (si fourni)</p>
                    </div>

                    <div>
                      <div className="text-[#1A7A8A] font-medium mb-1">Finalités</div>
                      <ul className="list-disc list-inside space-y-1">
                        <li>Répondre à vos demandes de contact</li>
                        <li>Vous envoyer des informations sur nos services</li>
                        <li>Améliorer notre site et nos offres</li>
                      </ul>
                    </div>

                    <div>
                      <div className="text-[#1A7A8A] font-medium mb-1">Vos droits</div>
                      <p>
                        Vous disposez d&apos;un droit d&apos;accès, de rectification et de 
                        suppression de vos données. Pour exercer ces droits, contactez-nous à :
                      </p>
                    </div>

                    <div className="bg-muted rounded-lg p-3">
                      <a
                        href={`mailto:${CONTACT_INFO.email}`}
                        className="text-[#C9A227] hover:underline"
                      >
                        {CONTACT_INFO.email}
                      </a>
                    </div>
                  </div>

                  <p className="pt-4 border-t border-border">
                    Vos données ne sont jamais vendues à des tiers et sont conservées 
                    pendant une durée conforme aux exigences légales.
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Contact Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-8 bg-card border border-border rounded-xl p-6"
            >
              <h3 className="text-lg font-semibold text-foreground mb-4">Contact</h3>
              <div className="grid sm:grid-cols-3 gap-4 text-muted-foreground text-sm">
                <div>
                  <div className="text-[#C9A227] font-medium mb-1">Email</div>
                  <a href={`mailto:${CONTACT_INFO.email}`} className="hover:text-[#C9A227]">
                    {CONTACT_INFO.email}
                  </a>
                </div>
                <div>
                  <div className="text-[#C9A227] font-medium mb-1">Téléphone</div>
                  <a href={`tel:${CONTACT_INFO.phoneRaw}`} className="hover:text-[#C9A227]">
                    {CONTACT_INFO.phone}
                  </a>
                </div>
                <div>
                  <div className="text-[#C9A227] font-medium mb-1">Adresse</div>
                  <p>{CONTACT_INFO.address.city}</p>
                </div>
              </div>
            </motion.div>

            {/* Copyright */}
            <div className="mt-8 text-center text-muted-foreground/60 text-sm">
              © {new Date().getFullYear()} Intelligence Africaine du Sahel. Tous droits réservés.
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
