<template>
  <RegisterLayout title="Проверка вашего профиля">
    <CommonProfileCheckCard title="Контактные данные"
      text="Указанные данные не разглашаются третьим лицам, и необходимы для успешной работы на портале">
      <div class="form-group">
        <div class="form-group-data">
          <div class="form-group-data__title">Почта</div>
          <div class="form-group-data__value">{{ userStore.userData.email || '-' }}</div>
        </div>
        <div class="form-group-data">
          <div class="form-group-data__title">Телефон</div>
          <div class="form-group-data__value">{{ userStore.userData.phone || '-' }}</div>
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
            <p class="form-group-data__title">Логотип</p>
            <div class="form-group-data__logo">
              <img :src="organizationStore.registerOrg.companyLogo  || defaultCompanyLogo" alt="">
            </div>
          </div>
          <div class="register__check-company-details">
            <div class="form-group-data">
              <p class="form-group-data__title">Название</p>
              <p class="form-group-data__value">{{ organizationStore.registerOrg.companyName || '-' }}</p>
            </div>
            <div class="form-group-data">
              <p class="form-group-data__title">География фактического производства</p>
              <div class="form-group-data__container">
                <i class="flag flag_round" 
                  :class="organizationStore.registerOrg.selectedProductionCountries[0] 
                  ? selectFlag(organizationStore.registerOrg.selectedProductionCountries[0].countryId) 
                  :''" 
                />
                <p class="register__check-company-city">
                  {{ 
                    ( organizationStore.registerOrg.selectedProductionCountries[0] 
                    ?
                      `
                      ${organizationStore.registerOrg.selectedProductionCountries[0].city},
                      ${organizationStore.registerOrg.selectedProductionCountries[0].region},
                      ${organizationStore.registerOrg.selectedProductionCountries[0].country}
                      &nbsp;
                      `
                    : '')
                    || '-' 
                  }}
                </p>
                <ModalsMoreCities />
              </div>
            </div>
          </div>
        </div>
        <div class="form-group-data">
          <p class="form-group-data__title">Описание</p>
          <p class="form-group-data__value">{{ organizationStore.registerOrg.companyDescription || '-' }}</p>
        </div>
      </div>
    </CommonProfileCheckCard>
    <CommonProfileCheckCard title="Данные организации"
      text="Указанные данные не разглашаются третьим лицам, и необходимы для успешной работы на портале"
      changeLink="/register/step1" changeLinkLabel="Изменить">
      <div class="register__organization-data">
        <div class="form-group-data">
          <p class="form-group-data__title">Юридическое названии организации</p>
          <p class="form-group-data__value">{{ organizationStore.registerOrg.companyName || '-' }}</p>
        </div>
      </div>
      <div class="form-group">
        <div class="form-group-data">
          <p class="form-group-data__title">Форма организации</p>
          <p class="form-group-data__value">{{ organizationStore.registerOrg.organizationForm || '-' }}</p>
        </div>
        <div class="form-group-data">
          <p class="form-group-data__title">ИНН</p>
          <p class="form-group-data__value">{{ organizationStore.registerOrg.inn || '-' }}</p>
        </div>
        <div class="form-group-data">
          <p class="form-group-data__title">КПП</p>
          <p class="form-group-data__value">{{ organizationStore.registerOrg.kpp || '-' }}</p>
        </div>
        <div class="form-group-data">
          <p class="form-group-data__title">ОГРН</p>
          <p class="form-group-data__value">{{ organizationStore.registerOrg.ogrn || '-' }}</p>
        </div>
      </div>
      <div class="form-group-data">
        <p class="form-group-data__title">Страна</p>
        <p class="form-group-data__value">{{ organizationStore.registerOrg.location || '-' }}</p>
      </div>
      <div class="form-group-data">
        <p class="form-group-data__title">Юридический адрес</p>
        <p class="form-group-data__value">{{ organizationStore.registerOrg.registerAddress || '-' }}</p>
      </div>
      <div class="register__btn-container">
        <UiButton type="button" class="register__btn" variant="senary" size="large" @click="router.back">Назад</UiButton>
        <UiButton class="register__btn" variant="quinary" size="large">Подтвердить </UiButton>
      </div>
    </CommonProfileCheckCard>
  </RegisterLayout>
</template>

<script setup>
import { useUserStore } from '~/store/userStore';
import defaultCompanyLogo from '@/assets/images/nophoto_pc.png';
import { useOrganizationStore } from '~/store/organizationStore';
import selectFlag from '~/utils/selectFlag';
import { useTippy } from 'vue-tippy';

const router = useRouter();
const userStore = useUserStore();
const organizationStore = useOrganizationStore();
const moreCities = ref(null);


</script>

<style lang="scss">


.register {
  .register__btn_type_tg {
    text-wrap: wrap;
    text-align: center;
    max-width: 41%;
    font-size: 1.2em;
  }

  &__check-company {
    font-size: 1em;
  }

  &__check-company-container {
    display: flex;
    column-gap: 5.5%;
    color: #565263;
    margin-bottom: 1.53em;
  }

  &__check-company-logo {
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

  &__check-company-details {
    flex: 1 0 80%;
    display: flex;
    flex-direction: column;
    row-gap: 1.53em;

    .form-group-data {
      flex: 0;
      margin-bottom: 0;
    }

    .flag {
      margin-right: .5em;
    }
  }

  &__check-company-city {
    font-size: 1.23em;
  }

  &__check-company-more {
    font-size: 1.23em;
  }

  .form-group-data__logo {
    width: 100%;
    height: 9.15em;
  }


}


</style>