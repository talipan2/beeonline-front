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
      <CatalogServiceFilter v-model="tutorialRefs"/>
    </template>
    <template #content>
      <div ref="anchor">
        <CatalogServiceList :data="servicesList" @updateServiceCardRef="updateServiceCardRef" :class="{'loading': loading}"/>
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
const page = ref({
  currentPage: 1,
  lastPage: 0,
})

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
  entityStore.getServices({page: page.value.currentPage}).then(res => {
    if(res && res.meta && res.data) {
      page.value = {
        currentPage: res.meta.current_page,
        lastPage: res.meta.last_page,
      }
      const rect = anchor.value.getBoundingClientRect(); 
      const offset = window.scrollY + rect.top - settingStore.headerHeight;
      smoothScroll(offset, false);
      router.replace({ query: { page: res.meta.current_page } });
    }
  }).finally(() => {
    loading.value = false
  })
})

onMounted(() => {
  let params = {}
  if(router.currentRoute.value.query.page) {
    params = {
      page: router.currentRoute.value.query.page || 1,
    }
  }
  entityStore.getServices(params).then(res => {
    if(res && res.meta) {
      page.value = {
        currentPage: res.meta.current_page,
        lastPage: res.meta.last_page,
      }
    }
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
  }
}

</style>