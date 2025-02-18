<template>
  <div>
    <NuxtLayout name="profile" :title='`Кабинет ${roleName}`'  :rightSideSticky="false">
      <template #header>
        <UiBreadCrumb :list="[{label: 'Главная', link: '/'}, { label: `Кабинет ${roleName}`, link: '/desktop' }, { label: 'Профиль', link: '' }]" />
      </template>
      <template #content>
        <Profile />
      </template>
      <template #rightSide>
        <CommonCheckList adviceTitle="Полностью заполненный профиль выше в списке поиска" :checkList="checkListArray" :valueCheck="true"/>
        <CommonAlerts type="warning" class="right-side__alert" v-if="!userData.organization_id">
              <p>У вас не заполнена карточка компании.
                Заказы/услуги не будут доступны в каталоге без карточки компании. 
                <NuxtLink class="link" to="/pubcards/edit/1">Заполнить карточку компании</NuxtLink>
              </p>
          </CommonAlerts>
        <template v-if="cardsData.name && role === 'customer'">
          <h3 class="right-side__title">Так вашу компанию будут видеть другие участники портала:</h3>
          <CardsPublic :data="cardsData" isDescription isPropsVisible/>
        </template>
        <ProfileAddRoleCard :role="role"/>
      </template>
    </NuxtLayout>
  </div>
</template>

<script setup>
import { useUserStore } from '~/store/userStore';

const pubCard = computed(() => userStore.userPubCard);
const organization = computed(() => userStore.userOrganization);
const userStore = useUserStore();
const userData = computed(() => userStore.userData);

const role = userStore.getRole;
const roleName = userStore.getRoleNameForBreadcrumbs;

const checkListArray = computed(() => [
  { 
    label: 'Данные организации', 
    value: 'chapter-current',
    checkList: [
      { label: 'Название', value: organization.value.name},
      { label: 'ИНН', value: organization.value.inn},
      { label: 'Страна', value: organization.value.country_id},
      { label: 'Активность', value: organization.value.is_active},
    ]
  },
  { 
    label: 'Карточка компании', 
    value: 'chapter-current',
    checkList: [
      { label: 'Название', value: pubCard.value.name},
      { label: 'Логотип', value: pubCard.value.logo},
      { label: 'Описание', value: pubCard.value.description},
      { label: 'География фактического производства', value: pubCard.value.regions || pubCard.value.cities},
      { label: 'Активность', value: pubCard.value.is_active},
    ]
  },
])

const cardsData = computed(() => {
  if(role.value === 'performer') return {};
  return {
    name: pubCard.value.name || '',
    logo: pubCard.value.logo || '',
    description: pubCard.value.description || '',
    countryId: {countries: [pubCard.value.country_id]} || {},
    entityCount: pubCard.value.orders_count || 0,
    type: pubCard.value.type || '',
    rawMaterials: [pubCard.value.materials_own ? 'Собственное' : '', pubCard.value.materials_tolling ? 'Давальческое' : ''].filter(Boolean),
    category: pubCard.value.categories?.map(item => item.name) || [],
  }
})


onMounted(() => {
  userStore.getUserData(userStore.userData.id)
})


useHead({
  title: `Кабинет ${userStore.getRoleNameForBreadcrumbs}`,
  meta: [
    {
      name: 'description',
      content: '',
    },
  ],
});
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

  .right-side__alert {
    margin-block: 1em;
  }

  .add-roles {
    font-size: 1rem;
    margin-top: 1em;
    padding: 3em;
    box-shadow: var(--box-shadow-primary);
    background-color: #fff;

    &__title {
      font-size: 2.4em;
      margin-block: .8em .4em;
    }

    &__text {
      font-size: 1.3em;
      margin-bottom: 1.5em;
    }

    &__btn {
      font-size: 1.2em;
      text-transform: uppercase;
      color: var(--text-color-primary);
      font-weight: normal;
      &:hover {
        color: #fff;
      }
    }
  }
}

</style>