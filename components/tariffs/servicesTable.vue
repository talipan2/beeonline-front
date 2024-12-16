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
        <tr v-for="(service, rowIndex) in services" :key="rowIndex">
          <td>
            <UiCheckbox name="service" v-model="service.selected" :is-validated="false">
              {{ service.name }}
            </UiCheckbox>
          </td>
          <td class="services-table__price" v-if="currentCurrency === 'RUB'">
            {{ formatMoney(service.price, currentCurrency, 0) }}
            <span v-if="service.period">{{ ` / ${service.period}` }}</span>
          </td>
          <td class="services-table__price" v-if="currentCurrency === 'USD'">
            {{ formatMoney(service.priceUSD, currentCurrency, 0) }}
            <span v-if="service.period">{{ ` / ${service.period}` }}</span>
          </td>
          <td class="services-table__quantity"><CommonCounter v-model="service.quantity" /></td>
        </tr>
      </tbody>
    </table>
    <div class="services-list">
      <ul class="services-list__list">
        <li class="services-list__item" v-for="(services, index) in services" :key="index">
          <UiCheckbox class="services-list__checkbox" name="service" v-model="services.selected" :is-validated="false">
            {{ services.name }}
          </UiCheckbox>
          <p class="services-list__price" v-if="currentCurrency === 'RUB'">
            {{ formatMoney(services.price, currentCurrency, 0) }}
            <span v-if="services.period">{{ ` / ${services.period}` }}</span>
          </p>
          <p class="services-list__price" v-if="currentCurrency === 'USD'">
            {{ formatMoney(services.priceUSD, currentCurrency, 0) }}
            <span v-if="services.period">{{ ` / ${services.period}` }}</span>
          </p>
          <div class="services-list__counter">
            <CommonCounter v-model="services.quantity" />
          </div>
        </li>
      </ul>
    </div>
    <div class="services-table__total">
      <p class="services-table__total-label">
        Итого к оплате:
        <span>{{ formatMoney(totalCount, currentCurrency, 0) }}</span>
      </p>
      <UiButton type="button" class="services-table__total-btn" variant="quinary" size="large" @click="handlePayModal">Подключить</UiButton>
    </div>
  </div>
</template>

<script setup>
import { useSettingStore } from '~/store/settingStore';

const props = defineProps({
  currentCurrency: {
    type: String,
    required: true,
  }
})

const settingStore = useSettingStore();

const emit = defineEmits(['select', 'reset']);

const services = ref([
  {
    id: 1,
    name: 'Поднятие карточки исполнителя в топ (не более 1 услуги в день)',
    price: 400,
    priceUSD: 4,
    quantity: 2,
    selected: false,
  },
  {
    id: 2,
    name: 'Сервис проверки контрагента',
    price: 200,
    priceUSD: 2,
    quantity: 1,
    selected: false,
  },
  {
    id: 3,
    name: 'Рассылка коммерческого сообщения на почту пользователям, с предоставлением отчета',
    price: 10000,
    priceUSD: 10,
    quantity: 0,
    selected: false,
  },
  {
    id: 4,
    name: 'Верхний баннер',
    price: 9000,
    priceUSD: 9,
    quantity: 0,
    period: 'неделя',
    selected: false,
  },
  {
    id: 5,
    name: 'Боковой верхний баннер',
    price: 4500,
    priceUSD: 45,
    period: 'неделя',
    quantity: 0,
    selected: false,
  },
  {
    id: 6,
    name: 'Боковой нижний баннер',
    price: 3000,
    priceUSD: 30,
    period: 'неделя',
    quantity: 0,
    selected: false,
  },
]);

const totalCount = computed(() => {
  let count = 0;
  services.value.forEach(service => {
    if(service.selected) {
      if (props.currentCurrency === 'USD') {
        count += service.quantity * service.priceUSD
      } else {
        count += service.quantity * service.price;
      }
    }
  });
  return count
})

const handlePayModal = () => {
  settingStore.payModalStatus = true;
  const selectedServices = services.value.filter(service => service.selected);
  emit('select', selectedServices, totalCount.value, props.currentCurrency);
  emit('reset', handleReset);
}

const handleReset = () => {
  services.value.forEach(service => {
    service.quantity = 0;
    service.selected = false;
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
  }

}

</style>