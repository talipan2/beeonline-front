<template>
  <CommonFilter @updateTutorialRefSubmit="updateTutorialRefSubmit" :submit-function="handleSubmit" :reset-function="resetFilter">
    <template #body>
      <div class="filter__item" ref="tutorialRef1">
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
    </template>
    <template #bottom>
      <div class="filter__item" ref="tutorialRef2">
        <h3 class="filter__title">Ищу заказ в:</h3>
        <CommonLocation
          v-model="searchProps.location"
          buttonLabel="Выбрать регионы"
          class="filter__location"
          :type="['selectCities', 'selectCountry', 'selectRegions']"
          name="location"
        />
      </div>
      <div class="filter__item" ref="tutorialRef3">
        <h3 class="filter__title">Объем партии:</h3>
        <UiRangeInput :min="0" :max="10000" v-model="searchProps.batch" />
      </div>
      <div class="filter__item" ref="tutorialRef4">
        <h3 class="filter__title">Срочность:</h3>
        <UiCheckbox :is-validated="false" v-model="searchProps.is_rush">Только срочные</UiCheckbox>
      </div>
      <!-- <div class="filter__item">
        <h3 class="filter__title">Безопасная сделка:</h3>
        <UiCheckbox :is-validated="false" v-model="searchProps.use_deals">С безопасной сделкой</UiCheckbox>
      </div> -->
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


const entityStore = useEntityStore();

const searchProps = ref({
  category: [],
  location: [],
  batch: [0, 10000],
  is_rush: false,
  use_deals: false,
});

const handleSubmit = () => {
  emit('updateFilter', {...searchProps.value});
}

const resetFilter = () => {
  searchProps.value = {
    category: [],
    location: [],
    batch: [0, 10000],
    is_rush: false,
    use_deals: false,
  };
  emit('updateFilter', []);
}


const category = computed(() => entityStore.entityData.categories);


const tutorialRefs = computed(() => {
  return [
    {component: tutorialRef1.value, content: 'Укажите интересующие вас категории продукции'},
    {component: tutorialRef2.value, content: 'Укажите регион, где производится продукция, которая вам интересна'},
    {component: tutorialRef3.value, content: 'Укажите объем партии'},
    {component: tutorialRef4.value, content: 'Укажите срочность'},
    {component: tutorialRefSubmit.value, content: 'Нажмите кнопку, чтобы применить параметры фильтра'},
  ];
});

const tutorialRef1 = ref(null);
const tutorialRef2 = ref(null);
const tutorialRef3 = ref(null);
const tutorialRef4 = ref(null);
const tutorialRef5 = ref(null);
const tutorialRefSubmit = ref(null);

const updateTutorialRefSubmit = (value) => {
  tutorialRefSubmit.value = value
}

watch(() => tutorialRefs.value, (newVal) => {
  emit('update:modelValue', newVal);
}, {deep: true})

watch(() => props.filter, (newVal) => {
  searchProps.value = {
    category: newVal.categories || [],
    location: newVal.location || [],
    batch: newVal.batch || [0, 10000],
    is_rush: newVal.is_rush || false,
  };
}, {deep: true, once: true})

</script>
