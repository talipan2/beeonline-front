<template>
  <div class="invoices-table">
    <div class="anchor" ref="anchor"></div>
    <table class="invoices-table__table">
      <colgroup>
        <col class="invoices-table__col-1" />
        <col class="invoices-table__col-2" />
        <col class="invoices-table__col-3" />
        <col class="invoices-table__col-4" />
      </colgroup>
      <thead>
        <tr>
          <th>Дата и время</th>
          <th>Сумма</th>
          <th>Тип</th>
          <th>Статус</th>
          <th>Действия</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(invoice, index) in invoiceList" :key="index">
          <td class="invoices-table__date">
            {{ formatDate(invoice.created_at, "DD.MM.YYYY") }}
            <span>{{
              formatDate(invoice.created_at, "mm:HH")
            }}</span>
          </td>
          <td class="invoices-table__sum" :class="{
            'invoices-table__sum_type_purchase':
              invoice.type === 'purchase',
            'invoices-table__sum_type_add':
              invoice.type === 'add',
          }">
            {{ formatMoney(
              invoice.amount,
              invoice.currency
            )
            }}
          </td>
          <td class="invoices-table__date">
            {{ invoice.type_name }}
          </td>
          <td class="invoices-table__date">
            {{ invoice.status_name }}
          </td>
          <td>
            <a :href="invoice.pdf_url" target="_blank" v-if="invoice.pdf_url">Открыть</a>
            <a :href="invoice.payment_url" target="_blank" v-if="invoice.payment_url">Открыть</a>
          </td>
        </tr>
      </tbody>
    </table>

    <CommonPaginationOtherType v-if="page?.last_page > 1" :current_page="page.current_page"
      :last_page="page.last_page" :loading="loading" @page-changed="handlePageChange" />
  </div>
</template>

<script setup>
import { useTariffsStore } from '~/store/tariffsStore';
import { useUserStore } from '~/store/userStore';

const userStore = useUserStore();
const tariffStore = useTariffsStore();
const anchor = ref('anchor');

const invoiceList = ref([]);

const loading = ref(false);
const page = ref(null);

function handlePageChange(newPage) {
  getInvoices(newPage);
}

function getInvoices(newPage = 1, need_scroll = true) {
  loading.value = true;
  const prev_page = page.value?.current_page || 1;

  tariffStore.getInvoices(userStore.userData?.id, newPage)
    .then((data) => {
      invoiceList.value = data.data;
      page.value = data.meta;
      // document.body.scrollIntoView({ behavior: "smooth" });
      if (need_scroll && anchor.value) {
        anchor.value.scrollIntoView({ behavior: "smooth" });
      }
    })
    .catch(() => {
        if (page.value) {
          page.value.current_page = prev_page;
        }
    })
    .finally(() => {
      loading.value = false;
    });
}

getInvoices(1, false);
</script>

<style lang="scss">

.invoices-table {
  position: relative;
  font-size: 1rem;

  th {
    font-size: 1.6em;
    line-height: 1.5em;
    font-weight: 700;
    padding: 1.06em;
    text-align: left;
    border-bottom: 1px solid #c4c4c4;
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
    padding: 0.46em 1.09em;
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
    white-space: nowrap;

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

  @media screen and (max-width: 500px) {
    font-size: .8rem;
  }

  @include small-mobile {
    font-size: .7rem;
  }

}
</style>
