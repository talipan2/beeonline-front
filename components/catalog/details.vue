<template>
  <div class="orders-details">
    <div class="orders-details__container">
      <template v-for="(prop, index) in entityData.props" :key="index">
        <div class="orders-details__item" v-if="!isEmpty(prop.value)">
          <p class="orders-details__title">{{ prop.name }}</p>
          <p class="orders-details__value" v-if="!prop.link">{{ prop.value }}</p>
          <div class="orders-details__value" v-else v-for="(item, index) in prop.value" :key="index">
            <template v-if="prop.link === 'material'">
              <NuxtLink class="link" :to="{ path: routeLinkForType, query: item.id === 0 ? { materials_own: 1 } : { materials_tolling : 1} }">
                {{ item.name }}
              </NuxtLink>
              <span class="orders-details__divider" v-if="index < prop.value.length - 1"> / </span>
            </template>
            <template v-else >
              <NuxtLink class="link" :to="{ path: routeLinkForType, query: { [prop.link]: item.id} }">
                {{ item.name }}
              </NuxtLink>
              <span class="orders-details__divider" v-if="index < prop.value.length - 1"> / </span>
            </template>
          </div>
        </div>
      </template>
    </div>
    <div class="orders-details__pub-card">
      <div class="orders-details__pub-card-image image-box">
        <img :src='pubCard.logo || defaultImage' :alt="pubCard.name">
        <NuxtLink v-if="pubCard.id" :to="`/members/${pubCard.id}/${pubCard.type}`" class="orders-details__pub-card-link"></NuxtLink>
      </div>
      <div class="orders-details__pub-card-content">
        <NuxtLink v-if="pubCard.id && role" :to="`/members/${pubCard.id}/${pubCard.type}`" class="orders-details__pub-card-title link">{{ pubCard.name || '' }}</NuxtLink>
        <div class="orders-details__pub-card-rating">
          <CommonRating />
        </div>
        <div class="orders-details__pub-card-location">
          <i class="flag flag_round" :class="pubCard.country_id ? selectFlag(pubCard.country_id) : ''"/>
          {{ locationStore.getCountryById(pubCard.country_id) }}
        </div>
      </div>
    </div>
    <div class="orders-details__btn-container">
      <UiButton class="orders-details__btn" 
        v-if="type === 'service'" 
        variant="quinary" size="large" 
        :to="{path: '/chat', query: { org_id: entityData.organizationId, org_type: role }}"
      >
        <SvgoMessage class="svg-m" />
        Написать исполнителю
      </UiButton>
      <UiButton class="orders-details__btn" 
        v-if="type === 'order'" 
        variant="quinary" size="large" 
        :to="{path: '/chat', query: { org_id: entityData.organizationId, org_type: role }}"
      >
        <SvgoMessage class="svg-m" />
        Написать Заказчику
      </UiButton>
      <UiButton class="orders-details__btn" variant="tertiary" size="around">
        <SvgoFavorite class="svg-m" />
      </UiButton>
    </div>
    <div class="orders-details__details">
      <p class="orders-details__details-title" v-if="entityData.description">Описание</p>
      <p class="orders-details__details-text">{{ entityData.description }}</p>
    </div>
    <div class="orders-details__details" v-if="entityData.conditions">
      <p class="orders-details__details-title">Условия сотрудничества</p>
      <p class="orders-details__details-text">{{ entityData.conditions }}</p>
    </div>
    <div class="orders-details__details" v-if="formatDocumentsArray && formatDocumentsArray.length">
      <p class="orders-details__details-title">Технические требования</p>
      <CommonFileList class="view-entity__files orders-details__files" :data-list="formatDocumentsArray" divider top-divider/>
    </div>
    <div class="orders-details__details" v-if="entityData.gallery && entityData.gallery.length">
      <p class="orders-details__details-title">Галерея</p>
      <CommonGallerySlider :images="entityData.gallery"/>
    </div>
  </div>
</template>

<script setup>
import defaultImage from '~/assets/images/nophoto_pc.png';
import { useLocationStore } from '~/store/locationStore';

const props = defineProps({
  type: {
    type: String,
    default: '',
  },
  pubCard: {
    type: Object,
    default: () => ({}),
  },
  entityData: {
    type: Object,
    default: () => ({}),
  },
})

const locationStore = useLocationStore();

const routeLinkForType = computed(() => {
  switch (props.type) {
    case 'service':
      return '/services/';
    case 'order':
      return '/orders/';
  }
})

const role = computed(() => {
  switch (props.type) {
    case 'service':
      return 'performer';
    case 'order':
      return 'customer';
  }
})

const formatDocumentsArray = computed(() => {
  if(!props.entityData.tzFiles || props.entityData.tzFiles.length === 0) return [];
  return props.entityData.tzFiles.map(item => {
    return {
      name: item.split('/').pop(),
      url: item,
      type: item.split('.').pop()
    }
  })
})

</script>

<style lang="scss">

.orders-details {
  font-size: 1.6rem;

  &__container {
    display: flex;
    flex-direction: column;
    row-gap: .625em;
    margin-bottom: 1.25em;
  }

  &__item {
    display: flex;
    flex-wrap: wrap;
  }

  &__title {
    margin-right: .625em;
  }

  &__value {
    display: flex;
    align-items: center;
  }

  &__divider {
    margin-inline: .5em;
  }

  &__pub-card {
    display: flex;
    align-items: center;
    column-gap: 1.87em;
    margin-bottom: 1.25em;
  }
  
  &__pub-card-image.image-box {
    flex-basis: 13%;
    padding-top: 13%;
    background-color: #fff;
    margin-right: 0;
  }

  &__pub-card-link {
    position: absolute;
    inset: 0;
  }

  &__pub-card-title {
    margin-bottom: .625em;
  }


  &__pub-card-rating {
    margin-bottom: 1em;
  }

  &__pub-card-location {
    display: flex;
    align-items: center;
    column-gap: .5em;
  }

  &__btn-container {
    display: flex;
    align-items: center;
    column-gap: 1em;
    margin-bottom: 3.125em;
  }

  &__btn {
    flex: 0 1 auto;
    display: flex;
    align-items: center;
    column-gap: .75em;
    text-transform: uppercase;
    font-size: .75em;
  }

  &__details {
    margin-bottom: 3.125em;
  }

  &__details-title {
    font-family: 'fira-sans', sans-serif;
    font-size: 1.5em;
    margin-bottom: .83em;
  }

  &__details-text {
    font-size: 1em;
  }

  &__files {
    font-size: 1rem;
    max-width: 50%;
  }

}

</style>