<template>
  <q-page>
    <div class="q-pa-md">
      <q-list bordered padding>

        <!-- ENTRIES -->
        <q-item-label header>{{ t('settings.entries') }}</q-item-label>

        <q-item tag="label" v-ripple>
          <q-item-section>
            <q-item-label>{{ t('settings.promptToDelete') }}</q-item-label>
          </q-item-section>
          <q-item-section side>
            <q-toggle v-model="storeSettings.settings.promptToDelete" />
          </q-item-section>
        </q-item>

        <q-item tag="label" v-ripple>
          <q-item-section>
            <q-item-label>{{ t('settings.showRunningBalance') }}</q-item-label>
          </q-item-section>
          <q-item-section side>
            <q-toggle v-model="storeSettings.settings.showRunningBalance" />
          </q-item-section>
        </q-item>

        <q-item tag="label" v-ripple>
          <q-item-section>
            <q-input
              v-model="storeSettings.settings.currencySymbol"
              :label="t('settings.currencySymbol')"
              v-select-all
              outlined
            />
          </q-item-section>
        </q-item>

        <q-separator spaced />

        <!-- APPEARANCE -->
        <q-item-label header>{{ t('settings.appearance') }}</q-item-label>

        <q-item tag="label" v-ripple>
          <q-item-section avatar>
            <q-radio v-model="storeSettings.settings.darkMode" :val="false" />
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ t('settings.lightMode') }}</q-item-label>
          </q-item-section>
        </q-item>

        <q-item tag="label" v-ripple>
          <q-item-section avatar>
            <q-radio v-model="storeSettings.settings.darkMode" :val="true" />
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ t('settings.darkMode') }}</q-item-label>
          </q-item-section>
        </q-item>

        <q-item tag="label" v-ripple>
          <q-item-section avatar top>
            <q-radio v-model="storeSettings.settings.darkMode" val="auto" />
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ t('settings.autoMode') }}</q-item-label>
            <q-item-label caption>{{ t('settings.devicePreference') }}</q-item-label>
          </q-item-section>
        </q-item>

        <q-separator spaced />

        <!-- LANGUAGE SELECTION -->
        <q-item-label header>{{ t('settings.language') }}</q-item-label>

        <q-item v-for="lang in availableLanguages" :key="lang.code" clickable @click="changeLanguage(lang.code)">
          <q-item-section>
            <q-item-label>{{ lang.label }}</q-item-label>
          </q-item-section>
          <q-item-section avatar>
            <q-radio :model-value="currentLocale" :val="lang.code" />
          </q-item-section>
        </q-item>

      </q-list>
    </div>
  </q-page>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useStoreSettings } from 'src/stores/storeSettings';
import { useI18n } from 'vue-i18n';  // Asegúrate de usar `useI18n`

// Usar i18n
const { t, locale } = useI18n();  // Extrae `locale` directamente

// Acceso a la store
const storeSettings = useStoreSettings();

// Lista de idiomas disponibles
const availableLanguages = ref([
  { code: 'en', label: 'English' },
  { code: 'es', label: 'Español' },
]);

// Idioma actual
const currentLocale = ref(locale.value);  // Usa directamente `locale` desde i18n

// Cambiar el idioma
const changeLanguage = (lang) => {
  locale.value = lang; // Cambia el idioma globalmente
  currentLocale.value = lang; // Actualiza el modelo del idioma seleccionado
  localStorage.setItem('language', lang); // Guarda el idioma en localStorage
};

// Observa los cambios en el idioma
watch(locale, (newLocale) => {
  currentLocale.value = newLocale;
});
</script>
