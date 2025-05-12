<template>
  <NuxtLayout name="performer-register" title="Регистрация исполнителя" class="performer-register-layout">
    <template #leftSide>
      <CommonCheckListStep
      class="performer-register-layout__steps performer-register-layout__steps_type_desktop"
      :steps="stepCheckList"
      :current-step="currentStep"
      :completed-steps="completedSteps"
      />
    </template>
    <template #content>
      <h1 class="performer-register-layout__title">Регистрация исполнителя</h1>
      <CommonCheckListStep
        class="performer-register-layout__steps performer-register-layout__steps_type_mobile"
        :steps="stepCheckList"
        :current-step="currentStep"
        :completed-steps="completedSteps"
      />
      <UiForm :submit="handleSubmit" @setError="getErrorList">
        <component 
          :is="stepsConfig[currentStep].component" 
          v-model="stepsConfig[currentStep].props" 
          :title="stepsConfig[currentStep].title"
          :submitBtnText="stepsConfig[currentStep]?.submitBtnText"
          :errorsList="errorList"
        />
        <div class="performer-register-layout__btn-container" v-if="stepsConfig[currentStep]?.type === 'pubCard'" >
          <UiButton v-if="stepsConfig[currentStep - 1]?.route" class="performer-register-layout__btn" variant="senary" size="large" :to="`/performer-register${stepsConfig[currentStep - 1].route}`">Назад</UiButton>
          <UiButton v-if="stepsConfig.length === currentStep + 1" type="submit" class="performer-register-layout__btn" variant="quinary" size="large">Сохранить данные</UiButton>
          <UiButton v-else type="submit" class="performer-register-layout__btn" variant="quinary" size="large">Сохранить и продолжить</UiButton>
        </div>
      </UiForm>
    <ModalsReturnRegister />
    </template>
    <template #rightSide>
      <!-- <CommonNotify class="performer-register-layout__notify performer-register-layout__notify_type_desktop" text="текст уведомления" type="info" /> -->
    </template>
  </NuxtLayout>
</template>

<script setup>
import step1 from '~/components/register/step1.vue'
import step2 from '~/components/performerRegister/step1.vue';
import step3 from '~/components/performerRegister/step2.vue';
import step4 from '~/components/performerRegister/step3.vue';
import { useSettingStore } from '~/store/settingStore';
import { useUserStore } from '~/store/userStore';
import { useOrganizationStore } from '~/store/organizationStore';
import { useEntityStore } from '~/store/entityStore';
import { useToast } from 'vue-toastification';

const route = useRoute();
const router = useRouter();
const settingStore = useSettingStore();
const userStore = useUserStore();
const organizationStore = useOrganizationStore();
const entityStore = useEntityStore();
const toast = useToast();

const organizationData = ref({
  id: '',
  countryId: 1,
  selfEmployed: false,
  inn: '',
  kpp: '',
  organizationForm: 3,
  ogrn: '',
  legalAddress: '',
  registerAddress: '',
  organizationName: '',
  closedDocumentsEmail: '',
  verificationFiles: [],
});

const pubCardData = ref({
  id: '',
  name: '',
  logo: {},
  url_site: '',
  description: '',
  is_stm: null,
  free_samples: [],
  free_stock: null,
  materials: [],
  gallery: [],
  workSpaces: [],
  services: [],
  locations: [],
})

const stepsConfig = ref([
  {id: 1, title: 'Данные организации', route: '/step1', component: markRaw(step1), props: organizationData, submitBtnText: 'Сохранить и продолжить'},
  { id: 2, title: 'Карточка', route: '/step2', component: markRaw(step2), type: 'pubCard', props: pubCardData },
  { id: 3, title: 'Услуги', route: '/step3', component: markRaw(step3), type: 'pubCard', props: pubCardData },
  { id: 4, route: '/step4', component: markRaw(step4), type: 'pubCard', props: pubCardData },
])

const stepCheckList = ref([
  { id: 1, title: 'Данные организации', route: '/step1', },
  { id: 2, title: 'Карточка', route: '/step2', },
  { id: 3, title: 'Услуги', route: '/step3', },
  { id: 4, title: 'Галерея', route: '/step4', },
])

const currentStep = computed(() => stepsConfig.value.findIndex(step => route.path.includes(step.route))) // Текущий активный шаг
const completedSteps = computed(() => [...Array(currentStep.value).keys()]); // Завершенные шаги

const errorList = ref({});

const getErrorList = (errors) => {
  errorList.value = errors
}

const handleSubmit = (value, form) => {
  switch (currentStep.value) {
    case 1:   
      if(userStore.userPubCard?.id === pubCardData.value.id) {
        organizationStore.editPerformerPubCard({
          name: value.name,
          description: value.description,
          logo_media_id: pubCardData.value.logo?.id ? pubCardData.value.logo.id.toString() : '',
          url_site: value.url_site,
          free_samples: value.free_samples && value.free_samples || [],
          materials_own: value.materials.includes(0) ? true : false,
          materials_tolling: value.materials.includes(1) ? true : false,
          is_stm: value.is_stm,
          free_stock: value.free_stock,
          cities: Array.isArray(value.selectedLocations?.cities) ? value.selectedLocations?.cities?.map(item => item.id) : [],
        }, form).then(res => {
          if(res) {
            router.push('/performer-register/step3')
          }
        })
      } else {
        organizationStore.createPerformerPubCard({
          name: value.name,
          description: value.description,
          logo_media_id: pubCardData.value.logo?.id ? pubCardData.value.logo.id.toString() : '',
          url_site: value.url_site,
          free_samples: value.free_samples && value.free_samples || [],
          materials_own: value.materials.includes(0) ? true : false,
          materials_tolling: value.materials.includes(1) ? true : false,
          is_stm: value.is_stm,
          free_stock: value.free_stock,
          cities: Array.isArray(value.selectedLocations?.cities) ? value.selectedLocations?.cities?.map(item => item.id) : [],
        }, form).then(res => {
          if(res) {
            router.push('/performer-register/step3')
          }
        })
      }

      break;
    case 2:
      entityStore.editPerformerService({
        services: pubCardData.value.services.map(item => {
          return {
            name: item.name,
            product_category_ids: item.product_categories.map(category => category.id),
            batch_id: item.batch[0]?.id,
          }
        }),
      }, form).then(res => {
        if(res) {
          router.push('/performer-register/step4')
        }
      })
      break;
    case 3: 
      organizationStore.setPubCardsGallery([
        {
          collection_name: 'gallery',
          items: pubCardData.value.gallery.map(item => ({id: item.id})),
        },
        {
          collection_name: 'equipment',
          items: pubCardData.value.workSpaces.map(item => ({id: item.id})),
        }
      ]).then((res) => {
        if(res) {
          userStore.checkAuth().then(res => {
            toast.success('Публичная карта отправлена на модерацию')
            router.push('/profile')
          })
        }
      })
  }
}

onMounted(() => {
  userStore.checkAuth().then(res => {
    if(res && res.user) {
      if(res.user.organization && res.user.organization.id) {
        const userOrganization = res.user.organization;
        organizationData.value.countryId = userOrganization.country_id
        organizationData.value.selfEmployed = Boolean(userOrganization.is_foreigner)
        organizationData.value.inn = userOrganization.inn
        organizationData.value.organizationName = userOrganization.name
        organizationData.value.companyName = userOrganization.name
        organizationData.value.kpp = userOrganization.kpp
        organizationData.value.ogrn = userOrganization.ogrn
        organizationData.value.organizationForm = userOrganization.org_form,
        organizationData.value.legalAddress = userOrganization.legal_address
        organizationData.value.registerAddress = userOrganization.legal_address
        organizationData.value.closedDocumentsEmail = userOrganization.email_docs
      }

      if(res.user.public_cards && res.user.public_cards && res.user.public_cards.length > 0) {
        const pubCard = res.user.public_cards.find(item => item.type === userStore.role)
        pubCardData.value = {
          id: pubCard.id,
          name: pubCard.name,
          logo: pubCard.logo,
          url_site: pubCard.url_site,
          description: pubCard.description,
          is_stm: pubCard.is_stm,
          free_samples: [pubCard.free_samples ? 0 : undefined].filter(item => item !== undefined),
          free_stock: pubCard.free_stock ? 1 : 0,
          materials: [
            pubCard.materials_own ? 1 : undefined,
            pubCard.materials_tolling ? 0 : undefined
          ].filter(item => item !== undefined),
          gallery: pubCard.gallery || [],
          workSpaces: pubCard.equipment || [],
          services: pubCard.services,
          locations: {
            cities: pubCard.cities?.map(city => ({...city, name: locationFormatter({cities: [{...city}]}).locations[0]})) || [],
            regions: pubCard.regions?.map(region => ({...region, name: locationFormatter({regions: [{...region}]}).locations[0]})) || [],
            countries: pubCard.countries?.map(country => ({...country, name: locationFormatter({countries: [{...country}]}).locations[0]})) || []
          }
        }
      }
    }
  })
})

</script>

<style lang="scss">

.performer-register-layout {
  font-size: 1rem;

  &__steps {
    margin-top: 6.4em;

    &_type_mobile {
      display: none;

      @include mobile {
        display: flex;
        margin-top: 0;
      }
    }

    &_type_desktop {

      @include mobile {
        display: none;
      }
    }
  }

  &__title {
    font-size: 3.2em;
    font-weight: 400;
    line-height: 0.75em;
    color: #000;
    margin-bottom: 1.15em;

    @include mobile {
      font-size: 2em;
      margin-bottom: 1em;
    }
  }

  &__btn-container {
    display: flex;
    column-gap: 1em;
    margin-top: 3em;
    justify-content: right;
  }

  &__btn {
    width: auto;
    font-size: 1.2em;
    text-transform: uppercase;
  }

  .register-container {

    .register__text {
      font-size: 1.3em;
      margin-bottom: 1.46em;
    }

    .register__subtitle {
      font-size: 2.8em;
      margin-bottom: 0.66em;
    }

    .register__btn-container {
      justify-content: flex-end;

      &_type_submit {
        justify-content: flex-start;

        .register__btn {
          flex-basis: 50%;
        }
      }
    }

    .register__btn {
      flex: 0 1 25%;
      text-transform: uppercase;
      font-size: 1.2em;
      padding: 0.83em;

      svg {
        display: none;
      }
    }
  }

  &__notify {
    &_type_mobile {
      display: none;

      @include tablet {
        display: flex;
      }
    }
  }

  .register__subtitle {
    display: none;
  }

  .register__text {
    display: none;
  }

  .register__step-one {
    background-color: #fff;
    padding: 2.4em;
    border-radius: 20px;

    .register__label_type_location {

        .form-group__title {
          font-size: 1.4rem;
          font-weight: 600;
          color: #000;
          margin-bottom: 2em;
        }
    }

    .register__checkbox {
      margin-bottom: 3em;
    }

    .select__select {
      border-radius: 8px;
      border: 1px solid #d9dae1;
      padding: 1.4rem;
      color: var(--text-color-primary);
    }

    .form-group {
      margin-bottom: 0;
      color: var(--text-color-primary);


      .form-group__title {
        font-size: 1.4rem;
        font-weight: 600;
        color: #000;
        margin-bottom: .6em;
      }

      .input-container {
        border-radius: 8px;
        border: 1px solid #d9dae1;
        flex-direction: row-reverse;
        padding: 1.4rem;
      }

      .input__field {
        color: var(--text-color-primary);
      }

      @include mobile {
        margin-bottom: 1.5em;

        .form-group-data:not(:last-child) {
          margin-bottom: 1.5rem;
        }

        .form-group-data:last-child {
          margin-bottom: 0;
        }
      }
    }

    .register__input-inn {
      .input-container {
        border-radius: 8px 0 0 8px;
        
      }

      .register__search-btn {
        height: 100%;
        max-height: 48px;
        border-radius: 0 8px 8px 0;
      }
    }

    .register__subtitle {
      display: block;
      font-weight: 400;
      font-size: 2em;
      line-height: 1.3em;
      color: #000;
    }

    .register__text {
      display: block;
      font-weight: 400;
      font-size: 1.6em;
      line-height: 1.5em;
      color: #8387a3;
    }
  }
}

</style>