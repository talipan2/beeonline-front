<template>
  <div class="org-check" :class="{'loading' : isLoading}">
    <div class="org-check__container">
      <UiSelect
        class="org-check__select"
        v-model="currentFilter"
        :options="filterOptions"
        :error-show="false"
        :return-value="true"
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
          <div class="org-check__col org-check__btn-container" v-if="org.file">
            <PaidServiceCounterpartyCheck
                :id="org?.counterparty_id"
            >
                <template #button="{ open }">
                  <UiButton type="button" class="org-check__btn org-check__btn_type_one" variant="tertiary" size="large" @click="open">
                    <SvgoRefresh class="svg-m" fill="#6937a5"/>
                    Обновить
                  </UiButton>
                </template>
            </PaidServiceCounterpartyCheck>
            <UiButton class="org-check__btn org-check__btn_type_one" variant="tertiary" size="large" :to="org.file?.url" target="_blank">
              Открыть
            </UiButton>
            <a class="btn btn-quinary btn-large org-check__btn" :href="org.file?.url" download>
              <SvgoDownload class="svg-m" fill="#fff"/>
              Скачать PDF
            </a>
          </div>
        </div>
      </div>
    </div>
    <template v-if="!counterpartyCheckList.length && !isLoading">
      <CommonAlerts alert="Проверок нет" :type="'warning'" />
      <div class="org-check__link-container">
        <UiButton to="/services" variant="quinary" size="large" class="org-check__link" v-if="userS">
          <span>Каталог исполнителей</span>
          <SvgoBtnArrow class="svg-l" />
        </UiButton>
        <UiButton to="/orders" variant="quinary" size="large" class="org-check__link">
          <span>Каталог заказчиков</span>
          <SvgoBtnArrow class="svg-l" />
        </UiButton>
      </div>
    </template>
    <CommonPagination v-if="page?.lastPage > 1" class="org-check__pagination" :current-page="page.currentPage" :total-pages="page.lastPage" @changePage="handleChangePage" />
  </div>
</template>

<script setup>
import { useCounterpartyCheckStore } from '~/store/counterpartyCheckStore';
import { useUserStore } from '~/store/userStore';


const counterpartyCheckStore = useCounterpartyCheckStore();
const userStore = useUserStore();

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
  lastPage: 1
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


  &__link {
    max-width: 50%;
    font-size: 0.875em;
    text-transform: uppercase;
    width: 100%;
    -moz-column-gap: 1em;
    column-gap: 1em;

    @include mobile {
      font-size: 0.75em;
    }
  
    @include small-mobile {
      max-width: 100%;
    }
  }
}

</style>