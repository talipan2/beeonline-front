<template>
  <CommonFilter @updateTutorialRefSubmit="updateTutorialRefSubmit">
    <template #body>
      <div class="filter__item" ref="tutorialRef1">
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
      <div class="filter__item" ref="tutorialRef2">
        <h3 class="filter__title">Ищу заказ в:</h3>
        <CommonLocation
          v-model="searchProps.location"
          buttonLabel="Выбрать регионы"
          class="filter__location"
          :type="['selectCities', 'selectCountry']"
        />
      </div>
      <div class="filter__item" ref="tutorialRef3">
        <h3 class="filter__title">Объем партии:</h3>
        <UiRangeInput v-model="searchProps.price"/>
      </div>
      <div class="filter__item" ref="tutorialRef4">
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

const props = defineProps({
  modelValue: {
    type: Array,
    default: () => [],
  },
})

const entityStore = useEntityStore();

const searchProps = {
  location: [],
  price: [0, 10000],
};

const category = computed(() => entityStore.entityData.categories);

const emit = defineEmits(['update:modelValue']);

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
</script>
