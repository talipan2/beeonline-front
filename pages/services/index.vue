<template>
  <NuxtLayout name="catalog" title="Каталог услуг" class="catalog-services">
    <template #header>
      <UiBreadCrumb
        :list="[{ label: 'Главная', link: '/' }, { label: 'Каталог услуг', link: '' }]" />
    </template>
    <template #title>
      <CommonTutorial :data="tutorialRefs"/>
    </template>
    <template #leftSide>
      <CatalogServiceFilter v-model="tutorialRefs" :filter="filter" @updateFilter="handleUpdateFilter" :class="{'loading': loading}"/>
    </template>
    <template #content>
      <div ref="anchor">
        <CatalogServiceList 
          :data="servicesList" 
          @updateServiceCardRef="updateServiceCardRef" 
          :class="{'loading': loading}" 
          :banner="true" 
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
  title: 'Каталог услуг',
  meta: [
    {
      name: 'description',
      content: 'Каталог услуг',
    },
  ],
});

const entityStore = useEntityStore();
const settingStore = useSettingStore();

const router = useRouter();

const servicesList = computed(() => entityStore.servicesList);
const tutorialRefs = ref([]);
const serviceCardRef = ref([]);

const anchor = ref('anchor');

const loading = ref(false);
const isLoaded = ref(false);
const page = ref({
  currentPage: 1,
  lastPage: 0,
})

const filter = ref({
  categories: null,
  location: null,
  is_stm: null,
  free_samples: null,
  materials_own: null,
  materials_tolling: null,
});

// Фильтр
const handleUpdateFilter = (data) => {
  // Если фильтры не выбраны
  if(!data || data.length === 0) {
    router.replace({ query: {} });
    entityStore.getServices()
    return
  }

  if(loading.value) return

  // добавление квери параметров для роутинга
  const newQuery = {
    categories: data.category ? data.category.join(',') : undefined,
    countries: data.location && data.location.countries ? data.location.countries?.map(item => item.id).join(',') : undefined,
    regions: data.location && data.location.regions ? data.location.regions?.map(item => item.id).join(',') : undefined,
    is_stm: data.has_stm && data.has_stm.length ? data.has_stm.join(',') : undefined,
    free_samples: data.free_test && data.free_test.length ? data.free_test.join(',') : undefined,
    materials_own: data.material && data.material.length && data.material.includes(0) ? 1 : undefined,
    materials_tolling: data.material && data.material.length && data.material.includes(1) ? 1 : undefined,
  }

  console.log(newQuery)

  // добавление квери параметров для запроса
  filter.value = {
    categories: data.category && data.category.length ? data.category : undefined,
    regions: Object.keys(data.location).length ? Object.values(data.location).flat().map(item => item.id) : undefined,
    is_stm: data.has_stm && data.has_stm.length ? data.has_stm : undefined,
    free_samples: data.free_test && data.free_test.length ? data.free_test : undefined,
    materials_own: data.material && data.material.length && data.material.includes(0) ? 1 : undefined,
    materials_tolling: data.material && data.material.length && data.material.includes(1) ? 1 : undefined,
  }

  console.log(filter.value)

  // удаление пустых параметров
  Object.keys(newQuery).forEach((key) => {
    if (!newQuery[key]) delete newQuery[key];
  });

  loading.value = true
  isLoaded.value = false
  // обновление услуг с новыми параметрами
  entityStore.getServices({...filter.value}).then(res => {
    if(res) {
      page.value = {
        currentPage: res.meta.current_page,
        lastPage: res.meta.last_page,
      }

      // скрол
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
  serviceCardRef.value = newVal
  if(newVal) {
    tutorialRefs.value = [...tutorialRefs.value, {component: serviceCardRef.value, content: 'Нажмите, чтобы просмотреть услугу'}]
  }

}

const handleChangePage = (currentPage) => {
  page.value.currentPage = currentPage
}

watch(() => page.value.currentPage, () => {
  loading.value = true
  entityStore.getServices({page: page.value.currentPage, ...filter.value}).then(res => {
    if(res && res.meta && res.data) {
      page.value = {
        currentPage: res.meta.current_page,
        lastPage: res.meta.last_page,
      }
      const rect = anchor.value.getBoundingClientRect(); 
      const offset = window.scrollY + rect.top - settingStore.headerHeight;
      smoothScroll(offset, false);
      router.replace({ query: { ...router.currentRoute.value.query, page: res.meta.current_page } });
    }
  }).finally(() => {
    loading.value = false
  })
})

onMounted(() => {
  let params = {}
  loading.value = true

  if(Object.keys(router.currentRoute.value.query).length > 0) {
    const query = router.currentRoute.value.query
    params = {
      page: query.page ? Number(query.page) : undefined,
      categories: query.categories ? query.categories.split(',').map(item => Number(item)) : undefined,
      regions: [query.countries && query.countries.split(',').map(item => Number(item)), query.regions && query.regions.split(',').map(item => Number(item))].flat(),
      is_stm: query.is_stm ? query.is_stm.split(',').map(item => Number(item)) : undefined,
      free_samples: query.free_samples ? query.free_samples.split(',').map(item => Number(item)) : undefined,
      materials_own: query.materials_own ? Number(query.materials_own) : undefined,
      materials_tolling: query.materials_tolling ? Number(query.materials_tolling) : undefined,
    }
    console.log(params)
    
    filter.value = {
      categories: query.categories ? query.categories.split(',').map(item => Number(item)) : [],
      location: {countries: query.countries ? query.countries.split(',').map(item => Number(item)) : [], regions: query.regions ? query.regions.split(',').map(item => Number(item)) : [] },
      is_stm: query.is_stm ? query.is_stm.split(',').map(item => Number(item)) : [],
      free_samples: query.free_samples ? query.free_samples.split(',').map(item => Number(item)) : [],
      materials_own: query.materials_own ? Number(query.materials_own) : undefined,
      materials_tolling: query.materials_tolling ? Number(query.materials_tolling) : undefined,
    }
  }

  entityStore.getServices(params).then(res => {
    if(res && res.meta) {
      page.value = {
        currentPage: res.meta.current_page,
        lastPage: res.meta.last_page,
      }
    }
  }).finally(() => {
    loading.value = false
    isLoaded.value = true
  })
})

</script>

<style lang="scss">

.catalog-services {
  .catalog__container {
    column-gap: 3.5rem;

    .catalog__content {
      max-width: calc(100% - 17% - 3.5rem);
    }

    @include tablet {
    .catalog__content {
      max-width: none;
    }
  }
  }


}

</style>