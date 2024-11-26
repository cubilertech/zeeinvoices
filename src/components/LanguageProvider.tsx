"use client";

import React, { ReactNode } from "react";
import i18n from "i18next";
import { initReactI18next, I18nextProvider } from "react-i18next";
import HttpBackend from 'i18next-http-backend'; // Import the HTTP backend plugin
import { i18nConfig } from '../../next-i18next.config.mjs'; // Ensure the path is correct

// Initialize i18next if not already initialized
if (!i18n.isInitialized) {
  i18n
    .use(HttpBackend) // Use HTTP backend for loading translation files
    .use(initReactI18next)
    .init({
      ...i18nConfig.i18n, // Using the i18n part of the i18nConfig
      fallbackLng: 'en',
      interpolation: {
        escapeValue: false, // React already escapes values
      },
      backend: {
        loadPath: '/locales/{{lng}}/{{ns}}.json', // Translation file path
      },
      detection: {
        caches: [], // Disable caching during development
      },
      debug: true, // Enable debug for easier troubleshooting
    });
}

const LanguageProvider = ({ children }: { children: ReactNode }) => {
  return (
    <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
  );
};

export default LanguageProvider;
export { i18n }; // Export i18n for consistent use
