<template>
  <div class="performer-profile">
    <CommonLayoutInfoCard title="Представитель компании" class="performer-profile__card">
      <template #action>
        <div class="form-group performer-profile__card-btns">
          <UiButton
            type="button"
            class="performer-profile__card-btn"
            variant="default"
            :without-padding="true"
            @click="handleOpenChangeUserDataModal"
          >
            <SvgoPencil class="svg-l" />
            Изменить данные
          </UiButton>
          <UiButton
            class="performer-profile__card-btn"
            variant="default"
            :without-padding="true"
            to="/profile/update_pwd"
          >
            <SvgoPencil class="svg-l" />
            Изменить пароль
          </UiButton>
        </div> 
      </template>
      <p class="performer-profile__card-description">Указанные данные не разглашаются третьим лицам, и необходимы для успешной работы на портале</p>
      <div class="form-group form-group_type_secondary">
        <div class="form-group form-group__value">
          <div class="form-group-data">
            <label class="form-group__title">
              ФИО
            </label>
            <div class="form-value">{{ userData.name || '-' }}</div>
          </div>
          <div class="form-group-data">
            <label class="form-group__title">
              Должность
            </label>
            <div class="form-value">{{ userData.post || '-' }}</div>
          </div>
        </div>
      </div>
      <div class="form-group form-group_type_secondary">
        <div class="form-group form-group__value">
          <div class="form-group-data">
            <label class="form-group__title">
              Почта представителя компании
            </label>
            <div class="form-value">{{ userData.email || '-' }}</div>
          </div>
          <div class="form-group-data">
            <label class="form-group__title">
              Телефон представителя компании
            </label>
            <div class="form-value">{{ userData.phone || '-' }}</div>
          </div>
        </div>
      </div>
      <UiButton to="/staff" class="performer-profile__employees-btn" size="large">
        Сотрудники
      </UiButton>
    </CommonLayoutInfoCard>
    <PerformerRegisterStep1 v-model="data" :formattedData="formattedData" is-preview/>
    <PerformerRegisterStep2 v-model="data" is-preview/>
    <PerformerRegisterStep3 v-model="data" is-preview/>
    <CommonLayoutInfoCard title="Представитель компании" class="performer-profile__card">
      <template #action>
        <div class="form-group performer-profile__card-btns">
          <UiButton
            type="button"
            class="performer-profile__card-btn"
            variant="default"
            :without-padding="true"
            @click="handleOpenChangeDataModal"
          >
            <SvgoPencil class="svg-l" />
            Изменить
          </UiButton>
          <UiButton
            class="performer-profile__card-btn"
            variant="default"
            :without-padding="true"
            to="/documentation"
          >
            <SvgoPencil class="svg-l" />
            Просмотр документов
          </UiButton>
        </div> 
      </template>
      <p class="performer-profile__card-description">Указанные данные не разглашаются третьим лицам, и необходимы для успешной работы на портале</p>
      <div class="form-group form-group_type_secondary">
        <div class="form-group-data">
          <label class="form-group__title">
            Юридическое названии организации
          </label>
          <div class="form-value">{{ userOrganization.name }}</div>
        </div>
      </div>
      <div class="form-group form-group_type_secondary">
        <div class="form-group form-group__value">
          <div class="form-group-data">
            <label class="form-group__title">
              Форма организации
            </label>
            <div class="form-value">{{ userOrganization.org_form || '-' }}</div>
          </div>
          <div class="form-group-data">
            <label class="form-group__title">
              ИНН
            </label>
            <div class="form-value">{{ userOrganization.inn || '-' }}</div>
          </div>
        </div>
      </div>
      <div class="form-group form-group_type_secondary">
        <div class="form-group form-group__value">
          <div class="form-group-data">
            <label class="form-group__title">
              КПП
            </label>
            <div class="form-value">{{ userOrganization.kpp || '-' }}</div>
          </div>
          <div class="form-group-data">
            <label class="form-group__title">
              ОГРН
            </label>
            <div class="form-value">{{ userOrganization.ogrn || '-' }}</div>
          </div>
        </div>
      </div>
      <div class="form-group form-group_type_secondary">
        <div class="form-group form-group__value">
          <div class="form-group-data">
            <label class="form-group__title">
              Страна
            </label>
            <div class="form-value">
              <CommonLocationsList class="performer-profile__card-location" :locationsList="{ countries: [userOrganization.country] }" />
            </div>
          </div>
          <div class="form-group-data">
            <label class="form-group__title">
              Валюта
            </label>
            <div class="form-value">{{ userOrganization.currency || '-' }}</div>
          </div>
        </div>
      </div>
      <div class="form-group form-group_type_secondary">
        <div class="form-group-data">
          <label class="form-group__title">
            Юридический адрес
          </label>
          <div class="form-value">{{ userOrganization.legal_address || '-' }}</div>
        </div>
      </div>
    </CommonLayoutInfoCard>
    <ProfileChageUserDataModal />
    <ProfileChangeDataModal />
  </div>
</template>

<script setup>
import { useEntityStore } from '~/store/entityStore';
import { useOrganizationStore } from '~/store/organizationStore';
import { useSettingStore } from '~/store/settingStore';
import { useUserStore } from '~/store/userStore';

const userStore = useUserStore();
const organizationStore = useOrganizationStore();
const settingStore = useSettingStore();
const entityStore = useEntityStore();

const data = ref({});
const userData = ref({});

const userOrganization = computed(() => {
  if(userStore.userData && userStore.userData.organization) {
    const organization = userStore.userData.organization
    return {
      ...organization,
      org_form: organizationStore.getOrganizationFormById(organization.org_form),
      currency: settingStore.getCurrencyNameById(organization.currency_id),
    }
  } else {
    return {}
  }
});

const formattedData = computed(() => {
  return {
    ...data.value,
    freeSamples: entityStore.getEntityLabelById('freeTestSamples', data.value?.free_samples)?.join(' / ') || '',
    isStm: data.value?.is_stm ? 'Да' : 'Нет',
    freeStock: data.value?.free_stock ? 'Да' : 'Нет',
    locations: {cities: data.value?.cities, regions: data.value?.regions, countries: data.value?.countries},
    materials: [data.value.materials_own ? 'Исполнителя': '', data.value.materials_tolling ? 'Заказчика': ''].filter(Boolean).join(' / '),
  }
});

const handleOpenChangeUserDataModal = () => {
  settingStore.changeUserDataModal = true;
}

const handleOpenChangeDataModal = () => {
  settingStore.changeDataModal = true;
}

onMounted(() => {
  data.value = {
    ...userStore.userPubCard,
    workSpaces: userStore.userPubCard?.equipment,
    materials: [userStore.userPubCard?.materials_own ? 0: '', userStore.userPubCard?.materials_tolling ? 1: ''].filter(item => item !== ''),
    free_stock: userStore.userPubCard?.free_stock ? 1 : 0,
    free_samples: userStore.userPubCard?.free_samples?.length ? userStore.userPubCard.free_samples : [],
    locations: {
      cities: userStore.userPubCard.cities?.map(city => ({...city, name: locationFormatter({cities: [{...city}]}).locations[0]})) || [],
      regions: userStore.userPubCard.regions?.map(region => ({...region, name: locationFormatter({regions: [{...region}]}).locations[0]})) || [],
      countries: userStore.userPubCard.countries?.map(country => ({...country, name: locationFormatter({countries: [{...country}]}).locations[0]})) || []
    },
  };
  userData.value = userStore.userData
})
</script>

<style lang="scss">

.performer-profile {
  display: flex;
  flex-direction: column;
  row-gap: 3em;

  &__card {
    .info-card__header {
      margin-bottom: 3.2em;
    }
  }

  &__card-btn {
    color: var(--text-color-ternary);
    column-gap: .5em;
    line-height: 1em;

    svg {
      width: 2rem;
      height: 2rem;
    }

    @include hover {
      color: var(--text-color-gray);

      svg {
        path {
          fill: var(--text-color-gray);
        }
      }
    }
  }

  &__card-description {
    font-size: 1.2em;
    margin-bottom: 2em;
  }

  &__card-location {
    font-size: 1em;
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
      background-color: #d2c3e4 !important;
      border-color: #d2c3e4 !important;
      color: #212529 !important;
    }
  }

  @include mobile {

    &__card-btns {
      flex-direction: row;
      gap: 1em;
      justify-content: space-between;
    }

    &__card-btn {
      font-size: 1.1em;
    }
  }
}


</style>