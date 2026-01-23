<template>
  <CommonFilter :submit-function="handleSubmit" :reset-function="resetFilter">
    <template #body>
      <!-- <div class="filter__item">
        <h3 class="filter__title">Тип участника:</h3>
        <UiRadioButtonGroup class="filter__radio" v-model="searchProps.type" :options="[{ label: 'Производитель', value: 'performer' }, { label: 'Заказчик', value: 'customer' }]" name="type" :return-number="false"/>
      </div> -->
      <div class="filter__item">
        <h3 class="filter__title">Категории продукции:</h3>
        <UiCheckboxGroup
          :options="category"
          :isDropDown="true"
          :countShowed="10"
          :typeButton="{ variant: 'default', size: 'large' }"
          :isValidated="false"
          v-model="searchProps.category"
          name="category"
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
          v-model="searchProps.location"
          name="location"
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
            { id: 0, label: 'Производителя' },
            { id: 1, label: 'Заказчика' },
          ]"
          :isValidated="false"
          v-model="searchProps.material"
          name="material"
        />
      </div>
    </template>
  </CommonFilter>
</template>

<script setup>
import { useEntityStore } from "~/store/entityStore";
import { useLocationStore } from "~/store/locationStore";

const props = defineProps({
  filter: {
    type: Object,
    default: () => {},
  }
});


const entityStore = useEntityStore();
const locationStore = useLocationStore();
const emit = defineEmits(['updateFilter']);

const searchProps = ref({
  type: 'customer',
  category: [],
  location: [],
  material: [],
});

const handleSubmit = () => {
  emit('updateFilter', {...searchProps.value});
}

const resetFilter = () => {
  searchProps.value = {
    type: 'customer',
    category: [],
    location: [],
    material: [],
  };
  emit('updateFilter', []);
}


const category = computed(() => entityStore.entityData.categories);

const countryList = ref([]);


watch(() => props.filter, (newVal) => {
  searchProps.value = {
    type: newVal.type || 'customer',
    category: newVal.categories || [],
    location: newVal.countries || [],
    material: [newVal.materials_own ? 0 : undefined, newVal.materials_tolling ? 1 : undefined].filter(item => item !== undefined),
  };
}, {deep: true, once: true})

onMounted(() => {
  locationStore.getCountries().then(res => {
    countryList.value = res
  });
})

</script>

<style lang="scss">

.filter__radio {
  label {
    font-size: 1.6rem;
  }
}

</style>
