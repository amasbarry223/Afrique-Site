/**
 * Données des services IAS
 * Source unique de vérité pour tous les services
 */

import type { Service } from "@/types";

export const services: Service[] = [
  {
    id: "developpement-competences",
    icon: "📈",
    title: "Développement des compétences",
    description: "Renforcez les capacités de vos équipes avec des programmes adaptés aux réalités africaines.",
    details: {
      objectifs: [
        "Identifier les compétences clés nécessaires à votre organisation",
        "Développer un plan de formation personnalisé",
        "Mesurer l'acquisition des compétences",
        "Assurer le transfert de connaissances",
      ],
      publicCible: "Cadres, managers, équipes opérationnelles des institutions publiques et privées",
      format: "Programmes modulaires de 2 à 5 jours, en présentiel ou hybride",
      livrables: [
        "Diagnostic des compétences",
        "Plan de développement individualisé",
        "Supports de formation",
        "Attestation de réussite",
      ],
    },
  },
  {
    id: "coaching-executif",
    icon: "🎯",
    title: "Coaching exécutif",
    description: "Accompagnement personnalisé pour les dirigeants et cadres supérieurs en quête d'excellence.",
    details: {
      objectifs: [
        "Clarifier la vision et les objectifs professionnels",
        "Développer le leadership authentique",
        "Optimiser la prise de décision",
        "Renforcer la résilience managériale",
      ],
      publicCible: "Dirigeants, directeurs généraux, cadres supérieurs, hauts fonctionnaires",
      format: "Sessions individuelles de 90 minutes, programme de 6 à 12 mois",
      livrables: [
        "Plan de coaching personnalisé",
        "Sessions régulières avec suivi",
        "Outils d'auto-évaluation",
        "Bilan de progression",
      ],
    },
  },
  {
    id: "formations-sur-mesure",
    icon: "🧩",
    title: "Formations sur mesure",
    description: "Des programmes de formation conçus selon vos besoins spécifiques et votre contexte organisationnel.",
    details: {
      objectifs: [
        "Répondre à des besoins de formation spécifiques",
        "Adapter le contenu à votre secteur d'activité",
        "Intégrer les valeurs et culture de votre organisation",
        "Garantir l'applicabilité immédiate",
      ],
      publicCible: "Tous niveaux hiérarchiques, tous secteurs d'activité",
      format: "Conception sur mesure : durée, modalités et contenu adaptés",
      livrables: [
        "Analyse des besoins de formation",
        "Programme pédagogique personnalisé",
        "Cas pratiques contextualisés",
        "Évaluation des acquis",
      ],
    },
  },
  {
    id: "ateliers-pratiques",
    icon: "🛠",
    title: "Ateliers pratiques",
    description: "Sessions interactives ancrées dans la pratique pour une application immédiate des apprentissages.",
    details: {
      objectifs: [
        "Développer des compétences pratiques",
        "Favoriser l'apprentissage par l'action",
        "Créer des solutions concrètes à vos défis",
        "Stimuler la créativité collective",
      ],
      publicCible: "Équipes projet, groupes de travail, comités de direction",
      format: "Ateliers de 1 à 3 jours, méthodes participatives et ludiques",
      livrables: [
        "Kit d'outils pratiques",
        "Plan d'action collectif",
        "Supports de facilitation",
        "Compte-rendu détaillé",
      ],
    },
  },
  {
    id: "accompagnement-strategique",
    icon: "🧭",
    title: "Accompagnement stratégique",
    description: "Conseil et soutien dans la définition et la mise en œuvre de vos stratégies organisationnelles.",
    details: {
      objectifs: [
        "Clarifier la vision stratégique",
        "Définir des objectifs ambitieux et réalistes",
        "Élaborer des plans d'action concrets",
        "Accompagner la mise en œuvre",
      ],
      publicCible: "Comités de direction, conseils d'administration, équipes stratégiques",
      format: "Mission de conseil de 3 à 12 mois selon l'envergure du projet",
      livrables: [
        "Diagnostic organisationnel",
        "Plan stratégique",
        "Tableau de bord de pilotage",
        "Suivi de mise en œuvre",
      ],
    },
  },
  {
    id: "conferences-inspirantes",
    icon: "🎙",
    title: "Conférences inspirantes",
    description: "Interventions percutantes pour motiver et inspirer vos équipes autour des enjeux du leadership.",
    details: {
      objectifs: [
        "Inspirer et motiver vos équipes",
        "Partager des perspectives nouvelles",
        "Créer un moment de réflexion collective",
        "Stimuler l'engagement",
      ],
      publicCible: "Événements d'entreprise, séminaires, conférences internes",
      format: "Keynotes de 45 à 90 minutes, adaptées à votre thématique",
      livrables: [
        "Contenu personnalisé",
        "Supports visuels impactants",
        "Session Q&A",
        "Ressources complémentaires",
      ],
    },
  },
];

/**
 * Services simplifiés pour les cartes (sans détails)
 */
export const servicesPreview = services.map(({ id, icon, title, description }) => ({
  id,
  icon,
  title,
  description,
}));

/**
 * Obtenir un service par son ID
 */
export function getServiceById(id: string): Service | undefined {
  return services.find((service) => service.id === id);
}
