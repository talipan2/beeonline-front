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
        <div class="performer-register-layout__btn-container" v-if="stepsConfig[currentStep]?.type === 'pubCard' && (currentStep !== 3 || organizationStore.servicesCount > 0)" >
          <UiButton v-if="stepsConfig[currentStep - 1]?.route" class="performer-register-layout__btn" variant="senary" size="large" :to="`/performer-register${stepsConfig[currentStep - 1].route}`">Назад</UiButton>
          <UiButton v-if="stepsConfig.length === currentStep + 1" type="submit" class="performer-register-layout__btn" variant="quinary" size="large">Сохранить данные</UiButton>
          <UiButton v-else type="submit" class="performer-register-layout__btn" variant="quinary" size="large" :disabled="saveButtonDisabled">Сохранить и продолжить</UiButton>
        </div>
      </UiForm>
    <ModalsReturnRegister />
    </template>
    <template #rightSide>
    <CommonAdvice
      class="register__advice"
      v-if="userStore.role === 'performer' && adviceList.length > 0"
      >
      <ul class="advice__list advice__list_type_performer">
        <li v-for="(item, index) in adviceList" :key="index" >
          <p>{{ item?.title }}</p>
          <span>
            <span>{{ item?.description }}</span>
            <span class="advice__text-selection">{{ item?.selection }}</span>
          </span>
        </li>
      </ul>
      </CommonAdvice>
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

const saveButtonDisabled = computed(() => {
  const servicesCount = organizationStore.servicesCount || 0;
  if(currentStep.value === 3 && servicesCount < 1) {
    return true
  } else {
    return false
  }
})

const organizationData = ref({
  id: '',
  countryId: 1,
  selfEmployed: false,
  inn: '',
  kpp: '',
  organizationForm: 4,
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
  workers_count: null,
  equipment_description: '',
})

watch(() => organizationData.value.selfEmployed, () => {
  if(!organizationData.value.selfEmployed && organizationData.value.organizationForm == 3) {
    organizationData.value.organizationForm = 4;
  }
});

const stepsConfig = ref([
  { id: 0, title: 'Регистрационные данные', route: '/register'},
  { id: 1, title: 'Данные организации', route: '/step1', component: markRaw(step1), props: organizationData, submitBtnText: 'Сохранить и продолжить'},
  { id: 2, title: 'Карточка', route: '/step2', component: markRaw(step2), type: 'pubCard', props: pubCardData },
  { id: 3, title: 'Услуги', route: '/step3', component: markRaw(step3), type: 'pubCard', props: pubCardData },
  { id: 4, route: '/step4', component: markRaw(step4), type: 'pubCard', props: pubCardData },
])

const stepCheckList = ref([
  { id: 0, title: 'Регистрационные данные', route: '/register' },
  { id: 1, title: 'Данные организации', route: '/step1', },
  { id: 2, title: 'Карточка', route: '/step2', },
  { id: 3, title: 'Услуги', route: '/step3', },
  { id: 4, title: 'Галерея', route: '/step4', },
])

const currentStep = computed(() => stepsConfig.value.findIndex(step => route.path.includes(step.route))) // Текущий активный шаг
const completedSteps = computed(() => [...Array(currentStep.value).keys()]); // Завершенные шаги

const errorList = ref({});

const adviceList = computed(() => {
  switch (currentStep.value) {
    case 1: {
      return [
        {
          title: 'Выберите вашу страну',
          description: 'Укажите страну, в которой зарегистрирована ваша компания. Если страны нет в списке, обратитесь в техническую поддержку. Это обязательное поле.'
        },
        {
          title: 'Я самозанятый',
          description: 'Отметьте пункт, если вы ведете бизнес в рамках специального налогового режима «Налог на профессиональный доход» и зарегистрированы в Федеральной налоговой службе РФ как самозанятый.'
        },
        {
          title: 'ИНН',
          description: 'Введите ИНН и нажмите кнопку поиска. Система автоматически найдет вас в базе и заполнит форму.',
          selection: 'Это обязательное поле.'
        },
        {
          title: 'Юридическое название организации',
          description: 'Система автоматически определяет название организации на основе ИНН. Если название отображается неверно, вы можете изменить его вручную.',
          selection: 'Это обязательное поле. Используйте действительное юридическое название организации.'
        },
      ]
    }
    case 2: {
      return [
        {
          title: 'Название компании',
          description: 'Юридическое название компании портал подставляет автоматически по ИНН. Вместо него вы можете указать маркетинговое название компании, название бренда или торговой марки.',
          selection: 'Это обязательное поле.'
        },
        {
          title: 'Сайт',
          description: 'Укажите адрес сайта в формате: www.site-name.com.',
          selection: 'Это необязательное поле, но адрес сайта поможет заказчикам лучше познакомиться со спецификой вашей компании.'
        },
        {
          title: 'Описание',
          description: 'В нескольких предложениях расскажите о специфике компании. Вы можете отметить основные направления деятельности, производственные возможности, ассортимент товаров и материалов, дополнительные оказываемые услуги.',
          selection: `Это обязательное поле. Рекомендуем добавить текст объемом не более 1 500 знаков и воздержаться от рекламных приемов.
            Объективно расскажите о своих товарах и услугах, чтобы привлечь внимание заказчиков, помочь вам найти надежных клиентов.Запрещено добавлять контактные данные!`,
        },
      ]
    }
    case 3: {
      return [
        {
          title: 'Введите заголовок заказа',
          description: 'Кратко обозначьте товар или услугу, которую вы предлагаете.',
          selection: 'Это обязательное поле. Не перегружайте заголовок.',
        },
        {
          title: 'Выберете категории',
          description: 'В соответствие с указанными категориями, прикрепленными к услуге вам будут приходить уведомления о новых заказах.',
        },
        {
          title: 'Объем продукции',
          description: 'Объем продукции, который вы можете реализовать будет влиять на то какие заказы вы будете получать.',
        },
      ]
    }
    default: {
      return []
    }
  }
});

const getErrorList = (errors) => {
  errorList.value = errors
}

const handleSubmit = (value, form) => {
  switch (currentStep.value) {
    case 2:
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
          workers_count: value.workers_count,
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
          workers_count: value.workers_count,
        }, form).then(res => {
          if(res) {
            router.push('/performer-register/step3')
          }
        })
      }

      break;
    case 3:
      entityStore.editPerformerService().then(res => {
        if(res) {
          router.push('/performer-register/step4')
        }
      })
      break;
    case 4:
        organizationStore.editEquipmentDescription({
          equipment_description: pubCardData.value.equipment_description
        }).then((res) => {
          if(res) {
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
                  if(userStore.userData.organization?.currency_id == 2) {
                    router.push('/profile')
                  } else {
                    settingStore.foreignerModal = true
                    router.push('/tariffs')
                  }
                })
              }
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
        organizationData.value.selfEmployed = userOrganization.org_form == 3
        organizationData.value.inn = userOrganization.inn
        organizationData.value.organizationName = userOrganization.name
        organizationData.value.companyName = userOrganization.name
        organizationData.value.kpp = userOrganization.kpp
        organizationData.value.ogrn = userOrganization.ogrn
        organizationData.value.organizationForm = userOrganization.org_form,
        organizationData.value.legalAddress = userOrganization.legal_address
        organizationData.value.registerAddress = userOrganization.legal_address
        organizationData.value.closedDocumentsEmail = userOrganization.email_docs
        pubCardData.value.name = pubCardData.value.name ? pubCardData.value.name : userOrganization.name
        pubCardData.value.contact_name = pubCardData.value.contact_name ? pubCardData.value.contact_name : res.user.name
        pubCardData.value.contact_email = pubCardData.value.contact_email ? pubCardData.value.contact_email : res.user.email
        pubCardData.value.contact_phone = pubCardData.value.contact_phone ? pubCardData.value.contact_phone : res.user.phone
      }

      if(res.user.public_cards && res.user.public_cards && res.user.public_cards.length > 0) {
        const pubCard = res.user.public_cards.find(item => item.type === userStore.role)

        if(!pubCard) return

        pubCardData.value = {
          ...pubCardData.value,
          id: pubCard.id,
          name: pubCard.name,
          logo: pubCard.logo,
          url_site: pubCard.url_site,
          description: pubCard.description,
          is_stm: pubCard.is_stm,
          free_samples: pubCard.free_samples?.length ? pubCard.free_samples : [],
          free_stock: pubCard.free_stock ? 1 : 0,
          materials: [
            pubCard.materials_own ? 0 : undefined,
            pubCard.materials_tolling ? 1 : undefined
          ].filter(item => item !== undefined),
          gallery: pubCard.gallery || [],
          workSpaces: pubCard.equipment || [],
          locations: {
            cities: pubCard.cities?.map(city => ({...city, name: locationFormatter({cities: [{...city}]}).locations[0]})) || [],
            // regions: pubCard.regions?.map(region => ({...region, name: locationFormatter({regions: [{...region}]}).locations[0]})) || [],
            // countries: pubCard.countries?.map(country => ({...country, name: locationFormatter({countries: [{...country}]}).locations[0]})) || []
          },
          equipment_description: pubCard?.equipment_description || '',
          workers_count: pubCard.workers_count,
        }
      }
    }
  })

  settingStore.registerRedirectConfirm = false
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

.advice {
  margin-top: 6.4em;

  &__list {
    display: flex;
    flex-direction: column;
    gap: 1em;
    margin-top: 1em;

    p {
      font-weight: 700;
      margin-bottom: .5em;
    }
  }

  &__text-selection {
    font-style: italic;
    display: block;
  }
}

</style>
