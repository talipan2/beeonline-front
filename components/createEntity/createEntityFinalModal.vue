<template>
  <UiModal 
    class="create-entity-final-modal modal"
    v-model="settingStore.createEntityFinalModal"
    @confirm="confirm"
    :closeButton="false"
    size="xs"
  >
  <template #content>
    <p>{{ text }}</p>
  </template>
  </UiModal>
</template>

<script setup>
import { useSettingStore } from '~/store/settingStore';

const props = defineProps({
  text: {
    type: String,
    required: true,
  }
})

const settingStore = useSettingStore();

const modalState = computed(() => settingStore.createEntityFinalModal);

const confirm = () => {
  settingStore.createEntityFinalModal = false;
}

watch(() => modalState.value, (newVal) => {
  console.log(newVal)
  if(newVal === true) {
    setTimeout(() => {
      settingStore.createEntityFinalModal = false;
    }, 4000);
  }
}, {immediate: true});

</script>

<style lang="scss">

.create-entity-final-modal {
  font-size: 1rem;

  .modal-content {
    padding: 4em;
  }

  p {
    font-family: 'fira-sans', sans-serif;
    font-size: 2.8em;
    text-align: center;
  }
}

</style>