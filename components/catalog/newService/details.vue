<template>
  <div class="new-service-details">
    <CommonLayoutInfoCard class="new-service-details__pub-card new-service-details__pub-card_type_desktop">
      <CommonNameplate class="new-service-details__pub-card-nameplate" text="Премиум" />
      <div class="new-service-details__pub-card-image">
        <UiImage :src="data.logo || defaultImage" :alt="data.name" :external="true"/>
      </div>
      <div class="new-service-details__pub-card-content">
        <div class="new-service-details__pub-card-top">
          <h3 class="new-service-details__pub-card-title">{{ data.name || 'не указано' }}</h3>
          <CommonUserOnlineStatus :lastActivity="new Date(2025, 5, 3, 12, 30)" />
        </div>
        <CommonRating :rating="data.reviews_stats_about?.stars" :reviews="data.reviews_about_count" :is-count-rating="false" />
        <CommonLocationsList
          :locationsList="{cities: data?.cities, regions: data?.regions, countries: data?.countries}"
          is-country
        />
        <div class="new-service-details__pub-card-site" v-if="data?.url_site">
          <SvgoPlanet class="svg-m" />
          <NuxtLink :to="ensureHttps(data.url_site)" class="link" target="_blank" >{{ data.url_site || 'не указано' }}</NuxtLink>
        </div>
        <!-- КНОПКИ ДЛЯ ДЕСКТОПА -->
        <div class="new-service-details__pub-card-buttons" v-if="userStore.isAuth">
          <UiButton
            v-if="userStore.userPubCard.id === data.id"
            variant="quinary"
            size="large"
            class="new-service-details__pub-card-button"
            to="/profile"
          >
            Редактировать
          </UiButton>
          <UiButton
            v-if="userStore.role === 'customer' "
            type="button"
            variant="quinary"
            size="large"
            class="new-service-details__pub-card-button"
            @click="settingStore.sendMessageModal = true"
          >
            Написать исполнителю
          </UiButton>
          <PaidServiceCounterpartyCheck
            v-if="userStore.userPubCard.id != data.id"
            :id="data.organization_id"
          >
            <template #button="{ open }">
                <UiButton class="new-service-details__pub-card-button" variant="quinary" size="large" type="button" @click="open">
                    <SvgoSearch class="svg-m" fill="#6937a5" />
                    Проверить контрагента
                </UiButton>
            </template>
          </PaidServiceCounterpartyCheck>
          <UiButton
            type="button"
            variant="tertiary"
            size="around"
            class="new-service-details__pub-card-button"
            :class="{ 'new-service-details__pub-card-button_type_active': isFavorite }"
            @click="handleAddFavorite"
          >
            <SvgoFavorite class="svg-m" fill="#6937A5" />
          </UiButton>
        </div>
        <!-- КНОПКИ ДЛЯ ДЕСКТОПА ЕСЛИ НЕ АВТОРИЗОВАН -->
        <div class="new-service-details__pub-card-buttons" v-else>
          <UiButton
            type="button"
            variant="quinary"
            size="large"
            class="new-service-details__pub-card-button"
            @click="settingStore.authModalStatus = true"
          >
            Написать исполнителю
          </UiButton>
          <PaidServiceCounterpartyCheck
            :id="data.organization_id"
          >
            <template #button>
                <UiButton class="new-service-details__pub-card-button" variant="quinary" size="large" type="button" @click="settingStore.authModalStatus = true">
                    <SvgoSearch class="svg-m" fill="#6937a5" />
                    Проверить контрагента
                </UiButton>
            </template>
          </PaidServiceCounterpartyCheck>
          <UiButton
            type="button"
            variant="tertiary"
            size="around"
            class="new-service-details__pub-card-button"
            :class="{ 'new-service-details__pub-card-button_type_active': isFavorite }"
            @click="settingStore.authModalStatus = true"
          >
            <SvgoFavorite class="svg-m" fill="#6937A5" />
          </UiButton>
        </div>
      </div>
    </CommonLayoutInfoCard>
    <CommonLayoutInfoCard class="new-service-details__pub-card new-service-details__pub-card_type_mobile">
      <div class="new-service-details__pub-card-image">
        <UiImage :src="data.logo || defaultImage" :alt="data.name" :external="true"/>
      </div>
      <div class="new-service-details__pub-card-content">
        <CommonRating :rating="data.reviews_stats_about?.stars" :reviews="data.reviews_about_count" :is-count-rating="false" />
        <CommonLocationsList 
          :locationsList="{cities: data?.cities, regions: data?.regions, countries: data?.countries}"
          is-country
         />
        <div class="new-service-details__pub-card-site" v-if="data.url_site">
          <SvgoPlanet class="svg-m" />
          <NuxtLink :to="data.siteUrl" class="link" target="_blank" >{{ data.url_site || 'не указано' }}</NuxtLink>
        </div>
      </div>
      <div class="new-service-details__pub-card-content">
        <h3 class="new-service-details__pub-card-title">{{ data.name || 'не указано' }}</h3>
        <!-- КНОПКИ ДЛЯ МОБИЛКИ -->
        <div class="new-service-details__pub-card-buttons" v-if="userStore.isAuth">
          <UiButton
            v-if="userStore.userPubCard.id === data.id"
            variant="quinary"
            size="large"
            class="new-service-details__pub-card-button"
            to="/profile"
          >
            Редактировать
          </UiButton>
          <UiButton
            v-if="userStore.role === 'customer'"
            type="button"
            variant="quinary"
            size="large"
            class="new-service-details__pub-card-button"
            @click="settingStore.sendMessageModal = true"
          >
            Написать исполнителю
          </UiButton>
          <PaidServiceCounterpartyCheck
            v-if="userStore.userPubCard.id != data.id"
            :id="data.organization_id"
          >
            <template #button="{ open }">
                <UiButton class="new-service-details__pub-card-button" variant="quinary" size="large" type="button" @click="open">
                    <SvgoSearch class="svg-m" fill="#6937a5" />
                    Проверить контрагента
                </UiButton>
            </template>
          </PaidServiceCounterpartyCheck>
          <UiButton
            type="button"
            variant="tertiary"
            size="large"
            class="new-service-details__pub-card-button"
            :class="{ 'new-service-details__pub-card-button_type_active': isFavorite }"
            @click="handleAddFavorite"
          >
            <SvgoFavorite class="svg-m" fill="#6937A5" />
            Добавить в избранное
          </UiButton>
        </div>
        <!-- КНОПКИ ДЛЯ МОБИЛКИ ЕСЛИ НЕ АВТОРИЗОВАН -->
        <div class="new-service-details__pub-card-buttons" v-else>
          <UiButton
            type="button"
            variant="quinary"
            size="large"
            class="new-service-details__pub-card-button"
            @click="settingStore.authModalStatus = true"
          >
            Написать исполнителю
          </UiButton>
          <PaidServiceCounterpartyCheck
            :id="data.organization_id"
          >
            <template #button>
                <UiButton class="new-service-details__pub-card-button" variant="quinary" size="large" type="button" @click="settingStore.authModalStatus = true">
                    <SvgoSearch class="svg-m" fill="#6937a5" />
                    Проверить контрагента
                </UiButton>
            </template>
          </PaidServiceCounterpartyCheck>
          <UiButton
            type="button"
            variant="tertiary"
            size="large"
            class="new-service-details__pub-card-button"
            @click="settingStore.authModalStatus = true"
          >
            <SvgoFavorite class="svg-m" fill="#6937A5" />
            Добавить в избранное
          </UiButton>
        </div>
      </div>
    </CommonLayoutInfoCard>
    <div class="new-service-details__specs">
      <CatalogNewServiceDetailsBadge
        :more-btn="true"
        :specs="{
          name: 'Категория',
          value: data.categories?.length > 0 && data.categories.map(item => item.name) || [],
        }"
      />
      <CatalogNewServiceDetailsBadge
        :specs="{
          name: 'Сырье',
          value: [data.materials_tolling ? 'Заказчика' : '', data.materials_own ? 'Исполнителя' : ''].filter(Boolean).join(' / ')
        }"
      />
      <CatalogNewServiceDetailsBadge
        :specs="{
          name: 'Количество швей',
          value: data.workers_count,
        }"
      />
      <CatalogNewServiceDetailsBadge
        :specs="{
          name: 'Наличие СТМ',
          value: data.is_stm != null ? data.is_stm ? 'Да' : 'Нет' : ''
        }"
      />
      <CatalogNewServiceDetailsBadge
        :specs="{
          name: 'Свободный склад',
          value: data.free_stock != null ? data.free_stock ? 'Да' : 'Нет' : '',
        }"
      />
      <CatalogNewServiceDetailsBadge
        :specs="{
          name: 'Бесплатные образцы',
          value: data.free_samples?.length ? entityStore.getEntityLabelById('freeTestSamples', data.free_samples).join(' / ') : '',
        }"
      />
    </div>
    <CommonLayoutInfoCard title="Услуги" class="new-service-details__services" v-if="data.services && data.services.length">
      <div class="new-service-details__services-list">
        <div class="new-service-details__services-item" v-for="(item, index) in data.services" :key="item.id">
          <div class="new-service-details__services-item-number"><span>{{ index + 1 }}</span></div>
          <div class="new-service-details__services-item-content">
            <h4 class="new-service-details__services-item-name">{{ item.name || 'не указано' }}</h4>
            <p class="new-service-details__services-item-prop" v-if="item.batch">
              Размер партии:
              <span>{{ item.batch?.name || 'не указано' }}</span>
            </p>
            <div class="new-service-details__services-item-badges" v-if="item.product_categories">
              <div class="new-service-details__services-item-badge" v-for="category in item.product_categories" :key="category.id">
                <p>{{ category.name }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </CommonLayoutInfoCard>
    <CommonLayoutInfoCard title="Описание" class="new-service-details__description">
      <p class="new-service-details__description-text">{{ data.description || 'не указано' }}</p>
    </CommonLayoutInfoCard>
    <CommonLayoutInfoCard title="Примеры работ" class="new-service-details__gallery" v-if="data.gallery && data.gallery.length">
      <CatalogNewServiceImagesList
        :data="data.gallery"
        :show-more="true"
        :show-fancybox="true"
        mobile-slider
        @updateSlide="handleUpdatePhotoIndex"
        type="gallery"
        :overlay="true"
      />
      <template #action>
        <p class="new-service-details__gallery-count">{{ `${currentGalleryIndex + 1}/${data.gallery.length}` }}</p>
      </template>
    </CommonLayoutInfoCard>
    <CommonLayoutInfoCard title="Описание оборудования" class="new-service-details__description" v-if="data.equipment && data.equipment.length">
      <p class="new-service-details__description-text">{{ data.equipment_description || 'не указано' }}</p>
    </CommonLayoutInfoCard>

    <CommonLayoutInfoCard title="Оборудование" class="new-service-details__gallery" v-if="data.equipment && data.equipment.length">
      <CatalogNewServiceImagesList
        :data="data.equipment"
        :show-more="true"
        :show-fancybox="true"
        mobile-slider
        @updateSlide="handleUpdatePhotoIndex"
        type="equipment"
        :overlay="true"
      />
      <template #action>
        <p class="new-service-details__gallery-count">{{ `${currentEquipmentIndex + 1}/${data.equipment.length}` }}</p>
      </template>
    </CommonLayoutInfoCard>
    <CommonLayoutInfoCard title="Отзывы" class="new-service-details__reviews" v-if="reviewList.length">
      <CatalogNewServiceReviewList :reviewList="reviewList" :pub_card="data" />
      <CommonPagination  v-if="reviewsPage.last_page > 1" :current-page="reviewsPage.page" :total-pages="reviewsPage.last_page" @change-page="handleChangeReviewsPage" btn-type="square" position="left"/>
    </CommonLayoutInfoCard>
    <CatalogServiceSendMessageModal :performer_id="data.organization_id" />
  </div>
</template>

<script setup>

import defaultImage from '~/assets/images/nophoto_pc.png';
import { useEntityStore } from '~/store/entityStore';
import { useReviewsStore } from '~/store/reviewsStore';
import { useSettingStore } from '~/store/settingStore';
import { useUserStore } from '~/store/userStore';
import { useToast } from 'vue-toastification';

const props = defineProps({
  data: {
    type: Object,
    default: () => ({}),
  },
})

const entityStore = useEntityStore();
const settingStore = useSettingStore();
const reviewStore = useReviewsStore();
const userStore = useUserStore();

const reviewsPage = ref({
  page: 1,
  last_page: 2
})

const reviewList = ref([]);

const currentGalleryIndex = ref(0);
const currentEquipmentIndex = ref(0);
const isLoading = ref(false);
const isFavorite = ref(false);
const toast = useToast();

const handleUpdatePhotoIndex = (index, type) => {
  switch(type) {
    case 'gallery':
      currentGalleryIndex.value = index;
      break;
    case 'equipment':
      currentEquipmentIndex.value = index;
      break;
  }
}

const handleChangeReviewsPage = (page) => {
  if(!page) return
  fetchReviews(page)
}

const fetchReviews = async(page = 1) => {
  await nextTick()
  reviewStore.getOrganizationReviews(props.data.organization_id, {page}).then((res) => {
    reviewList.value = res.data
    reviewsPage.value = {
      page: res.pagination.current_page,
      last_page: res.pagination.last_page
    }
  })
}

function handleAddFavorite() {
  if(isLoading.value) return;
  isLoading.value = true;

  if(isFavorite.value) {
    userStore.removeFavorite( userStore.userData.id, props.data.id, 'pubCard').then(res => {
      isFavorite.value = false;
      toast.info('Удалено из избранных');
    }).finally(() => isLoading.value = false)
  } else {
    userStore.addFavorite( userStore.userData.id, props.data.id, 'pubCard').then(res => {
      isFavorite.value = true;
      toast.success('Добавлено в избранные');
    }).finally(() => isLoading.value = false)
  }
}


onMounted(() => {
  fetchReviews()

  userStore.getFavorites(userStore.userData.id).then(res => {
    console.log(res)
    if(res && res.pubCards && res.pubCards.data) {
      res.pubCards.data.forEach(item => {
        if(item.id === props.data.id) {
          isFavorite.value = true;
        }
      })
    }
  })
})

</script>

<style lang="scss">

.new-service-details {
  font-size: 1rem;

  &__pub-card {
    display: flex;
    padding: 3.2em;
    margin-bottom: 3.2em;
    column-gap: 5.6em;
    align-items: flex-start;
    position: relative;

    &_type_mobile {
      display: none;
    }

    &-nameplate {
      position: absolute;
      top: 12px;
      right: 0;
    }

    &-top {
      display: flex;
      align-items: center;
      gap: 1em;
      flex-wrap: wrap;
    }

    .rate {
      font-size: 1em;
    }

    .rating__reviews {
      font-size: 1em;
    }

    .location-container {
      font-size: 1em;
      font-family: 'fira-sans', sans-serif;

      .flag {
        width: 1em;
        height: 1em;
        font-size: 1.75em;
      }
    }

    &-image {
      flex: 0 0 32%;
      aspect-ratio: 1 / .6;
      overflow: hidden;
      border: 1px solid #e3e3e3;
      border-radius: 12px;

      img {
        object-fit: contain;
        height: 100%;
      }
    }

    &-content {
      display: flex;
      flex-direction: column;
      row-gap: 1em;
      font-size: 1.6em;
      padding-right: 10em;
      width: 100%;

      @include mobile {
        padding-right: 0;
      }
    }

    &-title {
      font-size: 2em;
      font-weight: 700;
      line-height: 1;
      letter-spacing: -0.02em;
    }

    &-site {
      display: flex;
      align-items: center;
      column-gap: .5em;

      svg {
        width: 1.75em;
        height: 1.75em;
        flex: 0 0 auto;
      }
    }

    &-buttons {
      margin-top: 1em;
      display: flex;
      column-gap: 1em;
    }

    &-button {
      // width: 100%;
      font-size: .75em;
      text-transform: uppercase;
      column-gap: .5em;

      &_type_active {
        background-color: var(--border-color-quaternary);
        color: var(--text-color-octonary);

        svg {
          fill: var(--text-color-octonary);
        }
      }

      &:last-child {
        width: auto;

        @include mobile {
          width: 100%;
          column-gap: 1em;
        }
      }
    }

    @include tablet {
      font-size: .9rem;
    }

    @include small-tablet {
      font-size: .7rem;
    }

    @include mobile {
      font-size: .8em;
      row-gap: 2em;

      &-image {
        max-width: 38em;
        aspect-ratio: 1;
      }

      &-title {
        line-height: 1.3em;
      }

      &-buttons {
        flex-wrap: wrap;
        row-gap: 1em;
      }

      &-button {
        width: 100%;
      }

      &_type_mobile {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        gap: 1.6em;
      }

      &-image {
        flex: 0 0 32%;
      }

      &-content {
        flex: 1 1 calc(59% - 1.6em);
      }

      &_type_desktop {
        display: none;
      }

    }
  }

  &__specs {
    display: flex;
    flex-wrap: wrap;
    gap: 1.6em;
    margin-bottom: 3.2em;

    .details-badge {
      flex: 1 1 calc(25% - 1.6em);
      max-width: 100%;
    }

    .details-badge:first-child {
      flex: 0 1 calc(50% - .8em);
    }

    .details-badge:nth-child(2) {
      flex: 0 1 calc(50% - .8em);
    }

    @include mobile {
      flex-direction: column;

      .details-badge {
        font-size: .9em;

      }
    }
  }


  &__services {
    margin-bottom: 3.2em;

    &-list {
      display: flex;
      flex-direction: column;
    }

    &-item {
      display: flex;
      column-gap: 1.6em;
      padding-bottom: 1.6em;

      &:not(:last-child) {
        border-bottom: 1px solid #e7e7e7;
        margin-bottom: 1.6em;
      }

      &-number {
        font-size: 1.6em;
        font-weight: 500;
        background-color: #f5f4f8;
        width: 2em;
        height: 2em;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 100%;
        line-height: 1em;
        flex: 0 0 auto;
        letter-spacing: -0.02em;
      }

      &-name {
        font-size: 1.6em;
        font-weight: 400;
        line-height: 1.5em;
        letter-spacing: -0.02em;
        color: rgba(0, 0, 0, 0.9);
        margin-bottom: .25em;
      }

      &-prop {
        font-family: 'fira-sans', sans-serif;
        font-size: 1.4em;
        display: inline-block;
        color: rgba(110, 110, 118, 0.9);
        margin-bottom: 1.14em;

        span {
          font-weight: 500;
          color: #000;
        }
      }

      &-badges {
        display: flex;
        flex-wrap: wrap;
        gap: .8em;
      }

      &-badge {
        font-size: 1.2em;
        font-weight: 600;
        line-height: 1.3em;
        color:  #5a2c96cc;
        border-radius: 100px;
        padding: .4em 1em;
        background: #f2edff;
        height: 2.3em;
        display: flex;
        align-items: center;
      }
    }

    @include mobile {
      &-item {
        flex-direction: column;
        row-gap: 1.6em;
      }

    }
  }

  &__description {
    margin-bottom: 3.2em;
  }

  &__description-text {
    font-size: 1.8em;
    font-weight: 400;
    line-height: 1.5em;
    color: #040404;
    white-space: pre-line;
    opacity: 0.8;
  }

  &__gallery {
    margin-bottom: 3.2em;
  }

  &__gallery-count {
    display: none;
    font-family: 'fira-sans', sans-serif;
    font-size: 1.4em;
    font-weight: 500;
    line-height: 1.4em;
    color: #000;

    @include mobile {
      display: block;
    }
  }

}

</style>
