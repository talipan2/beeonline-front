<template>
  <div class="tariffs">
    <div class="tariffs__header">
      <TariffsBalanceCard :userBalance="userBalance" :userBonuses="userBonuses" :currentCurrency="currentCurrency"/>
      <TariffsPlanSummaryCard />
    </div>
    <div class="tariffs__content">
      <div class="tariffs__content-header">
        <h2 class="tariffs__title">Тарифы</h2>
        <CommonTabs class="tariffs__tabs" :tabs="tabsList" v-model="currentTab" v-if="!isInternational"/>
        <UiSelect class="tariffs__selector" :options="tabsList" v-model="currentTab" v-if="!isInternational" />
      </div>
      <TariffsPriceTable :subDuration="currentTab" ref="priceTable" @select="selectTariff" v-if="!isInternational"/>
      <TariffsInternational v-if="isInternational" @select="selectTariff"/>
    </div>
    <div class="tariffs__content">
      <div class="tariffs__content-header">
        <h2 class="tariffs__title">Дополнительные услуги</h2>
      </div>
      <TariffsServicesTable  @select="selectServices" :currentCurrency="currentCurrency" @reset="childReset"/>
    </div>
    <div class="tariffs__content">
      <div class="tariffs__content-header">
        <h2 class="tariffs__title">Последние транзакции</h2>
      </div>
      <TariffsTransactionsTable />
    </div>
    <TariffsPayModal 
      :data="currentPaymentData" 
      :userBalance="userBalance" 
      :userBonuses="userBonuses" 
      :currentCurrency="currentCurrency" 
      :reset="handleReset"
      :deleteResetFunction="deleteResetFunction"
    />
  </div>
</template>

<script setup>
import { useSettingStore } from '~/store/settingStore';
import { useUserStore } from '~/store/userStore';

const userStore = useUserStore();
const settingStore = useSettingStore();

const userBalance = computed(() => formatMoney(userStore.userBalance, currentCurrency.value));
const userBonuses = computed(() => userStore.userBonuses);

// переменная для определения международного тарифа 
const isInternational = ref(false);

const currentCurrency = computed(() => {
  if (isInternational.value) {
    return 'USD';
  }
  return 'RUB';
});

const priceTable = ref(null);

const currentPaymentData = ref({
  data: [],
  sum: 0,
  currency: 'RUB'
});

const tabsList = ref([
  {id: 1, label: '1 месяц', value: '1'},
  {id: 2, label: '3 месяца', value: '3'},
  {id: 3, label: '6 месяца', value: '6'},
  {id: 4, label: '12 месяцев', value: '12'}
]);

const currentTab = ref(tabsList.value[0].value);

function selectTariff(tariff, total, currency) {
  currentPaymentData.value = {data: tariff, sum: total, currency: currency};
  settingStore.payModalStatus = true;
}

function selectServices(services, total, currency) {
  currentPaymentData.value = {data: services, sum: total, currency: currency};
  settingStore.payModalStatus = true;
}

watch(() => currentTab.value, (newVal) => {
  if(priceTable.value && priceTable.value.$el && window.innerWidth > 768) {
    smoothScroll(priceTable.value.$el.offsetTop + priceTable.value.$el.offsetHeight - window.innerHeight);
  }
});


// функция сброса при сабмите в модалке
const handleReset = ref(null)

function deleteResetFunction() {
  handleReset.value = null
}

// получения функции с дочернего компонента
const childReset = (reset) => {
  if (typeof reset === 'function') {
    handleReset.value = reset
  }
}

</script>

<style lang="scss">

.tariffs {
  font-size: 1rem;
  &__header {
    display: flex;
    column-gap: 2.4em;
    margin-bottom: 2.8em;
  }

  &__content-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.4em;
  }

  &__title {
    font-size: 2.4em;
    font-weight: 400;
    line-height: 1.2em;
    color: #000;
  }

  &__content {
    margin-bottom: 4em;
  }

  &__selector {
    display: none;
  }

  @include mobile {
    &__header {
      flex-direction: column;
      row-gap: 1.6rem;
    }

    &__content-header {
      flex-direction: column;
      align-items: flex-start;
      row-gap: 2rem;
    }

    &__title {
      font-size: 1.8em;
    }

    &__selector {
      display: block;
      font-size: 1.4em;
      width: 50%;
    }

    &__tabs {
      display: none;
    }
  }

  @include small-mobile {
    &__selector {
      width: 100%;
    }
  }

}


</style>