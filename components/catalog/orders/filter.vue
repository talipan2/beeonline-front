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
          :priority-showed="[2, 4, 6, 10]"
          :isValidated="false"
        >
          <template #btn-image>
            <SvgoDropDownNew class="svg-m" />
          </template>
        </UiCheckboxGroup>
      </div>
    </template>
    <template #bottom>
      <div class="filter__item">
        <h3 class="filter__title">Ищу заказ в:</h3>
        <CommonLocation
          v-model="searchProps.location"
          buttonLabel="Выбрать регионы"
          class="filter__location"
          :maxSelected="2"
          :type="['selectCities', 'selectCountry']"
        />
      </div>
      <div class="filter__item">
        <h3 class="filter__title">Объем партии:</h3>
        <UiRangeInput v-model="searchProps.price"/>
      </div>
      <div class="filter__item">
        <h3 class="filter__title">Срочность:</h3>
        <UiCheckbox :is-validated="false">Только срочные</UiCheckbox>
      </div>
      <div class="filter__item">
        <h3 class="filter__title">Безопасная сделка:</h3>
        <UiCheckbox :is-validated="false">С безопасной сделкой</UiCheckbox>
      </div>
    </template>
  </CommonFilter>
</template>

<script setup>
import { useEntityStore } from "~/store/entityStore";

const entityStore = useEntityStore();

const searchProps = {
  location: [],
  price: [0, 10000],
};

const category = computed(() => entityStore.entityData.categories);
</script>
