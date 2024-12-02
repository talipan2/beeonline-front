<template>
  <RegisterLayout title="Проверка вашего профиля">
    <div class="register__btn-container">
      <UiButton type="button" class="register__btn" variant="quinary" size="large" @click="handleSubmit">Подтвердить </UiButton>
    </div>
    <CommonProfileCheckCard title="Контактные данные"
      text="Указанные данные не разглашаются третьим лицам, и необходимы для успешной работы на портале">
      <div class="form-group">
        <div class="form-group-data">
          <div class="form-group__title">Почта</div>
          <div class="form-group__value">{{ userStore.userData.email || '-' }}</div>
        </div>
        <div class="form-group-data">
          <div class="form-group__title">Телефон</div>
          <div class="form-group__value">{{ userStore.userData.phone || '-' }}</div>
        </div>
      </div>
      <UiButton class="register__btn register__btn_type_tg" variant="telegram" size="large">Включить уведомления в
        Telegram</UiButton>
    </CommonProfileCheckCard>
    <CommonProfileCheckCard title="Карточка компании" text="Указанные данные будут видны другим участникам портала"
      changeLink="/register/step2" changeLinkLabel="Изменить">
      <div class="register__check-company">
        <div class="register__check-company-container">
          <div class="register__check-company-logo">
            <p class="form-group__title">Логотип</p>
            <div class="form-group-data__logo">
              <img :src="registerData.companyLogo  || defaultCompanyLogo" alt="">
            </div>
          </div>
          <div class="register__check-company-details">
            <div class="form-group-data">
              <p class="form-group__title">Название</p>
              <p class="form-group__value">{{ registerData.companyName || '-' }}</p>
            </div>
            <div class="form-group-data">
              <p class="form-group__title">География фактического производства</p>
              <div class="form-group__container">
                <i class="flag flag_round" 
                  :class="registerData.selectedProductionCountries && registerData.selectedProductionCountries[0]
                  ? selectFlag(registerData.selectedProductionCountries[0].countryId) 
                  :''" 
                />
                <p class="register__check-company-city">
                  {{
                    (registerData.selectedProductionCountries && registerData.selectedProductionCountries[0] 
                    ?
                      locationStore.getLocationsByIds(registerData.locationId)[0]
                    : '')
                    || '-'
                  }}
                  &nbsp;
                </p>
                <ModalsMoreCities 
                  title="География фактического производства" 
                  :list="locationStore.getLocationsByIds(registerData.locationId)" 
                />
              </div>
            </div>
          </div>
        </div>
        <div class="form-group-data">
          <p class="form-group__title">Описание</p>
          <p class="form-group__value">{{ registerData.companyDescription || '-' }}</p>
        </div>
      </div>
    </CommonProfileCheckCard>
    <CommonProfileCheckCard title="Данные организации"
      text="Указанные данные не разглашаются третьим лицам, и необходимы для успешной работы на портале"
      changeLink="/register/step1" changeLinkLabel="Изменить">
      <div class="register__organization-data">
        <div class="form-group-data">
          <p class="form-group__title">Юридическое названии организации</p>
          <p class="form-group__value">{{ registerData.companyName || '-' }}</p>
        </div>
      </div>
      <div class="form-group">
        <div class="form-group-data">
          <p class="form-group__title">Форма организации</p>
          <p class="form-group__value">{{ registerData.organizationForm || '-' }}</p>
        </div>
        <div class="form-group-data">
          <p class="form-group__title">ИНН</p>
          <p class="form-group__value">{{ registerData.inn || '-' }}</p>
        </div>
        <div class="form-group-data">
          <p class="form-group__title">КПП</p>
          <p class="form-group__value">{{ registerData.kpp || '-' }}</p>
        </div>
        <div class="form-group-data">
          <p class="form-group__title">ОГРН</p>
          <p class="form-group__value">{{ registerData.ogrn || '-' }}</p>
        </div>
      </div>
      <div class="form-group-data">
        <p class="form-group__title">Страна</p>
        <p class="form-group__value">{{ registerData.location || '-' }}</p>
      </div>
      <div class="form-group-data">
        <p class="form-group__title">Юридический адрес</p>
        <p class="form-group__value">{{ registerData.registerAddress || '-' }}</p>
      </div>
      <div class="register__btn-container">
        <UiButton type="button" class="register__btn" variant="senary" size="large" @click="router.back">Назад</UiButton>
        <UiButton type="button" class="register__btn" variant="quinary" size="large" @click="handleSubmit">Подтвердить </UiButton>
      </div>
    </CommonProfileCheckCard>
  </RegisterLayout>
</template>

<script setup>
import defaultCompanyLogo from '@/assets/images/nophoto_pc.png';
import selectFlag from '~/utils/selectFlag';
import { useUserStore } from '~/store/userStore';
import { useOrganizationStore } from '~/store/organizationStore';
import { useLocationStore } from '~/store/locationStore';

const router = useRouter();
const userStore = useUserStore();
const organizationStore = useOrganizationStore();
const locationStore = useLocationStore();

const registerData = computed(() => organizationStore.registerOrg);

const handleSubmit = () => {
  organizationStore.setOrganization({
    name: registerData.value.companyName,
    userId: userStore.userData.id,
    phone: userStore.userData.phone,
    email: userStore.userData.email,
    organizationForm: registerData.value.organizationForm,
    inn: registerData.value.inn,
    kpp: registerData.value.kpp,
    ogrn: registerData.value.ogrn,
    legalAddress: registerData.value.legalAddress,
    urlSite: registerData.value.urlSite,
    selfEmployed: registerData.value.selfEmployed,
    location: 1,
    currencyId: 1,
  }).then((res) => {
    if (res.data && res.data.id) {
      organizationStore.setPubCard({
        id: res.data.id,
        // id: 46,
        name: registerData.value.companyName,
        logo: registerData.value.companyLogo,
        type: userStore.role,
        description: registerData.value.companyDescription,
        status: 1,

      }).then((res) => {
        if (res.data) {
          router.push('/')
          organizationStore.registerOrg = {
            location: 1,
            inn: null,
            KPP: null,
            organizationForm: 'other',
            ogrn: null,
            legalAddress: null,
            companyName: null,
            companyLogo: null,
            countryId: [],
            companyDescription: null,
            productionCountry: null,
            selfEmployed: false,
            registerAddress: null,
            selectedProductionCountries: {
              fullNameLocation: [],
              locationId: [],
            },
            siteUrl: null,
          }
        }
      })
    }
  })
}

</script>

<style lang="scss">

.register__check-company-container {
  display: flex;
  column-gap: 5.5%;
  color: #565263;
  margin-bottom: 1.53em;
}

.register__btn_type_tg {
  text-wrap: wrap;
  text-align: center;
  max-width: 41%;
  font-size: 1.2em;
}

.register__check-company {
  font-size: 1em;
}

.register__check-company-logo {
  flex: 1 0 20%;
  min-width: 9em;
  font-size: 1.3em;

  img {
    width: 100%;
    height: 100%;
    border: 1px solid #d1d5db;
    object-fit: cover;
  }

}

.register__check-company-details {
  flex: 1 0 80%;
  display: flex;
  flex-direction: column;
  row-gap: 1.53em;

  .form-group-data {
    flex: 0;
  }

  .flag {
    margin-right: .5em;
  }
}

.register__check-company-city {
  font-size: 1.6em;
}

.form-group-data__logo {
  width: 100%;
  height: 9.15em;
}
</style>