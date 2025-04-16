<template>
  <CommonLayoutInfoCard title="Карточка" class="new-service-card-layout">
    <CommonImageLoadSecondary class="new-service-card-layout__logo" v-model="modelValue.logo" :alt="modelValue.name" />
    <div class="form-group form-group_type_secondary">
      <label class="form-group__title">
        Название компании
        <CommonTooltip text="Допустимы изображения размером до 5Мб" />
      </label>
      <UiInput
        :rules="{ required: true, min: 2 }"
        name="name"
        v-model="modelValue.name"
        class="form-group__value"
      />
    </div>
    <div class="form-group form-group_type_secondary">
      <label class="form-group__title">
        Название компании
        <CommonTooltip text="Допустимы изображения размером до 5Мб"/>
      </label>
      <UiInput
        :rules="{ required: true, min: 2 }"
        name="name"
        v-model="modelValue.name"
        class="form-group__value"
      ><SvgoPlanet class="svg-m" /></UiInput>
    </div>
    <div class="form-group form-group_type_secondary">
      <label class="form-group__title">
        Описание
        <CommonTooltip text="" />  
      </label>
      <UiTextArea
        class="form-group__value"
        v-model="modelValue.description"
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
            class="form-group__value"
            variant="rounded"
            :options="[
              { id: 0, label: 'Исполнителя' },
              { id: 1, label: 'Заказчика' },
            ]"
            v-model="modelValue.description"
            name="isFreeSample"
          />
        </div>
        <div class="form-group-data">
          <label class="form-group__title">Образцы</label>
          <UiCheckboxGroup
            class="form-group__value"
            variant="rounded"
            :options="[
              { id: 0, label: 'По запросу' },
              { id: 1, label: 'Да' },
              { id: 2, label: 'Нет' },
            ]"
            v-model="modelValue.description"
            name="isFreeSample"
          />
        </div>
        <div class="form-group-data">
          <label class="form-group__title">Наличие СТМ</label>
          <UiRadioButtonGroup
            class="form-group__value"
            :options="[
              { id: 1, label: 'Да' },
              { id: 0, label: 'Нет' },
            ]"
            v-model="modelValue.description"
            name="isStm"
          />
        </div>
        <div class="form-group-data">
          <label class="form-group__title">Свободный склад</label>
          <UiRadioButtonGroup
            class="form-group__value"
            :options="[
              { id: 1, label: 'Да' },
              { id: 0, label: 'Нет' },
            ]"
            v-model="modelValue.description"
            name="isStm"
          />
        </div>
      </div>
    </div>
  </CommonLayoutInfoCard>
</template>

<script setup>

const props = defineProps({
  modelValue: {
    type: Object,
    default: () => ({})
  }
})

</script>

<style lang="scss">

.new-service-card-layout{

  .load-image-secondary {
    margin-bottom: 3.2em;
  }

  .tooltip__wrapper {
    width: 20px;
    height: 20px;
    font-size: 1rem;
  }

  .form-group__value {

  }

  &__container {
    max-width: 70%;
  }

  &__location {
    width: 100%;
    .location__btn {
      max-width: 30%;
      color: var(--text-color-ternary);
    }
  }

}

</style>