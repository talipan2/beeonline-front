<template>
  <CommonFilter @updateTutorialRefSubmit="updateTutorialRefSubmit" :submit-function="handleSubmit" :reset-function="resetFilter">
    <template #body>
      <!-- <CommonTutorial :data="tutorialRefs"/> -->
      <div class="filter__item" id="filter__item" ref="tutorialRef1">
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
      <div class="filter__item" ref="tutorialRef2">
        <h3 class="filter__title">Регионы производства:</h3>
        <CommonLocation
          ref="locationFilter"
          v-model="searchProps.location"
          buttonLabel="Выбрать регионы"
          class="filter__location"
          :type="['selectCountry', 'selectRegions']"
          name="location"
          modalTitle="Выберите регион"
        />
      </div>
      <div class="filter__item" ref="tutorialRef3">
        <h3 class="filter__title">Наличие СТМ:</h3>
        <UiCheckboxGroup
          :options="[
            { id: 0, label: 'Нет' },
            { id: 1, label: 'Да' },
          ]"
          :isValidated="false"
          v-model="searchProps.has_stm"
          name="isStm"
        />
      </div>
      <div class="filter__item" ref="tutorialRef4">
        <h3 class="filter__title">Бесплатные образцы:</h3>
        <UiCheckboxGroup
          :options="[
            { id: 0, label: 'По запросу' },
            { id: 1, label: 'Да' },
            { id: 2, label: 'Нет' },
          ]"
          :isValidated="false"
          v-model="searchProps.free_test"
          name="isFreeSample"
        />
      </div>
      <div class="filter__item" ref="tutorialRef6">
        <h3 class="filter__title">Свободный склад</h3>
        <UiCheckboxGroup
          :options="[
            { id: 0, label: 'Нет' },
            { id: 1, label: 'Да' },
          ]"
          :isValidated="false"
          v-model="searchProps.free_stock"
          name="free_stock"
        />
      </div>
      <div class="filter__item" ref="tutorialRef5">
        <h3 class="filter__title">Сырье:</h3>
        <UiCheckboxGroup
          :options="[
            { id: 0, label: 'Производителя' },
            { id: 1, label: 'Заказчика' },
          ]"
          :isValidated="false"
          v-model="searchProps.material"
          name="rawMaterials"
        />
      </div>
    </template>
  </CommonFilter>
</template>

<script setup>
import { useEntityStore } from "~/store/entityStore";

const props = defineProps({
  modelValue: {
    type: Array,
    default: () => [],
  },
  filter: {
    type: Object,
    default: () => {},
  }
})

const emit = defineEmits(['update:modelValue', 'updateFilter']);

const tutorialRefs = computed(() => {
  return [
    {component: tutorialRef1.value, content: 'Укажите интересующие вас категории продукции'},
    {component: tutorialRef2.value, content: 'Укажите регион, где производится продукция, которая вам интересна'},
    {component: tutorialRef3.value, content: 'Укажите наличие собственной торговой марки'},
    {component: tutorialRef4.value, content: 'Укажите наличие бесплатных тестовых образцов'},
    {component: tutorialRef6.value, content: 'Укажите наличие свободного склада'},
    {component: tutorialRef5.value, content: 'Укажите сырье'},
    {component: tutorialRefSubmit.value, content: 'Нажмите кнопку, чтобы применить параметры фильтра'},
  ];
});

const locationFilter = ref(null);

const tutorialRef1 = ref(null);
const tutorialRef2 = ref(null);
const tutorialRef3 = ref(null);
const tutorialRef4 = ref(null);
const tutorialRef5 = ref(null);
const tutorialRef6 = ref(null);
const tutorialRefSubmit = ref(null);

const updateTutorialRefSubmit = (value) => {
  tutorialRefSubmit.value = value
}

const entityStore = useEntityStore();

const searchProps = ref({
  category: [],
  location: [],
  has_stm: [],
  free_test: [],
  free_stock: [],
  material: [],
});

const handleSubmit = () => {
  emit('updateFilter', {...searchProps.value});
}

const resetFilter = () => {
  searchProps.value = {
    category: [],
    location: [],
    has_stm: [],
    free_test: [],
    free_stock: [],
    material: [],
  };
  emit('updateFilter', []);
  locationFilter.value.resetData();
}

const category = computed(() => entityStore.entityData.categories);



watch(() => tutorialRefs.value, (newVal) => {
  emit('update:modelValue', newVal);
}, {deep: true})

watch(() => props.filter, (newVal) => {
  searchProps.value = {
    category: newVal.categories || [],
    location: {...newVal.location, cities: []} || [],
    has_stm: newVal.is_stm || [],
    free_test: newVal.free_samples || [],
    free_stock: newVal.free_stock || [],
    material: [newVal.materials_own ? 0 : undefined, newVal.materials_tolling ? 1 : undefined].filter(item => item !== undefined),
  };
}, {deep: true, once: true})

</script>
