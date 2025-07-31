<template>
  <div class="entity-filter">
    <UiSelect
      v-for="(filter, index) in filters"
      :key="index"
      class="entity-filter__select"
      :options="getOptions(filter)"
      v-model="selectedFilters[filter]"
      :return-value="true"
      :error-show="false"
    />
  </div>
</template>

<script setup>
import { useEntityStore } from '~/store/entityStore';

const props = defineProps({
  filters: {
    type: Array,
    required: true,
    default: () => [],
  },
  activeFilters: {
    type: Object,
    default: () => ({}),
  },
  resetFilters: {
    type: Boolean,
    default: false,
  },
  filterMapping: {
    type: Object,
    default: () => ({}),
  }
});

const entityStore = useEntityStore();
const selectedFilters = ref({});
const emit = defineEmits(['setFilters']);


// Функция для возвращения нужных опций в зависимости от типа фильтра
const getOptions = (type) => {
  switch (type) {
    case 'category':
      return categoryOptions.value;
    case 'minLot':
      return minLotOptions.value;
    case 'date':
      return dateOptions.value;
    case 'rate':
      return statusReviewOptions;
    case 'org_type':
      return participantOptions;
    case 'status':
      return entityStatusOptions;
  }
};

// Создаем объект конфигураций для каждого фильтра
const categoryOptions = computed(() => [
  { id: 0, label: 'Все категории', value: 'all' },
  ...entityStore.entityData.categories.map((category) => {
    return { id: category.id, label: category.name, value: category.id };
  })
]);

const minLotOptions = computed(() => [
  { id: 0, label: 'Любой объем партии', value: 'all' },
  ...entityStore.entityData.minLot.map((minLot) => {
    return { id: minLot.id, label: minLot.label, value: minLot.id };
  })
]);

const dateOptions = computed(() => [
  { id: 0, label: 'Любой срок выполнения', value: 'all' },
  { id: 1, label: '1 неделя', value: 'week' },
  { id: 2, label: '1 месяц', value: 'month' },
  { id: 3, label: '1 год', value: 'year' },
]);

const statusReviewOptions = [
  { id: 0, label: "Все отзывы", value: "all" },
  { id: 1, label: "Положительные", value: "positive" },
  { id: 2, label: "Отрицательные", value: "negative" },
];

const participantOptions = [
  { id: 0, label: "От всех участников", value: "all" },
  { id: 1, label: "От производителей", value: "performer" },
  { id: 2, label: "От заказчиков", value: "customer" },
  { id: 3, label: "От поставщиков", value: "supplier" },
];

const entityStatusOptions = [
  { id: 0, label: 'Все статусы', value: 'all' },
  { id: 1, label: 'Активные', value: 'active' },
  { id: 2, label: 'Черновики', value: 'draft' },
  { id: 3, label: 'В архиве', value: 'archived' },
  { id: 4, label: 'Заполняется', value: 'filling' },
  { id: 5, label: 'На модерации', value: 'under_moderation' },
  { id: 6, label: 'Отклонен', value: 'rejected' },
]

// Сброс фильтров
const resetFilters = () => {
  Object.keys(selectedFilters.value).forEach((key) => {
    selectedFilters.value[key] = 'all';
  });
}

// ОТправка родителю выбранных фильтров
watch(() => selectedFilters.value, (newVal, oldVal) => {
  const mappedFilters = {};

  // Применяем маппинг имен
  for (const key in newVal) {
    const backendKey = props.filterMapping[key] || key; // Используем маппинг или оставляем оригинальное имя
    mappedFilters[backendKey] = newVal[key];
  }

  emit('setFilters', mappedFilters); // Отправляем фильтры с именами для бэкенда
}, { deep: true });


// установки активных фильтров при обновлении страницы
watch(() => props.activeFilters, (newVal, oldVal) => {
  // if (Object.keys(newVal).length !== 0 && (JSON.stringify(newVal) !== JSON.stringify(oldVal))) {
  //   selectedFilters.value = { ...newVal }; // Обновляем выбранные фильтры
  // }

  if (Object.keys(newVal).length === 0) {
    resetFilters();
  }
}, { deep: true, immediate: true });

// Инициализируем значения фильтров
onMounted(async() => {
  await nextTick();
  props.filters.forEach((filter) => {
    selectedFilters.value[filter] = props.activeFilters[filter] || 'all';
  })
})


</script>

<style lang="scss">

.entity-filter {
  display: flex;
  flex-wrap: wrap;
  font-size: 1.6rem;
  margin-bottom: 2em;
  column-gap: 2em;
  row-gap: 1em;

  &__select {
    flex: 1 1 30%;
    max-width: 33%;
  }

  .select__select {
    padding: .875em;
    color: var(--text-color-senary);
  }
}

@include mobile {
  .entity-filter {

    &__select {
      flex: 0 1 100%;
      max-width: 100%;
    }
  }
}

</style>
