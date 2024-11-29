<template>
  <q-layout view="hHh lpR lFf">
    <q-header :elevated="useLightOrDark(true, false)">
      <q-toolbar>
        <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" />

        <q-toolbar-title>
          <div class="absolute-center">
            <div class="toolbar-title-text">
              <q-icon name="savings" />
              Moneyballs
            </div>
          </div>
        </q-toolbar-title>

        <q-btn v-if="$route.fullPath === '/'" @click="storeEntries.options.sort = !storeEntries.options.sort"
          :label="!storeEntries.options.sort ? $t('layout.sort') : $t('layout.done')" flat no-caps dense />

      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" class="bg-primary" :width="250" :breakpoint="767" show-if-above bordered>
      <q-list>
        <q-item-label class="text-white" header>
          {{ $t('layout.navigation') }}
        </q-item-label>

        <NavLink v-for="link in navLinks" :key="link.title" v-bind="link" />

        <q-item v-if="$q.platform.is.electron" @click="quitApp" clickable class="text-white absolute-bottom" tag="a">
          <q-item-section avatar>
            <q-icon name="power_settings_new" />
          </q-item-section>

          <q-item-section>
            <q-item-label>Quit</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useQuasar } from 'quasar'
import { useStoreEntries } from 'src/stores/storeEntries'
import { useLightOrDark } from 'src/use/useLightOrDark'
import NavLink from 'components/Nav/NavLink.vue'
import { useI18n } from 'vue-i18n'
const { locale } = useI18n();
const { t } = useI18n();

defineOptions({
  name: 'MainLayout'
})

const $q = useQuasar(),
  storeEntries = useStoreEntries()

const navLinks = [
  {
    title: t('layout.entries'),
    icon: 'savings',
    link: '/'
  },
  {
    title: t('layout.settings'),
    icon: 'settings',
    link: '/settings'
  }
]
const showEntries = ref(t('layout.entries'))

const leftDrawerOpen = ref(false)

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value
}

const quitApp = () => {
  $q.dialog({
    title: 'Confirm',
    message: 'Really quit Moneyballs?',
    cancel: true,
    persistent: true,
    html: true,
    ok: {
      label: 'Quit',
      color: 'negative',
      noCaps: true
    },
    cancel: {
      color: 'primary',
      noCaps: true
    }
  }).onOk(() => {
    if ($q.platform.is.electron) ipcRenderer.send('quit-app')
  })
  // Al montar el componente, leer el idioma desde localStorage
  const storedLang = localStorage.getItem('language') || 'en'; // Idioma por defecto si no hay uno en localStorage
  locale.value = storedLang; // Establecer el idioma global

  // Si deseas hacer que el idioma se actualice automáticamente cuando cambie el valor en el localStorage:
  watch(
    () => localStorage.getItem('language'),
    (newLang) => {
      if (newLang) {
        locale.value = newLang; // Actualizar el idioma si se cambia en el localStorage
      }
    }
  );
}
</script>
