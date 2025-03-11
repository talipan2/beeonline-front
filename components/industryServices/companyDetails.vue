<template>
  <div class="company-details">
    <IndustryServicesCompanyInfo :data="pubcard" v-if="pubcard"/>
    <div class="company-details__list" >
      <template v-for="(item, index) in services" :key="index">
        <IndustryServicesCard :data="item"/>
      </template>
    </div>
    <CommonPagination v-if="page.lastPage > 1" :current-page="page.currentPage" :total-pages="page.lastPage" btn-type="square"  position="left"/>
  </div>
</template>

<script setup>
import { useAdjacentStore } from '~/store/adjacentStore';
import { useOrganizationStore } from '~/store/organizationStore';

const organizationStore = useOrganizationStore();
const router = useRouter();

const adjacentStore = useAdjacentStore();

const services = ref([]);
const page = ref({});
const loading = ref(false);
const pubcard = ref(null);

const emits = defineEmits(['pubcard:loaded']);

const props = defineProps({
  id: {
    type: Number,
    requited: true,
  }
});

onMounted(() => {
    organizationStore
    .getPubCard(props.id)
    .then((response) => {
        pubcard.value = response;
        emits('pubcard:loaded', response);
        fetchServices(1);
    });
})

function fetchServices(currentPage) {
    if (loading.value) return;
    loading.value = true;

    adjacentStore.getServices(pubcard.value.id, {
        limit: 10,
        page: currentPage,

    })
    .then((response) => {
        services.value = response.data;
    });
}

// const data = ref([
//   {
//     description: 'Добровольная сертификация представляет собой процесс получения официального подтверждения, свидетельствующего о том, что товары, услуги или выполненные работы отвечают определенным стандартам, включая ГОСТ Р. что товары, услуги или выполненные работы отвечают определенным стандартам, включая ГОСТ Р ',
//     siteUrl: 'https://www.youtube.com/feed/subscriptions',
//     logo: '',
//     category: ['Пошив женской одежды', 'Пошив мужской одежды']
//   },
//   {
//     description: 'Добровольная сертификация',
//     siteUrl: 'https://www.youtube.com/feed/subscriptions',
//     logo: '',
//     category: ['Пошив женской одежды', 'Пошив мужской одежды']
//   },
//   {
//     description: 'Добровольная сертификация',
//     siteUrl: 'https://www.youtube.com/feed/subscriptions',
//     logo: '',
//     category: ['Пошив женской одежды', 'Пошив мужской одежды']
//   },
//   {
//     description: 'Добровольная сертификация',
//     siteUrl: 'https://www.youtube.com/feed/subscriptions',
//     logo: '',
//     category: ['Пошив женской одежды', 'Пошив мужской одежды']
//   }
// ])

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
