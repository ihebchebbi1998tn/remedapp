import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en/translation.json';
import fr from './locales/fr/translation.json';
import ar from './locales/ar/translation.json';
import it from './locales/it/translation.json'; // Add this line

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: en,
      },
      fr: {
        translation: fr,
      },
      ar: {
        translation: ar,
      },
      it: {
        translation: it, // Add this line
      },
    },
    compatibilityJSON: 'v3', 
    lng: 'fr', // Default language
    fallbackLng: 'fr', // Fallback language if translation is missing
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
