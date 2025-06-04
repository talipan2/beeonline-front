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
              {{ service.name }}
          </td>
          <td class="services-table__price">
            {{ formatMoney(service.price, service.currency, 0) }}
            <span v-if="service.period" v-html="` / ${service.period}`"></span>
          </td>
          <td class="services-table__quantity"><CommonCounter v-model="service.quantity" :price-quantity="service.price_quantity" /></td>
        </tr>
      </tbody>
    </table>
    <div class="services-list">
      <ul class="services-list__list">
        <li class="services-list__item" v-for="(service, index) in services" :key="index">
            {{ service.name }}
          <p class="services-list__price">
            {{ formatMoney(service.price, service.currency, 0) }}
            <span v-if="service.period" v-html="` / ${service.period}`"></span>
          </p>
          <div class="services-list__counter">
            <CommonCounter v-model="service.quantity" :price-quantity="service.price_quantity" />
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
import { useTariffsStore } from '~/store/tariffsStore';

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

const services = ref([]);

watch(() => userStoreServices.value, (newVal) => {
	services.value = newVal.map(service => {
        let price = service.prices[0];
        let period = null;
        if (service.numeral_forms) {
            let defaultNumeralForm = service.numeral_forms[0];
            period = plural(price.quantity, {
                one: service.numeral_forms[0] || defaultNumeralForm,
                few: service.numeral_forms[1] || defaultNumeralForm,
                many: service.numeral_forms[2] || defaultNumeralForm,
                other: defaultNumeralForm,
            });

            if (price.quantity > 1) {
                period = price.quantity + '&nbsp;' + period;
            }
        }
		return {
			id: service.id,
			name: service.name,
			quantity: 0,
			price: price.amount,
            price_quantity: price.quantity,
            price_period: price.period,
			period: period,
            currency: price.currency,
		};
	});
}, {deep: true})

const totalCount = computed(() => {
  let count = 0;
  services.value.forEach(service => {
    count += service.quantity * service.price;
  });
  return count
})

const handlePayModal = () => {
  settingStore.payModalStatus = true;
  const selectedServices = services.value.filter(service => service.quantity > 0);
  emit('select', selectedServices, totalCount.value, props.currentCurrency);
  emit('reset', handleReset);
}

const handleReset = () => {
  services.value.forEach(service => {
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
