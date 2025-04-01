<template>
  <section class="register container">
    <div class="register__container">
      <CommonCheckList 
        class="register__checklist register__checklist_type_left-side sticky" 
        ref="leftSide"
        title="Заполнение профиля" 
        :checkList="checkList" 
        adviceTitle="Полностью заполненный профиль выше в списке поиска"
        value-check
        type="checkStage"
        :fill-rating="fillRating"
      />
      <div class="register__main">
        <component :is="currentComponent" v-model="data" :blockTitle="blockTitle"/>
      </div>
      <div class="register__right-side">
        <div class="register__right-side-container sticky" ref="rightSide">
          <CommonCheckList 
            class="register__checklist register__checklist_type_right-side" 
            ref="leftSide"
            title="Заполнение профиля" 
            :checkList="checkList" 
            adviceTitle="Полностью заполненный профиль выше в списке поиска" 
          />
          <CommonAdvice class="register__advice" v-if="['/register/step1'].includes(route.path)">
            <p class="advice__text">ИНН используется в нашем сервисе:</p>
            <ul>
              <li>для автоматического заполнения вашего профиля</li>
              <li>для вывода вашей компании на карте</li>
              <li>для формирования платежных документов</li>
              <li>и наконец вы получаете галочку верифицированного пользователя, что повышает вас в поиске</li>
            </ul>
          </CommonAdvice>
          <CommonAdvice class="register__advice sticky" v-if="['/register/step3'].includes(route.path) && userStore.role === 'performer'">
            <p class="advice__text">без указания вашего места производства вы не сможете принимать заказы</p>
          </CommonAdvice>
          <div class="register__preview" v-if="['/register/step2', '/register/step3', '/register/step4'].includes(route.path)">
            <h4 class="register__preview-title">Так вашу компанию будут видеть другие участники</h4>
            <CardsPublic class="register__preview-card" :data="checkListCard" :is-description="true"/>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import defaultRegisterComponent from '~/components/register/defaultRegisterComponent.vue';
import registerStep1 from '~/components/register/step1.vue';
import registerStep2 from '~/components/register/step2.vue';
import registerStep3  from '~/components/register/step3.vue';
import registerStep4  from '~/components/register/step4.vue';

import { useRoute } from '#app';
import { useOrganizationStore } from '~/store/organizationStore';
import { useSettingStore } from '~/store/settingStore';
import { useUserStore } from '~/store/userStore';
import { useLocationStore } from '~/store/locationStore';

definePageMeta({
  middleware: 'telegram' 
});

const route = useRoute();
const organizationStore = useOrganizationStore();
const settingStore = useSettingStore();
const userStore = useUserStore();
const locationStore = useLocationStore();

const data = ref({
  countryId: 1,
  inn: null,
  kpp: null,
  organizationForm: 3,
  ogrn: null,
  legalAddress: null,
  organizationName: null,
  companyName: null,
  companyLogo: {
    id: null,
    url: null,
  },
  description: null,
  locations: null,
  companyDescription: null,
  productionCountry: null,
  selfEmployed: false,
  registerAddress: null,
  siteUrl: null,
  verificationFiles: [],
  country: {}
});

const blockTitle = computed(() => {
  const titles = {
    customer: 'Регистрация заказчика',
    performer: 'Регистрация исполнителя'
  };
  return titles[userStore.role] || 'Регистрация';
});

const currentComponent = computed(() => {
  switch (route.path) {
    case '/register/step1':
      return registerStep1
    case '/register/step2':
      return registerStep2
    case '/register/step3':
      return registerStep3
    case '/register/step4':
      return registerStep4
    default:
      return registerStep1
  }
})

const checkList = [
  {label: 'Регистрационные данные', value: '/register'},
  {label: 'Данные организации', value: '/register/step1'},
  {label: 'Карточка организации', value: '/register/step2'},
  {label: 'Города фактического производства', value: '/register/step3'},
  {label: 'Проверка', value: '/register/step4'}
]

const rightSide = ref(null);
const leftSide = ref(null);

const onScrollPage = () => {
  if (rightSide.value) {
    rightSide.value.style.top = `${settingStore.headerHeight + 70}px`;
    leftSide.value.$el.style.top = `${settingStore.headerHeight + 70}px`;
  } else {
    console.log('Element not found');
  }
}

onMounted(() => {
  onScrollPage();
  window.addEventListener("scroll", onScrollPage)
});

onUnmounted(() => {
  window.removeEventListener("scroll", onScrollPage)
});

const checkListCard = computed(() => {
  return {
    name: data.value.companyName,
    description: data.value.description,
    logo: data.value.companyLogo?.url,
    countryId: data.value.country,
    country: data.value.country,
    entityCount: 0,
    type: userStore.role,
  }
})

const userRole = computed(() => {
  if(userStore.role === 'customer') {
    return 'заказчика';
  } else if(userStore.role === 'performer') {
    return 'исполнителя';
  }
})

const fillRating = computed(() => userStore.userPubCard?.fill_rating || 0); 

onMounted(() => {
  userStore.checkAuth()
  .then((res) => {
    if(res && res.user && res.user) {
      if(res.user.organization && res.user.organization.id) {
        const userOrganization = res.user.organization;
        data.value.country = {countries: [{...userOrganization.country}]}
        data.value.countryId = userOrganization.country_id
        data.value.selfEmployed = userOrganization.is_foreigner
        data.value.inn = userOrganization.inn
        data.value.organizationName = userOrganization.name
        data.value.companyName = userOrganization.name
        data.value.kpp = userOrganization.kpp
        data.value.ogrn = userOrganization.ogrn
        data.value.organizationForm = userOrganization.org_form,
        data.value.legalAddress = userOrganization.legal_address
        data.value.registerAddress = userOrganization.legal_address
      }

      if(res.user.public_cards && res.user.public_cards && res.user.public_cards.length > 0) {
        const pubCard = res.user.public_cards.find(item => item.type === userStore.role)
        data.value.companyName = pubCard.name.length > 0 && pubCard.name
        data.value.description = pubCard.description
        data.value.siteUrl = pubCard.site_url
        data.value.companyLogo = {url:pubCard.logo}
        data.value.locations = { regions: [...pubCard.regions], cities: [...pubCard.cities] };
      }
    }
  });
  if(userStore.userData.organization_id) {
    organizationStore.getVerificationDocuments(userStore.userData.organization_id)
    .then(res => {
      if(res) {
        data.value.verificationFiles = res.map(item => {
          return {
            id: item.id,
            url: item.file_url,
          }
        });
      }
    })

  }
})

// onMounted(() => {
//   if(!userStore.userData.id) {
//     userStore.checkAuth()
//     .then((res) => {
//       if(res && res.user && res.user) {
//         if(res.user.organization && res.user.organization.id) {
//           const userOrganization = res.user.organization;
//           data.value.country = {countries: [{...userOrganization.country}]}
//           data.value.countryId = userOrganization.country_id
//           data.value.selfEmployed = Boolean(userOrganization.is_foreigner)
//           data.value.inn = userOrganization.inn
//           data.value.organizationName = userOrganization.name
//           data.value.companyName = userOrganization.name
//           data.value.kpp = userOrganization.kpp
//           data.value.ogrn = userOrganization.ogrn
//           data.value.organizationForm = userOrganization.org_form,
//           data.value.legalAddress = userOrganization.legal_address,
//           data.value.registerAddress = userOrganization.legal_address
//         }
  
//         if(res.user.public_cards && res.user.public_cards && res.user.public_cards.length > 0) {
//           const pubCard = res.user.public_cards.find(item => item.type === userStore.role)
//           data.value.companyName = pubCard.name.length > 0 && pubCard.name
//           data.value.description = pubCard.description
//           data.value.siteUrl = pubCard.site_url
//           data.value.companyLogo = {url:pubCard.logo}
//           data.value.locations = { regions: [...pubCard.regions], cities: [...pubCard.cities] };
//         }
//       }
//     });
//   } else {
//     if (userStore.userData && userStore.userData.organization) {
//       const userOrganization = userStore.userData.organization
//       data.value.country = { countries: [{ ...userOrganization.country }] }
//       data.value.countryId = userOrganization.country.id
//       data.value.selfEmployed = Boolean(userOrganization.is_foreigner)
//       data.value.inn = userOrganization.inn
//       data.value.organizationName = userOrganization.name
//       data.value.companyName = userOrganization.name
//       data.value.kpp = userOrganization.kpp
//       data.value.ogrn = userOrganization.ogrn
//       data.value.organizationForm = userOrganization.org_form,
//       data.value.legalAddress = userOrganization.legal_address,
//       data.value.registerAddress = userOrganization.legal_address
//     }

//     if (userStore.userData && userStore.userData.public_cards && userStore.userData.public_cards.length > 0) {
//       const pubCard = userStore.userData.public_cards.find(item => item.type === userStore.role)
//       data.value.companyName = pubCard.name.length > 0 && pubCard.name
//       data.value.description = pubCard.description
//       data.value.siteUrl = pubCard.site_url
//       data.value.companyLogo = { url: pubCard.logo }
//       data.value.locations = { regions: [...pubCard.regions], cities: [...pubCard.cities] };
//     }
//   }
//   if(userStore.userData.organization_id && route.path === '/register/step1') {
//     organizationStore.getVerificationDocuments(userStore.userData.organization_id)
//     .then(res => {
//       if(res) {
//         data.value.verificationFiles = res.map(item => {
//           return {
//             id: item.id,
//             url: item.file_url,
//           }
//         });
//       }
//     })

//   }
// })

useHead({
  title: userRole,
  titleTemplate: 'Регистрация %s',
  meta: [
    {
      name: 'description',
      content: '',
    },
  ],
});

</script>

<style lang="scss">
.register {
  padding-block: 10em;
}

  .register__container {
    display: flex;
    justify-content: space-between;
    column-gap: 14.2em;
  }
  
  .register__main {
    flex: 1 1 100%;
  }

  .register__title {
    font-size: 3.2em;
    margin-bottom: 1.71em;
  }

  .register__subtitle {
    font-size: 3em;
    margin-bottom: .66em;
  }

  .register__text {
    font-size: 1.3em;
    margin-bottom: 1.46em;
  }

  .register__label {
    font-size: 1.3em;
    flex: 1 0 45%;
    display: flex;
    flex-direction: column;
    row-gap: .38em;
    line-height: 1em;
    color: var(--text-color-secondary);
  }

  .register__checkbox {
    margin-bottom: 3.6em;
  }

  .register__btn {
    column-gap: .71em;
    max-width: 55%;
    text-transform: uppercase;
    font-size: 1.2em;
    justify-content: center;  
    margin-bottom: 2.85em;
    line-height: 1em;

    svg {
      path {
        fill: #fff;
      }
    }
  }

  .register__checklist, .register__advice {
    margin-top: 7em;
  }

  .register__soc-divider {
    display: flex;
    align-items: center;
    margin-bottom: 2.1em;


    &::before, &::after {
      content: "";
      display: block;
      flex: 1 1 100%;
      height: 1px;
      background-color: #F0F0F0;
      width: 100%;
    }

    p {
      white-space: nowrap;
      font-size: 1.2em;
    }

  }

  .register__soc-text{
    font-size: 1.3em;
    text-align: center;
  }

  
  .register__soc-links {
    padding-block: 1em;
    margin-bottom: 3em;
    display: flex;
    align-items: center;
    justify-content: center;
    column-gap: 1em;

    svg {
      border-radius: 3em;
    }
    
    a:hover {
      svg {
        box-shadow: 0 0 1em 0 rgba(0, 0, 0, 0.3);
      }

    }
    
  }

  .register__right-side {
    flex: 1 0 40em;
  }

  .register__right-side-container:has(.register__advice) .register__preview-title {
    margin-top: 1em; 
  }

  .register__right-side-container:has(.register__checklist_type_right-side) .register__advice {
    margin-top: 3em; 
  }

  .register__right-side-container:has(.register__checklist_type_right-side) .register__preview-title {
    margin-top: 3em; 
  }

  .register__preview {
    max-width: 40em;
  }

  .register__preview-title {
    font-size: 2.4em;
    margin-bottom: 0.83em;
    margin-top: 4.16em;
  }

@media (min-width: 768px) {
  .checklist__header-right {
      display: none;
  }
}

@media (max-width: 767px) {
  .checklist__collapse {
      display: none;
  }
}

.register__checklist {
  flex: 1 0 25.5em;
}

.register__checklist_type_right-side {
  display: none;
}

.register__advice {
  max-width: 40em;
  height: fit-content;

  .advice__text {
    margin-bottom: 1.8em;
  }
}


@media screen and (max-width: 1500px) {
  .register {
    &__container {
      column-gap: 5em;
    }
  }
}

@include tablet {
  .register {

    &__container {
      column-gap: 10em;
      max-width: 960px;
      margin-inline: auto;
    }

    &__checklist_type_left-side {
      display: none;
    }

    &__checklist_type_right-side {
      display: block;
    }

    &__right-side {
      flex-basis: 40%;
    }
  }
}


@include mobile {
  .register {
    padding-block: 3.5rem 9rem;

    &__checkbox {
      margin-bottom: 0;
    }

    &__container {
      flex-direction: column;
    }

    &__checklist {
      display: none;
    }

    &__advice {
      margin-top: 1em;
    }

    &__right-side {
      flex-basis: auto;
    }

    &__preview-title {
      margin-top: 1em;
      font-size: 1.6rem;
    }

    &__btn {
      font-size: 12px;
      max-width: none;
      width: 100%;
      margin-bottom: 1em;
      padding: 1.2em;
    }

    &__title {
      font-size: 2rem;
    }

    &__subtitle {
      font-size: 1.6rem;
    }

    &__text {
      font-size: 1.3rem;
    }
  }
}

</style>