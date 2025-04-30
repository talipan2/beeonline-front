<template>
  <div class="new-service-details">
    <CommonLayoutInfoCard padding="20" class="new-service-details__pub-card">
      <div class="new-service-details__pub-card-image">
        <UiImage :src="data.pub_card?.logo || defaultImage" :alt="data.name" :external="true"/>
      </div>
      <div class="new-service-details__pub-card-content">
        <h3 class="new-service-details__pub-card-title">{{ data.name || 'не указано' }}</h3>
        <CommonRating :rating="data.pub_card?.reviews_stats_about?.stars" :reviews="data.pub_card?.reviews_about_count" :is-count-rating="false" />
        <CommonLocationsList :locationsList="{countries: [data.pub_card?.country]}" />
        <div class="new-service-details__pub-card-site" v-if="data.pub_card?.url_site">
          <SvgoPlanet class="svg-m" />
          <NuxtLink :to="data.siteUrl" class="link" target="_blank" >{{ data.pub_card?.url_site || 'не указано' }}</NuxtLink>
        </div>
        <div class="new-service-details__pub-card-buttons">
          <UiButton variant="quinary" size="large" class="new-service-details__pub-card-button">Написать исполнителю</UiButton>
          <UiButton variant="tertiary" size="large" class="new-service-details__pub-card-button">Добавить в избранное</UiButton>
        </div>
      </div>
    </CommonLayoutInfoCard>
    <div class="new-service-details__specs">
      <CatalogNewServiceDetailsBadge 
        :more-btn="true"
        :specs="{
          name: 'Категория', 
          value: data.product_categories?.length > 0 && data.product_categories.map(item => item.name) || [],
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
          name: 'Верификация', 
          value:  ''
        }"
      />
      <CatalogNewServiceDetailsBadge 
        :specs="{
          name: 'Бесплатные образцы', 
          value: entityStore.getEntityLabelById('freeTestSamples', data.free_samples),
        }"
      />
    </div>
    <CommonLayoutInfoCard title="Актуальные услуги компании" class="new-service-details__services" v-if="data.pub_card?.services && data.pub_card?.services.length">
      <div class="new-service-details__services-list">
        <div class="new-service-details__services-item" v-for="(item, index) in data.pub_card?.services" :key="item.id">
          <div class="new-service-details__services-item-number"><span>{{ index + 1 }}</span></div>
          <div class="new-service-details__services-item-content">
            <h4 class="new-service-details__services-item-name">{{ item.name || 'не указано' }}</h4>
            <p class="new-service-details__services-item-prop" v-if="item.batches">
              Минимальная партия: 
              <span>{{ item.batches.map(item => item.name).join(' / ') || 'не указано' }}</span>
            </p>
            <div class="new-service-details__services-item-badges">
              <div class="new-service-details__services-item-badge">
                <p>{{ 'Женская одежда' }}</p>
              </div>
              <div class="new-service-details__services-item-badge">
                <p>{{ 'Текстиль' }}</p>
              </div>
              <div class="new-service-details__services-item-badge">
                <ModalsMoreCities :list="['Женская одежда', 'Текстиль']" title="Категории" />
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
      <CatalogNewServiceImagesList :data="data.gallery" :show-more="true" :show-fancybox="true" />
    </CommonLayoutInfoCard>
    <CommonLayoutInfoCard title="Фабрика и оборудование" class="new-service-details__gallery" v-if="data.gallery && data.gallery.length">
      <CatalogNewServiceImagesList :data="data.gallery" :show-more="true" :show-fancybox="true" />
    </CommonLayoutInfoCard>
    <CommonLayoutInfoCard title="Отзывы" class="new-service-details__reviews" v-if="reviewList.length">
      <CatalogNewServiceReviewList :reviewList="reviewList" :pub_card="data.pub_card" />
      <CommonPagination  v-if="reviewsPage.last_page > 1" :current-page="reviewsPage.page" :total-pages="reviewsPage.last_page" @change-page="handleChangeReviewsPage" btn-type="square" position="left"/>
    </CommonLayoutInfoCard>
  </div>
</template>

<script setup>

import defaultImage from '~/assets/images/nophoto_pc.png';
import { useEntityStore } from '~/store/entityStore';
import { useReviewsStore } from '~/store/reviewsStore';

const props = defineProps({
  data: {
    type: Object,
    default: () => ({}),
  },
})

const entityStore = useEntityStore();

const reviewStore = useReviewsStore();

const reviewsPage = ref({
  page: 1,
  last_page: 2
})

const reviewList = ref([]);

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

onMounted(() => {
  fetchReviews()
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
      font-size: .75em;
      text-transform: uppercase;
    }

    @include tablet {
      font-size: .9rem;
    }

    @include small-tablet {
      font-size: .7rem;
    }

    @include mobile {
      font-size: .8em;
      flex-direction: column;
      row-gap: 2em;

      &-image {
        max-width: 38em;
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

    .info-card__title {
      margin-bottom: 4rem;
    }

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
  
}

</style>