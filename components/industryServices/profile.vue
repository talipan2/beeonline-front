<template>
    <IndustryServicesCompanyDetails
        @pubcard:loaded="pubcard = $event"
        :id="userStore.userPubCard.id"
        :is-cabinet="true"
        @selectInfoModal="selectInfoModalData"
    />
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
      margin-top: 2em;
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
