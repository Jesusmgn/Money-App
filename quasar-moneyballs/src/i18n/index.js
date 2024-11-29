// src/i18n.js
import { createI18n } from 'vue-i18n';
import es from './es.json';
import en from './en.json';

const messages = {
  en,
  es,
};

const i18n = createI18n({
  locale: localStorage.getItem('language') || 'en', // Cargar idioma desde localStorage si existe
  messages,
});

export default i18n;
