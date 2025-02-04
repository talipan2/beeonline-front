<template>
  <div class="transactions-table">
    <div class="anchor" ref="anchor"></div>
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
          <td class="transactions-table__date">{{ formatDate( transaction.created_at, 'DD.MM.YYYY') }} <span>{{ formatDate( transaction.created_at, 'mm:HH') }}</span></td>
          <template v-if="transaction.is_bonus">
						{{ `${transaction.type === "purchase" ? "- " : "+ "} ${transaction.amount}` }}
					</template>
          <td
            v-else
            class="transactions-table__sum"
            :class="{
              'transactions-table__sum_type_purchase': transaction.type === 'purchase',
              'transactions-table__sum_type_add': transaction.type === 'add',
            }"
          >
            {{ `${transaction.type === 'purchase' ? '- ' : '+ '} ${formatMoney(transaction.amount, transaction.currency?.code || 'bonuses')} `}}
          </td>
          <td class="transactions-table__status">{{ transaction.comment }}</td>
        </tr>
      </tbody>
    </table>
    <CommonPaginationOtherType 
      v-if="page.current_page && page.last_page > 1"
			:current_page="page.current_page"
			:last_page="page.last_page"
			:loading="loading"
			@page-changed="handlePageChange"
    />

  </div>
</template>

<script setup>
import { useTariffsStore } from '~/store/tariffsStore';
import { useUserStore } from '~/store/userStore';


const userStore = useUserStore();
const tariffStore = useTariffsStore();
const anchor = ref('anchor');

const transactionList = ref([]);
const loading = ref(false);

const page = ref({
  prev_page: 1,
  current_page: 1,
  last_page: 0,
})

function handlePageChange(newPage) {
    page.value = {
      current_page: newPage,
      last_page: page.value.last_page,
      prev_page: page.value.current_page,
	  };
    getTransactions(false);
}

function getTransactions(dropPage = true, need_scroll = true) {
  loading.value = true;

  if (dropPage) {
    page.value = {
      current_page: 1,
      last_page: 1,
      prev_page: 1,
    };
  }

  tariffStore.getTransactions(userStore.userData?.id, page.value.current_page)
	.then((data) => {
		transactionList.value = data.data;
		page.value = {
			current_page: data.current_page,
			last_page: data.last_page,
			prev_page: page.value.prev_page,
		}
		// document.body.scrollIntoView({ behavior: "smooth" });
		if (need_scroll && anchor.value) {
			anchor.value.scrollIntoView({ behavior: "smooth" });
		}
	})
	.catch((err) => {
    if(err) {
      page.value = {
        current_page: page.value.prev_page,
        last_page: page.value.last_page,
        prev_page: page.value.prev_page,
      };
    }
	})
	.finally(() => {
		loading.value = false;
	});
}

onMounted(() => {
  getTransactions(true, false);
})

</script>

<style lang="scss">

.transactions-table {
  font-size: 1rem;

  &__col-3 {
    width: 50%;
  }

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
    width: 55%;
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
    &_type_purchase {
      color: #6937a5;
    }

    &_type_add {
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