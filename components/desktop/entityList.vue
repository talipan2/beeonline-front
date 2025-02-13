<template>
  <div class="desktop-entity">
    <h2 class="desktop__title" v-if="role == 'customer'">Заказы</h2>
    <h2 class="desktop__title" v-if="role == 'performer'">Услуги</h2>
    <div :class="{ loading: isLoading }">
      <CommonSelectorListButtons :buttonsList="selectorButtons" @updateActiveButton="currentEntityType" />
        <CommonFilterSelectList :filters="filterList" @setFilters="setFilters" :activeFilters="activeFilter"/>
        <div class="desktop-entity__list" v-if="currentEntityList.length">
          <template v-for="(item, index) in currentEntityList" :key="index">
            <DesktopEntityCard :data="item" />
          </template>
        </div>
        <CommonAlerts v-else type="warning" :alert="currentEmptyList"/>
      </div>
  </div>
</template>

<script setup>
import { useEntityStore } from '~/store/entityStore';


const props = defineProps({
  role: {
    type: String,
    required: true,
  },
  getEntity: {
    type: Function,
    required: true,
  },
  filterList: {
    type: Array,
    required: true,
  }
})

const isLoading = ref(true);  // Состояние загрузки
const activeFilter = ref({}) // Активные фильтры
const currentEntityList = ref([]); // Текущий список сущностей
const entityStore = useEntityStore();

const selectorButtons = [
  { id: 1, label: 'Активные', value: 'active', count: computed(() => currentEntityList.value.length), },
  { id: 2, label: 'Черновики', value: 'draft', count: computed(() => currentEntityList.value.length), },
  { id: 3, label: 'В архиве', value: 'archive', count: computed(() => currentEntityList.value.length) },
];

const currentButton = ref(selectorButtons[0].value); // Текущая кнопка

const currentEmptyList = computed(() => {
  switch (props.role) {
    case('customer'):
      return 'Нет заказов с данными параметрами'
    case('performer'):
      return 'Нет услуг с данными параметрами'
  }
}) 

// функция обновления активной кнопки
const currentEntityType = (type) => {
  currentButton.value = type;
}

// Имитируем запрос за данными и скрытие анимации после его завершения
const fetchData = async (type, filter) => {
  isLoading.value = true;
  try {
    currentEntityList.value = await props.getEntity(type, filter);
    currentEntityList.value = currentEntityList.value.map((item) => {
      return {
        id: item.id,
        name: item.name,
        logo: item.logo ? item.logo : '',
        views: 0,
        categories: item.product_categories && item.product_categories.length ? item.product_categories.map(item => item.name) : [],
        status: entityStore.getEntityStatusByValue(item.status),
        type: props.role,
      }
    })
  } catch (error) {
    console.error("Ошибка при загрузке данных:", error);
  } finally {
    isLoading.value = false; 
  }
};

const setFilters = (filters) => {
  activeFilter.value = {...filters}
  fetchData(currentButton.value, {...filters})
}

// сброс фильтров при изменении списка сущности
watch(() => currentButton.value, (newVal) => {
  activeFilter.value = {}
  fetchData(newVal)
}, {deep: true});

// для установки фильтров при обновлении страницы с query параметров

// onMounted(() => {
//   const query = router.currentRoute.value.query;
  
//   if (Object.keys(query).length > 0) {
//     activeFilter.value = { ...activeFilter.value, ...query };
//   }
// });

onMounted(() => {
  fetchData(currentButton.value);
});

</script>

<style lang="scss">
.desktop-entity {
  &__list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: 2em;
  }
  
  .loading {
    opacity: .6;
    pointer-events: none;
  }
}


</style>