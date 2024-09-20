<template>
  <div>
    <NuxtLayout name="profile" title="Кабинет заказчика">
      <template #header>
        <UiBreadCrumb :list="[{label: 'Главная', link: '/'}, { label: 'Кабинет заказчика', link: '/customer' }, { label: 'Профиль', link: '' }]" />
      </template>
      <template #content>
        <Profile />
      </template>
      <template #rightSide>
        <CommonCheckList adviceTitle="Полностью заполненный профиль выше в списке поиска" :checkList="checkListArray" :valueCheck="true"/>
        <h3 class="right-side__title">Так вашу компанию будут видеть другие участники портала:</h3>
        <CardsPublic :data="cardsData" isDescription/>
      </template>
    </NuxtLayout>
  </div>
</template>

<script setup>
import { useOrganizationStore } from '~/store/organizationStore';


const organizationStore = useOrganizationStore();

const pubCard = computed(() => organizationStore.pubCards);
const organization = computed(() => organizationStore.organization);

const checkListArray = [
  { label: 'Данные организации', value: 'chapter'},
  { label: 'Карточка компании', value: 'chapter-current'},
  { label: 'Название', value: pubCard.value.name},
  { label: 'Логотип', value: pubCard.value.logo},
  { label: 'Описание', value: pubCard.value.description},
  { label: 'География фактического производства', value: organization.value.country_id},
  { label: 'Активность', value: ''},
]

const cardsData = computed(() => {
  return {
    companyName: pubCard.value.name,
    companyLogo: pubCard.value.logo,
    description: pubCard.value.description,
  }
})

</script>


<style lang="scss">

.profile {

  .checklist {
    max-width: 25.5em;
  }

  .right-side__title{
    font-size: 2.4em;
    line-height: 1.2em;
    margin-block: 1.25em .83em;
  }
}

</style>