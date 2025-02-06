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
      <CatalogOrdersFilter v-model="tutorialRefs"/>
    </template>
    <template #content>
      <div ref="anchor">
        <CatalogOrdersList :data="ordersList" @updateOrderCardRef="updateServiceCardRef" :class="{'loading': loading}"/>
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

const isTutorial = ref(false);
const tutorialRefs = ref([]);
const orderCardRef = ref([]);
const router = useRouter();

const anchor = ref('anchor');

const loading = ref(false);
const page = ref({
  currentPage: 1,
  lastPage: 0,
})

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
  entityStore.getOrders({page: page.value.currentPage}).then(res => {
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
  entityStore.getOrders(params).then(res => {
    if(res && res.meta) {
      page.value = {
        currentPage: res.meta.current_page,
        lastPage: res.meta.last_page,
      }
    }
  })
})

</script>
