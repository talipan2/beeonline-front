<template>
  <NuxtLayout name="details-entity">
    <template #header>
      <UiBreadCrumb
        :list="[
          { label: 'Главная', link: '/' },
          { label: 'Участники портала', link: '/orders' },
          { label: `${pubCard.name || ''}`, link: '' },
        ]"
      />
    </template>
    <template #content>
      <CatalogMembersDetails :data="pubCard"/>
    </template>
    <template #rightSide>
      <CatalogOtherEntityCompany :type="pubCard.type" title="Актуальные заказы компании"/>
      <div class="views">
        <p>Просмотры: {{ pubCard.viewCount }}</p>
      </div>
    </template>
  </NuxtLayout>
</template>

<script setup>
import { useOrganizationStore } from '~/store/organizationStore';

const router = useRouter();
const organizationStore = useOrganizationStore();
const data = ref({});

const pubCard = computed(() => {
  return {
    id: data.value.id,
    name: data.value.name,
    logo: data.value.logo,
    description: data.value.description,
    type: data.value.type,
    siteUrl: data.value.url_site,
    tgUrl: data.value.url_tg,
    vkUrl: data.value.url_vk,
    ytUrl: data.value.url_yt,
    viewCount: data.value.view_count,
    fillRating: data.value.fill_rating,
    statusComment: data.value.status_comment,
    updatedAt: formatDate(data.value.updated_at, 'DD.MM.YYYY, mm:HH'),
    entityCount: 1,
    gallery: data.value.gallery && data.value.gallery.length && data.value.gallery.map(item => item.url),
    videos: data.value.videos && data.value.videos.length && data.value.videos.map(item => item.external_url),
    location: data.value.regions && data.value.cities ? { regions: data.value.regions.map(region => region.id), cities: data.value.cities.map(city => city.id) } : [],
  }
})

onMounted(async() => {
  console.log(router.currentRoute.value.params.id)
  data.value = await organizationStore.getPubCard(router.currentRoute.value.params.id)
})

const pageTitle = computed(() => pubCard.value.name || 'Международный цифровой сервис поиска партнеров в сфере легкой промышленности');

useHead({
  title: pageTitle,
  meta: [
    {
      name: 'description',
      content: '',
    },
  ],
});

</script>