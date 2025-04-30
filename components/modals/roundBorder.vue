<template>
  <UiModal class="round-modal modal" v-model="isOpenModal" :title="title" :size="size" :fixedHeader="fixedHeader">
    <template #content>
      <slot />
    </template>
  </UiModal>
</template>

<script setup>
const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false
  },
  title: {
    type: String,
    default: ''
  },
  size: {
    type: String,
    default: 'md'
  },
  fixedHeader: {
    type: Boolean,
    default: true
  }
})

const isOpenModal = ref(false);

watch(() => props.isOpen, (newVal) => {
  isOpenModal.value = newVal;
});

const emit = defineEmits(['close']);

watch(isOpenModal, (newVal) => {
  if(!newVal) {
    emit('close', newVal);
  }
});

</script>

<style lang="scss">

.round-modal {
  font-size: 1rem;

  .modal-content {
    border-radius: 20px;
    box-shadow: none;
    padding: 2.4em 3.2em;
  }

  @include mobile {
    .modal-dialog {
      padding: 0;
    }

    .modal-content {
      border-radius: 0;
    }
  }
}

</style>