<template>
  <div class="service-payment">
    <p class="service-payment__text">Ваша услуга размещена. Вы можете оплатить поднятие объявления.</p>
    <p class="service-payment__text">Доступно бесплатных поднятий: 20</p>
    <div class="service-payment__payment-item">
      <UiCheckbox class="service-payment__checkbox" :isValidated="false">Поднятие объявления</UiCheckbox>
      <div class="service-payment__price">
        <p class="service-payment__price-old">399RUB</p>
        <p class="service-payment__price-new">0 RUB</p>
      </div>
    </div>
    <div class="service-payment__payment-info">
      <p class="service-payment__payment-info-text">Баланс: <span>{{tariffsStore.userBalance}} <span class="service-payment__currency">{{ tariffsStore.userCurrency }}</span></span></p>
      <p class="service-payment__payment-info-text">Итого: <span>123123 <span class="service-payment__currency">{{ tariffsStore.userCurrency }}</span></span></p>
    </div>
    <div class="service-payment__payment-btn-wrapper">
      <UiButton type="button" class="service-payment__btn" variant="tertiary" size="large">Пополнить</UiButton>
      <UiButton type="button" class="service-payment__btn" variant="quinary" size="large">Отменить</UiButton>
    </div>
  </div>
</template>

<script setup>
import { useTariffsStore } from '~/store/tariffsStore';
import { useUserStore } from '~/store/userStore';


const tariffsStore = useTariffsStore();
const userStore = useUserStore();

onMounted(() => {
  tariffsStore.getBalance(userStore.userData.id);
  tariffsStore.getTariffs(userStore.userData.id);
})

</script>

<style lang="scss">

.service-payment {
  font-size: 1rem;
  &__text {
    font-size: 1.6em;
    margin-bottom: 1em;
  }

  &__payment-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1em;
    padding-block: 2em;
    border-top: 1px solid var(--border-color-secondary);
    border-bottom: 1px solid var(--border-color-secondary);
  }

  &__checkbox {
    label {
      font-size: 1.6em;
    }
  }

  &__price {
    display: flex;
    align-items: center;
    column-gap: .5em;
    font-size: 1.6em;
  }

  &__price-old {
    color: rgba(255, 0, 0, 0.5);
    position: relative;

    &::before {
      content: " ";
      display: block;
      width: 100%;
      border-top: 2px solid rgba(255, 0, 0, 0.8);
      height: 12px;
      position: absolute;
      bottom: 0;
      left: 0;
      transform: rotate(-7deg);
    }
  }

  &__payment-info {
    display: flex;
    justify-content: space-between;
    font-size: 1.6em;
    gap: 1em;
    margin-bottom: 2em;

    span {
      font-family: "fira-sans", sans-serif;
      font-size: 2.4rem;
    }
  }

  &__currency {
    color: var(--text-color-ternary);
  }

  &__payment-btn-wrapper {
    display: flex;
    gap: 1em;
    justify-content: space-between;
  }

  &__btn {
    font-size: 1.2em;
    text-transform: uppercase;
    width: 35%;
  }
}

</style>