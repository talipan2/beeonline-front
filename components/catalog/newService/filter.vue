<template>
  <div class="filter-modal">
    <!-- Кнопка для открытия Tippy -->
    <UiButton 
      type="button" 
      class="filter-modal__action-btn" 
      variant="senary" 
      size="large"
      @click="toggleFilterModal"
    >
      Еще фильтры
      <SvgoFilter class="svg-m" />
    </UiButton>

    <Tippy
      ref="filterModal"
      class="filter-modal__tippy"
      :interactive="true"
      :placement="'bottom-start'"
      :arrow="false"
      :maxWidth="744"
      :interactiveBorder="false"
      :clickOutside="false"
      :hide-on-click="false"
      trigger="manual"
      z-index="999"
    >
      <template #content>
        <div class="filter-modal__container">
          <UiButton 
            type="button"
            class="filter-modal__close"
            variant="default"
            :without-padding="true"
            @click="hideFilterModal"
          >
            <SvgoClose class="svg-l" />
          </UiButton>
          <h3 class="filter-modal__title">Еще фильтры</h3>
          <div class="filter-modal__content">
            <div class="filter-modal__item">
              <p class="filter-modal__text">Регионы производства</p>
              <CommonLocation 
                buttonLabel="Выбрать регионы" 
                v-model="filter.location"
                class="filter-modal__location filter-modal__action"
                :type="['selectCountry', 'selectRegions']"
                :is-required="true"
                errorLabel="Регионы производства"
                name="location"
              />
            </div>
            <div class="filter-modal__item">
              <p class="filter-modal__text">Наличие СТМ</p>
              <UiRadioButtonGroup 
                class="filter-modal__radio filter-modal__action"
                v-model="filter.has_stm"
                :options="[
                  { value: 1, label: 'Да' },
                  { value: 0, label: 'Нет' },
                ]"
              />
            </div>
            <div class="filter-modal__item">
              <p class="filter-modal__text">Образцы</p>
              <UiCheckboxGroup
                class="filter-modal__checkbox filter-modal__action"
                v-model="filter.free_test"
                :is-validated="false"
                :options="[
                  { id: 0, label: 'По запросу' },
                  { id: 1, label: 'Да' },
                  { id: 2, label: 'Нет' },
                ]"
              />
            </div>
            <div class="filter-modal__item">
              <p class="filter-modal__text">Сырье</p>
              <UiCheckboxGroup
                class="filter-modal__checkbox filter-modal__action"
                v-model="filter.material"
                :options="[
                  { id: 0, label: 'Исполнителя' },
                  { id: 1, label: 'Заказчика' },
                ]"
                :is-validated="false"
              />
            </div>
            <div class="filter-modal__item">
              <p class="filter-modal__text">Наличие склада</p>
              <UiRadioButtonGroup
                class="filter-modal__radio filter-modal__action"
                v-model="filter.free_stock"
                :options="[
                  { id: 1, value: 1, label: 'Да' },
                  { id: 0, value: 0, label: 'Нет' },
                ]"
              />
            </div>
            <div class="filter-modal__item">
              <p class="filter-modal__text">Верификация</p>
              <UiRadioButtonGroup
                class="filter-modal__radio filter-modal__action"
                v-model="filter.verification"
                :options="[
                  { id: 1, value: 1, label: 'Да' },
                  { id: 0, value: 0, label: 'Нет' },
                ]"
              />
            </div>
          </div>
          <div class="filter-modal__footer">
            <UiButton 
              type="button" 
              class="filter-modal__btn" 
              variant="tertiary" 
              size="large"
              @click="resetFilter"
            >
              Сбросить фильтры
            </UiButton>
            <UiButton 
              type="button" 
              class="filter-modal__btn" 
              variant="quinary" 
              size="large"
              @click="handleUpdateFilter"
            >
              Применить фильтры
            </UiButton>
          </div>
        </div>
      </template>
    </Tippy>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
  filter: {
    type: Object,
    default: () => ({})
  }
});

const emit = defineEmits(['updateFilter', 'resetFilter']);
const filterModal = ref(null);
const isVisible = ref(false);

const filter = ref({
  location: [],
  has_stm: null,
  free_test: [],
  material: [],
  free_stock: null,
  verification: null,
});

const toggleFilterModal = () => {
  if (filterModal.value.state.isShown) {
    filterModal.value.hide();
  } else {
    filterModal.value.show();
  }
};

const hideFilterModal = () => {
  filterModal.value.hide();
};

const resetFilter = () => {
  filter.value = {
    location: [],
    has_stm: null,
    free_test: [],
    material: [],
    free_stock: null,
    verification: null,
  };
  emit('resetFilter');
  hideFilterModal();
}

const handleUpdateFilter = () => {
  emit('updateFilter', filter.value)
  hideFilterModal();
};

watch(() => props.filter, () => {
  filter.value = {
    location: props.filter.location || [],
    has_stm: props.filter.is_stm || null,
    free_test: props.filter.free_samples || [],
    material: [props.filter.materials_own ? 0 : undefined, props.filter.materials_tolling ? 1 : undefined].filter(item => item !== undefined),
    free_stock: props.filter.free_stock || null,
    verification: props.filter.verification || null
  }
}, {deep: true, immediate: true})

</script>

<style lang="scss">


.filter-modal {
  font-size: 1rem;
  font-family: 'lato', sans-serif;

  .tippy-box {
    width: 74rem;
    font-size: 1rem;
  }

  &__action-btn {
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.07);
    background: #fff;
    font-size: 1.6em;
    font-weight: 400;
    font-family: 'lato', sans-serif;
    color: var(--text-color-primary);
    column-gap: .5em;
    border-radius: 8px;
  }
  
  &__title {
    font-size: 2.4em;
    font-weight: 700;
    color: var(--text-color-monodecimal);
  }

  &__container {
    width: 100%;
    padding: 3.2em;
    position: relative;
  }

  &__close {
    position: absolute;
    top: 2em;
    right: 2em;
    cursor: pointer;
  }

  &__content {
    display: flex;
    flex-direction: column;
    row-gap: 2.4em;
    // max-width: 43.6em;
    padding-bottom: 2.4em;
    margin-bottom: 2.4em;
    border-bottom: 1px solid #d9dae1;
  }

  &__item {
    display: flex;
    align-items: center;
    column-gap: 1em;
  }

  &__text {
    flex: 0 1 40%;
    font-size: 1.6em;
    line-height: 1.5em;
    font-weight: 700;
    color: var(--text-color-monodecimal);
  }

  &__action {
    flex: 0 1 40%;
  }

  .location__btn {
    width: 100%;
    max-width: 100%;
  }

  .location__location {
    flex-basis: 100%;
  }

  &__radio {
    flex-direction: row;
    column-gap: 4rem;
    .radio-buttons__label {
      font-size: 1.6rem;
    }
  }

  &__checkbox {
    flex-direction: column;
  }

  &__footer {
    display: flex;
    justify-content: flex-end;
    column-gap: 1.2em;

  }
  .filter-modal__btn {
    font-size: 1.2rem;
    text-transform: uppercase;
  }

}

</style>
