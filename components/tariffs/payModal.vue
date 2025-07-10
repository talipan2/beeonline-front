<template>
  <UiModal class="pay-modal" v-model="settingStore.payModalStatus" title="" @confirm="() => confirm()" :closeButton="false">
    <template #content>
      <div class="pay-modal__content">
        <div class="pay-modal__header">
          <p class="pay-modal__balance">На счету <span>{{ userBalance }}</span></p>
          <UiButton type="button" class="pay-modal__header-btn" variant="default" @click="handleOpenReplenishmentModal">Пополнить</UiButton>
        </div>
        <div class="pay-modal__body" v-if="currentCurrency === 'RUB'">
          <p class="pay-modal__text" v-if="amount >= 1000">Можно оплатить баллами не более 25% от услуги</p>
          <p  class="pay-modal__text" v-else>Бонусами можно оплатить, если стоимость услуг составляет 1000₽ и более.</p>
          <p class="pay-modal__balance">Ваш баланс: <span>{{ formatMoney(userBonuses, 'bonuses') }} баллов</span></p>
          <UiCheckbox :is-validated="false" v-model="isPaymentWithBonuses" name="bonuses" :disabled="amount < 1000">Оплата баллами</UiCheckbox>
        </div>
        <div class="pay-modal__total" v-if="data.isServices && data.data?.length > 0">
          <table>
            <colgroup>
              <col class="pay-modal__total-col-1" />
              <col class="pay-modal__total-col-2" />
              <col class="pay-modal__total-col-3" />
          </colgroup>
            <thead>
              <tr>
                <th>Название</th>
                <th>Кол-во</th>
                <th>Сумма</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(service, index) in data.data" :key="index">
                <td>{{ service.name }}</td>
                <td>{{ service.quantity * service.price_quantity }}</td>
                <td>{{ formatMoney(service.price * service.quantity, currentCurrency, 0) }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="pay-modal__footer">
          <div class="pay-modal__order">
            <p class="pay-modal__order-label">Итого к оплате</p>
            <p class="pay-modal__order-value">{{ formatMoney(finalAmount, currentCurrency, 0) }}</p>
            <div class="pay-modal__bonuses" v-if="isPaymentWithBonuses">
              <p class="pay-modal__bonuses-label">Списано баллов</p>
              <p class="pay-modal__bonuses-value">{{ paymentWithBonuses(data.sum, userBonuses).bonusesToUse }}</p>
            </div>
          </div>
          <UiButton type="button" @click="handlePayment" class="pay-modal__footer-btn" variant="quinary" size="large" :disabled="data?.data.length < 1">Оплатить</UiButton>
        </div>
      </div>
    </template>
  </UiModal>
</template>

<script setup>
import { useSettingStore } from '~/store/settingStore';
import { useTariffsStore } from '~/store/tariffsStore';
import { useUserStore } from '~/store/userStore';

const props = defineProps({
  data: {
    type: Object,
    default: () => ({}),
    required: true,
  },
  userBalance: {
    type: String,
    required: true,
  },
  userBonuses: {
    type: Number,
    required: true,
  },
  currentCurrency: {
    type: String,
    required: true
  },
  reset: {
    type: Function,
  },
  deleteResetFunction: {
    type: Function,
  }
})

const settingStore = useSettingStore();
const userStore = useUserStore();
const tariffsStore = useTariffsStore();

const emit = defineEmits(['reset']);

const isPaymentWithBonuses = ref(false);
const userId = computed(() => {
  if(userStore.userData && userStore.userData.id) {
    return userStore.userData.id
  }
})

const finalAmount = computed(() => {
  if (isPaymentWithBonuses.value) {
    return paymentWithBonuses(props.data.sum, props.userBonuses).finalAmount;
  }
  return props.data.sum
})

const finalBonusesAmount = computed(() => {
  if (isPaymentWithBonuses.value) {
    return paymentWithBonuses(props.data.sum, props.userBonuses).bonusesToUse;
  }
  return 0
})

const amount = computed(() => props.data.sum / 100)

const confirm = () => {
  settingStore.payModalStatus = false;
  isPaymentWithBonuses.value = false;
}

const paymentWithBonuses = (amount, bonuses) => {
  const maxBonusesToUse = amount / 4 / 100;
  const bonusesToUse = Math.min(bonuses, maxBonusesToUse);
  const finalAmount = amount - bonusesToUse * 100;
  return {
    finalAmount,
    bonusesToUse,
    formatBonusesToUse: formatMoney(bonusesToUse, 'bonuses', 0),
  }
}

const handleOpenReplenishmentModal = () => {
  settingStore.replenishmentModalStatus = true;
}

const handlePayment = () => {
  const data = props.data;
  console.log(data);
  let paymentData = {
    isPaymentWithBonuses: isPaymentWithBonuses.value,
    finalBonusesAmount: finalBonusesAmount.value,
    finalAmount: finalAmount.value,
  };
  if (data.isServices) {
    paymentData.services = data.data
      .filter(service => {
        return service.quantity > 0;
      })
      .map(service => {
        return {
          id: service.id,
          quantity: service.quantity,
        };
      });
    tariffsStore.payServices(userId.value, paymentData).then((data) => {
      settingStore.payModalStatus = false;
      if (props.reset) props.reset();
      if (props.deleteResetFunction) props.deleteResetFunction();
      tariffsStore.getBalance(userId.value);
      paymentData.services.forEach(service => {
        if(service.id && (service.id == 21 || service.id == 22)) {
          settingStore.openContactsModal = true;
        }
      });
    });
  } else {
    const tariff = data.data;
    tariffsStore.payTariff(userId.value,tariff.id, tariff.price.id, paymentData).then((data) => {
      settingStore.payModalStatus = false;
      if (props.reset) props.reset();
      if (props.deleteResetFunction) props.deleteResetFunction();
      tariffsStore.getBalance(userId.value);
      settingStore.foreignerModal = false;
    });
  }
}

watch(() => settingStore.payModalStatus, (newVal) => {
  if(newVal && amount.value < 1000) {
    isPaymentWithBonuses.value = false;
  }
});

</script>

<style lang="scss">

.pay-modal {
  font-size: 1rem;

  .modal-content {
    box-sizing: border-box;
    width: 29%;
    padding: 4em;
    background-color: #fff;
  }

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 1.4em;
    margin-bottom: .85em;
  }

  &__balance {
    span {
      font-weight: 700;
    }
  }

  &__header-btn {
    color: #6937a5;
  }

  &__body {
    display: flex;
    flex-direction: column;
    row-gap: .85em;
    font-size: 1.4em;
    padding: 1.14em;
    background-color: #fafafb;
    border-radius: 8px;
    margin-bottom: 1.7em;
  }

  &__order {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    font-size: 1.6em;
    padding-top: 1.25em;
    margin-bottom: 2.5em;
    border-top: 1px solid #e7e7f1;
  }

  &__order-value {
    font-family: 'fira-sans', sans-serif;
    font-size: 1.5em;
    font-weight: 700;
  }

  &__bonuses {
    flex: 0 1 100%;
    display: flex;
    justify-content: space-between;
    font-size: .875em;
  }

  &__bonuses-value {
    font-weight: 600;
  }


  &__footer-btn {
    font-family: 'lato', sans-serif;
    font-size: 1.4em;
    width: 100%;
    text-transform: uppercase;
  }

  &__total {
    font-size: 1.2em;

    &-col-1 {
      width: 50%;
    }

    &-col-2 {
      width: 20%;
    }

    &-col-3 {
      width: 30%;
    }

    table {
      font-size: 1.2em;
      border-collapse: collapse;
      width: 100%;
    }

    thead {
      text-align: right;
      border-bottom: 1px solid #C4C4C4;

      th:first-child {
        text-align: left;
      }

      tr {
        border-bottom: 1px solid #C4C4C4;
      }
    }

    tbody {
      text-align: right;

      td:first-child {
        text-align: left;
      }

      tr:not(:last-child) {
        border-bottom: 1px solid #f1f1f1;
      }

      td {
        padding-block: .5em;
      }
    }


  }

}

</style>
