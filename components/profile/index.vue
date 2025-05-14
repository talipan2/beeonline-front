<template>
  <div class="profile__checklist">
    <CommonProfileCheckCard title="Представитель компании"
      text="Указанные данные не разглашаются третьим лицам, и необходимы для успешной работы на портале" :first-btn="handleOpenChangeUserDataModal"
      changeLinkLabel="Изменить данные" secondLink="/profile/update_pwd" secondLinkLabel="Изменить пароль">
      <div class="form-group profile__representative">
        <div class="form-group-data">
          <div class="form-group__title">ФИО</div>
          <div class="form-group__value">{{ userData.name }}</div>
        </div>
        <div class="form-group-data">
          <div class="form-group__title">Должность</div>
          <div class="form-group__value">{{ userData.post }}</div>
        </div>
        <div class="form-group-data">
          <div class="form-group__title">Почта представителя компании</div>
          <div class="form-group__value">{{ userData.email }}</div>
        </div>
        <div class="form-group-data">
          <div class="form-group__title">Телефон представителя компании</div>
          <div class="form-group__value">{{ userData.phone }}</div>
        </div>
      </div>
      <UiButton to="/staff" class="profile__employees-btn" variant="primary" size="large">
        Сотрудники
      </UiButton>
    </CommonProfileCheckCard>
    <CommonProfileCheckCard 
      title="Карточка компании" 
      text="Указанные данные будут видны другим участникам портала"
      :changeLink="linkToChangePubCard" changeLinkLabel="Заполнить"
    >
      <div class="register__check-company">
        <div class="register__check-company-container">
          <div class="register__check-company-logo">
            <p class="form-group__title">Логотип</p>
            <div class="form-group-data__logo image-box image-box_type_logo">
              <img :src="pubCardData.logo" :alt="pubCardData.companyName">
            </div>
          </div>
          <div class="register__check-company-details">
            <div class="form-group">
              <p class="form-group__title">Название компании</p>
              <p class="form-group__value">{{ pubCardData.companyName }}</p>
            </div>
            <div class="form-group">
              <p class="form-group__title">География фактического производства</p>
              <div class="form-group__container">
                <CommonLocationsList class="register__check-company-locations" :locationsList="pubCardData.locations"/>
              </div>
            </div>
          </div>
        </div>
        <div class="form-group-data">
          <p class="form-group__title">Описание</p>
          <p class="form-group__value multiline-text">{{ pubCardData.description }}</p>
        </div>
        <!-- <div class="form-group-data" v-if="userStore.role === 'performer'">
          <p class="form-group__title">Собственные торговые марки</p>
          <p class="form-group__value">{{ organizationStore.pubCards.url_site || '-' }}</p>
        </div> -->
        <div class="form-group-data">
          <p class="form-group__title">Сайт</p>
          <a v-if="pubCardData.siteUrl" :href="pubCardData.siteUrl" target="_blank" class="form-group__value link text-wrap">{{ pubCardData.siteUrl}}</a>
          <p v-else class="form-group__value text-wrap">-</p>
        </div>
        <div class="form-group-data" v-if="pubCardsVideo.length || pubCardGallery.length">
          <p class="form-group__title">Галерея</p>
          <CommonGalleryShow :images="pubCardGallery" :videos="pubCardsVideo"/>
        </div>
        <div class="form-group-data"  v-if="pubCardData.url_tg || pubCardData.url_yt || pubCardData.url_vk">
          <p class="form-group__title">Социальные сети</p>
          <div class="form-group__container">
            <a class="profile__soc-link" :href="pubCardData.url_tg" target="_blank"  v-if="pubCardData.url_tg">
              <SvgoTelegram class="svg-l" />
            </a>
            <a class="profile__soc-link" :href="pubCardData.url_yt" target="_blank"  v-if="pubCardData.url_yt">
              <SvgoYoutube class="svg-l" />
            </a>
            <a class="profile__soc-link" :href="pubCardData.url_vk" target="_blank"  v-if="pubCardData.url_vk">
              <SvgoVk class="svg-l" />
            </a>
          </div>
        </div>
      </div>
    </CommonProfileCheckCard>
    <CommonProfileCheckCard title="Данные организации"
      text="Указанные данные не разглашаются третьим лицам, и необходимы для успешной работы на портале"
      :first-btn="handleOpenChangeDataModal" changeLinkLabel="Изменить" secondLink="/documentation" secondLinkLabel="Просмотр документов">
      <div class="register__organization-data">
        <div class="form-group-data">
          <p class="form-group__title">Юридическое названии организации</p>
          <p class="form-group__value">{{ organizationData.companyName }}</p>
        </div>
      </div>
      <div class="form-group">
        <div class="form-group-data">
          <p class="form-group__title">Форма организации</p>
          <p class="form-group__value">{{ getOrganizationFormById(organizationData.orgForm) || '-' }}</p>
        </div>
        <div class="form-group-data">
          <p class="form-group__title">ИНН</p>
          <p class="form-group__value">{{ organizationData.inn }}</p>
        </div>
        <div class="form-group-data">
          <p class="form-group__title">КПП</p>
          <p class="form-group__value">{{ organizationData.kpp }}</p>
        </div>
        <div class="form-group-data">
          <p class="form-group__title">ОГРН</p>
          <p class="form-group__value">{{ organizationData.ogrn }}</p>
        </div>
        <div class="form-group-data">
          <p class="form-group__title">Страна</p>
          <p class="form-group__value">
            <i :class="`flag flag_round flag_${organizationData.country?.alias}`" />
            {{ organizationData.country?.name }}
          </p>
        </div>
        <div class="form-group-data">
          <p class="form-group__title">Валюта</p>
          <p class="form-group__value">{{ settingStore.getCurrencyNameById(organizationData.currency) }}</p>
        </div>
      </div>
      <div class="form-group-data">
        <p class="form-group__title">Юридический адрес</p>
        <p class="form-group__value">{{ organizationData.legalAddress }}</p>
      </div>
      <div class="form-group-data">
        <p class="form-group__title">Почта для закрывающих документов</p>
        <p class="form-group__value">{{ organizationData.email_docs || '-' }}</p>
      </div>
    </CommonProfileCheckCard>
    <ProfileChageUserDataModal />
    <ProfileChangeDataModal />
  </div>
</template>

<script setup>
import { useOrganizationStore } from '~/store/organizationStore';
import { useUserStore } from '~/store/userStore';
import defaultCompanyLogo from '~/assets/images/nophoto_pc.png';
import { useLocationStore } from '~/store/locationStore';
import { useSettingStore } from '~/store/settingStore';


const userStore = useUserStore();
const organizationStore = useOrganizationStore();
const locationStore = useLocationStore();
const settingStore = useSettingStore();

const role = computed(() => userStore.role);

const isLoading = ref(false);
const getOrganizationFormById = organizationStore.getOrganizationFormById;
const linkToChangePubCard = computed(() => {
  if(userStore.userPubCard) {
    return `/pubcards/edit/${userStore.userPubCard?.id}`
  } else {
    return '/register/step2'
  }
});

const userData = computed(() => ({
  name: userStore.userData.name || '-',
  post: userStore.userData.post || '-',
  email: userStore.userData.email && userStore.userData.email.replace(/(.{0,3})(?=@)/, (match) => '*'.repeat(match.length)) || '-',
  phone: userStore.userData.phone && userStore.userData.phone.replace(/(\d{4})$/, '****') || '-',
}));

const organizationData = computed(() => ({
  companyName: userStore.userOrganization?.name || '-',
  orgForm: userStore.userOrganization?.org_form || '-',
  inn: userStore.userOrganization?.inn || '-',
  kpp: userStore.userOrganization?.kpp || '-',
  ogrn: userStore.userOrganization?.ogrn || '-',
  legalAddress: userStore.userOrganization?.legal_address || '-',
  country: userStore.userOrganization.country || {},
  currency: userStore.userOrganization?.currency_id || null,
  email_docs: userStore.userOrganization?.email_docs || '-',
}));

const pubCardData = computed(() => ({
  id: userStore.userPubCard?.id || '-',
  companyName: userStore.userPubCard?.name || '-',
  logo: userStore.userPubCard?.logo || defaultCompanyLogo,
  description: userStore.userPubCard?.description || '-',
  siteUrl: userStore.userPubCard?.url_site || null,
  url_tg: userStore.userPubCard?.url_tg || null,
  url_vk: userStore.userPubCard?.url_vk || null,
  url_yt: userStore.userPubCard?.url_yt || null,
  locations: {
    regions: userStore.userPubCard && userStore.userPubCard.regions ? userStore.userPubCard.regions : [],
    cities: userStore.userPubCard && userStore.userPubCard.cities ? userStore.userPubCard.cities : [],
  },
}));

const pubCardsVideo = computed(() => {
  if (userStore.userPubCard?.videos && userStore.userPubCard?.videos.length) {
    return userStore.userPubCard.videos.map(video => video.external_url)
  } else {
    return []
  }
})

const pubCardGallery = computed(() => {
  if (userStore.userPubCard?.gallery && userStore.userPubCard?.gallery.length) {
    return userStore.userPubCard.gallery.map(gallery => ({url: gallery.url}))
  } else {
    return []
  }
});

const handleOpenChangeDataModal = () => {
  settingStore.changeDataModal = true;
}

const handleOpenChangeUserDataModal = () => {
  settingStore.changeUserDataModal = true;
}

// onMounted(() => {
//   isLoading.value = true;
//   userStore.getUserData(userStore.userData.id).finally(() => isLoading.value = false);
// })

</script>


<style lang="scss" scoped>

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
  max-width: 20%;
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
  flex: 1 1 80%;
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

.register__check-company-locations {
  font-size: 1.6em;
}

@include tablet {
  .profile__representative {
    .form-group-data {
      flex-basis: 46%;
    }
  }
}

@include small-mobile {
  .register__check-company-container {
    flex-direction: column;
    row-gap: 1rem;
  }
}

</style>