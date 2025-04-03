<template>
  <UiModal v-model="isOpenModal" :clickToClose="false" @update:modelValue="val => emit('update:modelValue', val)"  class="header-menu header-menu-welcome"
    :style="{ marginTop: `${headerHeight}px` }" :closeButton="false" size="xs">
    <template #content>
      <div class="welcome-header__menu-mobile">
        <div class="welcome-header__menu-mobile-header">
          <HeaderChooseLang class="modal-lang welcome-header__menu-mobile-lang"/>
        </div>
        <div class="welcome-header__menu-mobile-body">
          <UiButton to="/" variant="quinary" size="large" class="welcome-header__menu-mobile-btn">Вход/Регистрация</UiButton>
        </div>
      </div>
    </template>
  </UiModal>
</template>

<script setup>

const props = defineProps({
  headerHeight: {
    type: Number,
    default: 0,
  },
  modelValue: {
    type: Boolean,
    default: false,
  },
});

const isOpenModal = ref();

watch(() => props.modelValue, (newVal) => {
  isOpenModal.value = newVal;
});

const emit = defineEmits(['update:modelValue']);



</script>

<style lang="scss">

.header-menu-welcome {
  .modal-body {
    width: 290px;
  }

  .modal-content {
    margin: 0 0 0 auto;
    background-color: transparent;
  }
}

.welcome-header__menu-mobile {
  display: flex;
  flex-direction: column;
  row-gap: 12px;

  &-header {
    padding-bottom: 12px;
    border-bottom: 1px solid var(--border-color-quaternary);
  }

  &-lang {
    width: fit-content;
    margin-left: auto;

    .header__lang-item {
      font-size: 16px;
    }
  }

  &-btn {
    font-size: 12px;
  }
}

</style>