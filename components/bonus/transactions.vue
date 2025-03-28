<template>
  <div class="card transactions" :class="{
    card_loading: loading,
  }">
    <div class="card__content">
      <h2 class="card__title">Транзакции</h2>

      <div class="table-wrap">
        <table class="transactions__table table table-striped" v-if="transactions.length">
          <thead>
            <tr>
              <th>ID</th>
              <th>Сумма</th>
              <th>Описание</th>
              <th>Время</th>
            </tr>
          </thead>
          <tbody>
            <template v-for="(transaction, index) in transactions" :key="index">
              <tr>
                <td>{{ transaction.id }}</td>
                <td>{{ transaction.amount }}</td>
                <td>
                  <div v-if="transaction.bonus">{{ transaction.bonus.name }}</div>
                  <div class="text-secondary" v-if="transaction.message && transaction.message.length">{{
                    transaction.message }}</div>
                </td>
                <td>{{ formatDate(transaction.created_at, 'DD.MM.YYYY mm:HH') }}</td>
              </tr>
            </template>
          </tbody>
        </table>
      </div>

      <div class="transactions__alert alert alert-primary" v-if="!loading && !transactions.length">
        Транзакций нет
      </div>
      <div class="transactions__more" v-if="page < lastPage">
        <UiButton type="button" variant="quinary" class="bonus-more-btn" size="large" @click="loadMore">Загрузить еще</UiButton>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useBonusStore } from '~/store/bonusStore';

const props = defineProps({
  organizationId: {
    type: Number,
    default: null,
  },
})



const bonusStore = useBonusStore();
const loading = ref(false);
const transactions = ref([]);
const page = ref(1);
const lastPage = ref(1);

const loadMore = () => {
  page.value += 1;
  loading.value = true;
  bonusStore.getBonusesTransactions(props.organizationId, {page:page.value}).then(res => {
    if(res) {
      transactions.value = [...transactions.value, ...res.data];
      lastPage.value = res.last_page;
    }
  }).finally(() => loading.value = false);
}

onMounted(() => {
  if(props.organizationId) {
    loading.value = true;
    bonusStore.getBonusesTransactions(props.organizationId).then(res => {
      if(res) {
        transactions.value = res.data;
        page.value = res.current_page;
        lastPage.value = res.last_page;
      }
    }).finally(() => loading.value = false);
  }
})


</script>

<style lang="scss">

.transactions {
  &__table {
      font-size: 1.4rem;
  }

  &__more {
    font-size: 1.6em;
    display: flex;
    justify-content: start;
  }
}

@include mobile {
  .transactions {
    padding: 21px 6px !important;
    &__table {
      font-size: 1.2rem;
    }
  }
}
</style>
