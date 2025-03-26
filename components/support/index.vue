<template>
  <div class="support">
    <div class="support__header">
      <p class="support__text">
        Вы можете сформировать запрос в нашу службу поддержки или отправить запрос на почту
        <a href="mailto:service@bee-online.ru" class="link">service@bee-online.ru.</a>
      </p>
      <UiButton to="/support/create" class="support__button" variant="quinary" size="large">Создать запрос</UiButton>
    </div>
    <h2 class="support__title">Ваши обращения</h2>
    <UiSelect
        class="support__select"
        name="status"
        :options="supportStatuses"
        v-model="filterList.status"
        value="0"
    />
    <div class="support__list">
      <div class="support__list-header">
        <p class="support__list-col-1">Запрос</p>
        <p class="support__list-col-2">Обновлено</p>
        <p class="support__list-col-3">Статус</p>
        <p class="support__list-col-4">Тема обращения</p>
      </div>
      <div class="support__list-item-container" v-for="(ticket, index) in supportTickets" :key="index">
        <div class="support__list-item support__list-item_type_solved">
          <p class="support__list-col-1">#{{ ticket.id }}</p>
          <p class="support__list-col-2">{{ formatDate(ticket.updated_at, 'weekday, DD.MM.YYYY - HH:mm:ss') }}</p>
          <p class="support__list-col-3">{{ ticket.status_name }}</p>
          <p class="support__list-col-4">{{ ticket.type_name }}</p>
          <NuxtLink class="support__list-link" :to="`/support/${ticket.id}`" />
        </div>
      </div>
    </div>
    <CommonPagination
        v-if="page?.last_page > 1"
        :current-page="page.current_page"
        :total-pages="page.last_page"
        @changePage="fetchTickets"
        :loading="loading"
    />
  </div>
</template>

<script setup>
import { useSupportStore } from "~/store/supportStore";

const supportStore = useSupportStore();

const page = ref({});
const supportTickets = ref([]);
const filterList = ref({
    status: 0,
});

const fetchTickets = (currentPage) => {
    supportStore.getSupportTickets({
        ...filterList.value,
        page: currentPage,
        limit: 10,
    })
    .then((data) => {
        supportTickets.value = data.data;
        page.value = data.meta;
    });
}

watch(filterList, (newVal) => {
    fetchTickets();
}, {deep: true});

const supportStatuses = computed(() => {
  const list = [
    { id: 0, label: "Все", value: 0, disabled: false },
  ];
  return list.concat(supportStore.getSupportTicketStatuses.map((item) => (
    { id: item.id, label: item.label, value: item.value }
  )));
});

onMounted(() => {
    supportStore.fetchSupportTicketStatuses()
    .then((response) => {
        fetchTickets();
    });
});

</script>

<style lang="scss">

.support {
  font-size: 1rem;

  &__header {
    display: flex;
    align-items: center;
    margin-bottom: 3.5em;
    column-gap: 1em;
  }

  &__text {
    font-size: 1.6em;

    a {
      display: inline;
    }
  }

  &__button {
    font-size: 1.2em;
    flex: 0 1 20%;
    text-transform: uppercase;
    margin-left: auto;
  }

  &__select {
    font-size: 1.6em;
    max-width: 30%;
    margin-bottom: 1.5em;
  }

  &__title {
    font-size: 2.8em;
    margin-bottom: 1em;
  }

  &__list {
    display: flex;
    flex-direction: column;
    font-size: 1.6em;
  }

  &__list-col-1 {
    flex: 0 1 20%;
  }

  &__list-col-2 {
    flex: 0 1 30%;
  }

  &__list-col-3 {
    flex: 0 1 20%;
  }

  &__list-col-4 {
    flex: 1 1 20%;
    text-align: right;
  }

  &__list-header {
    display: flex;
    border-top: 1px solid var(--border-color-secondary);
    border-bottom: 1px solid var(--border-color-secondary);
    padding: 1.125em;
    column-gap: 1em;

    p {
      font-weight: 600;
    }
  }

  &__list-item {
    position: relative;
    display: flex;
    padding: .56em 1.125em;
    margin-block: .56em;
    column-gap: 1em;

    &:hover {
      background-color: #F2F2F2;
    }

    &_type_solved {
      background-color: #fff;
    }
  }

  &__list-link {
    position: absolute;
    inset: 0;
  }

}

</style>
