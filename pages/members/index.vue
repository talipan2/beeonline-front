<template>
  <NuxtLayout name="catalog" title="Участники портала" :className="'members'">
    <template #header>
      <UiBreadCrumb
        :list="[{ label: 'Главная', link: '/' }, { label: 'Участники портала', link: '' }]" />
    </template>
    <template #leftSide>
      <CatalogMembersFilter :filter="filter" @updateFilter="handleUpdateFilter" :class="{'loading': loading}"/>
    </template>
    <template #content>
      <div ref="anchor" :class="{'loading': loading}">
        <CatalogMembersList :data="data" :page="page" :isLoaded="isLoaded"/>
        <CommonPagination v-if="page.lastPage > 1" :current-page="page.currentPage" :total-pages="page.lastPage" @changePage="handleChangePage" :loading="loading"/>
      </div>
    </template>
  </NuxtLayout>
</template>

<script setup>
import { useOrganizationStore } from '~/store/organizationStore';
import { useSettingStore } from '~/store/settingStore';

const organizationStore = useOrganizationStore();
const settingStore = useSettingStore();

const router = useRouter();
const anchor = ref(null);

const loading = ref(false);
const isLoaded = ref(false);
const page = ref({
  currentPage: 1,
  lastPage: 0,
  total: 0,
  itemsToPage: 0,
})

const data = computed(() => {
  return organizationStore.pubCardsList.map(item => {
    return {
      id: item.id,
      name: item.name,
      logo: item.logo,
      description: item.description,
      fillRating: item.fill_rating,
      reviewCount: item.reviews_about_count,
      stars: item.reviews_stats_about?.stars,
      rating: item.reviews_stats_about?.average_rating,
      entityCount: item.type === 'performer' ? item.services_count : item.orders_count,
      category: item.categories && item.categories.length ? item.categories.map(item => item.name) : [],
      rawMaterials: [item.materials_own ? 'Собственное' : '', item.materials_tolling ? 'Давальческое' : ''].filter(Boolean),
      type: item.type,
      countryId: {countries: [item.country]},
      country: {countries: [item.country]},
    }
  })
});

const filter = ref({});

// Фильтр
const handleUpdateFilter = (data) => {

  // Если фильтры не выбраны 
  if(!data || data.length === 0) {
    router.replace({ query: {} });
    organizationStore.getPubCardsList({type: 'performer'});
    return
  }

  // добавление квери параметров для роутинга
  const newQuery = {
    type: data.type ? data.type : undefined,
    categories: data.category ? data.category.join(',') : undefined,
    countries: data.location ? data.location.join(',') : undefined,
    materials_own: data.material && data.material.length && data.material.includes(0) ? 1 : undefined,
    materials_tolling: data.material && data.material.length && data.material.includes(1) ? 1 : undefined,
  }
  console.log(newQuery)

  // добавление квери параметров для запроса
  filter.value = {
    type: data.type ? data.type : undefined,
    categories: data.category && data.category.length ? data.category : undefined,
    countries: data.location && data.location.length ? data.location : undefined,
    materials_own: data.material && data.material.length && data.material.includes(0) ? 1 : undefined,
    materials_tolling: data.material && data.material.length && data.material.includes(1) ? 1 : undefined,
  }

  // удаление пустых параметров 
  Object.keys(newQuery).forEach((key) => {
    if (!newQuery[key]) delete newQuery[key];
  });

  // обновление роутинга 
  router.replace({ query: { ...newQuery } });

  loading.value = true
  isLoaded.value = false

  // запрос на получение данных с фильтром
  organizationStore.getPubCardsList({...filter.value}).then(res => {
    if(res) {
      page.value = {
        currentPage: res.meta.current_page,
        lastPage: res.meta.last_page,
        total: res.meta.total,
        itemsToPage: res.meta.per_page
      }

      // скрол на начало списка
      const rect = anchor.value.getBoundingClientRect(); 
      const offset = window.scrollY + rect.top - settingStore.headerHeight;
      smoothScroll(offset, false);
    }
  }).finally(() => {
    loading.value = false
    isLoaded.value = true
  })
}

const handleChangePage = (currentPage) => {
  page.value.currentPage = currentPage
}

// отслеживание текущей страницы для пагинации
watch(() => page.value.currentPage, () => {
  loading.value = true
  isLoaded.value = false
  organizationStore.getPubCardsList({page: page.value.currentPage, ...filter.value}).then(res => {
    if(res && res.meta && res.data) {
      page.value = {
        currentPage: res.meta.current_page,
        lastPage: res.meta.last_page,
        total: res.meta.total,
        itemsToPage: res.meta.to - res.meta.from
      }
      const rect = anchor.value.getBoundingClientRect(); 
      const offset = window.scrollY + rect.top - settingStore.headerHeight;
      smoothScroll(offset, false);
      router.replace({ query: { page: res.meta.current_page } });
    }
  }).finally(() => {
    loading.value = false
    isLoaded.value = true
  })
})

onMounted(() => {
  let params = {
    type: 'performer'
  }

  loading.value = true
  isLoaded.value = false

  if(Object.keys(router.currentRoute.value.query).length > 0) {
    const query = router.currentRoute.value.query

    params = {
      page: query.page ? Number(query.page) : undefined,
      type: query.type ? query.type : 'performer',
      categories: query.categories ? query.categories.split(',').map(item => Number(item)) : undefined,
      countries: query.countries ? query.countries.split(',').map(item => Number(item)) : undefined,
      materials_own: query.materials_own ? Number(query.materials_own) : undefined,
      materials_tolling: query.materials_tolling ? Number(query.materials_tolling) : undefined,
    }

    filter.value = {
      type: query.type ? query.type : 'performer',
      categories: query.categories ? query.categories.split(',').map(item => Number(item)) : [],
      countries: query.countries ? query.countries.split(',').map(item => Number(item)) : [],
      materials_own: query.materials_own ? Number(query.materials_own) : undefined,
      materials_tolling: query.materials_tolling ? Number(query.materials_tolling) : undefined,
    }
  }

  organizationStore.getPubCardsList(params).then(res => {
    if(res && res.meta) {
      page.value = {
        currentPage: res.meta.current_page,
        lastPage: res.meta.last_page,
        total: res.meta.total,
        itemsToPage: res.meta.to - res.meta.from
      }
    }
  }).finally(() => {
    loading.value = false
    isLoaded.value = true
  })
})



</script>