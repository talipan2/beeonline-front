<template>
  <div class="favorites">
    <div class="favorites__catalog">
      <div class="favorites__catalog-wrapper">
        <UiButton to="/services" variant="quinary" size="around" class="favorites__catalog-btn favorites__catalog-btn_type_left">
          <SvgoBtnArrow class="svg-l" />
          <span>Каталог исполнителей</span>
        </UiButton>
        <UiButton to="/orders" variant="quinary" size="around" class="favorites__catalog-btn favorites__catalog-btn_type_right">
          <span>Каталог заказчиков</span>
          <SvgoBtnArrow class="svg-l" />
        </UiButton>
      </div>
    </div>
    <div class="favorites__content" :class="{'loading': loading}">
      <h2 class="favorites__title">{{ blockTitle }}</h2>
      <CommonSelectorListButtons :buttonsList="selectorButtons" @updateActiveButton="toggleEntity" :activeBtn="currentEntity"/>
      <CommonFilterSelectList class="favorites__filter" v-if="currentEntity === 'orders'" :filters="ordersFilterList" @setFilters="setFiltersOrders" :activeFilters="activeFilterOrders"/>
      <CommonFilterSelectList class="favorites__filter" v-if="currentEntity === 'services'" :filters="servicesFilterList" @setFilters="setFiltersServices" :activeFilters="activeFilterServices"/>
      <div class="favorites__list-wrapper" v-if="currentEntity === 'services'">
        <div class="favorites__list" v-if="servicesData && servicesData.length > 0" >
          <div class="favorites__card" v-for="data in servicesData" :key="data" >
            <CatalogServiceCard :data="data" :linkBlank="true">
              <template #favorite-delete>
                <div class="favorites__delete">
                  <UiButton type="button" variant="senary" size="small" class="favorites__delete-btn" @click="handleDeleteFavorite(data.id, 'service')">
                    <SvgoFavorite class="svg-m" />
                    Удалить из избранного
                  </UiButton>
                </div>
              </template>
            </CatalogServiceCard>
          </div>
        </div>
        <div class="favorites__list" v-else>
          <CommonAlerts type="warning" alert="Нет избранных услуг" />
        </div>
        <CommonPagination 
          v-if="pageServices.lastPage > 1" 
          :current-page="pageServices.currentPage" 
          :total-pages="pageServices.lastPage" 
          @changePage="(page) => handleChangePage('services', page)" 
          :loading="loading"
        />
      </div>
      <div class="favorites__list-wrapper" v-if="currentEntity === 'orders'">
        <div class="favorites__list" v-if="ordersData && ordersData.length > 0" >
          <div class="favorites__card" v-for="data in ordersData" :key="data" >
            <CatalogOrdersCard :data="data" :linkBlank="true">
              <template #favorite-delete>
                <div class="favorites__delete">
                  <UiButton type="button" variant="senary" size="small" class="favorites__delete-btn" @click="handleDeleteFavorite(data.id, 'order')">
                    <SvgoFavorite class="svg-m" />
                    Удалить из избранного
                  </UiButton>
                </div>
              </template>
            </CatalogOrdersCard>
          </div>
        </div>
        <div class="favorites__list" v-else>
          <CommonAlerts type="warning" alert="Нет избранных заказов"/>
        </div>
        <CommonPagination 
          v-if="pageOrders.lastPage > 1" 
          :current-page="pageOrders.currentPage" 
          :total-pages="pageOrders.lastPage" 
          @changePage="(page) => handleChangePage('orders', page)" 
          :loading="loading"
        />
      </div>
      <div class="favorites__list-wrapper" v-if="currentEntity === 'members'">
        <div class="favorites__list" v-if="membersData && membersData.length > 0" >
          <div class="favorites__card" v-for="data in membersData" :key="data" >
            <CardsPublic :data="data" :is-list="true" :is-description="true" :linkBlank="true">
              <template #favorite-delete>
                <div class="favorites__delete">
                  <UiButton type="button" variant="senary" size="small" class="favorites__delete-btn" @click="handleDeleteFavorite(data.id, 'pubCard')">
                    <SvgoFavorite class="svg-m" />
                    Удалить из избранного
                  </UiButton>
                </div>
              </template>
            </CardsPublic>
          </div>
        </div>
        <div class="favorites__list" v-else>
          <CommonAlerts type="warning" alert="Нет избранных участников портала"/>
        </div>
        <CommonPagination 
          v-if="pageMembers.lastPage > 1" 
          :current-page="pageMembers.currentPage" 
          :total-pages="pageMembers.lastPage" 
          @changePage="(page) => handleChangePage('members', page)" 
          :loading="loading"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { useEntityStore } from '~/store/entityStore';
import { useLocationStore } from '~/store/locationStore';
import { useOrganizationStore } from '~/store/organizationStore';
import { useUserStore } from '~/store/userStore';
import { useToast } from 'vue-toastification';


const router = useRouter();
const toast = useToast();
const organizationStore = useOrganizationStore();
const entityStore = useEntityStore();
const currentEntity = ref(null);
const locationStore = useLocationStore();
const userStore = useUserStore();
const blockTitle = computed(() => {
  switch (currentEntity.value) {
    case 'orders':
      return 'Избранные заказы'
    case 'services':
      return 'Избранные услуги'
    case 'members':
      return 'Избранные участники'
  }
})

const data = ref({
  orders: [],
  services: [],
  members: [],
});

const pageOrders = ref({
  currentPage: 1,
  lastPage: 0,
  total: 0,
  itemsToPage: 0,
})

const pageServices = ref({
  currentPage: 1,
  lastPage: 0,
  total: 0,
  itemsToPage: 0,
})

const pageMembers = ref({
  currentPage: 1,
  lastPage: 0,
  total: 0,
  itemsToPage: 0,
})

const loading = ref(false);

const selectorButtons = [
  { id: 1, label: 'Заказы', value: 'orders', count: computed(() => pageOrders.value.total), },
  { id: 2, label: 'Услуги', value: 'services', count: computed(() => pageServices.value.total), },
  { id: 3, label: 'Участники портала', value: 'members', count: computed(() => pageMembers.value.total) },
];

const ordersFilterList = ['category', 'minLot', 'date']; // Список фильтров для заказов;
const servicesFilterList = ['category', 'minLot']; // Список фильтров для услуг;
const activeFilterOrders = ref({});
const activeFilterServices = ref({});

const setFiltersOrders = (filters) => {
  activeFilterOrders.value = filters
}

const setFiltersServices = (filters) => {
  activeFilterServices.value = filters
}

const ordersData = computed(() => {
  if(!data.value.orders || data.value.orders.length === 0) {
    return [];
  }

  return data.value.orders.map(item => {
    return {
      id: item.id,
      name: item.name,
      logo: item.logo ? item.logo : '',
      countryId: formatLocationsList(item.regions, item.cities, true),
      data: [
        { id: 1, name: 'Категории', value: item.product_categories && item.product_categories.length ? item.product_categories.map(item => item.name) : [] },
        { id: 2, name: 'Место производства', value: formatLocationsList(item.regions, item.cities) },
        { id: 3, name: 'Партия', value: Number(item.batch) },
        { id: 4, name: 'Лекала', value: entityStore.getEntityLabelById('patterns', item.pattern) },
        { id: 5, name: 'Сырье', value: entityStore.getEntityLabelById('rawMaterials', item.material) },
        { id: 6, name: 'Срок выполнения', value: formatDate(item.deadline_at) },
        { id: 7, name: 'Описание', value: item.description },
      ],
    };
  });
});

const formatLocationsList = (regions = [], cities = [], countryId = false) => {
  const citiesIds = cities.map(item => item.id);
  const regionsIds = regions.map(item => item.id);
  const locations = locationStore.getLocationsByIds([], regionsIds, citiesIds);
  if (countryId) {
    return locations[0] && locations[0].countryId ? locations[0].countryId : null; 
  } else {
    return locations.map(item => item.name);
  }
}

const servicesData = computed(() => {
  if(!data.value.services || data.value.services === 0) {
    return [];
  }

  return data.value.services.map(item => {
    return {
      id: item.id,
      name: item.name,
      logo: item.logo ? item.logo : '',
      location: formatLocationsList([], item.cities),
      countryId: formatLocationsList([], item.cities, true),
      minLot: item.batches && item.batches.length ? item.batches[0].name : '',
      views: 0, // нет на бэке
      companyName: item.pub_card && item.pub_card.name ? item.pub_card.name : '',
      data: [
        { id: 1, name: 'Сырье', value: [item.materials_own ? 'Собственное' : '', item.materials_tolling ? 'Давальческое' : ''].filter(Boolean).join(' / ') },
        { id: 2, name: 'Категории', value: item.product_categories && item.product_categories.length ? item.product_categories.map(item => item.name).join(' / ') : '' },
        { id: 3, name: 'Наличие СТМ', value: item.is_stm ? 'Да' : 'Нет' },
        { id: 4, name: 'Бесплатные образцы', value: entityStore.getEntityLabelById('freeTestSamples', item.free_samples) },
      ],
    }
  });
});
const membersData = computed(() => {
  if(!data.value.members || data.value.members === 0) {
    return [];
  }

  return data.value.members.map(item => {
    return {
      // id: item.id,
      // name: item.name,
      // logo: item.logo,
      // description: item.description,
      // fillRating: item.fill_rating,
      // entityCount: item.type === 'performer' ? item.services_count : item.orders_count,
      // category: item.categories && item.categories.length ? item.categories.map(item => item.name) : [],
      // rawMaterials: [item.materials_own ? 'Собственное' : '', item.materials_tolling ? 'Давальческое' : ''].filter(Boolean),
      // type: item.type,
      // countryId: {countries: [item.country_id]},

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
      countryId: {countries: [item.country_id]},
    }
  })
});

// function toggleEntity(entity) {
//   switch (entity) {
//     case 'orders':
//       currentEntity.value = 'orders';
//       router.replace({ query: { entity: 'orders' } });
//       break;
//     case 'services':
//       currentEntity.value = 'services';
//       router.replace({ query: { entity: 'services' } });
//       break;
//     case 'members':
//       currentEntity.value = 'members';
//       router.replace({ query: { entity: 'members' } });
//       break;
//     default:
//       currentEntity.value = 'orders';
//       router.replace({ query: { entity: 'orders' } });
//       break;
//   }
// }

const toggleEntity = (type) => {
  currentEntity.value = type;
}

const fetchData = async(type, filter) => {
  const query = {...filter}
  if(query?.minLot !== 'all' && query?.minLot) {
    query.minLot = entityStore.getEntityLabelById('minLot', query.minLot);
    query.minLot = query.minLot.charAt(0).toUpperCase() + query.minLot.slice(1);
  }
  if(type  === 'orders') {
    try {
      loading.value = true
      const response = await userStore.getFavorites(userStore.userData.id, {...query});
      if(response && response.orders) {
        data.value.orders = response.orders.data;
        router.replace({ query: { entity: type, ...filter }});
        pageOrders.value = {
          currentPage: response.orders.current_page,
          lastPage: response.orders.last_page,
          total: response.orders.total,
          itemsToPage: response.orders.per_page
        }
      }
    } catch (error) {
      console.error("Ошибка при загрузке данных:", error)
    } finally {
      loading.value = false
    }
  } else if(type === 'services') {
    try {
      loading.value = true
      const response = await  userStore.getFavorites(userStore.userData.id, {...query});
      if(response && response.services) {
        data.value.services = response.services.data;
        router.replace({ query: { entity: type, ...filter } });
        pageServices.value = {
          currentPage: response.services.current_page,
          lastPage: response.services.last_page,
          total: response.services.total,
          itemsToPage: response.services.per_page
        }
      }
    } catch (error) {
      console.error("Ошибка при загрузке данных:", error);
    } finally {
      loading.value = false
    }
  } else if(type === 'members') {
    try {
      loading.value = true
      const response = await  userStore.getFavorites(userStore.userData.id, {...filter});
      if(response && response.pubCards) {
        data.value.members = response.pubCards.data;
        router.replace({ query: { entity: type } });
        pageMembers.value = {
          currentPage: response.pubCards.current_page,
          lastPage: response.pubCards.last_page,
          total: response.pubCards.total,
          itemsToPage: response.pubCards.per_page
        }
      }
    } catch (error) {
      console.error("Ошибка при загрузке данных:", error);
    } finally {
      loading.value = false
    }
  }
}

// функция для переключения страниц
const handleChangePage = (type, currentPage) => {
  if(!type || !currentPage) return
  switch (type) {
    case 'orders':
      pageOrders.value.currentPage = currentPage
      fetchData('orders', {page: currentPage, ...activeFilterOrders.value})
      break;
    case 'services':
      pageServices.value.currentPage = currentPage
      fetchData('services', {page: currentPage, ...activeFilterServices.value})
      break;
    case 'members':
      pageMembers.value.currentPage = currentPage
      fetchData('members', {page: currentPage})
      break;
  }
}

const handleDeleteFavorite = (id, type) => {
  if(loading.value) return
  loading.value = true
  userStore.removeFavorite(userStore.userData.id, id, type).then(res => {
    if(type === 'order') {
      fetchData('orders', activeFilterOrders.value)
    } else if(type === 'service') {
      fetchData('services', activeFilterServices.value)
    } else if(type === 'pubCard') {
      fetchData('members')
    }
    toast.info('Удалено из избранных');
  }).finally(() => loading.value = false)
}

watch(() => currentEntity.value, (newVal, oldVal) => {
  if(newVal !== oldVal && oldVal !== null && newVal === 'members') {
    if(newVal === 'members') {
      fetchData('members', {page: pageMembers.value.currentPage})
    } else if(newVal === 'orders') {
      fetchData('orders', {page: pageOrders.value.currentPage, ...activeFilterOrders.value})
    } else if(newVal === 'services') {
      fetchData('services', {page: pageServices.value.currentPage, ...activeFilterServices.value})
    }
  }
})

watch(() => activeFilterOrders.value, (newVal) => {
  if(!newVal || Object.keys(newVal).length === 0) return
  fetchData('orders', newVal)
}, {deep: true});

watch(() => activeFilterServices.value, (newVal) => {
  if(!newVal || Object.keys(newVal).length === 0) return
  fetchData('services', newVal)
}, {deep: true});

onMounted(async() => {
  let filterList = {}
  if(router.currentRoute.value.query && router.currentRoute.value.query.entity) {
    currentEntity.value = router.currentRoute.value.query.entity
    const filters = Object.fromEntries(
      Object.entries(router.currentRoute.value.query)
        .filter(([key]) => key !== 'entity')
        .map(([key, value]) => [key, value])
    )

    if(currentEntity.value === 'orders') {
      activeFilterOrders.value = {...filters}
      filterList = {...filters}
    }
    if(currentEntity.value === 'services') {
      activeFilterServices.value = {...filters}
      filterList = {...filters}
    }
  } else {
    currentEntity.value = 'orders'
  }


  try {
    loading.value = true
    const response = await userStore.getFavorites(userStore.userData.id, {...filterList});
    if(response) {
      data.value.orders = response.orders.data;
      pageOrders.value = {
        currentPage: response.orders.current_page,
        lastPage: response.orders.last_page,
        total: response.orders.total,
        itemsToPage: response.orders.per_page
      }
      data.value.services = response.services.data;
      pageServices.value = {
        currentPage: response.services.current_page,
        lastPage: response.services.last_page,
        total: response.services.total,
        itemsToPage: response.services.per_page
      }
      data.value.members = response.pubCards.data;
      pageMembers.value = {
        currentPage: response.pubCards.current_page,
        lastPage: response.pubCards.last_page,
        total: response.pubCards.total,
        itemsToPage: response.pubCards.per_page
      }
    }
  } catch (error) {
    console.error("Ошибка при загрузке данных:", error);
  } finally {
    loading.value = false
  }
})


</script>


<style lang="scss">

.favorites {
  font-size: 1.6rem;

  &__catalog {
    margin-bottom: 2.19em;
    padding: 1.25em;
    background-color: var(--text-color-octonary);
    box-shadow: 0 .125rem .25rem rgba(0, 0, 0, .075);
  }

  &__catalog-wrapper {
    display: flex;
    column-gap: 1em;
    max-width: 46.8em;
    margin-inline: auto;

    @include mobile {
      flex-direction: column;
      row-gap: 1em;
    }
  }

  &__catalog-btn {
    flex: 0 1 50%;
    font-size: .875em;
    text-transform: uppercase;
    width: 100%;
    column-gap: 1em;

    &_type_left {
      svg {
        transform: rotate(180deg);
      }
    }
  }

  &__title {
    font-size: 1.75em;
    margin-bottom: .89em;
  }

  &__filter {
    padding-bottom: 1.875em;
    margin-bottom: 1.875em;
    border-bottom: 1px solid var(--border-color-secondary);

    .select__select {
      padding: .625em;
    }
  }

  .entity-filter__select {
    flex: 0 1 31.5%;

    @include tablet {
      flex-basis: 48%;
    }

    @include mobile {
      flex-basis: 100%;
    }

  }
  .select__select {
    color: var(--text-color-senary);
  }
  
  &__list {
    display: flex;
    flex-wrap: wrap;
    gap: 2em;
    justify-content: space-between;
  }

  &__card {
    display: flex;
    flex: 0 0 48%;
    font-size: 1rem;

    @include mobile {
      flex-basis: 100%;
    }
  }

  &__delete {
    display: flex;
  }

  &__delete-btn {
    flex: 0 1 50%;
    margin-left: auto;
    position: relative;
    z-index: 2;
    font-size: 1.2em;
    margin-top: 1.66em;
    padding: .83em;
    text-transform: uppercase;
    column-gap: 1em;
    box-shadow: none;

    svg {
      fill: var(--text-color-ternary);
    }
  }
}

</style>