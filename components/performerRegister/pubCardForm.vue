<template>
  <CommonImageLoadSecondary
    class="new-service-card-layout__logo"
    v-model="modelValue.logo"
  />
  <div class="form-group form-group_type_secondary">
    <label class="form-group__title">
      Название компании
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
    </label>
    <UiInput
      :rules="{ url: true }"
      name="url_site"
      label="Ссылка на сайт"
      v-model="modelValue.url_site"
      class="form-group__value"
    >
      <SvgoPlanet class="svg-m" />
    </UiInput>
  </div>
  <div class="form-group form-group_type_secondary">
    <label class="form-group__title">
      Контактный email
    </label>
    <UiInput
      :rules="{ required: false }"
      name="contact_email"
      label="Контактный email"
      v-model="modelValue.contact_email"
      class="form-group__value"
    >
    </UiInput>
  </div>
    <div class="form-group form-group_type_secondary">
    <label class="form-group__title">
      Контактный телефон
    </label>
    <UiInput
      :rules="{ required: false }"
      name="contact_phone"
      label="Контактный телефон"
      v-model="modelValue.contact_phone"
      class="form-group__value"
    >
    </UiInput>
  </div>
  <div class="form-group form-group_type_secondary">
    <label class="form-group__title">
      Описание
    </label>
    <UiTextArea
      class="form-group__value"
      v-model="modelValue.description"
      name="description"
      label="Описание"
      :rules="{required: true, min: 5}"
    />
  </div>
  <CommonAlerts v-if="errorsList.selectedLocations && !skipLocationError" :alert="errorsList.selectedLocations" alertType="validation" />
  <div class="form-group form-group_type_secondary">
    <label class="form-group__title">Выбрать город</label>
    <p class="form-group-description">Укажите местонахождение вашего производства, в случае если у вас несколько фабрик - укажите все локации производства, не более 5.</p>
    <CommonLocation
      buttonLabel="Выбрать город"
      v-model="modelValue.locations"
      class="new-service-card-layout__location"
      :is-required="true"
      :button-label="'Выбрать город'"
      :type="['selectCities']"
      :max-selected="5"
    />
  </div>
  <div class="new-service-card-layout__container">
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
  <div class="form-group form-group_type_secondary">
    <label class="form-group__title">
      Количество швей
    </label>
    <UiInput
      :rules="{ required: true }"
      name="workers_count"
      v-model="modelValue.workers_count"
      label="Количество швей"
      class="form-group__value"
      type="number"
      inputType="number"
    />
  </div>
</template>

<script setup>

const props = defineProps({
  modelValue: {
    type: Object,
    required: () => ({}),
  },
  errorsList: {
    type: Object,
    default: () => ({})
  }
})

const skipLocationError = ref(false);

watch(() => props.modelValue.locations, (newValue) => {
  if(newValue?.cities.length == 0) {
    skipLocationError.value = false;
  } else {
    skipLocationError.value = true
  }
}, {deep: true})

</script>

<style lang="scss">

.new-service-card-layout__logo {
  margin-bottom: 3.2em;
}

</style>
