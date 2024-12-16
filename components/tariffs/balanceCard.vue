<template>
  <TariffsCardLayout class="balance">
    <div class="balance__body">
      <h3 class="balance__text">Ваш баланс: {{ userBalance }}</h3>
      <h3 class="balance__text">
        Баллы:
        <span class="balance__text_type_selection">{{ formatMoney(userBonuses, 'bonuses') }}</span>
      </h3>
    </div>
    <div class="balance__btn-container">
      <UiButton type="button" class="balance__btn" variant="quinary" size="large" @click="handleOpenReplenishmentModal">Пополнить</UiButton>
      <UiButton type="button" class="balance__btn" variant="tertiary" size="large" @click="handleOpenDocumentsModal">Запросить закрывающие документы
      </UiButton>
    </div>
    <TariffsReplenishmentModal :currentCurrency="currentCurrency"/>
    <TariffsDocumentsModal />
  </TariffsCardLayout>
</template>

<script setup>
import { useSettingStore } from '~/store/settingStore';


const props = defineProps({
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
    required: true,
  }
})

const settingStore = useSettingStore();

const handleOpenReplenishmentModal = () => {
  settingStore.replenishmentModalStatus = true;
}

const handleOpenDocumentsModal = () => {
  settingStore.balanceDocumentsModalStatus = true;
}

</script>

<style lang="scss">

.balance {
  font-size: 1rem;

  &__body {
    margin-bottom: 4em;
  }

  &__text {
    font-size: 1.8em;
    font-weight: 400;
    line-height: 1.2em;
    margin-bottom: .83em;
  }

  &__text_type_selection {
    color: var(--text-color-ternary);
  }

  &__btn-container {
    display: flex;
    gap: .7em;
  }

  &__btn {
    font-family: 'lato', sans-serif;
    flex: 1 1 50%;
    font-size: 1.2em;
    text-transform: uppercase;
    font-weight: 400;
  }

  @include small-tablet {

    &__btn-container {
      flex-direction: column;
    }
  }
}

</style>