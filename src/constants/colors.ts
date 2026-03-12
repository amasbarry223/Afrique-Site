/**
 * Constantes de couleurs pour l'application IAS
 * Centralise toutes les valeurs de couleurs pour éviter la duplication
 */

export const COLORS = {
  // Couleurs principales
  primary: {
    DEFAULT: "#1A7A8A",
    light: "#1A7A8A/90",
    dark: "#146876",
    transparent: "#1A7A8A/10",
  },
  
  // Couleur d'accent (or)
  accent: {
    DEFAULT: "#C9A227",
    light: "#C9A227/90",
    transparent: "#C9A227/10",
    border: "#C9A227/20",
  },
  
  // Couleurs de fond
  background: {
    light: "#ffffff",
    dark: "#0d1117",
  },
  
  // Couleurs de texte
  text: {
    primary: "#0d1117",
    secondary: "#6b7280",
    muted: "#9ca3af",
  },
  
  // États
  state: {
    success: "#22c55e",
    error: "#ef4444",
    warning: "#f59e0b",
  },
} as const;

/**
 * Classes Tailwind prédéfinies pour les couleurs
 */
export const COLOR_CLASSES = {
  // Boutons primaires
  buttonPrimary: "bg-[#1A7A8A] hover:bg-[#1A7A8A]/90 text-white",
  buttonPrimaryOutline: "border-[#C9A227] text-[#C9A227] hover:bg-[#C9A227]/10",
  
  // Texte
  textAccent: "text-[#C9A227]",
  textPrimary: "text-[#1A7A8A]",
  
  // Backgrounds
  bgAccentTransparent: "bg-[#C9A227]/10",
  bgPrimaryTransparent: "bg-[#1A7A8A]/10",
  
  // Bordures
  borderAccent: "border-[#C9A227]/20",
  borderAccentHover: "hover:border-[#C9A227]/50",
} as const;
