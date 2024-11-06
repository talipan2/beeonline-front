<template>
  <CommonSidebar class="filter">
    <template #body>
      <div class="sidebar__top">
        <div class="filter__container">
          <slot name="body" />
          <div class="filter__bottom">
            <slot name="bottom" />
          </div>
          <div class="form-group">
            <div class="filter__submit" ref="submitRef">
              <UiButton
                variant="quinary"
                size="large"
                class="form-group-data__btn"
              >
                Применить фильтр
              </UiButton>
            </div>
            <UiButton
              variant="default"
              size="large"
              class="form-group-data__btn"
            >
              Сбросить фильтры
            </UiButton>

          </div>
        </div>
      </div>
    </template>
  </CommonSidebar>
</template>

<script setup>

const submitRef = ref(null);
const emit = defineEmits(['updateTutorialRefSubmit']);

watch(() => submitRef.value, (newVal) => {
  emit('updateTutorialRefSubmit', newVal);
}, {deep: true})

</script>

<style lang="scss">

.filter {
  &__title {
    font-size: 1.8rem;
    margin-bottom: 1.1em;
  }

  &__item {
    padding-bottom: 1.6rem;
    margin-bottom: 1.6rem;
    border-bottom: 1px solid var(--border-color-secondary);
  }

  .checkbox__label {
    font-size: 1.6rem;
  }

  &__location {

    .location__location {
      flex-basis: 100%;
    }

    .btn {
      max-width: 100%;
      margin-bottom: 0;
    }
  }

  .checkbox-group {
    flex-direction: column;
  }

  &__bottom {

    .filter__item {
      border-bottom: none;
    }
  }

  .sidebar__top {
    border-bottom: none;
    margin-left: 0;

    .checkbox-group__btn {
      width: 100%;
      justify-content: space-between;
      padding: 0;
      font-size: 1.6rem;
      text-transform: none;
      margin-top: 1.25em;

      svg {
        width: 1.3rem;
        height: 1.3rem;
      }
    }

    .checkbox-group__btn_type_active {
      svg {
        transform: rotate(180deg);
      }
    }
  }

  &__submit {
    width: 100%;
  }

}



</style>