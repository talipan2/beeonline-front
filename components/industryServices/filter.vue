<template>
  <CommonFilter :submit-function="handleSubmit" :reset-function="resetFilter">
    <template #body>
      <div class="filter__item">
        <h3 class="filter__title">Категории:</h3>
        <UiCheckboxGroup
          :options="category"
          :isValidated="false"
          v-model="searchProps.category"
          name="category"
        >
          <template #btn-image>
            <SvgoDropDownNew class="svg-m" />
          </template>
        </UiCheckboxGroup>
      </div>
    </template>
  </CommonFilter>
</template>

<script setup>

const emit = defineEmits(['updateFilter']);

const searchProps = ref({
  category: [],
});

const category = ref([
  { id: 1, label: 'Консалтинговые агентства', value: 'production' },
  { id: 2, label: 'Логистических компании', value: 'design' },
  { id: 3, label: 'Банки', value: 'development' },
  { id: 4, label: 'Образовательные центры', value: 'engineering' },
  { id: 5, label: 'Выставочные компании', value: 'testing' },
])

const handleSubmit = () => {
  emit('updateFilter', {...searchProps.value});
}

const resetFilter = () => {
  searchProps.value = {
    type: 'performer',
    category: [],
    location: [],
    material: [],
  };
  emit('updateFilter', []);
}


</script>