<template>
  <NuxtLayout name="profile" title="Заказы">
    <template #header>
      <UiBreadCrumb
        :list="[{ label: 'Главная', link: '/' }, { label: 'Кабинет заказчика', link: '/customer/desktop' }, { label: 'Список заказов', link: '' }]" />
    </template>
    <template #content>
      <Entity
        role="customer"
        title="Все заказы"
        subtitle="Размещайте список своих заказов в каталоге заказчиков и ищите исполнителей в кратчайшие сроки с учетом именно ваших потребностей"
        btnLabel="Создать заказ"
        btnLink="/orders/create"
        :data="cardData"
        :isLoading="isLoading"
        emptyAlertText="Заказов нет"
        :entityIsFilling="entityIsFilling"
        @selectInfoModal="selectInfoModalData"
      />
      <InfoModal :text="infoModal.text" :title="infoModal.title">
        <template #content>
            <UiButton type="button" @click="infoModal.action" class="info-modal__btn" variant="quinary" size="around">Подтвердить</UiButton>
            <UiButton type="button" class="info-modal__btn" variant="tertiary" @click="settingStore.infoModal = false" size="around">Закрыть</UiButton>
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
const locationStore = useLocationStore()
const settingStore = useSettingStore();

const isLoading = ref(false);

const infoModal = ref({
  title: '',
  text: '',
  action: () => {}
})

const selectInfoModalData = ({type, id}) => {
  console.log(type)
  settingStore.infoModal = true;
  switch (type) {
    case 'published':
      infoModal.value = {
        title: 'Публикация',
        text: 'Вы уверены, что хотите опубликовать этот заказ?',
        action: () => {
          entityStore.editOrder(id, {status: 'active'})
          .then(() => {
            entityStore.getOrganizationOrders(userStore.userData.organization_id)
            settingStore.infoModal = false
          })
          .catch(() => console.log('error'));
        }
      }
      break
    case 'unpublished':
      infoModal.value = {
        title: 'Снятие с публикации',
        text: 'Вы уверены, что хотите снять с публикации этот заказ?',
        action: () => {
          entityStore.editOrder(id, {status: 'archived'})
          .then(() => {
            entityStore.getOrganizationOrders(userStore.userData.organization_id)
            settingStore.infoModal = false
          })
          .catch(() => console.log('error'));
        }
      }
      break
  }
}

const entityIsFilling = ref({});

const cardData = computed(() => {
  return entityStore.organizationOrders.map(item => {
    return {
    id: item.id,
    name: item.name,
    placeOfProduction: locationStore.getLocationsByIds([], item.regions.map(item => item.id), item.cities.map(item => item.id)),
    rawMaterials: !item.material ? ['Собственное'] : ['Давальческое'],
    completionDate: item.deadline_at,
    batch: item.batch,
    category: item.product_categories.map(item => item.id),
    status: entityStore.getEntityStatusByValue(item.status),
    locations: {
      cities: [...item.cities],
      regions: [...item.regions]
    },
    statusType: item.status,
  }})
})

onMounted(() => {
  if(userStore.userData.organization_id) {
    isLoading.value = true
    entityStore.getOrganizationOrders(userStore.userData.organization_id)
    .finally(() => isLoading.value = false);
  }
  
});

</script>