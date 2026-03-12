/**
 * Hook personnalisé pour la gestion du formulaire de contact
 * Sépare la logique de validation et de soumission du composant UI
 */

import { useState, useCallback } from "react";
import type { ContactFormData } from "@/types";

interface UseContactFormOptions {
  onSubmit?: (data: ContactFormData) => Promise<void>;
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

interface ValidationErrors {
  lastName?: string;
  firstName?: string;
  email?: string;
  phone?: string;
  subject?: string;
  message?: string;
}

const initialFormData: ContactFormData = {
  lastName: "",
  firstName: "",
  email: "",
  phone: "",
  organization: "",
  subject: "",
  message: "",
};

// Fonctions de validation pures
const validateEmail = (email: string): boolean => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

const validatePhone = (phone: string): boolean => {
  if (!phone) return true; // Optionnel
  return /^[\d\s\-+()]{8,}$/.test(phone);
};

export function useContactForm(options: UseContactFormOptions = {}) {
  const [formData, setFormData] = useState<ContactFormData>(initialFormData);
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Validation d'un champ individuel
  const validateField = useCallback(
    (field: string, value: string): string | undefined => {
      switch (field) {
        case "lastName":
          if (!value.trim()) return "Le nom est requis";
          break;
        case "firstName":
          if (!value.trim()) return "Le prénom est requis";
          break;
        case "email":
          if (!value.trim()) return "L'email est requis";
          if (!validateEmail(value)) return "Format d'email invalide";
          break;
        case "phone":
          if (value && !validatePhone(value)) return "Format de téléphone invalide";
          break;
        case "subject":
          if (!value) return "Veuillez sélectionner un objet";
          break;
        case "message":
          if (!value.trim()) return "Le message est requis";
          if (value.trim().length < 10) return "Minimum 10 caractères";
          break;
      }
      return undefined;
    },
    []
  );

  // Validation de tous les champs
  const validateAll = useCallback((): ValidationErrors => {
    const errors: ValidationErrors = {};
    
    (["lastName", "firstName", "email", "phone", "subject", "message"] as const).forEach(
      (field) => {
        const error = validateField(field, formData[field]);
        if (error) errors[field] = error;
      }
    );
    
    return errors;
  }, [formData, validateField]);

  // Obtenir les erreurs pour les champs touchés
  const getErrors = useCallback((): ValidationErrors => {
    const errors: ValidationErrors = {};
    
    (["lastName", "firstName", "email", "phone", "subject", "message"] as const).forEach(
      (field) => {
        if (touched[field]) {
          const error = validateField(field, formData[field]);
          if (error) errors[field] = error;
        }
      }
    );
    
    return errors;
  }, [formData, touched, validateField]);

  // Mise à jour d'un champ
  const updateField = useCallback((field: keyof ContactFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }, []);

  // Marquer un champ comme touché
  const touchField = useCallback((field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  }, []);

  // Marquer tous les champs comme touchés
  const touchAllFields = useCallback(() => {
    setTouched({
      lastName: true,
      firstName: true,
      email: true,
      phone: true,
      subject: true,
      message: true,
      organization: true,
    });
  }, []);

  // Soumission du formulaire
  const handleSubmit = useCallback(
    async (e?: React.FormEvent) => {
      e?.preventDefault();
      
      touchAllFields();
      const errors = validateAll();
      const hasErrors = Object.values(errors).some(Boolean);
      
      if (hasErrors) {
        return { success: false, errors };
      }

      setIsSubmitting(true);

      try {
        if (options.onSubmit) {
          await options.onSubmit(formData);
        } else {
          // Comportement par défaut : appel API
          const response = await fetch("/api/contact", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
          });

          if (!response.ok) {
            throw new Error("Erreur lors de l'envoi");
          }
        }

        setIsSuccess(true);
        setFormData(initialFormData);
        setTouched({});
        options.onSuccess?.();
        
        return { success: true };
      } catch (error) {
        options.onError?.(error instanceof Error ? error : new Error("Erreur inconnue"));
        return { success: false, error };
      } finally {
        setIsSubmitting(false);
      }
    },
    [formData, touchAllFields, validateAll, options]
  );

  // Réinitialiser le formulaire
  const reset = useCallback(() => {
    setFormData(initialFormData);
    setTouched({});
    setIsSuccess(false);
  }, []);

  return {
    formData,
    setFormData,
    touched,
    isSubmitting,
    isSuccess,
    errors: getErrors(),
    updateField,
    touchField,
    handleSubmit,
    reset,
    setIsSuccess,
  };
}
