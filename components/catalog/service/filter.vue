<template>
  <CommonFilter>
    <template #body>
      <div class="filter__item">
        <h3 class="filter__title">Категории продукции:</h3>
        <UiCheckboxGroup
          :options="category"
          :isDropDown="true"
          :countShowed="10"
          :typeButton="{ variant: 'default', size: 'large' }"
          :isValidated="false"
          :priority-showed="[2, 4, 6, 10]"
        >
          <template #btn-image>
            <SvgoDropDownNew class="svg-m" />
          </template>
        </UiCheckboxGroup>
      </div>
      <div class="filter__item">
        <h3 class="filter__title">Регионы производства:</h3>
        <CommonLocation
          v-model="searchProps.location"
          buttonLabel="Выбрать регионы"
          class="filter__location"
          type="selectCountry"
        />
      </div>
      <div class="filter__item">
        <h3 class="filter__title">Наличие СТМ:</h3>
        <UiCheckboxGroup
          :options="[
            { id: 0, label: 'Нет' },
            { id: 1, label: 'Да' },
          ]"
          :isValidated="false"
        />
      </div>
      <div class="filter__item">
        <h3 class="filter__title">Бесплатные образцы:</h3>
        <UiCheckboxGroup
          :options="[
            { id: 0, label: 'По запросу' },
            { id: 1, label: 'Да' },
            { id: 2, label: 'Нет' },
          ]"
          :isValidated="false"
        />
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
</script>
