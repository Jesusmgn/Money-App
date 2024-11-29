<template>
  <q-form
    @submit="addEntryFormSubmit"
    class="add-entry-form row q-px-sm q-pb-sm q-col-gutter-sm bg-primary"
  >
    <div class="col">
      <q-input
        v-model="addEntryForm.name"
        ref="nameRef"
        :placeholder= "$t('entries.name')"
        :bg-color="useLightOrDark('white', 'black')"
        v-select-all
        outlined
        dense
      />
    </div>
    <div class="col">
      <q-input
        v-model.number="addEntryForm.amount"
        :rules="[val => (typeof val === 'number' || val === null) || 'Enter a valid number']"
        input-class="text-right"
        :placeholder="$t('entries.amount')"
        :bg-color="useLightOrDark('white', 'black')"
        type="number"
        step="0.01"
        v-select-all
        outlined
        dense
      />
    </div>
    <div class="col col-auto">
      <q-btn
        color="primary"
        icon="add"
        type="submit"
        round
      />
    </div>
  </q-form>
</template>

<script setup>

  /*
    imports
  */
  
    import { ref, reactive, watch } from 'vue'
    import { useQuasar } from 'quasar'
    import { useStoreEntries } from 'src/stores/storeEntries'
    import { useLightOrDark } from 'src/use/useLightOrDark'
    import vSelectAll from 'src/directives/directiveSelectAll'
    import { useI18n } from 'vue-i18n';

    
    const { locale } = useI18n();
  /*
    quasar
  */
  
    const $q = useQuasar()


  /*
    stores
  */
  
    const storeEntries = useStoreEntries()


  /*
    add entry
  */

    const nameRef = ref(null)

    const addEntryFormDefault = {
      name: '',
      amount: null
    }

    const addEntryForm = reactive({
      ...addEntryFormDefault
    })

    const addEntryFormReset = () => {
      Object.assign(addEntryForm, addEntryFormDefault)
      if (!$q.platform.is.capacitor) nameRef.value.focus()
    }
  
  const addEntryFormSubmit = () => {
    storeEntries.addEntry(addEntryForm)
    addEntryFormReset()
  }

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