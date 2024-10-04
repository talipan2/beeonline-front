<template>
  <CommonFilter>
    <template #body>
      <div class="filter__item">
        <h3 class="filter__title">Тип участника:</h3>
        <UiRadioButtonGroup class="filter__radio" :options="[{ label: 'Исполнитель', id: 0 }, { label: 'Заказчик', id: 1 }]" name="type"/>
      </div>
      <div class="filter__item">
        <h3 class="filter__title">Категории продукции:</h3>
        <UiCheckboxGroup
          :options="category"
          :isDropDown="true"
          :countShowed="10"
          :typeButton="{ variant: 'default', size: 'large' }"
          :isValidated="false"
          :priorityShowed="[2, 4, 6, 10]"
        >
          <template #btn-image>
            <SvgoDropDownNew class="svg-m" />
          </template>
        </UiCheckboxGroup>
      </div>
      <div class="filter__item">
        <h3 class="filter__title">Страна:</h3>
        <UiCheckboxGroup
          :options="countryList"
          :isDropDown="true"
          :countShowed="10"
          :typeButton="{ variant: 'default', size: 'large' }"
          :isValidated="false"
        >
          <template #btn-image>
            <SvgoDropDownNew class="svg-m" />
          </template>
        </UiCheckboxGroup>
      </div>
      <div class="filter__item">
        <h3 class="filter__title">Сырье:</h3>
        <UiCheckboxGroup
          :options="[
            { id: 0, label: 'Собственное' },
            { id: 1, label: 'Давальческое' },
          ]"
          :isValidated="false"
        />
      </div>
    </template>
  </CommonFilter>
</template>

<script setup>
import { useEntityStore } from "~/store/entityStore";

const entityStore = useEntityStore();

const searchProps = {
  location: [],
};

const category = computed(() => entityStore.entityData.categories);

const countryList = computed(() => {
  return [
    { id: 1, label: 'Россия' },
    { id: 2, label: 'Белоруссия' },
    { id: 3, label: 'Казахстан' },
    { id: 4, label: 'Армения' },
    { id: 5, label: 'Узбекистан' },
    { id: 6, label: 'Киргизия' },
    { id: 7, label: 'Испания' },
    { id: 8, label: 'Тунис' },
    { id: 9, label: 'Грузия' },
    { id: 10, label: 'Австрия' },
    { id: 11, label: 'Литва' },
    { id: 12, label: 'Албания' },
  ]
})
</script>

<style lang="scss">

.filter__radio {
  label {
    font-size: 1.6rem;
  }
}

</style>