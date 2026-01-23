<template>
  <NuxtLayout name="catalog" title="Каталог заказов">
    <template #header>
      <UiBreadCrumb
        :list="[{ label: 'Главная', link: '/' }, { label: 'Каталог заказов', link: '' }]" />
    </template>
    <template #title>
      <CommonTutorial :data="tutorialRefs"/>
    </template>
    <template #leftSide>
      <CatalogOrdersFilter v-model="tutorialRefs" :filter="filter" @updateFilter="handleUpdateFilter" :class="{'loading': loading}" :maxBatchCount="maxBatchCount"/>
    </template>
    <template #content>
      <div ref="anchor">
        <p class="orders-description">Вы можете создать и разместить заказ через <a class="link orders-description__link" href="https://t.me/beeonline_notify_bot" target="_blank">бота быстрых заказов</a>.</p>
        <CatalogOrdersList
        :data="ordersList" 
        @updateOrderCardRef="updateServiceCardRef" 
        :class="{'loading': loading}"
        :isLoaded="isLoaded"
        />
        <CommonPagination v-if="page.lastPage > 1" :current-page="page.currentPage" :total-pages="page.lastPage" @changePage="handleChangePage" :loading="loading"/>
      </div>
    </template>
  </NuxtLayout>
</template>

<script setup>
import { useEntityStore } from '~/store/entityStore';
import { useSettingStore } from '~/store/settingStore';

useHead({
  title: 'Каталог заказов',
  meta: [
    {
      name: 'description',
      content: '',
    },
  ],
});

const entityStore = useEntityStore();
const settingStore = useSettingStore();
const ordersList = computed(() => entityStore.ordersList);

const maxBatchCount = ref(null);

const isTutorial = ref(false);
const tutorialRefs = ref([]);
const orderCardRef = ref([]);
const router = useRouter();

const anchor = ref('anchor');

const loading = ref(false);
const isLoaded = ref(false);
const page = ref({
  currentPage: 1,
  lastPage: 0,
})

const filter = ref({});

// Фильтр
const handleUpdateFilter = (data) => {
  // Если фильтры не выбраны
  if(!data || data.length === 0) {
    router.replace({ query: {} });
    entityStore.getOrders().then(res => {
      page.value = {
        currentPage: res.meta.current_page,
        lastPage: res.meta.last_page,
      }
    })
    return
  }

  // Хелпер для извлечения id из элемента (поддержка и объектов, и чисел)
  const extractId = (item) => (typeof item === 'object' && item !== null ? item.id : item);

  // добавление квери параметров для роутинга
  const newQuery = {
    categories: data.category ? data.category.join(',') : undefined,
    countries: data.location && data.location.countries && data.location.countries.length ? data.location.countries.map(extractId).join(',') : undefined,
    regions: data.location && data.location.regions && data.location.regions.length ? data.location.regions.map(extractId).join(',') : undefined,
    cities: data.location && data.location.cities && data.location.cities.length ? data.location.cities.map(extractId).join(',') : undefined,
    batch_size_min: data.batch && data.batch.length > 1 ? data.batch[0] : undefined,
    batch_size_max: data.batch && data.batch.length > 1 ? data.batch[1] : undefined,
    urgent: data.is_rush ? data.is_rush : undefined,
  }

  // добавление квери параметров для запроса
  filter.value = {
    categories: data.category && data.category.length ? data.category : undefined,
    regions: data.location && data.location.regions && data.location.regions.length ? data.location.regions.map(extractId) : undefined,
    countries: data.location && data.location.countries && data.location.countries.length ? data.location.countries.map(extractId) : undefined,
    cities: data.location && data.location.cities && data.location.cities.length ? data.location.cities.map(extractId) : undefined,
    batch_size_min: data.batch && data.batch.length > 1 ? data.batch[0] : undefined,
    batch_size_max: data.batch && data.batch.length > 1 ? data.batch[1] : undefined,
    urgent: data.is_rush ? data.is_rush : undefined,
  }

  // удаление пустых параметров
  Object.keys(newQuery).forEach((key) => {
    if (!newQuery[key]) delete newQuery[key];
  });

  loading.value = true

  // запрос на получение заказов
  entityStore.getOrders({...filter.value}).then(res => {
    if(res) {
      page.value = {
        currentPage: res.meta.current_page,
        lastPage: res.meta.last_page,
      }

      // скролл
      const rect = anchor.value.getBoundingClientRect(); 
      const offset = window.scrollY + rect.top - settingStore.headerHeight;
      smoothScroll(offset, false);

      router.replace({ query: { ...newQuery } });
    }
  }).finally(() => {
    loading.value = false
    isLoaded.value = true
  })
}

const updateServiceCardRef = (newVal) => {
  orderCardRef.value = newVal
  if(newVal) {
    tutorialRefs.value = [...tutorialRefs.value, {component: orderCardRef.value, content: 'Нажмите, чтобы просмотреть услугу'}]
  }
}

const handleChangePage = (currentPage) => {
  page.value.currentPage = currentPage
}

watch(() => page.value.currentPage, () => {
  loading.value = true
  entityStore.getOrders({page: page.value.currentPage, ...filter.value}).then(res => {
    if(res && res.meta && res.data) {
      page.value = {
        currentPage: res.meta.current_page,
        lastPage: res.meta.last_page,
      }
      const rect = anchor.value.getBoundingClientRect(); 
      const offset = window.scrollY + rect.top - settingStore.headerHeight;
      smoothScroll(offset, false);
      router.replace({ query: { page: res.meta.current_page, ...filter.value } });
    }
  }).finally(() => {
    loading.value = false
  })
})

onMounted(() => {
  let params = {}
  loading.value = true
  console.log(router.currentRoute.value.query)
  if(Object.keys(router.currentRoute.value.query).length > 0) {
    const query = router.currentRoute.value.query
    params = {
      page: query.page ? Number(query.page) : undefined,
      categories: query.categories ? query.categories.split(',').map(item => Number(item)) : undefined,
      countries: query.countries ? query.countries.split(',').map(item => Number(item)) : undefined,
      cities: query.cities ? query.cities.split(',').map(item => Number(item)) : undefined,
      regions: query.regions ? query.regions.split(',').map(item => Number(item)) : undefined,
      batch_size_min: query.batch_size_min ? Number(query.batch_size_min) : undefined,
      batch_size_max: query.batch_size_max ? Number(query.batch_size_max) : undefined,
      urgent: query.urgent ? query.urgent : undefined,
    }
    
    filter.value = {
      categories: query.categories ? query.categories.split(',').map(item => Number(item)) : [],
      location: {
        countries: query.countries ? query.countries.split(',').map(item => Number(item)) : [],
        regions: query.regions ? query.regions.split(',').map(item => Number(item)) : [],
        cities: query.cities ? query.cities.split(',').map(item => Number(item)) : [],
      },
      batch: [query.batch_size_min ? Number(query.batch_size_min) : 0, query.batch_size_max ? Number(query.batch_size_max) : 10000],
      is_rush: query.urgent ? Boolean(query.urgent) : undefined,
    }
  }
  entityStore.getOrders(params).then(res => {
    if(res && res.meta) {
      page.value = {
        currentPage: res.meta.current_page,
        lastPage: res.meta.last_page,
      }
    }
    if(res && res.max_batch) {
      maxBatchCount.value = parseFloat(Number(res.max_batch).toFixed(2))
    }
  }).finally(() => {
    loading.value = false
    isLoaded.value = true
  })
})

</script>


<style lang="scss">

.orders-description {
  font-size: 1.6em;
  margin-bottom: 1.5em;

  &__link {
    display: inline;
  }
}

</style>