<template>
  <UiModal 
    class="send-message-modal modal"
    v-model="settingStore.sendMessageModal"
    @confirm="confirm"
    :closeButton="false"
    size="xl"
    :close-button="true"
  >
  <template #content>
    <h2 class="send-message-modal__title">Выберите заказ</h2>
    <div class="send-message-modal__content">
      <div class="send-message-modal__list" v-if="ordersFormattedData.length > 0">
        <template v-for="item in ordersFormattedData" :key="item.id">
          <CatalogOrdersCard class="send-message-modal__item" :class="{ 'send-message-modal__item_active': item.id === selectedOrder }" :data="item" :is-link="false" @click="selectedOrder = item.id"/>
        </template>
      </div>
    </div>
    <CommonAlerts alert="Нет активных заказов" :type="'error'" v-if="!ordersFormattedData.length && isLoaded" />
    <UiButton class="send-message-modal__btn" type="button" variant="quinary" size="large" @click="handleSelectOrderToMessage" v-if="ordersFormattedData.length">Выбрать заказ</UiButton>
  </template>
  </UiModal>
</template>

<script setup>
import { useEntityStore } from '~/store/entityStore';
import { useLocationStore } from '~/store/locationStore';
import { useSettingStore } from '~/store/settingStore';
import { useUserStore } from '~/store/userStore';
import { useToast } from 'vue-toastification';

const props = defineProps({
  performer_id: {
    type: [Number, String],
    default: '',
  }
})

const settingStore = useSettingStore();
const entityStore = useEntityStore();
const userStore = useUserStore();
const locationStore = useLocationStore();
const toast = useToast();

const ordersList = ref(null);
const router = useRouter();
const isLoaded = ref(false);

const ordersFormattedData = computed(() => {
  return ordersList.value.map(item => {
    const {locations, alias} = locationFormatter({cities: item.cities, regions: item.regions});
    return {
      id: item.id,
      name: item.name,
      logo: item.gallery && item.gallery.length ? item.gallery[0].url : '',
      alias: alias,
      lifecycle_status: item.lifecycle_status,
      lifecycle_status_name: item.lifecycle_status_name,
      data: [
        { id: 1, name: 'Категории', value: item.product_categories && item.product_categories.length ? item.product_categories.map(item => item.name) : [] },
        { id: 2, name: 'Место производства', value: locations },
        { id: 3, name: 'Партия', value: Number(item.batch) },
        { id: 4, name: 'Лекала', value: entityStore.getEntityLabelById('patterns', item.pattern) },
        { id: 5, name: 'Сырье', value: entityStore.getEntityLabelById('rawMaterials', item.material) },
        { id: 6, name: 'Срок выполнения', value: formatDate(item.deadline_at) },
        { id: 7, name: 'Описание', value: item.description },
      ],
    };
  });
});

const selectedOrder = ref(null);

function handleSelectOrderToMessage() {
  if(!selectedOrder.value) {
    toast.error('Выберите заказ');
    return
  }
  if(!props.performer_id) {
    toast.error('Исполнитель не выбран');
    return
  }
  router.push({path: `/chat`, query: {order_id: selectedOrder.value, performer_id: props.performer_id}});
  settingStore.sendMessageModal = false;
}

onMounted(() => {
  entityStore.getSelfOrders(userStore.userData.organization_id, {status: 'active'}).then((res) => {
    if(res && res.orders && res.orders.data) {
      ordersList.value = res.orders.data;
    }
  }).finally(() => {
    isLoaded.value = true;
  });
})

</script>

<style lang="scss">

.send-message-modal {
  font-size: 1rem;

  &__title {
    font-size: 1.8em;
    padding-bottom: .83em;
    border-bottom: 1px solid var(--border-color-secondary);
  }

  &__list {
    display: flex;
    flex-wrap: wrap;
    gap: 2em;
    padding-bottom: 1em;
    border-bottom: 1px solid var(--border-color-secondary);
    padding-block: 2em;
    margin-bottom: 2em;
  }

  &__item {
    flex: 0 1 calc(50% - 1em);
    box-shadow: -2px -2px 0 #c4c4c4, 0 1px 1px rgba(0, 0, 0, 0.15);
    cursor: pointer;

    &_active {
      box-shadow: -2px -2px 0 #6937a5, 2px -2px 0 #6937a5, -2px 2px 0 #6937a5, 2px 2px 0 #6937a5;

      &:hover {
        box-shadow: -2px -2px 0 #6937a5, 2px -2px 0 #6937a5, -2px 2px 0 #6937a5, 2px 2px 0 #6937a5;
      }
    }
  }

  &__btn {
    font-size: 1.2em;
    text-transform: uppercase;
  }
}

</style>

