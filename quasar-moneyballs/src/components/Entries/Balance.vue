<template>
  <div
    class="row q-mb-sm q-px-md q-py-sm items-center"
    :class="useLightOrDark('bg-white shadow-up-3', 'bg-black')"
  >
    <div class="col text-grey-7 text-h6">
      {{ $t('entries.balance') }}:
    </div>
    <div
      :class="useAmountColorClass(storeEntries.balance)"
      class="col text-h6 text-right"
    >
      <div class="row">
        <div class="col">
          {{ useCurrencify(storeEntries.balance) }}
        </div>
      </div>

      <div
        v-if="storeEntries.balancePaid"
        class="row"
      >
        <div class="col text-caption text-grey-6">
          {{ $t('entries.paid') }}: 
          <span
            class="text-weight-bold"
            :class="useAmountColorClass(storeEntries.balancePaid)"
          >
            {{ useCurrencify(storeEntries.balancePaid) }}
          </span>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
  /*
    imports
  */
  import { useStoreEntries } from 'src/stores/storeEntries';
  import { useCurrencify } from 'src/use/useCurrencify';
  import { useAmountColorClass } from 'src/use/useAmountColorClass';
  import { useLightOrDark } from 'src/use/useLightOrDark';
  import { useI18n } from 'vue-i18n';
  import { watch } from 'vue';
  /*
    stores
  */
  const storeEntries = useStoreEntries();

  /*
    Configuración de idioma desde localStorage
  */
  const { locale } = useI18n();

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
</script>
