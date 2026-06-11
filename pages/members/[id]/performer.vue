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
      <CatalogOtherEntityCompany v-if="activeEntity.length" :type="pubCard.type" :data="activeEntity" title="Актуальные услуги компании"/>
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
    organizationId: data.value.organization_id,
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
    reviewCount: data.value.reviews_about_count,
    stars: data.value.reviews_stats_about?.stars,
    rating: data.value.reviews_stats_about?.average_rating,
    statusComment: data.value.status_comment,
    updatedAt: formatDate(data.value.updated_at, 'DD.MM.YYYY, mm:HH'),
    entityCount: data.value.type === 'performer' ? data.value.services_count : data.value.orders_count,
    gallery: data.value.gallery && data.value.gallery.length && data.value.gallery.map(item => item.url) || [],
    videos: data.value.videos && data.value.videos.length && data.value.videos.map(item => item.external_url) || [],
    location: {
      cities: data.value.cities,
      regions: data.value.regions,
      countries: data.value.countries,
    },
  }
})

const activeEntity = computed(() => data.value.services || [])

data.value = await organizationStore.getPubCard(router.currentRoute.value.params.id)


const pageTitle = computed(() => pubCard.value.name || 'Международный цифровой сервис поиска партнеров в сфере модной индустрии');

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
