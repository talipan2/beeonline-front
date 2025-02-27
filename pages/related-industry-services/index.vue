<template>
  <NuxtLayout name="catalog" className="industry-services" title="Сервисы смежных отраслей">
    <template #header>
      <UiBreadCrumb :list="[{label: 'Главная', link: '/'}, { label: 'Сервисы смежных отраслей', link: '' }]" />
    </template>
    <template #leftSide>
      <IndustryServicesFilter @updateFilter="updateFilter"/>
    </template>
    <template #content>
      <IndustryServicesList :data="companyList"/>
      <CommonPagination 
        class="industry-services__pagination"
        v-if="page.lastPage > 1" 
        :current-page="page.currentPage" 
        :total-pages="page.lastPage" 
        @changePage="handleChangePage"
        btnType="square"
        position="left"
      />
    </template>
  </NuxtLayout>
</template>

<script setup>

const companyList = ref([]);

const filter = ref({});

const page = ref({
  currentPage: 1,
  lastPage: 20,
});

const updateFilter = (data) => {
  filter.value = {...data};
}

const handleChangePage = (currentPage) => {
  page.value.currentPage = currentPage
}

onMounted(() => {
  setTimeout(() => {
    companyList.value = [
      {
        id: 1,
        name: 'Компания 1',
        description: 'Компания «НЦС» является аккредитованным органом по сертификации. Мы оказываем спектр услуг в области разрешительной документации с 2016 года. Занимаемся услугами по оценке соответствия, испытаниям продукции, разработке технической документации.',
        siteUrl: 'https://example.com',
        logo: '',
        entityCount: 10,
        category: ['Категория 1', 'Категория 2', 'Категория 3'],
        countryId: { countries: [1] },
      },
      {
        id: 2,
        name: 'Компания 2',
        description: 'Компания «НЦС» является аккредитованным органом по сертификации. Мы оказываем спектр услуг в области разрешительной документации с 2016 года. Занимаемся услугами по оценке соответствия, испытаниям продукции, разработке технической документации. related-industry-services Компания «НЦС» является аккредитованным органом по сертификации. Мы оказываем спектр услуг в области разрешительной документации с 2016 года. Занимаемся услугами по оценке соответствия, испытаниям продукции, разработке технической документации. related-industry-services',
        siteUrl: 'https://example.com',
        logo: '',
        entityCount: 10,
        category: ['Категория 1', 'Категория 2', 'Категория 3'],
        countryId: { countries: [1] },
      }
    ]
  }, 1000);
})

</script>

<style lang="scss">

.industry-services {
  &__pagination {
    margin-top: 4.8rem;
  }
}

</style>