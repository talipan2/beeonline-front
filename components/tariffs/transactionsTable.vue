<template>
  <div class="transactions-table">
    <table class="transactions-table__table">
      <colgroup>
        <col class="transactions-table__col-1" />
        <col class="transactions-table__col-2" />
        <col class="transactions-table__col-3" />
      </colgroup>
      <thead>
        <tr>
          <th>Дата и время</th>
          <th>Сумма</th>
          <th>Операции</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(transaction, index) in transactionList" :key="index">
          <td class="transactions-table__date">{{ formatDate( transaction.date, 'DD.MM.YYYY') }} <span>{{ formatDate( transaction.date, 'mm:HH') }}</span></td>
          <td
            class="transactions-table__sum"
            :class="{
              'transactions-table__sum_type_withdrawal': transaction.type === 'withdrawal',
              'transactions-table__sum_type_replenishment': transaction.type === 'replenishment',
            }"
          >
            {{ `${transaction.type === 'withdrawal' ? '- ' : '+ '} ${formatMoney(transaction.sum, transaction.currency, 0)} `}}
          </td>
          <td class="transactions-table__status">Пополнение баллов</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>

const transactionList = [
  {
    date: new Date(),
    sum: 10,
    status: 'Пополнение баллов',
    type: 'replenishment',
    currency: 'bonuses'
  },
  {
    date: new Date(),
    sum: 10,
    status: 'Пополнение баллов',
    type: 'replenishment',
    currency: 'USD'
  },
  {
    date: new Date(),
    sum: 100,
    status: 'Покупка услуги',
    type: 'withdrawal',
    currency: 'RUB'
  },
  {
    date: new Date(),
    sum: 100,
    status: 'Покупка услуги',
    type: 'withdrawal',
    currency: 'bonuses'
  },
  {
    date: new Date(),
    sum: 100,
    status: 'Покупка услуги',
    type: 'withdrawal',
  },
  {
    date: new Date(),
    sum: 100,
    status: 'Покупка услуги',
    type: 'withdrawal',
  },
]

</script>

<style lang="scss">

.transactions-table {
  font-size: 1rem;

  th {
    font-size: 1.6em;
    line-height: 1.5em;
    font-weight: 700;
    padding: 1.06em;
    text-align: left;
    border-bottom: 1px solid #C4C4C4;
  }

  table {
    border-collapse: separate;
    border-spacing: 0 10px;
    width: 50%;
    border-bottom: 2px solid #6937a5;
  }

  td {
    font-size: 1.6em;
    line-height: 1.4em;
    padding: .46em 1.09em;
  }

  tfoot tr td {
    border: none;
  }

  tr:nth-child(even) {
    background-color: #fff;
  }

  &__date {
    span {
      color: #a9abac;
    }
  }

  &__sum {
    &_type_withdrawal {
      color: #6937a5;
    }

    &_type_replenishment {
      color: #6dbf2f;
    }
  }

  @include mobile {
    table {
      width: 100%;
    }

    td {
      font-size: 1.2em;
    }

    th {
      font-size: 1.2em;
    }
  }
}

</style>