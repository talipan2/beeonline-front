<template>
  <NuxtLayout name="profile" title="Услуги">
    <template #header>
      <UiBreadCrumb
        :list="[{ label: 'Главная', link: '/' }, { label: 'Кабинет исполнителя', link: '/desktop' }, { label: 'Список услуг', link: '' }]" />
    </template>
    <template #content>
      <Entity
        :class="{'loading': isLoading}"
        role="performer"
        title="Все услуги"
        subtitle="Размещайте список своих услуг в каталоге исполнителей и ищите заказчиков в кратчайшие сроки с учетом именно ваших потребностей."
        btnLabel="Создать услугу"
        btnLink="/services/create" 
        :data="cardData"
        :isLoaded="isLoaded"
        emptyAlertText="Услуг нет"
        @selectInfoModal="selectInfoModalData"
        @setFilters="setFilters"
      />
      <CommonPagination 
        :class="{'loading': isLoading}"
        v-if="page.lastPage > 1"
        :currentPage="page.currentPage"
        :totalPages="page.lastPage"
        @changePage="handlePageChange"
      />
      <InfoModal :text="infoModal.text" :title="infoModal.title">
        <template #content>
            <UiButton type="button" @click="infoModal.action" class="info-modal__btn" variant="quinary" size="large">Подтвердить</UiButton>
            <UiButton type="button" class="info-modal__btn" variant="tertiary" @click="settingStore.infoModal = false" size="large">Закрыть</UiButton>
        </template>
      </InfoModal>
    </template>
  </NuxtLayout>
</template>

<script setup>
import { useEntityStore } from '~/store/entityStore';
import { useLocationStore } from '~/store/locationStore';
import { useSettingStore } from '~/store/settingStore';
import { useUserStore } from '~/store/userStore';

const entityStore = useEntityStore();
const userStore = useUserStore();
const locationStore = useLocationStore();
const settingStore = useSettingStore();
const isLoading = ref(false);
const isLoaded = ref(false);

const infoModal = ref({
  title: '',
  text: '',
  action: () => {}
})

const page = ref({
  currentPage: 1,
  lastPage: 1,
})

const activeFilter = ref({})

const setFilters = (filters) => {
  filters = deleteEmptyFilters(filters);
  activeFilter.value = {...filters}

  getServices({...filters})
}

const deleteEmptyFilters = (filter) => {
  if(!filter) return;
  for (const key in filter) {
    if (filter[key] === "all") {
      delete filter[key];
    }
  }
  return filter;
}

const selectInfoModalData = ({type, id}) => {
  console.log(type)
  settingStore.infoModal = true;
  switch (type) {
    case 'published':
      infoModal.value = {
        title: 'Публикация',
        text: 'Вы уверены, что хотите опубликовать эту услугу?',
        action: () => {
          entityStore.editService(id, {status: 'under_moderation'})
          .then(() => {
            entityStore.getOrganizationServices(userStore.userData.organization_id)
            settingStore.infoModal = false
          })
          .catch(() => console.log('error'));
        }
      }
      break
    case 'unpublished':
      infoModal.value = {
        title: 'Снятие с публикации',
        text: 'Вы уверены, что хотите снять с публикации эту услугу?',
        action: () => {
          entityStore.editService(id, {status: 'archived'})
          .then(() => {
            entityStore.getOrganizationServices(userStore.userData.organization_id)
            settingStore.infoModal = false
          })
          .catch(() => console.log('error'));
        }
      }
      break
  }
}

const formatFreeSamples = (freeSamples) => {
    switch (Number(freeSamples)) {
      case 1:
        return 'Да'
      case 2:
        return 'Нет'
      case 0:
        return 'По Запросу'
      default:
        return null
    }
  }

const cardData = computed(() => {
  return entityStore.organizationServices.map(item => {
    const {locations, alias} = locationFormatter({cities: item.cities, regions: item.regions});
    return {
    id: item.id,
    name: item.name,
    placeOfProduction: locations,
    rawMaterials: [item.materials_own ? 'Исполнителя' : '', item.materials_tolling ? 'Заказчика' : ''].filter(Boolean),
    availabilityStm: item.is_stm ? 'Да' : 'Нет',
    freeSamples: formatFreeSamples(item.free_samples),
    minLot: item.batches && item.batches.length ? item.batches.map(item => item.name) : [],
    status: entityStore.getEntityStatusByValue(item.status),
    category: item.product_categories && item.product_categories.length ? item.product_categories.map(item => item.id) : [],
    statusType: item.status,
  }})
})

const handlePageChange = (page) => {
  getServices({page, ...activeFilter.value});
}

function getServices(params) {
  if(isLoading.value) return;
  isLoading.value = true
  entityStore.getSelfServices(userStore.userData.organization_id, params)
  .then(res => {
    if(res && res.services) {
      page.value.currentPage = res.services.current_page;
      page.value.lastPage = res.services.last_page;
    }
  })
  .finally(() => {
    isLoading.value = false;
    isLoaded.value = true;
  });
}

onMounted(() => {
  if(userStore.userData.organization_id) {
    getServices();
  }
})

</script>