<template>
  <div class="tariffs-table-wrapper">

    <div class="tariffs-table">
      <table class="tariffs-table__table">
        <colgroup>
          <col class="tariffs-table__col-1" />
          <col class="tariffs-table__col-2" />
          <col class="tariffs-table__col-3" />
          <!-- <col class="tariffs-table__col-4" /> -->
        </colgroup>
        <thead>
          <tr>
            <th>Возможности</th>
            <th v-for="(tariff, index) in tariffs" :key="index">
              {{ tariff.title }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(service, rowIndex) in services" :key="rowIndex">
            <td>
              <p class="tariffs-table__feature">
                {{ service.name }}
              </p>
            </td>
            <template v-for="(tariff, colIndex) in tariffs" :key="colIndex">
              <td class="tariffs-table__value">
                <template v-if="serviceInTariff(service, tariff.id)">
                  <div v-if="!serviceInTariff(service, tariff.id).description">
                    <div class="tariffs-table__icon tariffs-table__icon_type_positive">
                      <SvgoChecked class="svg-m" />
                    </div>
                  </div>
                  <span v-else>{{ serviceInTariff(service, tariff.id).description }}</span>
                </template>
                <div v-else>
                  <div class="tariffs-table__icon tariffs-table__icon_type_negative">
                    <SvgoMinus class="svg-m" />
                  </div>
                </div>
              </td>
            </template>
          </tr>
          <tr>
            <td class="tariffs-table__price">Цена</td>
            <template v-for="(tariff, colIndex) in tariffs" :key="colIndex">
              <td v-if="tariff.prices !== null" class="tariffs-table__price-value">
                <span v-if="discount !== null && tariff.code !== 'free'">{{ `(-${discount}%)`}}<br /></span>
                {{ formatMoney(getPrice(tariff), 'RUB', 0) }}
              </td>
            </template>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td></td>
            <template v-for="(tariff, colIndex) in tariffs" :key="colIndex">
              <td>
                <UiButton type="button" class="tariffs-table__btn" variant="quinary" size="large"
                  @click="handlePayModal(tariff.code, props.subDuration)" v-if="tariff.code !== 'free'">Подключить
                </UiButton>
              </td>
            </template>
          </tr>
        </tfoot>
      </table>
    </div>
    <div class="tariffs-list">
      <template v-for="(tariff, index) in tariffs" :key="index">
        <TariffsMobileCards 
          :tariff="tariff" 
          :feature="getMobileTariffsFeatures(tariff.id)" 
          :price="getPrice(tariff)"
          currency="RUB" 
          :discount="discount" 
          @handlePay="handlePayModal(column.value, props.subDuration)" 
        />
      </template>
    </div>
  </div>
</template>

<script setup>
import { useSettingStore } from '~/store/settingStore';
import { useTariffsStore } from '~/store/tariffsStore';


const props = defineProps({
  subDuration: {
    type: String,
    required: true,
  }
})

const settingStore = useSettingStore();

const emit = defineEmits(['select']);

const columns = [
  { 
    id: 1, 
    value: 'free', 
    title: 'Бесплатный', 
    price: 0 
  },
  { 
    id: 2, 
    value: 'premium', 
    title: 'Тариф Премиум', 
    price: [
      {id: 1, value: '1', price: 3000},
      {id: 2, value: '3', price: 8550},
      {id: 3, value: '6', price: 16200},
      {id: 4, value: '12', price: 30600},
    ],
  },
  // { 
  //   id: 3, 
  //   value: 'ultra', 
  //   title: 'Тариф Ультра', 
  //   price: [
  //     {id: 1, value: '1', price: 7000},
  //     {id: 2, value: '3', price: 19950},
  //     {id: 3, value: '6', price: 37800},
  //     {id: 4, value: '12', price: 71400},
  //   ],
  // },
];

const tariffsStore = useTariffsStore();

const tariffs = computed(() => tariffsStore.tariffs);
const services = computed(() => tariffsStore.services?.filter(service => service.tariffs.length));

const getMobileTariffsFeatures = (tariff) => {
  const features = [];
  rows.forEach(row => {
    if(row.values[tariff]) features.push({feature: row.feature, value: row.values[tariff]});
  });
  return features;
} 

const rows = [
  {
    feature: 'Мониторинг заказов',
    values: [true, true, true],
  },
  {
    feature: 'Персональный менеджер (проф. оформление публичной карты и создание услуг)',
    values: [false, false, true],
  },
  {
    feature: 'Доступ к контактам заказчика',
    values: [false, false, true],
  },
  {
    feature: 'Приоритетная отправка уведомлений о новых заказах в личный кабинет на сайте, почта\телеграм',
    values: ['Через 3 часа после публикации', 'Мгновенно', 'Мгновенно'],
  },
  {
    feature: 'Приоритетная отправка откликов',
    values: ['Отклик отправится через час', 'Мгновенно', 'Мгновенно'],
  },
  {
    feature: 'Выделение отклика исполнителя в чате заказчика',
    values: [false, true, true],
  },
  {
    feature: 'Размещение в начале диалогов заказчика',
    values: [false, false, true],
  },
  {
    feature: 'Закрепление интересующих чатов',
    values: [true, true, true],
  },
  {
    feature: 'Проверенный исполнитель галочка, заказчик может бесплтано посмотреть отчет о компании',
    values: [false, true, true],
  },
  {
    feature: 'Выделение карточки исполнителя в каталоге исполнителей',
    values: [false, true, true],
  },
  {
    feature: 'Размещение карточки в слайдере на первой странице каталога услуг',
    values: [false, false, true],
  },
  {
    feature: 'Поднятие карточки исполнителя в топ (не более 1 услуги в день)',
    values: [false, '7 раз', '10 раз'],
  },
  {
    feature: 'Сервис проверки контрагента',
    values: [false, '7 проверок', '10 проверок'],
  }
];

const discount = computed(() => {
  if (!props.subDuration) return null;
  switch (props.subDuration) {
    case '3':
      return 5;
    case '6':
      return 10;
    case '12':
      return 15;
    default:
      return null;
  }
})

function getPrice(tariff) {
  if (tariff.code === 'free') return 0;
  const priceOption = tariff.prices.find(option => option.quantity == props.subDuration);
  return priceOption?.amount;
}

function serviceInTariff(service, tariff_id) {
	return service.tariffs.find(tariff => tariff.id === tariff_id);
}

const handlePayModal = (tariff_code, duration) => {
  const selectedTariffForDuration = tariffs.value.find(tariff => tariff.code === tariff_code);
  const priceOption = selectedTariffForDuration.prices.find(option => option.quantity == duration);
  emit('select', {...selectedTariffForDuration, price: priceOption, currency: 'RUB'}, priceOption.amount);
  settingStore.payModalStatus = true;
}

</script>

<style lang="scss">

.tariffs-table {
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

  tbody, tfoot {
    background-color: #fff;
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

  tfoot tr td {
    border: none;
    padding-block: 2.28em 1.14em;
  }


  &__table {
    width: 100%;
  }

  &__col-1 {
    width: 35%;
  }

  &__col-2 {
    width: 25%;
  }

  &__col-3 {
    width: 25%;
  }

  &__col-4 {
    width: 15%;
  }

  &__value {
    color: #989898;
  }

  &__feature {
    max-width: 320px;
    display: block;
  }

  &__icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2rem;
    height: 2rem;
    border-radius: 100%;
    
    &_type_positive {
      background-color: var(--button-background-primary);
      svg {
        width: 1.2rem;
        path {
          stroke: #fff;

        }
      }
    }

    &_type_negative {
      background-color: #f0f0f5;
      svg {
        width: 1rem;
        path {
          stroke: #737899;
        }
      }
    }
  }

  &__btn {
    font-size: 1.2rem;
    text-transform: uppercase;
    width: fit-content;
  }

  td.tariffs-table__price {
    font-size: 1.6em;
    font-weight: 700;
    line-height: 1.5em;
  }

  td.tariffs-table__price-value {
    font-family: 'fira-sans', sans-serif;
    font-size: 2.4em;
    font-weight: 700;
    line-height: 1.3em;
    color: var(--primary-color);
    padding: .66em;

    span {
      font-size: .66em;
      line-height: 1em;
      font-weight: 600;
      color: #de5434;
    }
  }

  @include tablet {
    &__feature {
      max-width: 250px;
    }
  }

  @include mobile {
    display: none;
  }
}

.tariffs-list {
  font-size: 1rem;
  display: none;

  @include mobile {
    display: flex;
    flex-direction: column;
    row-gap: 2.4rem;
  }
}

</style>