<template>
  <div class="services-table">
    <table class="services-table__table">
      <colgroup>
        <col class="services-table__col-1" />
        <col class="services-table__col-2" />
        <col class="services-table__col-3" />
      </colgroup>
      <thead>
        <tr>
          <th>Возможности</th>
          <th class="services-table__price">Цена</th>
          <th class="services-table__quantity">Кол-во</th>
        </tr>
      </thead>
      <tbody>
        <ServicesItem v-for="(item, index) in cart" :key="index" v-slot="{ service, price, period }" :service="item.service" :price="item.price">
            <tr>
                <td>
                    {{ service.name }} <span v-if="price.title">{{ price.title }}</span>
                </td>
                <td class="services-table__price">
                    {{ formatMoney(price.amount, price.currency, 0) }}
                    <span v-if="period" v-html="` / ${period}`"></span>
                </td>
                <td class="services-table__quantity">
                    <CommonCounter v-model="item.quantity" :price-quantity="price.quantity" />
                </td>
            </tr>
        </ServicesItem>
      </tbody>
    </table>
    <div class="services-list">
      <ul class="services-list__list">
        <ServicesItem v-for="(item, index) in cart" :key="index" v-slot="{ service, price, period }" :service="item.service" :price="item.price">
            <li class="services-list__item">
                <div>{{ service.name }} <span v-if="price.title">{{ price.title }}</span></div>
            <p class="services-list__price">
                {{ formatMoney(price.amount, price.currency, 0) }}
                <span v-if="period" v-html="` / ${period}`"></span>
            </p>
            <div class="services-list__counter">
                <CommonCounter v-model="item.quantity" :price-quantity="price.quantity" />
            </div>
            </li>
        </ServicesItem>
      </ul>
    </div>
    <div class="services-table__total">
      <p class="services-table__total-label">
        Итого к оплате:
        <span>{{ formatMoney(totalCount, currentCurrency, 0) }}</span>
      </p>
      <UiButton type="button" class="services-table__total-btn" variant="quinary" size="large" @click="handlePayModal">Подключить</UiButton>
    </div>
    <TariffsOpenContactsModal />
  </div>
</template>

<script setup>
import { useSettingStore } from '~/store/settingStore';
import { useTariffsStore } from '~/store/tariffsStore';
import ServicesItem from './servicesItem.vue';

const props = defineProps({
  currentCurrency: {
    type: String,
    required: true,
  }
})

const settingStore = useSettingStore();
const tariffsStore = useTariffsStore();

const emit = defineEmits(['select', 'reset']);

const userStoreServices = computed(() =>  tariffsStore.services?.filter(service => service.prices?.length));

const cart = ref([]);

watch(() => userStoreServices.value, (newVal) => {
    let items = [];

	newVal.forEach(service => {
        if (!service.prices?.length) {
            return;
        }
        service.prices.forEach(price => {
            items.push({
                quantity: 0,
                service: service,
                price: price,
            });
        });
	});

    cart.value = items;
}, {deep: true})

const totalCount = computed(() => {
  let count = 0;
  cart.value.forEach(item => {
    if (item.price.currency === props.currentCurrency) {
        count += item.quantity * item.price.amount;
    }
  });
  return count
})

const handlePayModal = () => {
  settingStore.payModalStatus = true;
  const selectedServices = cart.value.filter(service => service.quantity > 0);
  emit('select', selectedServices, totalCount.value, props.currentCurrency);
  emit('reset', handleReset);
}

const handleReset = () => {
  cart.value.forEach(service => {
    service.quantity = 0;
  });
}


</script>

<style lang="scss">

.services-table {
  font-size: 1rem;

  th {
    font-size: 1.6em;
    line-height: 1.5em;
    font-weight: 700;
    text-align: left;
    border-bottom: 1px solid #C4C4C4;
  }

  th, td {
    padding: 1em;
  }

  tbody {
    background-color: #fff;
    border-bottom: 1px solid #e8e8ea;
  }

  table {
    border-collapse: collapse;
    width: 100%;
  }

  td {
    font-size: 1.4em;
    font-weight: 500;
    line-height: 1.4em;
    border-top: 1px solid #F1F1F2;
    border-bottom: 1px solid #F1F1F2;
    border-left: none;
    border-right: none;
  }

  tr td {
    border-bottom: none;
  }

  th.services-table__price, td.services-table__price {
    text-align: right;
  }

  td.services-table__price {
    font-size: 1.4em;
    font-weight: 700;
    line-height: 1.4em;

    span {
      font-weight: 400;
    }
  }

  th.services-table__quantity {
    text-align: right;
  }

  td.services-table__quantity {
    .counter {
      justify-content: flex-end;
    }
  }

  &__table {
    width: 100%;
  }

  &__col-1 {
    width: 65%;
  }

  &__col-2 {
    width: 12%;
  }

  &__col-3 {
    width: 20%;
  }

  &__total {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 2em;
  }

  &__total-label {
    display: flex;
    align-items: center;
    column-gap: 1em;
    font-size: 1.6em;
    line-height: 1.5em;
    font-weight: 600;
    color: #2e3241;

    span {
      font-family: 'fira-sans', sans-serif;
      font-size: 1.25em;
      line-height: .1.25em;
      font-weight: 700;
      color: #2e3241;
    }
  }

  &__total-btn {
    font-size: 1.2em;
    text-transform: uppercase;
  }

  @include mobile {
    &__table {
      display: none;
    }

    &__total {
      flex-direction: column;
      row-gap: 2.4rem;
    }

    &__total-btn {
      width: 50%;
    }
  }
}

.services-list {
  display: none;
  font-size: 1rem;
  background-color: #fff;
  padding: 2em 1.6em;
  border-radius: 16px;

  &__list {
    display: flex;
    flex-direction: column;
  }

  &__item {
    font-size: 1.4em;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    column-gap: 1em;
    row-gap: 2em;
    padding-bottom: 1.25em;

    &:not(:last-child) {
      border-bottom: 1px solid #f1f1f2;
    }

    &:not(:first-child) {
      padding-top: 1.14em;
    }
  }

  &__checkbox {
    flex: 1 1 60%;

    label {
      font-size: 1em;
      line-height: 1.42em;
      align-items: flex-start;
    }
  }

  &__price {
    flex: 0 1 30%;
    font-weight: 700;
    line-height: 1.4em;
    text-align: right;
  }

  &__counter {
    flex: 0 1 100%;

    .counter {
      justify-content: center;

      &__count {
        width: 100%;
      }
    }
  }

  @include mobile {
    display: block;

    &__item {
      column-gap: 24px;
    }

    &__checkbox {
      flex: 1 1 55%;
      max-width: 100%;
    }

    &__price {
      flex: 0 1 auto;
    }
  }

}

</style>
