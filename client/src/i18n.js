//desc: i18n config for translations
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import enTranslation from './translations/en.json';
import bgTranslation from './translations/bg.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: enTranslation
      },
      bg: {
        translation: bgTranslation
      }
    },
    lng: "en",
    fallbackLng: "en",
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;