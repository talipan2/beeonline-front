<template>
  <UiModal class="confirm-modal modal" size="xs" v-model="isOpen">
    <template #content>
      <!-- {{ confirmModal.isOpen }} -->
      <!-- <div class="confirm-modal__content">
        <p class="confirm-modal__text">
          {{ confirmModal.dialogProps.message }}
        </p> -->
        <!-- <div class="confirm-modal__buttons">
          <UiButton class="confirm-modal__btn" type="button" variant="quinary" size="large" @click="dialogProps.onCancel">{{ cancelText }}</UiButton>
          <UiButton class="confirm-modal__btn" type="button" variant="quinary" size="large" @click="dialogProps.onConfirm">{{ confirmText }}</UiButton>
        </div> -->
      <!-- </div> -->
    </template>
  </UiModal>
</template>

<script setup>
const isOpen = ref(true);

// const confirmModal = useConfirmModal();

</script>