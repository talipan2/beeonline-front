<template>
  <div class="org-check" :class="{'loading' : isLoading}">
    <div class="org-check__container">
      <UiSelect
        class="org-check__select"
        v-model="currentFilter"
        :options="filterOptions"
        :error-show="false"
        return-value="value"
      />
      <div class="org-check__header">
        <p class="org-check__col org-check__col_type_one">Дата:</p>
        <p class="org-check__col org-check__col_type_two">Название компании:</p>
        <p class="org-check__col org-check__col_type_three">Статус:</p>
      </div>
      <div class="org-check__list">
        <div class="org-check__item" v-for="(org, index) in counterpartyCheckList" :key="index">
          <p class="org-check__col org-check__col_type_one">{{ formatDate(org.created_at, 'DD.MM.YYYY - mm:HH') }}</p>
          <p class="org-check__col org-check__col_type_two">{{ org.counterparty_name }}</p>
          <p class="org-check__col org-check__col_type_three">{{ formatStatus(org.status) }}</p>
          <div class="org-check__col org-check__btn-container">
            <PaidServiceCounterpartyCheck
                :id="org?.organizationId"
            >
                <template #button="{ open }">
                  <UiButton type="button" class="org-check__btn org-check__btn_type_one" variant="tertiary" size="large" @click="open">
                    <SvgoRefresh class="svg-m" fill="#6937a5"/>
                    Обновить
                  </UiButton>
                </template>
            </PaidServiceCounterpartyCheck>
            <UiButton class="org-check__btn org-check__btn_type_one" variant="tertiary" size="large">
              Открыть
            </UiButton>
            <UiButton class="org-check__btn" variant="quinary" size="large">
              <SvgoDownload class="svg-m" fill="#fff"/>
              Скачать PDF
            </UiButton>
          </div>
        </div>
      </div>
    </div>
    <CommonAlerts v-if="!counterpartyCheckList.length && !isLoading" alert="Проверок нет" :type="'warning'" />
    <CommonPagination v-if="page?.lastPage > 1" class="org-check__pagination" :current-page="page.currentPage" :total-pages="page.lastPage" @changePage="handleChangePage" />
  </div>
</template>

<script setup>
import { useCounterpartyCheckStore } from '~/store/counterpartyCheckStore';


const counterpartyCheckStore = useCounterpartyCheckStore();

const counterpartyCheckList = ref([]);
const isLoading = ref(false);

const formatStatus = (status) => {
  switch (status) {
    case 'in_progress':
      return 'В работе'
    case 'failed':
      return 'Ошибка'
    case 'success':
      return 'Успешно'
    default:
      return ''
  }
}

const page = ref({
  currentPage: 1,
  lastPage: 2
})

const currentFilter = ref('all')

const filterOptions = [
  {id: 0, label: 'Все', value: 'all'},
  {id: 1, label: 'В работе', value: 'in_progress'},
  {id: 2, label: 'Ошибка', value: 'failed'},
  {id: 3, label: 'Успешно', value: 'success'},
]

const fetchData = (params) => {
  isLoading.value = true
  counterpartyCheckStore.getCounterparties(params)
  .then(res => {
    counterpartyCheckList.value = res.data;
    page.value = res.meta
  })
  .finally(() => isLoading.value = false)
}

const handleChangePage = (page) => {
  fetchData({page: page, status: currentFilter.value})
}

watch(currentFilter, (newVal) => {
  if (newVal === 'all') {
    fetchData()
    return
  }
  fetchData({status: newVal})
})

onMounted(() => {
  fetchData()
});

</script>

<style lang="scss">

.org-check {
  font-size: 1.6rem;

  &__select {
    max-width: 30%;
    margin-bottom: 1.5em;

    @include mobile {
      max-width: 100%;
    }
  }

  &__header {
    display: flex;
    border-top: 1px solid var(--border-color-secondary);
    border-bottom: 1px solid var(--border-color-secondary);
    padding: 1.25em .93em;
    margin-bottom: .625em;
  }

  &__list {
    display: flex;
    flex-direction: column;
    row-gap: .625em;
  }

  &__item {
    display: flex;
    align-items: center;
    padding: 1.25em .93em;
    box-shadow: var(--box-shadow-primary);
    background-color: #fff;
  }

  &__btn-container {
    display: flex;
    flex: 0 1 auto;
    column-gap: .5em;
    font-size: .75em;
    margin-left: auto;
  }

  &__btn {
    column-gap: .5em;
    padding: .83em;
    text-transform: uppercase;
    font-weight: 400;

    svg {
      margin-block: -1em;
    }

    &_type_one {
      color: var(--text-color-primary);

      svg {
        fill: var(--text-color-primary);
      }
    }
  }

  &__col_type_one {
    flex: 0 1 20%;
  }

  &__col_type_two {
    flex: 0 1 30%;
  }

  &__col_type_three {
    flex: 0 1 10%;
  }

  @include mobile {
    &__header {
      display: none;
    }

    &__item {
      align-items: flex-start;
      flex-direction: column;
      row-gap: 1em;
    }

    &__btn-container {
      font-size: 1rem;
    }
  }
}

</style>