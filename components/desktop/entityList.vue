<template>
  <div class="desktop-entity">
    <h2 class="desktop__title" v-if="role == 'customer'">Заказы</h2>
    <h2 class="desktop__title" v-if="role == 'performer'">Услуги</h2>
    <div :class="{ loading: isLoading }">
      <CommonSelectorListButtons :buttonsList="selectorButtons" @updateActiveButton="currentEntityType" />
        <CommonFilterSelectList :filters="filterList" @setFilters="setFilters" :activeFilters="activeFilter" :filter-mapping="filterMapping"/>
        <div class="desktop-entity__list" v-if="currentEntityList.length">
          <template v-for="(item, index) in currentEntityList" :key="index">
            <DesktopEntityCard :data="item" />
          </template>
        </div>
        <CommonAlerts v-else type="warning" :alert="currentEmptyList"/>
        <CommonPagination v-if="page.lastPage > 1" :current-page="page.currentPage" :total-pages="page.lastPage" @change-page="handlePageChange" />
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
  },
})

const filterMapping = {
  category: 'product_category_id',
  minLot: 'batch_size',
  date: 'deadline'
}

const isLoading = ref(true);  // Состояние загрузки
const activeFilter = ref({}) // Активные фильтры
const currentEntityList = ref([]); // Текущий список сущностей
const entityStore = useEntityStore();

const selectorButtons = [
  { id: 1, label: 'Активные', value: 'active', count: computed(() => statusCounts.value.active), },
  { id: 2, label: 'Черновики', value: 'draft', count: computed(() => statusCounts.value.draft), },
  { id: 3, label: 'В архиве', value: 'archived', count: computed(() => statusCounts.value.archived), },
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

const page = ref({
  currentPage: 1,
  lastPage: 1
});

// функция обновления активной кнопки
const currentEntityType = (type) => {
  currentButton.value = type;
}

const statusCounts = ref({
  active: 0,
  draft: 0,
  archived: 0
});

const fetchData = async (type, filter) => {
  isLoading.value = true;
  if(!filter) filter = {}
  let activeFilters = deleteEmptyFilters(filter);
  if(activeFilters.batch_size) {
    activeFilters.batch_size = entityStore.getEntityLabelById('minLot', activeFilters.batch_size);
    activeFilters.batch_size = activeFilters.batch_size.charAt(0).toUpperCase() + activeFilters.batch_size.slice(1);
  }
  if(activeFilters.deadline) {
    switch (activeFilters.deadline) {
      case('week'):
        activeFilters.deadline = '1 неделя';
        break;
      case('month'):
        activeFilters.deadline = '1 месяц';
        break;
      case('year'):
        activeFilters.deadline = '1 год';
        break;
    }
  }
  try {
    await props.getEntity({status: type, ...activeFilters}).then((res) => {
      if(res && res.data && res.data.data) {
        currentEntityList.value = res.data.data;
        page.value = {
          currentPage: res.data.current_page,
          lastPage: res.data.last_page
        }
        statusCounts.value = {
          active: res.total?.active || 0,
          draft: res.total?.draft || 0,
          archived: res.total?.archived || 0
        }
      }
    })
    currentEntityList.value = currentEntityList.value.map((item) => {
      return {
        id: item.id,
        name: item.name,
        logo: item.logo ? item.logo : '',
        categories: item.product_categories && item.product_categories.length ? item.product_categories.map(item => item.name) : [],
        status: entityStore.getEntityStatusByValue(item.status),
        type: props.role,
        viewsCount: item.view_count,
        chatsCount: item.chats_count,
        favoritesCount: item.favorites_count
      }
    })
  } catch (error) {
    console.error("Ошибка при загрузке данных:", error);
  } finally {
    isLoading.value = false;
  }
};

const deleteEmptyFilters = (filter) => {
  if(!filter) return;
  for (const key in filter) {
    if (filter[key] === "all") {
      delete filter[key];
    }
  }
  return filter;
}

const setFilters = (filters) => {
  activeFilter.value = {...filters}
  fetchData(currentButton.value, {...filters})
}

const handlePageChange = (page) => {
  fetchData(currentButton.value, {page, ...activeFilter.value});
}

// сброс фильтров при изменении списка сущности
watch(() => currentButton.value, (newVal) => {
  activeFilter.value = {}
  fetchData(newVal)
}, {deep: true});

watch(() => props.role, (newVal) => {
  fetchData(currentButton.value)
}, {deep: true});

// для установки фильтров при обновлении страницы с query параметров

// onMounted(() => {
//   const query = router.currentRoute.value.query;

//   if (Object.keys(query).length > 0) {
//     activeFilter.value = { ...activeFilter.value, ...query };
//   }
// });

onMounted(() => {
  activeFilter.value = {}
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
