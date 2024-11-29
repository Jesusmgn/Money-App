// src/boot/i18n.js
import { createI18n } from 'vue-i18n';
import es from 'src/i18n/es.json';
import en from 'src/i18n/en.json';

const messages = {
  en,
  es,
};

const i18n = createI18n({
  locale: localStorage.getItem('language') || 'en',
  messages,
});

export default ({ app }) => {
  app.use(i18n);  // Esto es necesario para que Quasar lo registre
};
