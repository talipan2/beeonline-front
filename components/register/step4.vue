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
            <div class="image-box image-box_type_logo">
              <img :src="pubCard?.logo  || defaultCompanyLogo" :alt="pubCard.name">
            </div>
          </div>
          <div class="register__check-company-details">
            <div class="form-group-data">
              <p class="form-group__title">Название</p>
              <p class="form-group__value">{{ pubCard.name || '-' }}</p>
            </div>
            <div class="form-group-data">
              <p class="form-group__title">География фактического производства</p>
              <CommonLocationsList class="register__check-company-locations" :locationsList="pubCard.location"/>
            </div>
          </div>
        </div>
        <div class="form-group-data">
          <p class="form-group__title">Описание</p>
          <p class="form-group__value">{{ pubCard.description || '-' }}</p>
        </div>
      </div>
    </CommonProfileCheckCard>
    <CommonProfileCheckCard title="Данные организации"
      text="Указанные данные не разглашаются третьим лицам, и необходимы для успешной работы на портале"
      changeLink="/register/step1" changeLinkLabel="Изменить">
      <div class="register__organization-data">
        <div class="form-group-data">
          <p class="form-group__title">Юридическое названии организации</p>
          <p class="form-group__value">{{ organization.name || '-' }}</p>
        </div>
      </div>
      <div class="form-group">
        <div class="form-group-data">
          <p class="form-group__title">Форма организации</p>
          <p class="form-group__value">{{ organizationStore.getOrganizationFormById(organization.organizationForm) || '-' }}</p>
        </div>
        <div class="form-group-data">
          <p class="form-group__title">ИНН</p>
          <p class="form-group__value">{{ organization.inn || '-' }}</p>
        </div>
        <div class="form-group-data">
          <p class="form-group__title">КПП</p>
          <p class="form-group__value">{{ organization.kpp || '-' }}</p>
        </div>
        <div class="form-group-data">
          <p class="form-group__title">ОГРН</p>
          <p class="form-group__value">{{ organization.ogrn || '-' }}</p>
        </div>
      </div>
      <div class="form-group-data">
        <p class="form-group__title">Страна</p>
        <p class="form-group__value">{{ organization.countryId ? locationStore.getCountryById(organization.countryId) : '' }}</p>
      </div>
      <div class="form-group-data">
        <p class="form-group__title">Юридический адрес</p>
        <p class="form-group__value">{{ organization.legalAddress || '-' }}</p>
      </div>
      <div class="register__btn-container">
        <UiButton class="register__btn" variant="senary" size="large" to="/register/step3">Назад</UiButton>
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
import { useSettingStore } from '~/store/settingStore';

const router = useRouter();
const userStore = useUserStore();
const organizationStore = useOrganizationStore();
const locationStore = useLocationStore();
const settingStore = useSettingStore();

const props = defineProps({
  modelValue: {
    type: Object,
    default: {},
  }
})

const pubCard = computed(() => {
  return {
    name: userStore.userPubCard?.name || '-',
    logo: userStore.userPubCard?.logo || '',
    description: userStore.userPubCard?.description || '',
    location: {regions: userStore.userPubCard?.regions || [], cities: userStore.userPubCard?.cities || []},
  }
});
const organization = computed(() => {
  return {
    name: userStore.userOrganization?.name || '-',
    inn: userStore.userOrganization?.inn || '-',
    kpp: userStore.userOrganization?.kpp || '-',
    ogrn: userStore.userOrganization?.ogrn || '-',
    legalAddress: userStore.userOrganization?.legal_address || '-',
    countryId: userStore.userOrganization?.country || '-',
    organizationForm: userStore.userOrganization?.org_form || '-',
  }
});
const registerData = computed(() => organizationStore.registerOrg);

// const handleSubmit = () => {
//   organizationStore.setOrganization({
//     name: registerData.value.organizationName,
//     userId: userStore.userData.id,
//     organizationForm: registerData.value.organizationForm,
//     inn: registerData.value.inn,
//     kpp: registerData.value.kpp,
//     ogrn: registerData.value.ogrn,
//     legalAddress: registerData.value.legalAddress,
//     selfEmployed: registerData.value.selfEmployed,
//     countryId: registerData.value.countryId,
//     currencyId: 1,
//   }).then((res) => {
//     if (res.data && res.data.id) {
//       if(registerData.value.verificationFiles && registerData.value.verificationFiles.length > 0) {
//         organizationStore.setVerificationDocuments(res.data.id, registerData.value.verificationFiles)
//       }
//       organizationStore.setPubCard({
//         id: res.data.id,
//         name: registerData.value.companyName,
//         type: userStore.role,
//         description: registerData.value.description,
//         cities: registerData.value.locations.cities || [],
//         regions: registerData.value.locations.regions || [],
//         siteUrl: registerData.value.siteUrl,
//         status: 1,
//       }).then((res) => {
//         userStore.checkAuth()
        
//         if(res.data && res.data.id) {
//           router.push('/')
//         }
//         if (res.data && res.data.id && registerData.value.companyLogo.id) {
//           organizationStore.setPubCardLogo(res.data.id, registerData.value.companyLogo.id)
//         }
//       })
//     }
//   })
// }

const handleSubmit = () => {

  // organizationStore.editPubCards({
  //   id: userStore.userPubCard.id,
  //   currentStep: 3
  // }).then(async(res) => {
  //   await userStore.checkAuth().then(() => {
  //     organizationStore.resetRegisterData();
  //     organizationStore.pubCardPublish(userStore.userPubCard.id);
  //     if (userStore.role === 'customer') {
  //         router.push('/orders/create/step1');
  //       } else if (userStore.role === 'performer') {
  //         router.push('/services/create/step1');
  //       } else {
  //         router.push('/desktop');
  //       }
  //   })

  // })


  organizationStore.pubCardPublish(userStore.userPubCard.id).then(res => {
    if (res) {
      organizationStore.resetRegisterData();
      organizationStore.editPubCards({
        id: userStore.userPubCard.id,
        currentStep: 3
      }).then(async(res) => {
        await userStore.checkAuth();
        if (userStore.role === 'customer' && !settingStore.isCreateOrder) {
          router.push('/orders/create/step1');
        } else if (userStore.role === 'performer') {
          router.push('/services/create/step1');
        } else if (userStore.role === 'customer' && settingStore.isCreateOrder && settingStore.isTelegram) {
          router.push('/customer/orders');
        } else if(settingStore.isCreateOrder) {
          router.push('/desktop');
          settingStore.isCreateOrder = false
        } else {
          router.push('/desktop');
        }
      });

    }
  });
}

</script>

<style lang="scss" scoped>

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

.register__more-cities {
  font-size: 1.4rem;
}

.register__check-company-details {
  flex: 1 1 80%;
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

.register__check-company-locations {
  font-size: 1.6em;
}

.register__check-company-city {
  font-size: 1.6em;
}

.form-group-data__logo {
  width: 100%;
  height: 9.15em;
}

@include mobile {
  .register__check-company-logo {
    max-width: 20%;
  }

  .register__check-company-container {
    flex-direction: column;
    row-gap: 1em;
  }
  .register {
    .tippy-box[data-placement^=top] > .tippy-arrow:before {
      bottom: -3em;
    }
  }
}
</style>