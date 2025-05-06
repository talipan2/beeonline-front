<template>
  <div class="filter-modal__content">
    <div class="filter-modal__item">
      <p class="filter-modal__text">Регионы производства</p>
      <CommonLocation
        buttonLabel="Выбрать регионы"
        v-model="modelValue.location"
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
        v-model="modelValue.has_stm"
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
        v-model="modelValue.free_test"
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
        v-model="modelValue.material"
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
        v-model="modelValue.free_stock"
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
        v-model="modelValue.verification"
        :options="[
          { id: 1, value: 1, label: 'Да' },
          { id: 0, value: 0, label: 'Нет' },
        ]"
      />
    </div>
  </div>
</template>

<script setup>

const props = defineProps({
  modelValue: {
    type: Object,
    default: () => ({})
  }
})

</script>
