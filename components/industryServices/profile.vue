<template>
    <IndustryServicesCompanyDetails @pubcard:loaded="pubcard = $event" :id="userStore.userPubCard.id"/>
  <div class="industry-services-profile">
    <!-- <IndustryServicesCompanyInfo is-change/>
    <h4 class="industry-services-profile__list-title">Услуги</h4>
    <div class="industry-services-profile__list">
      <template v-for="(item, index) in servicesData" :key="index">
        <IndustryServicesCard :data="item" isChanged @selectInfoModal="selectInfoModalData"/>
      </template>
    </div> -->
    <div class="industry-services-profile__statistics">
      <h3>Статистика</h3>
      <IndustryServicesStatisticsTable />
    </div>
    <InfoModal :text="infoModal.text" :title="infoModal.title">
      <template #content>
          <UiButton type="button" @click="infoModal.action" class="info-modal__btn" variant="quinary" size="large">Подтвердить</UiButton>
          <UiButton type="button" class="info-modal__btn" variant="tertiary" @click="settingStore.infoModal = false" size="large">Закрыть</UiButton>
      </template>
    </InfoModal>
  </div>
</template>

<script setup>
import { useSettingStore } from '~/store/settingStore';
import { useUserStore } from '~/store/userStore';

const settingStore = useSettingStore();
const userStore = useUserStore();

const infoModal = ref({
  title: '',
  text: '',
  action: () => {}
})

const selectInfoModalData = ({type, id}) => {
  console.log(type)
  settingStore.infoModal = true;
  switch (type) {
    case 'published':
      infoModal.value = {
        title: 'Публикация',
        text: 'Вы уверены, что хотите опубликовать эту услугу?',
        action: () => {
          servicesData.value = servicesData.value.map(item => {
            if(item.id === id) {
              item.type = 'published'
            }
          })
        }
      }
      break
    case 'unpublished':
      infoModal.value = {
        title: 'Снятие с публикации',
        text: 'Вы уверены, что хотите снять с публикации эту услугу?',
        action: () => {
          servicesData.value = servicesData.value.map(item => {
            if(item.id === id) {
              item.type = 'unpublished'
            }
          })
        }
      }
      break
  }
}

const servicesData = [
  {
    id: 1,
    name: 'Добровольная сертификация',
    description: 'Добровольная сертификация представляет собой процесс получения официального подтверждения, свидетельствующего о том, что товары, услуги или выполненные работы отвечают определенным стандартам, включая ГОСТ Р. что товары, услуги или выполненные работы отвечают определенным стандартам, включая ГОСТ Р ',
    siteUrl: 'https://www.youtube.com/feed/subscriptions',
    logo: '',
    category: ['Пошив женской одежды', 'Пошив мужской одежды'],
    type: 'published'
  },
  {
    id: 2,
    name: 'Добровольная сертификация',
    description: 'Добровольная сертификация',
    siteUrl: 'https://www.youtube.com/feed/subscriptions',
    logo: '',
    category: ['Пошив женской одежды', 'Пошив мужской одежды'],
    type: 'unpublished'
  },
  {
    id: 3,
    name: 'Добровольная сертификация',
    description: 'Добровольная сертификация',
    siteUrl: 'https://www.youtube.com/feed/subscriptions',
    logo: '',
    category: ['Пошив женской одежды', 'Пошив мужской одежды'],
    type: 'published'
  },
  {
    id: 4,
    name: 'Добровольная сертификация',
    description: 'Добровольная сертификация',
    siteUrl: 'https://www.youtube.com/feed/subscriptions',
    logo: '',
    category: ['Пошив женской одежды', 'Пошив мужской одежды'],
    type: 'unpublished'
  }
]

</script>

<style lang="scss">

.industry-services-profile {
  &__list {
    display: flex;
    flex-wrap: wrap;
    gap: 2em;
  }

  &__list-title {
    margin-bottom: 1em;
  }

  .industry-services-card {
    flex-basis: calc(50% - 1rem);
    max-width: calc(50% - 1rem);

    @include mobile {
      flex-basis: 100%;
      max-width: 100%;
    }
  }

  &__list-title {
    margin-bottom: 1em;
  }

  &__list {
    margin-bottom: 10em;
  }

  &__statistics {
    margin-bottom: 10em;

    h3 {
      font-size: 1.8em;
      line-height: 1.2em;
      margin-bottom: 1.5em;
    }
  }

  @include tablet {
    &__statistics {
      margin-bottom: 5em;
    }

    &__about-text {
      margin-bottom: 2em;
    }
  }
}

</style>
