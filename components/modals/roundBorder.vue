<template>
  <UiModal class="round-modal modal" v-model="isOpenModal" :title="title" :size="size" :fixedHeader="fixedHeader">
    <template #content>
      <slot />
      <div class="round-modal__footer" v-if="$slots.footer">
        <slot name="footer"></slot>
      </div>
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

  .modal-body {
    
  }

  &__footer {
    @include mobile {
      display: flex;
      flex-direction: column;
      row-gap: .8em;
      padding: .8em 1.6em;
      border-top: 1px solid #eff0f5;
      box-shadow: 0 -2px 12px 0 rgba(0, 0, 0, 0.02);
      margin-top: 2.2em;
      margin-inline: -3.2em;
    }
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