<template>
  <div class="profile__checklist">
    <CommonProfileCheckCard title="Представитель компании"
      text="Указанные данные не разглашаются третьим лицам, и необходимы для успешной работы на портале" changeLink="/"
      changeLinkLabel="Изменить данные" secondLink="/" secondLinkLabel="Изменить пароль">
      <div class="form-group">
        <div class="form-group-data">
          <div class="form-group__title">ФИО</div>
          <div class="form-group__value">{{ userStore.userData.email || '-' }}</div>
        </div>
        <div class="form-group-data">
          <div class="form-group__title">Должность</div>
          <div class="form-group__value">{{ userStore.userData.phone || '-' }}</div>
        </div>
        <div class="form-group-data">
          <div class="form-group__title">Почта представителя компании</div>
          <div class="form-group__value">{{ userStore.userData.email || '-' }}</div>
        </div>
        <div class="form-group-data">
          <div class="form-group__title">Телефон представителя компании</div>
          <div class="form-group__value">{{ userStore.userData.phone || '-' }}</div>
        </div>
      </div>
      <UiButton :to="role ? `/${role}/staff` : '/'" class="profile__employees-btn" variant="primary" size="large">
        Сотрудники
      </UiButton>
    </CommonProfileCheckCard>
    <CommonProfileCheckCard title="Карточка компании" text="Указанные данные будут видны другим участникам портала"
      :changeLink="userStore.role == 'customer' ? '/customer/pubcards/edit/1' : '/performer/pubcards/edit/1'" changeLinkLabel="Заполнить">
      <div class="register__check-company">
        <div class="register__check-company-container">
          <div class="register__check-company-logo">
            <p class="form-group__title">Логотип</p>
            <div class="form-group-data__logo">
              <img :src="organizationStore.registerOrg.companyLogo || defaultCompanyLogo" alt="">
            </div>
          </div>
          <div class="register__check-company-details">
            <div class="form-group">
              <p class="form-group__title">Название компании</p>
              <p class="form-group__value">{{ organizationStore.pubCards.name || '-' }}</p>
            </div>
            <div class="form-group">
              <p class="form-group__title">География фактического производства</p>
              <div class="form-group__container">
                <i class="flag flag_round" :class="organizationStore.registerOrg.selectedProductionCountries && organizationStore.registerOrg.selectedProductionCountries[0]
                  ? selectFlag(organizationStore.registerOrg.selectedProductionCountries[0].countryId)
                  : ''" />
                <p class="register__check-company-city">
                  {{
                    (organizationStore.registerOrg.selectedProductionCountries && organizationStore.registerOrg.selectedProductionCountries[0]
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
          <p class="form-group__title">Описание</p>
          <p class="form-group__value">{{ organizationStore.pubCards.description || '-' }}</p>
        </div>
        <div class="form-group-data" v-if="userStore.role === 'performer'">
          <p class="form-group__title">Собственные торговые марки</p>
          <p class="form-group__value">{{ organizationStore.pubCards.url_site || '-' }}</p>
        </div>
        <div class="form-group-data">
          <p class="form-group__title">Сайт</p>
          <p class="form-group__value">{{ organizationStore.pubCards.url_site || '-' }}</p>
        </div>
        <div class="form-group-data">
          <p class="form-group__title">Социальные сети</p>
          <div class="form-group__container" v-if="organizationStore.pubCards.url_tg || organizationStore.pubCards.url_yt || organizationStore.pubCards.url_vk">
            <a class="profile__soc-link" :href="organizationStore.pubCards.url_tg" target="_blank"  v-if="organizationStore.pubCards.url_tg">
              <SvgoTelegram class="svg-l" />
            </a>
            <a class="profile__soc-link" :href="organizationStore.pubCards.url_yt" target="_blank"  v-if="organizationStore.pubCards.url_yt">
              <SvgoYoutube class="svg-l" />
            </a>
            <a class="profile__soc-link" :href="organizationStore.pubCards.url_vk" target="_blank"  v-if="organizationStore.pubCards.url_vk">
              <SvgoVk class="svg-l" />
            </a>
          </div>
        </div>
      </div>
    </CommonProfileCheckCard>
    <CommonProfileCheckCard title="Данные организации"
      text="Указанные данные не разглашаются третьим лицам, и необходимы для успешной работы на портале"
      changeLink="/register/step1" changeLinkLabel="Изменить" secondLink="/" secondLinkLabel="Просмотр документов">
      <div class="register__organization-data">
        <div class="form-group-data">
          <p class="form-group__title">Юридическое названии организации</p>
          <p class="form-group__value">{{ organizationStore.organization.name || '-' }}</p>
        </div>
      </div>
      <div class="form-group">
        <div class="form-group-data">
          <p class="form-group__title">Форма организации</p>
          <p class="form-group__value">{{ organizationStore.organization.org_form || '-' }}</p>
        </div>
        <div class="form-group-data">
          <p class="form-group__title">ИНН</p>
          <p class="form-group__value">{{ organizationStore.organization.inn || '-' }}</p>
        </div>
        <div class="form-group-data">
          <p class="form-group__title">КПП</p>
          <p class="form-group__value">{{ organizationStore.organization.kpp || '-' }}</p>
        </div>
        <div class="form-group-data">
          <p class="form-group__title">ОГРН</p>
          <p class="form-group__value">{{ organizationStore.organization.ogrn || '-' }}</p>
        </div>
        <div class="form-group-data">
          <p class="form-group__title">Страна</p>
          <p class="form-group__value">{{ organizationStore.organization.country_id || '-' }}</p>
        </div>
        <div class="form-group-data">
          <p class="form-group__title">Валюта</p>
          <p class="form-group__value">{{ organizationStore.organization.currency_id || '-' }}</p>
        </div>
      </div>
      <div class="form-group-data">
        <p class="form-group__title">Юридический адрес</p>
        <p class="form-group__value">{{ organizationStore.organization.legal_address || '-' }}</p>
      </div>
    </CommonProfileCheckCard>
  </div>
</template>

<script setup>
import { useOrganizationStore } from '~/store/organizationStore';
import { useUserStore } from '~/store/userStore';
import defaultCompanyLogo from '~/assets/images/nophoto_pc.png';


const userStore = useUserStore();
const organizationStore = useOrganizationStore();

const role = computed(() => userStore.role);

</script>


<style lang="scss">

.profile__employees-btn {
    font-size: 1.2em;
    line-height: 1em;
    font-weight: 400;
    max-width: 40%;
    padding-inline: 1.5em;
    justify-content: center;
    text-transform: uppercase;
    background-color: #fff;
    border-color: #d2c3e4;
    color: #212529;

    &:hover {
      background-color: #d2c3e4;
      border-color: #d2c3e4;
      color: #212529;
    }
  }

.profile__soc-link {
  margin-right: 1em;
  margin-top: .5em;

  svg {
    width: 2em;
  }
}

.register__check-company-container {
  display: flex;
  column-gap: 5.5%;
  color: #565263;
  margin-bottom: 1.53em;
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
    margin-bottom: 0;
  }

  .flag {
    margin-right: .5em;
  }
}

</style>