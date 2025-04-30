<template>
  <CommonImageLoadSecondary
    class="new-service-card-layout__logo"
    v-model="modelValue.logo"
  />
  <div class="form-group form-group_type_secondary">
    <label class="form-group__title">
      Название компании
      <CommonTooltip text="Допустимы изображения размером до 5Мб" />
    </label>
    <UiInput
      :rules="{ required: true, min: 2 }"
      name="name"
      v-model="modelValue.name"
      label="Название компании"
      class="form-group__value"
    />
  </div>
  <div class="form-group form-group_type_secondary">
    <label class="form-group__title">
      Ссылка на сайт
      <CommonTooltip text="Допустимы изображения размером до 5Мб" />
    </label>
    <UiInput
      :rules="{ required: true, url: true }"
      name="site_url"
      label="Ссылка на сайт"
      v-model="modelValue.site_url"
      class="form-group__value"
    >
      <SvgoPlanet class="svg-m" />
    </UiInput>
  </div>
  <div class="form-group form-group_type_secondary">
    <label class="form-group__title">
      Описание
      <CommonTooltip text="" />
    </label>
    <UiTextArea
      class="form-group__value"
      v-model="modelValue.description"
      name="description"
      label="Описание"
    />
  </div>
  <div class="new-service-card-layout__container">
    <div class="form-group form-group_type_secondary">
      <label class="form-group__title">Выбрать город</label>
      <CommonLocation
        buttonLabel="Выбрать город"
        v-model="modelValue.locations"
        class="new-service-card-layout__location"
        :is-required="true"
        :button-label="'Выбрать город'"
        :type="['selectCities']"
      />
    </div>
    <div class="form-group form-group_type_secondary">
      <div class="form-group-data">
        <label class="form-group__title">Сырье</label>
        <UiCheckboxGroup
          :rules="{required: true}"
          class="form-group__value"
          variant="rounded"
          :options="[
            { id: 0, label: 'Исполнителя' },
            { id: 1, label: 'Заказчика' },
          ]"
          v-model="modelValue.materials"
          name="materials"
          label="Сырье"
        />
      </div>
      <div class="form-group-data">
        <label class="form-group__title">Образцы</label>
        <UiCheckboxGroup
          class="form-group__value"
          variant="rounded"
          :rules="{required: true}"
          :options="[
            { id: 0, label: 'По запросу' },
            { id: 1, label: 'Да' },
            { id: 2, label: 'Нет' },
          ]"
          v-model="modelValue.free_samples"
          name="free_samples"
          label="Образцы"
        />
      </div>
      <div class="form-group-data">
        <label class="form-group__title">Наличие СТМ</label>
        <UiRadioButtonGroup
          :rules="{required: true}"
          class="form-group__value"
          :options="[
            { id: 1, value: 1, label: 'Да' },
            { id: 0, value: 0, label: 'Нет' },
          ]"
          v-model="modelValue.is_stm"
          name="is_stm"
          label="Наличие СТМ"
        />
      </div>
      <div class="form-group-data">
        <label class="form-group__title">Свободный склад</label>
        <UiRadioButtonGroup
          :rules="{required: true}"
          class="form-group__value"
          :options="[
            { id: 1, value: 1, label: 'Да' },
            { id: 0, value: 0, label: 'Нет' },
          ]"
          v-model="modelValue.free_stock"
          name="free_stock"
          label="Свободный склад"
        />
      </div>
    </div>
  </div>
</template>

<script setup>

const props = defineProps({
  modelValue: {
    type: Object,
    required: () => ({}),
  }
})

</script>

<style lang="scss">

.new-service-card-layout__logo {
  margin-bottom: 3.2em;
}

</style>
