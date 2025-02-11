<template>
  <TariffsCardLayout class="balance">
    <div class="balance__body">
      <div class="balance__text">
        Ваш баланс: 
        <template v-if="tariffsStore.balanceLoaded">{{ userBalance }}</template>
        <CommonSpinner v-else/>
      </div>
     
      <div class="balance__text">
        Баллы:
        <span class="balance__text_type_selection">
          <template v-if="tariffsStore.balanceLoaded">{{ formatMoney(userBonuses, 'bonuses') }}</template>
          <CommonSpinner v-else/>
        </span>
      </div>
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
import { useTariffsStore } from '~/store/tariffsStore';

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
const tariffsStore = useTariffsStore();

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
  justify-content: space-between;

  &__body {
    margin-bottom: 4em;
  }

  &__text {
    font-family: 'fira-sans', sans-serif;
    font-size: 2.4em;
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