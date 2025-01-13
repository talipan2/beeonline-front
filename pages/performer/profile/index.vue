<template>
  <NuxtLayout name="profile" title="Кабинет исполнителя">
    <template #header>
      <UiBreadCrumb
        :list="[{ label: 'Главная', link: '/' }, { label: 'Кабинет исполнителя', link: '/performer/desktop' }, { label: 'Профиль', link: '' }]" />
    </template>
    <template #content>
      <Profile />
    </template>
    <template #rightSide>
      <CommonCheckList adviceTitle="Полностью заполненный профиль выше в списке поиска" :checkList="checkListArray" :valueCheck="true"/>
    </template>
  </NuxtLayout>
</template>

<script setup>
import { useOrganizationStore } from '~/store/organizationStore';
import { useUserStore } from '~/store/userStore';

const userStore = useUserStore();

const pubCard = computed(() => userStore.userPubCard);

const checkListArray = [
  { label: 'Данные организации', value: 'chapter'},
  { label: 'Карточка компании', value: 'chapter-current'},
  { label: 'Название', value: pubCard.value.name || ''},
  { label: 'Логотип', value: pubCard.value.logo || ''},
  { label: 'Описание', value: pubCard.value.description  || ''},
  { label: 'География фактического производства', value: pubCard.value.cities || ''},
  { label: 'Активность', value: ''},
]

</script>

<style lang="scss">

.profile {
  
  .checklist {
    max-width: 25.5em;
  }
}

</style>