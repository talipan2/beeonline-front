<template>
  <div class="service-card">
    <div class="service-card__header">
      <h3>{{ data.name || 'не указано' }}</h3>
    </div>
    <div class="service-card__body">
      <div class="service-card__content service-card__content_type_image" >
        <div class="service-card__image">
          <img :src="data.logo || defaultImage" :alt="data.name">
        </div>
        <p class="service-card__company-name">{{ data.companyName || 'не указано' }}</p>
      </div>
      <div class="service-card__content">
        <div class="service-card__props">
          <div class="service-card__prop">
            <p class="service-card__prop-name">
              {{data.location && data.location[0] ? data.location[0] : 'Не указано'}}
              <ModalsMoreCities :list="data.location.slice(1)" title="Регионы" placement="bottom-end" v-if="Array.isArray(data.location) && data.location && data.location.length > 1" />
              </p>
            <p class="service-card__prop-value">
              <i class="flag flag_round" v-if="data.countryId" :class="data.countryId
              ? selectFlag(data.countryId)
              : ''" />
            </p>
          </div>
          <div class="service-card__prop">
            <p class="service-card__prop-name">Минимальная партия:</p>
            <p class="service-card__prop-value">{{ data.minLot && data.minLot[0] ? data.minLot : 'Не указано' }}</p>
          </div>
          <div class="service-card__prop">
            <p class="service-card__prop-name">Просмотры:</p>
            <p class="service-card__prop-value">{{ data.views >= 0 ? data.views : 'не указано' }}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="service-card__footer">
      <div class="props" v-if="data.data">
        <div class="prop" v-for="prop in data.data" :key="prop.id">
          <p class="prop__name">{{ prop.name }}</p>
          <p class="prop__value">{{ prop.value || 'не указано' }}</p>
        </div>
      </div>
    </div>
    <slot name="favorite-delete" />
    <NuxtLink v-if="linkTransition" class="service-card__link" :to="`/services/${data.id}`" :target="linkBlank ? '_blank' : ''"></NuxtLink>
  </div>
</template>

<script setup>
import defaultImage from '@/assets/images/nophoto_pc.png'

const props = defineProps({
  data: {
    type: Object,
    default: () => ({}),
  },
  linkBlank: {
    type: Boolean,
    default: false,
  },
  linkTransition: {
    type: Boolean,
    default: true,
  }
});

</script>

<style lang="scss">

.service-card {
  flex: 1;
  padding: 2rem;
  box-shadow: var(--box-shadow-primary);
  background-color: #fff;
  position: relative;
  transition: box-shadow .2s ease;

  &:hover {
    box-shadow: -2px -2px 0 #6937a5, 0px 4px 20px rgba(0, 0, 0, 0.1);

  }

  &.highlight {
    position: relative;
    box-shadow: 0px 0px 0 4px #6937a5, 0 1px 1px rgba(0, 0, 0, 0.15);

    &::after {
      content: "";
      position: absolute;
      pointer-events: none;
      top: 10px;
      z-index: 9999;
      height: 29px;
      width: 29px;
      right: 10px;
      background-size: cover;
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' height='24px' viewBox='0 -960 960 960' width='24px' fill='%236937a5'%3E%3Cpath d='m384-334 96-74 96 74-36-122 90-64H518l-38-124-38 124H330l90 64-36 122ZM233-120l93-304L80-600h304l96-320 96 320h304L634-424l93 304-247-188-247 188Zm247-369Z'/%3E%3C/svg%3E");
    }

    &:hover {
      box-shadow: -2px -2px 0 #6937a5, 0px 4px 20px rgba(0, 0, 0, 0.1);
    }
  }

  &__header {
    border-bottom: 1px solid var(--border-color-secondary);

    h3 {
      font-size: 1.8rem;
      line-height: 1.2em;
      margin-bottom: 1.5em;
    }

  }

  &__body {
    display: flex;
    column-gap: 1em;
    margin-top: 1.5em;
    margin-bottom: 1.5em;
  }

  &__content {
    flex: 0 1 48%;
    max-width: 48%;

  }

  &__image {
    width: 10rem;
    height: 10rem;
  }

  &__props {
    display: flex;
    flex-direction: column;
    row-gap: 1em;
  }

  &__prop {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 1.4rem;
    column-gap: 1em;
  }

  &__prop-value {
    font-weight: 700;
  }

  &__company-name {
    font-size: 1.6rem;
  }

  &__link {
    position: absolute;
    inset: 0;
  }

}

@include tablet {
  .service-card {

    &__content {
      flex: 1 1 50%;
    }
  }
}

@include mobile {
  .service-card {

    &__content {
      max-width: none;
      flex: 1 1 100%;
      
      &_type_image {
        flex: 0;
      }
    }

    &__prop {
      display: inline;
    }
    
    &__prop-name {
      display: inline;
    }

    &__prop-value {
      display: inline;
      margin-left: .5em;
    }
  }
}


</style>