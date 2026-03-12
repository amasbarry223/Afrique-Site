/**
 * Données du formulaire de contact
 */

import type { Subject } from "@/types";

export const contactSubjects: Subject[] = [
  { value: "", label: "Sélectionnez un objet..." },
  { value: "demande-devis", label: "Demande de devis" },
  { value: "information-formations", label: "Information sur les formations" },
  { value: "coaching-executif", label: "Coaching exécutif" },
  { value: "accompagnement-strategique", label: "Accompagnement stratégique" },
  { value: "partenariat", label: "Partenariat" },
  { value: "autre", label: "Autre" },
];

/**
 * Sujets valides pour le formulaire (sans l'option vide)
 */
export const validContactSubjects = contactSubjects.filter((s) => s.value);
