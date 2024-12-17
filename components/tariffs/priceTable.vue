<template>
  <div class="tariffs-table-wrapper">

    <div class="tariffs-table">
      <table class="tariffs-table__table">
        <colgroup>
          <col class="tariffs-table__col-1" />
          <col class="tariffs-table__col-2" />
          <col class="tariffs-table__col-3" />
          <col class="tariffs-table__col-4" />
        </colgroup>
        <thead>
          <tr>
            <th>Возможности</th>
            <th v-for="(column, index) in columns" :key="index">
              {{ column.title }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, rowIndex) in rows" :key="rowIndex">
            <td>
              <p class="tariffs-table__feature">
                {{ row.feature }}
              </p>
            </td>
            <template v-for="(column, colIndex) in columns" :key="colIndex">
              <td class="tariffs-table__value">
                <div v-if="row.values[colIndex] === true">
                  <div class="tariffs-table__icon tariffs-table__icon_type_positive" >
                    <SvgoChecked class="svg-m" fill=""/>
                  </div>
                </div>
                <div v-else-if="row.values[colIndex] === false">
                  <div class="tariffs-table__icon tariffs-table__icon_type_negative">
                    <SvgoMinus class="svg-m"/>
                  </div>
                </div>
                <span v-else>{{ row.values[colIndex] }}</span>
              </td>
            </template>
          </tr>
          <tr>
            <td class="tariffs-table__price">Цена</td>
            <template v-for="(column, colIndex) in columns" :key="colIndex">
              <td v-if="column.price !== null" class="tariffs-table__price-value">
                <span v-if="discount !== null && column.value !== 'free'">{{ `(-${discount}%)`}}<br/></span>
                {{ getPrice(column) }} ₽
              </td>
            </template>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td colspan="2"></td>
              <td>
                <UiButton type="button" class="tariffs-table__btn" variant="quinary" size="large" @click="handlePayModal('premium', props.subDuration)">Подключить</UiButton>
              </td>
              <td>
                <UiButton type="button" class="tariffs-table__btn" variant="quinary" size="large" @click="handlePayModal('ultra', props.subDuration)">Подключить</UiButton>
              </td>
          </tr>
        </tfoot>
      </table>
    </div>
    <div class="tariffs-list">
      <template v-for="(column, index) in columns" :key="index">
        <TariffsMobileCards 
          :tariff="column" 
          :feature="getMobileTariffsFeatures(index)" 
          :price="getPrice(column)" 
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
  { 
    id: 3, 
    value: 'ultra', 
    title: 'Тариф Ультра', 
    price: [
      {id: 1, value: '1', price: 7000},
      {id: 2, value: '3', price: 19950},
      {id: 3, value: '6', price: 37800},
      {id: 4, value: '12', price: 71400},
    ],
  },
];

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

function getPrice(column) {
  if (column.value === 'free') return 0;
  const priceOption = column.price.find(option => option.value === props.subDuration);
  return priceOption ? priceOption.price : null;
}

const handlePayModal = (tariff, duration) => {
  const selectedTariffForDuration = columns.find(column => column.value === tariff);
  const priceOption = selectedTariffForDuration.price.find(option => option.value === duration);
  emit('select', {...selectedTariffForDuration, price: priceOption}, priceOption.price);
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