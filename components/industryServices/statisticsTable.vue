<template>
  <div class="statistics-table">
    <table>
      <colgroup>
        <col class="statistics-table__col-1" />
        <col class="statistics-table__col-2" />
        <col class="statistics-table__col-3" />
        <col class="statistics-table__col-4" />
      </colgroup>
      <thead>
        <tr>
          <th>Компания</th>
          <th>Инн</th>
          <th>Услуга</th>
          <th>Дата</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in statistics" :key="index">
          <td>{{ item.recipient_name }}</td>
          <td>{{ item.recipient_inn }}</td>
          <td>{{ item.adjacent_service_name }}</td>
          <td>{{ formatDate(item.created_at, 'DD.MM.YYYY') }} </td>
        </tr>
      </tbody>
    </table>
    <div class="statistics-table__mobile">
      <div class="statistics-table__card" v-for="(item, index) in statistics" :key="index">
        <div class="statistics-table__card-info">
          <p class="statistics-table__card-name">Компания</p>
          <p class="statistics-table__card-value">{{ item.recipient_name }}</p>
        </div>
        <div class="statistics-table__card-info">
          <p class="statistics-table__card-name">Услуга</p>
          <p class="statistics-table__card-value">{{ item.adjacent_service_name }}</p>
        </div>
        <div class="statistics-table__card-info">
          <p class="statistics-table__card-name">Инн</p>
          <p class="statistics-table__card-value">{{ item.recipient_inn }}</p>
        </div>
        <div class="statistics-table__card-info">
          <p class="statistics-table__card-name">Дата</p>
          <p class="statistics-table__card-value">{{ formatDate(item.created_at, 'DD.MM.YYYY') }}</p>
        </div>
      </div>
    </div>
    <CommonPagination v-if="page?.last_page > 1" :current-page="page.current_page" :total-pages="page.last_page" btn-type="square"  position="left" @changePage="fetchStatistics"/>
  </div>
</template>

<script setup>
import { useAdjacentStore } from "~/store/adjacentStore";

const adjacentStore = useAdjacentStore();

const loading = ref(false);
const statistics = ref([]);
const page = ref({});

onMounted(() => {
    fetchStatistics(1);
});

function fetchStatistics(currentPage) {
    if (loading.value) return;
    loading.value = true;

    adjacentStore
        .getStatistics({
            limit: 10,
            page: currentPage,
        })
        .then((response) => {
            statistics.value = response.data;
            page.value = response.meta;
        })
        .finally(() => {
            loading.value = false;
        });
}

</script>

<style lang="scss">

.statistics-table {
  font-size: 1rem;
  background-color: var(--bg-secondary-color);
  border: 1px solid var(--border-color-secondary);
  padding: 2.4em;

  &__col-1 {
    width: 31%;
  }

  &__col-2 {
    width: 19%;
  }

  &__col-3 {
    width: 39%;
  }

  &__col-4 {
    width: 11%;
  }

  table {
    font-size: 1.4em;
    line-height: 1.42em;
    width: 100%;
    border-collapse: collapse;
    table-layout: fixed;
  }



  thead {
    tr {
      font-family: 'fira-sans', sans-serif;
      color: #8b92a1;
      border-bottom: 1px solid #b2b2b2;
    }
    th {
      text-align: left;
      font-weight: 400;
      padding-bottom: .85em;
    }
  }

  tbody {
    tr:not(:last-child) {
      border-bottom: 1px solid #eceaea;
    }
    td {
      padding: .85em 4em .85em 0;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;

      &:last-child {
        padding-inline: 0;
      }
    }
  }

  &__mobile {
    display: none;
  }

  &__card {
    display: flex;
    flex-direction: column;
    padding-block: 1em;
    &:not(:last-child) {
      border-bottom: 1px solid #eceaea;
    }
  }

  &__card-info {
    display: flex;
    justify-content: space-between;
    column-gap: 2em;
    font-size: 1.2em;
    padding-block: .3em;
  }

  &__card-name {
    font-family: 'fira-sans', sans-serif;
    font-weight: 400;
    color: #8b92a1;
  }

  &__card-value {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }

  @include mobile {
    table {
      display: none;
    }

    &__mobile {
      display: block;
    }
  }
}

</style>
