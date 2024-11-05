<template>
  <CommonFilter @updateTutorialRefSubmit="updateTutorialRefSubmit">
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
          :priority-showed="[2, 4, 6, 10]"
        >
          <template #btn-image>
            <SvgoDropDownNew class="svg-m" />
          </template>
        </UiCheckboxGroup>
      </div>
      <div class="filter__item" ref="tutorialRef2">
        <h3 class="filter__title">Регионы производства:</h3>
        <CommonLocation
          v-model="searchProps.location"
          buttonLabel="Выбрать регионы"
          class="filter__location"
          type="selectCountry"
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
        />
      </div>
      <div class="filter__item" ref="tutorialRef5">
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

const props = defineProps({
  modelValue: {
    type: Array,
    default: () => [],
  }
})

const emit = defineEmits(['update:modelValue']);

const tutorialRefs = computed(() => {
  return [
    {component: tutorialRef1.value, content: 'Укажите интересующие вас категории продукции'},
    {component: tutorialRef2.value, content: 'Укажите регион, где производится продукция, которая вам интересна'},
    {component: tutorialRef3.value, content: 'Укажите наличие собственной торговой марки'},
    {component: tutorialRef4.value, content: 'Укажите наличие бесплатных тестовых образцов'},
    {component: tutorialRef5.value, content: 'Укажите сырье'},
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

const entityStore = useEntityStore();

const searchProps = {
  location: [],
};

const category = computed(() => entityStore.entityData.categories);

watch(() => tutorialRefs.value, (newVal) => {
  emit('update:modelValue', newVal);
}, {deep: true})

</script>
