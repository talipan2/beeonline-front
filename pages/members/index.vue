<template>
  <NuxtLayout name="catalog" title="Участники портала" :className="'members'">
    <template #header>
      <UiBreadCrumb
        :list="[{ label: 'Главная', link: '/' }, { label: 'Каталог заказов', link: '' }]" />
    </template>
    <template #leftSide>
      <CatalogMembersFilter />
    </template>
    <template #content>
      <div ref="anchor">
        <CatalogMembersList :data="data" :class="{'loading': loading}" />
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
const page = ref({
  currentPage: 1,
  lastPage: 0,
})

const data = computed(() => {
  return organizationStore.pubCardsList.map(item => {
    return {
      id: item.id,
      name: item.name,
      logo: item.logo,
      location: item.regions && item.cities ? { regions: item.regions.map(item => item.id), cities: item.cities.map(item => item.id) } : [],
      description: item.description,
      fillRating: item.fill_rating,
      entityCount: 1,
      category: [],
      rawMaterials: [],
      type: item.type,
    }
  })
});

const handleChangePage = (currentPage) => {
  page.value.currentPage = currentPage
}

watch(() => page.value.currentPage, () => {
  loading.value = true
  entityStore.getPubCardsList({page: page.value.currentPage}).then(res => {
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
  organizationStore.getPubCardsList(params).then(res => {
    if(res && res.meta) {
      page.value = {
        currentPage: res.meta.current_page,
        lastPage: res.meta.last_page,
      }
    }
  })
})



</script>