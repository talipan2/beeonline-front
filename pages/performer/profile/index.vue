<template>
  <NuxtLayout name="profile" title="Кабинет исполнителя" :rightSideSticky="false">
    <template #header>
      <UiBreadCrumb
        :list="[{ label: 'Главная', link: '/' }, { label: 'Кабинет исполнителя', link: '/performer/desktop' }, { label: 'Профиль', link: '' }]" />
    </template>
    <template #content>
      <Profile />
    </template>
    <template #rightSide>
      <CommonCheckList adviceTitle="Полностью заполненный профиль выше в списке поиска" :checkList="checkListArray" :valueCheck="true"/>
      <CommonAlerts type="warning" class="right-side__alert" v-if="!userData.organization_id">
          <p>У вас не заполнена карточка компании.
            Заказы/услуги не будут доступны в каталоге без карточки компании. 
            <NuxtLink class="link" to="/performer/pubcards/edit/1">Заполнить карточку компании</NuxtLink>
          </p>
      </CommonAlerts>
      <template v-if="userData && userData.roles && !userData.roles.includes('customer')">
          <div class="add-roles">
            <h2 class="add-roles__title">Стать заказчиком</h2>
            <p class="add-roles__text">Вы зарегистрированы на портале как исполнитель заказов. Если вы также хотите размещать собственные заказы в каталоге, 
              активируйте данную возможность ниже и сохраните изменения. 
              После этого в вашем личном кабинете появится возможность создавать заказы в каталоге для исполнителей от лица своей компании
            </p>
            <UiButton type="button" variant="tertiary" size="large" class="add-roles__btn" @click="handleCreateRole('customer')">Хочу размещать услуги от лица своей компании</UiButton>
          </div>
        </template>
    </template>
  </NuxtLayout>
</template>

<script setup>
import { useOrganizationStore } from '~/store/organizationStore';
import { useUserStore } from '~/store/userStore';

useHead({
  title: 'Кабинет исполнителя',
  meta: [
    {
      name: 'description',
      content: '',
    },
  ],
});

const organizationStore = useOrganizationStore();
const userStore = useUserStore();

const pubCard = computed(() => userStore.userPubCard);
const organization = computed(() => organizationStore.organization);
const userData = computed(() => userStore.userData);

const checkListArray = [
  { label: 'Данные организации', value: 'chapter'},
  { label: 'Карточка компании', value: 'chapter-current'},
  { label: 'Название', value: pubCard.value.name || ''},
  { label: 'Логотип', value: pubCard.value.logo || ''},
  { label: 'Описание', value: pubCard.value.description  || ''},
  { label: 'География фактического производства', value: pubCard.value.cities || ''},
  { label: 'Активность', value: ''},
]

function handleCreateRole(role) {
  userStore.setUserData({ role: role }, userData.value.id)
  .then(res => {
    userStore.role = role;
    localStorage.setItem('role', role);
    organizationStore.setPubCard({
      id: userStore.userData.organization_id,
      name: userStore.userData.public_cards[0].name,
      status: 1,
      type: role
    })
    userStore.checkAuth()
    router.push({ path: `/${role}/profile` });
  });
}

</script>

<style lang="scss">

.profile {
  
  .checklist {
    max-width: 25.5em;
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