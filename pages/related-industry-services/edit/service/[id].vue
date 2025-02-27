<template>
  <NuxtLayout name="profile" title="Редактирование услуги" className="entity-edit">
    <template #header>
      <UiBreadCrumb
        :list="[
          { label: 'Главная', link: '/' }, 
          { label: `Профиль`, link: '/profile' }, 
          { label: 'Редактирование услуги', link: '' }
        ]" 
      />
    </template>
    <template #content>
      <IndustryServicesEditService :data="data"/>
    </template>
    <template #rightSide>
      <div class="h4 mb-1">Предварительный просмотр услуги</div>
      <IndustryServicesCard :data="previewCardData" isPreview/>
    </template>    
  </NuxtLayout>
</template>

<script setup>
import { useEntityStore } from '~/store/entityStore';

const entityStore = useEntityStore();

const data = ref({
  description: 'Добровольная сертификация представляет собой процесс получения официального подтверждения, \n\nсвидетельствующего о том, что товары, услуги или выполненные работы отвечают определенным стандартам, включая ГОСТ Р. что товары, услуги или выполненные работы отвечают определенным стандартам, включая ГОСТ Р ',
  siteUrl: 'sdfasdfasd',
  logo: '',
  categories: [1, 2],
  name: 'Добровольная сертификация',
})

const previewCardData = computed(() => ({
  name: data.value.name,
  logo: data.value.logo?.url,
  siteUrl: data.value.siteUrl,
  category: entityStore.getEntityLabelById('categories', data.value.categories),
  description: data.value.description
}))

</script>