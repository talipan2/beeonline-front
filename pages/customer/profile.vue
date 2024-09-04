<template>
  <NuxtLayout name="profile" title="Кабинет заказчика">
    <template #content>
      <div class="profile__checklist">
        <CommonProfileCheckCard title="Представитель компании"
          text="Указанные данные не разглашаются третьим лицам, и необходимы для успешной работы на портале"
          changeLink="/" changeLinkLabel="Изменить данные" secondLink="/" secondLinkLabel="Изменить пароль">
          <div class="form-group">
            <div class="form-group-data">
              <div class="form-group-data__title">ФИО</div>
              <div class="form-group-data__value">{{ userStore.userData.email || '-' }}</div>
            </div>
            <div class="form-group-data">
              <div class="form-group-data__title">Должность</div>
              <div class="form-group-data__value">{{ userStore.userData.phone || '-' }}</div>
            </div>
            <div class="form-group-data">
              <div class="form-group-data__title">Почта представителя компании</div>
              <div class="form-group-data__value">{{ userStore.userData.email || '-' }}</div>
            </div>
            <div class="form-group-data">
              <div class="form-group-data__title">Телефон представителя компании</div>
              <div class="form-group-data__value">{{ userStore.userData.phone || '-' }}</div>
            </div>
          </div>
          <UiButton class="profile__employees-btn" variant="primary" size="large">
            Сотрудники
          </UiButton>
        </CommonProfileCheckCard>
        <CommonProfileCheckCard title="Карточка компании" text="Указанные данные будут видны другим участникам портала"
          changeLink="/customer/pubcards/edit/1" changeLinkLabel="Заполнить">
          <div class="register__check-company">
            <div class="register__check-company-container">
              <div class="register__check-company-logo">
                <p class="form-group-data__title">Логотип</p>
                <div class="form-group-data__logo">
                  <img :src="organizationStore.registerOrg.companyLogo || defaultCompanyLogo" alt="">
                </div>
              </div>
              <div class="register__check-company-details">
                <div class="form-group-data">
                  <p class="form-group-data__title">Название компании</p>
                  <p class="form-group-data__value">{{ organizationStore.registerOrg.companyName || '-' }}</p>
                </div>
                <div class="form-group-data">
                  <p class="form-group-data__title">География фактического производства</p>
                  <div class="form-group-data__container">
                    <i class="flag flag_round" :class="organizationStore.registerOrg.selectedProductionCountries[0]
                      ? selectFlag(organizationStore.registerOrg.selectedProductionCountries[0].countryId)
                      : ''" />
                    <p class="register__check-company-city">
                      {{
                        (organizationStore.registerOrg.selectedProductionCountries[0]
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
            <div class="form-group-data">
              <p class="form-group-data__title">Сайт</p>
              <p class="form-group-data__value">{{ organizationStore.registerOrg.companyDescription || '-' }}</p>
            </div>
            <div class="form-group-data">
              <p class="form-group-data__title">Социальные сети</p>
              <p class="form-group-data__value">{{ organizationStore.registerOrg.companyDescription || '-' }}</p>
            </div>
          </div>
        </CommonProfileCheckCard>
        <CommonProfileCheckCard title="Данные организации"
          text="Указанные данные не разглашаются третьим лицам, и необходимы для успешной работы на портале"
          changeLink="/register/step1" changeLinkLabel="Изменить" secondLink="/" secondLinkLabel="Просмотр документов">
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
            <div class="form-group-data">
              <p class="form-group-data__title">Страна</p>
              <p class="form-group-data__value">{{ organizationStore.registerOrg.location || '-' }}</p>
            </div>
            <div class="form-group-data">
              <p class="form-group-data__title">Валюта</p>
              <p class="form-group-data__value">{{ organizationStore.registerOrg.location || '-' }}</p>
            </div>
          </div>
          <div class="form-group-data">
            <p class="form-group-data__title">Юридический адрес</p>
            <p class="form-group-data__value">{{ organizationStore.registerOrg.registerAddress || '-' }}</p>
          </div>
        </CommonProfileCheckCard>
      </div>
    </template>
    <template #rightSide>
      <CommonCheckList />
    </template>
  </NuxtLayout>
</template>

<script setup>
import { useOrganizationStore } from '~/store/organizationStore';
import { useUserStore } from '~/store/userStore';
import defaultCompanyLogo from '~/assets/images/nophoto_pc.png';


const userStore = useUserStore();
const organizationStore = useOrganizationStore();

</script>

<style lang="scss">

.profile {
  .checklist {
    max-width: 25.5em;
  }

  &__employees-btn {
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
}

</style>