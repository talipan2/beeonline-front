<template>
  <UiModal class="pay-modal" v-model="settingStore.payModalStatus" title="" @confirm="() => confirm()" :closeButton="false">
    <template #content>
      <div class="pay-modal__content">
        <div class="pay-modal__header">
          <p class="pay-modal__balance">На счету <span>{{ userBalance }}</span></p>
          <UiButton type="button" class="pay-modal__header-btn" variant="default" @click="handleOpenReplenishmentModal">Пополнить</UiButton>
        </div>
        <div class="pay-modal__body">
          <p class="pay-modal__text">Можно оплатить баллами не более 50% от услуги</p>
          <p class="pay-modal__balance">Ваш баланс: <span>{{ formatMoney(userBonuses, 'bonuses') }} баллов</span></p>
          <UiCheckbox :is-validated="false" v-model="isPaymentWithBonuses" name="bonuses">Оплата баллами</UiCheckbox>
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
          <UiButton type="button" @click="handlePayment" class="pay-modal__footer-btn" variant="quinary" size="large">Оплатить</UiButton>
        </div>
      </div>
    </template>
  </UiModal>
</template>

<script setup>
import { useSettingStore } from '~/store/settingStore';

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
const emit = defineEmits(['reset']);

const isPaymentWithBonuses = ref(false);

const finalAmount = computed(() => {
  if (isPaymentWithBonuses.value) {
    return paymentWithBonuses(props.data.sum, props.userBonuses).finalAmount;
  }
  return props.data.sum
})

const confirm = () => {
  settingStore.payModalStatus = false;
  isPaymentWithBonuses.value = false;
}

const paymentWithBonuses = (amount, bonuses) => {
  const maxBonusesToUse = amount * 0.5;
  const bonusesToUse = Math.min(bonuses, maxBonusesToUse);
  const finalAmount = amount - bonusesToUse;
  return {
    finalAmount,
    bonusesToUse: formatMoney(bonusesToUse, 'bonuses', 0),
  }
}

const handleOpenReplenishmentModal = () => {
  settingStore.replenishmentModalStatus = true;
}

const handlePayment = () => {
  console.log(props.data)
  settingStore.payModalStatus = false;
  if(props.reset) props.reset();
  if(props.deleteResetFunction) props.deleteResetFunction();
}

</script>

<style lang="scss">

.pay-modal {
  font-size: 1rem;
  
  .modal-dialog {
    box-sizing: border-box;
    width: 29%;
    padding: 4em;
    border-left: 2px solid #6937a5;
    border-top: 2px solid #6937a5;
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

  @include tablet {
    .modal-dialog {
      width: 40%;
    }
  }

  @include mobile {
    .modal-dialog {
      width: 70%;
    }
  }

  @include small-mobile {
    .modal-dialog {
      width: 95%;
    }
  }

}

</style>