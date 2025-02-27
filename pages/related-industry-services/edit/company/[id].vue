<template>
  <NuxtLayout name="profile" title="Редактирование компании" className="entity-edit">
    <template #header>
      <UiBreadCrumb
        :list="[
          { label: 'Главная', link: '/' }, 
          { label: `Профиль`, link: '/profile' }, 
          { label: 'Редактирование компании', link: '' }
        ]" 
      />
    </template>
    <template #content>
      <IndustryServicesEditCompany :data="data"/>
    </template>
    <template #rightSide>
      <div class="h4 mb-1">Предварительный просмотр</div>
      <IndustryServicesCompanyCard :data="previewCardData" isPreview/>
    </template>    
  </NuxtLayout>
</template>

<script setup>
import { useEntityStore } from '~/store/entityStore';

const entityStore = useEntityStore();

const data = ref({
  id: 1,
  name: 'Компания 1',
  description: 'Компания «НЦС» является аккредитованным органом по сертификации. Мы оказываем спектр услуг в области разрешительной документации с 2016 года. Занимаемся услугами по оценке соответствия, испытаниям продукции, разработке технической документации.',
  siteUrl: 'https://example.com',
  logo: {url: ''},
  entityCount: 10,
  category: [1, 2, 3],
  countryId: 1,
})

const previewCardData = computed(() => ({
  name: data.value.name,
  logo: data.value.logo?.url,
  siteUrl: data.value.siteUrl,
  category: entityStore.getEntityLabelById('categories', data.value.category),
  description: data.value.description,
  entityCount: data.value.entityCount,
  countryId: { countries: [data.value.countryId] },
}))

</script>

<style lang="scss">

.entity-edit {

  @include small-tablet {
    .profile__container {
      column-gap: 5em;
    }

    .profile__right {
      flex-basis: 40%;
    }
    
  }
}

</style>