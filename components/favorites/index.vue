<template>
  <div class="favorites">
    <div class="favorites__catalog">
      <div class="favorites__catalog-wrapper">
        <UiButton variant="quinary" size="around" class="favorites__catalog-btn favorites__catalog-btn_type_left">
          <SvgoBtnArrow class="svg-l" />
          <span>Каталог исполнителей</span>
        </UiButton>
        <UiButton variant="quinary" size="around" class="favorites__catalog-btn favorites__catalog-btn_type_right">
          <span>Каталог заказчиков</span>
          <SvgoBtnArrow class="svg-l" />
        </UiButton>
      </div>
    </div>
    <div class="favorites__content">
      <h2 class="favorites__title">{{ blockTitle }}</h2>
      <CommonSelectorListButtons :buttonsList="selectorButtons" @updateActiveButton="toggleEntity" :activeBtn="currentEntity"/>
    </div>
    <CommonFilterSelectList class="favorites__filter" v-if="currentEntity === 'orders'" :filters="ordersFilterList" @setFilters="setFilters" :activeFilters="activeFilter"/>
    <CommonFilterSelectList class="favorites__filter" v-if="currentEntity === 'services'" :filters="servicesFilterList" @setFilters="setFilters" :activeFilters="activeFilter"/>
    <div class="favorites__list-wrapper" v-if="currentEntity === 'services'">
      <div class="favorites__list" v-if="servicesData && servicesData.length > 0" >
        <div class="favorites__card" v-for="data in servicesData" :key="data" >
          <CatalogServiceCard :data="data" :linkBlank="true">
            <template #favorite-delete>
              <div class="favorites__delete">
                <UiButton variant="senary" size="small" class="favorites__delete-btn">
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
    </div>
    <div class="favorites__list-wrapper" v-if="currentEntity === 'orders'">
      <div class="favorites__list" v-if="ordersData && ordersData.length > 0" >
        <div class="favorites__card" v-for="data in ordersData" :key="data" >
          <CatalogOrdersCard :data="data" :linkBlank="true">
            <template #favorite-delete>
              <div class="favorites__delete">
                <UiButton variant="senary" size="small" class="favorites__delete-btn">
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
    </div>
    <div class="favorites__list-wrapper" v-if="currentEntity === 'members'">
      <div class="favorites__list" v-if="membersData && membersData.length > 0" >
        <div class="favorites__card" v-for="data in membersData" :key="data" >
          <CardsPublic :data="data" :is-list="true" :is-description="true" :linkBlank="true">
            <template #favorite-delete>
              <div class="favorites__delete">
                <UiButton variant="senary" size="small" class="favorites__delete-btn">
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
    </div>
  </div>
</template>

<script setup>
import { useEntityStore } from '~/store/entityStore';
import { useOrganizationStore } from '~/store/organizationStore';


const router = useRouter();
const organizationStore = useOrganizationStore();
const entityStore = useEntityStore();
const currentEntity = ref(null);
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

const selectorButtons = [
  { id: 1, label: 'Заказы', value: 'orders', count: computed(() => ordersData.value.length), },
  { id: 2, label: 'Услуги', value: 'services', count: computed(() => servicesData.value.length), },
  { id: 3, label: 'Участники портала', value: 'members', count: computed(() => membersData.value.length) },
];

const ordersFilterList = ['category', 'minLot', 'date']; // Список фильтров для заказов;
const servicesFilterList = ['category', 'minLot']; // Список фильтров для услуг;
const activeFilter = ref({});

const setFilters = (filters) => {
  activeFilter.value = filters
}

// ДАННЫЕ ПОКА БЕРУТСЯ С СПИСКА ВСЕХ СУЩНОСТЕЙ

const ordersData = computed(() => {
  if(!data.value.orders || data.value.orders.length === 0) {
    return [];
  }

  return data.value.orders.map(item => {
    return {
      id: item.id,
      name: item.name,
      logo: '',
      data: [
        { id: 1, name: 'Категории', value: [] },
        { id: 2, name: 'Место производства', value: [] },
        { id: 3, name: 'Партия', value: Number(item.batch) },
        { id: 4, name: 'Лекала', value: entityStore.getEntityLabelById('patterns', item.pattern) },
        { id: 5, name: 'Сырье', value: entityStore.getEntityLabelById('rawMaterials', item.material) },
        { id: 6, name: 'Срок выполнения', value: formatDate(item.deadline_at) },
        { id: 7, name: 'Описание', value: item.description },
      ],
    };
  });
});

const servicesData = computed(() => {
  if(!data.value.services || data.value.services === 0) {
    return [];
  }

  return data.value.services.map(item => {
    return {
      id: item.id,
      name: item.name,
      logo: '',
      location: [],
      minLot: [],
      views: 0,
      companyName: 'test1',
      data: [
        { id: 1, name: 'Сырье', value: [item.materials_own ? 'Собственное' : '', item.materials_tolling ? 'Давальческое' : ''].filter(Boolean).join(' / ') },
        { id: 2, name: 'Категории', value: [] },
        { id: 3, name: 'Наличие СТМ', value: item.is_stm ? 'Да' : 'Нет' },
        { id: 4, name: 'Бесплатные образцы', value: item.free_samples ? 'Да' : 'Нет' },
      ],
    }
  });
});
const membersData = computed(() => data.value.members);

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
  if(type  === 'orders') {
    try {
      data.value.orders = await entityStore.getOrders(filter);
      router.replace({ query: { entity: type, ...filter }});
    } catch (error) {
      console.error("Ошибка при загрузке данных:", error);
    }
  } else if(type === 'services') {
    try {
      data.value.services = await entityStore.getServices(filter);
      router.replace({ query: { entity: type, ...filter } });
    } catch (error) {
      console.error("Ошибка при загрузке данных:", error);
    }
  } else if(type === 'members') {
    try {
      data.value.members = await organizationStore.getPubCardsList();
      router.replace({ query: { entity: type } });
    } catch (error) {
      console.error("Ошибка при загрузке данных:", error);
    }
  }
}

watch(() => currentEntity.value, (newVal, oldVal) => {
  fetchData(newVal)
  if(newVal !== oldVal && oldVal !== null) {
    activeFilter.value = {}
  }
})

watch(() => activeFilter.value, (newVal) => {
  fetchData(currentEntity.value, newVal)
}, {deep: true});

onMounted(() => {
  fetchData('orders');
  fetchData('services');
  fetchData('members');
  if(router.currentRoute.value.query && router.currentRoute.value.query.entity) {
    currentEntity.value = router.currentRoute.value.query.entity
    const filters = Object.fromEntries(
      Object.entries(router.currentRoute.value.query)
        .filter(([key]) => key !== 'entity')
        .map(([key, value]) => [key, Number(value)])
    );
    if(filters) {
      activeFilter.value = {...filters}
    }
  } else {
    currentEntity.value = 'orders'
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