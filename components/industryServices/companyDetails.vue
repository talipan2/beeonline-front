<template>
  <div class="company-details">
    <IndustryServicesCompanyInfo />
    <div class="company-details__list" >
      <template v-for="(item, index) in data" :key="index">
        <IndustryServicesCard :data="item"/>
      </template>
    </div>
    <CommonPagination v-if="page.lastPage > 1" :current-page="page.currentPage" :total-pages="page.lastPage" btn-type="square"  position="left"/>
  </div>
</template>

<script setup>

const page = ref({
  currentPage: 1,
  lastPage: 2
});

const data = ref([
  {
    description: 'Добровольная сертификация представляет собой процесс получения официального подтверждения, свидетельствующего о том, что товары, услуги или выполненные работы отвечают определенным стандартам, включая ГОСТ Р. что товары, услуги или выполненные работы отвечают определенным стандартам, включая ГОСТ Р ',
    siteUrl: 'https://www.youtube.com/feed/subscriptions',
    logo: '',
    category: ['Пошив женской одежды', 'Пошив мужской одежды']
  },
  {
    description: 'Добровольная сертификация',
    siteUrl: 'https://www.youtube.com/feed/subscriptions',
    logo: '',
    category: ['Пошив женской одежды', 'Пошив мужской одежды']
  },
  {
    description: 'Добровольная сертификация',
    siteUrl: 'https://www.youtube.com/feed/subscriptions',
    logo: '',
    category: ['Пошив женской одежды', 'Пошив мужской одежды']
  },
  {
    description: 'Добровольная сертификация',
    siteUrl: 'https://www.youtube.com/feed/subscriptions',
    logo: '',
    category: ['Пошив женской одежды', 'Пошив мужской одежды']
  }
])

</script>

<style lang="scss">

.company-details {
  &__list {
    display: flex;
    flex-wrap: wrap;
    gap: 2em;
  }
}

</style>