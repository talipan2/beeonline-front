<template>
  <!-- <NuxtLayout name="catalog" title="Каталог услуг" class="catalog-services">
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
  </NuxtLayout> -->
  <NuxtLayout name="info" className="catalog-services" title="Каталог исполнителей">
    <template #header>
      <UiBreadCrumb :list="[{label: 'Главная', link: '/'}, { label: 'Каталог исполнителей', link: '' }]" />
    </template>
    <template #content>
      <div class="new-service">
        <CommonSelectableButtons :options="categoryList" v-model="filter.categories" mobileButtonText="Категории" :iconButton="clothes">
          <div class="new-service__filters" :class="isMobile ? 'new-service__filter_type_mobile' : 'new-service__filter_type_desktop'">
            <CatalogNewServiceFilter class="new-service__filter" @updateFilter="handleUpdateFilter" @resetFilter="handleResetFilter" :filter="filter"/>
            <template v-if="!isMobile">
              <UiButton type="button" class="new-service__btn" variant="default" :without-padding="true" @click="handleResetFilter">Сбросить фильтры</UiButton>
              <UiButton type="button" class="new-service__btn" variant="quinary" size="large" @click="handleUpdateFilter(filter)">Применить фильтры</UiButton>
            </template>
          </div>
          <template v-if="isMobile">
            <UiButton 
              type="button" 
              class="new-service__btn new-service__reset-filter-btn" 
              variant="tertiary" 
              size="large" 
              @click="handleResetFilter"
            >
              Сбросить фильтры
            </UiButton>
          </template>
        </CommonSelectableButtons>
        <div ref="anchor" :class="{'loading': loading}">
          <CatalogNewService :servicesList="servicesList" :slider="true"/>
          <!-- {{ servicesList }} -->
        </div>
        <CommonPagination 
          v-if="page.lastPage > 1"
          :current-page="page.currentPage" 
          :total-pages="page.lastPage" 
          @changePage="handleChangePage" 
          :loading="loading" 
          btnType="square" 
          position="left"
        />
      </div>
    </template>
  </NuxtLayout>
</template>

<script setup>
import { useEntityStore } from '~/store/entityStore';
import { useSettingStore } from '~/store/settingStore';
import clothes from '~/assets/svg/clothes.svg';
import { useOrganizationStore } from '~/store/organizationStore';

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
const organizationStore = useOrganizationStore();

const router = useRouter();

const servicesList = computed(() => organizationStore.pubCardsList);
const tutorialRefs = ref([]);
const serviceCardRef = ref([]);
const categoryList = computed(() => entityStore.entityData.categories);
const isMobile = ref(false);

const anchor = ref('anchor');

const loading = ref(false);
const isLoaded = ref(false);
const page = ref({
  currentPage: 1,
  lastPage: 0,
})

const filter = ref({
  type: 'performer',
  categories: [],
  location: [],
  is_stm: null,
  free_test: [],
  material: [],
  free_stock: null,
  verification: null,
  batch_id: null,
});


const handleResetFilter = () => {
  filter.value = {
    type: 'performer',
    categories: [],
    location: [],
    is_stm: null,
    free_samples: null,
    materials_own: null,
    materials_tolling: null,
    free_stock: null,
    rawMaterials: null,
    batch_id: null,
  }
  handleUpdateFilter();
}

watch(() => filter.value.categories, (newValue) => {
  handleUpdateFilter(filter.value);
})

// Фильтр
const handleUpdateFilter = (data) => {
  // Если фильтры не выбраны
  if(!data || data.length === 0) {
    router.replace({});
    loading.value = true;
    organizationStore.getPubCardsList({type: 'performer'}).then(res => {
      page.value = {
        currentPage: res.meta.current_page,
        lastPage: res.meta.last_page,
      }
    }).finally(() => {loading.value = false});
    return
  }

  if(loading.value) return

  console.log(data)

  // добавление квери параметров для роутинга
  const newQuery = {
    type: 'performer',
    categories: data.categories ? data.categories.join(',') : undefined,
    countries: data.location && data.location.countries ? data.location.countries?.map(item => item.id).join(',') : undefined,
    regions: data.location && data.location.regions ? data.location.regions?.map(item => item.id).join(',') : undefined,
    is_stm: data.is_stm != null ? data.is_stm : undefined,
    free_samples: data.free_samples && data.free_samples.length ? data.free_samples.join(',') : undefined,
    free_stock: data.free_stock != null ? data.free_stock : undefined,
    materials_own: data.material && data.material.length && data.material.includes(0) ? 1 : undefined,
    materials_tolling: data.material && data.material.length && data.material.includes(1) ? 1 : undefined,
    batch_id: data.batch_id != null ? data.batch_id : undefined,
  }

  // добавление квери параметров для запроса
  const filterQuery = {
    type: 'performer',
    categories: data.categories && data.categories.length ? data.categories : undefined,
    regions: data.location && data.location.regions ? data.location.regions?.map(item => item.id) : undefined,
    countries: data.location && data.location.countries ? data.location.countries?.map(item => item.id) : undefined,
    is_stm: data.is_stm != null ? Boolean(data.is_stm) : undefined,
    free_samples: data.free_samples && data.free_samples.length ? data.free_samples : undefined,
    free_stock: data.free_stock != null ? Boolean(data.free_stock) : undefined,
    materials_own: data.material && data.material.length && data.material.includes(0) ? 1 : undefined,
    materials_tolling: data.material && data.material.length && data.material.includes(1) ? 1 : undefined,
    batch_ids: data.batch_id != null ? [data.batch_id] : undefined,
  }

  // удаление пустых параметров
  Object.keys(newQuery).forEach((key) => {
    if (newQuery[key] === undefined) delete newQuery[key];
  });

  loading.value = true
  isLoaded.value = false
  // обновление услуг с новыми параметрами
  organizationStore.getPubCardsList({...filterQuery}).then(res => {
    if(res) {
      page.value = {
        currentPage: res.meta.current_page,
        lastPage: res.meta.last_page,
      }
      
      // скрол
      // const rect = anchor.value.getBoundingClientRect(); 
      // const offset = window.scrollY + rect.top - settingStore.headerHeight;
      // smoothScroll(offset, false);

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
  organizationStore.getPubCardsList({page: page.value.currentPage, ...filter.value}).then(res => {
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

const updateIsMobile = () => {
  isMobile.value = window.innerWidth < 768;
};


onMounted(() => {
  let params = {}
  loading.value = true

  if(Object.keys(router.currentRoute.value.query).length > 0) {
    const query = router.currentRoute.value.query
    params = {
      type: 'performer',
      page: query.page ? Number(query.page) : undefined,
      categories: query.categories ? query.categories.split(',').map(item => Number(item)) : undefined,
      countries: [query.countries && query.countries.split(',').map(item => Number(item))].flat(),
      regions: [query.regions && query.regions.split(',').map(item => Number(item))].flat(),
      is_stm: query.is_stm ? Number(query.is_stm) : undefined,
      free_samples: query.free_samples ? query.free_samples.split(',').map(item => Number(item)) : undefined,
      free_stock: query.free_stock ? Number(query.free_stock) : undefined,
      materials_own: query.materials_own ? Number(query.materials_own) : undefined,
      materials_tolling: query.materials_tolling ? Number(query.materials_tolling) : undefined,
      batch_ids: query.batch_id ? [Number(query.batch_id)] : undefined
    }
    console.log(params)
    
    filter.value = {
      type: 'performer',
      categories: query.categories ? query.categories.split(',').map(item => Number(item)) : [],
      location: {countries: query.countries ? query.countries.split(',').map(item => Number(item)) : [], regions: query.regions ? query.regions.split(',').map(item => Number(item)) : [] },
      is_stm: query.is_stm ? Number(query.is_stm) : undefined,
      free_samples: query.free_samples ? query.free_samples.split(',').map(item => Number(item)) : [],
      free_stock: query.free_stock ? Number(query.free_stock) : undefined,
      materials_own: query.materials_own ? Number(query.materials_own) : undefined,
      materials_tolling: query.materials_tolling ? Number(query.materials_tolling) : undefined,
      batch_id: query.batch_id ? Number(query.batch_id) : undefined
    }
  }

  organizationStore.getPubCardsList({...params, type: 'performer'}).then(res => {
    if(res) {
      console.log(res)
      page.value = {
        currentPage: res.meta.current_page,
        lastPage: res.meta.last_page,
      }
    }
  }).finally(() => {
    loading.value = false
    isLoaded.value = true
  })

  updateIsMobile();
  window.addEventListener('resize', updateIsMobile);
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateIsMobile);
});

</script>

<style lang="scss">

.catalog-services {
  .catalog__container {
    column-gap: 3.5rem;

    .catalog__content {
      max-width: calc(100% - 17% - 3.5rem);
    }

    @include mobile {
      .catalog__content {
        max-width: 100%;
      }
  }
  }
}

.new-service {
  font-size: 1rem;

  &__filters {
    display: flex;
    column-gap: 5em;
    margin-bottom: 2.4em;
  }

  &__filter {
    margin-right: auto;

    &_type_mobile {
      display: none;
    }

    @include mobile {
      &_type_mobile {
        display: flex;
        margin-bottom: 1.2em;
      }

      &_type_desktop {
        display: none;
      }
    }
  }

  &__btn {
    font-size: 1.2em;
    text-transform: uppercase;
  }

  &__reset-filter-btn {
    flex: 1 1 100%;
    order: 1;
  }

  @include mobile {
    .selectable-buttons {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      row-gap: 2em;

      &__select-list {
        flex: 1 1 100%;
      }
    }
  }
}

</style>