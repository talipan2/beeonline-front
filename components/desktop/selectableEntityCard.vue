<template>
  <div class="selectable-entity-card">
    <div class="selectable-entity-card__item-header">
      <div class="selectable-entity-card__item-image">
        <img :src="data?.logo || defaultImage" alt="">
      </div>
      <div class="selectable-entity-card__item-title">
        <h2>{{ data?.name }}</h2>
        <span v-if="isRating">{{data?.date}}</span>
        <span v-else>{{ data?.fromName }}</span>
      </div>
      <template v-if="isRating">
        <CommonRating v-if="isRating" class="selectable-entity-card__item-rating" :is-count-rating="false" :is-count-reviews="false" :rating="data?.rating"/>
        <span class="selectable-entity-card__item-rating">{{ data?.rating }}/5</span>
      </template>
      <span v-else class="selectable-entity-card__item-date">{{ formatDate(data?.date, 'DD.MM.YYYY, mm:HH') }}</span>
    </div>
    <div class="selectable-entity-card__item-text">{{data?.text}}</div>
    <NuxtLink class="link selectable-entity-card__item-link" :to="btnLink">{{ btnLabel }}</NuxtLink>
  </div>
</template>

<script setup>
import defaultImage from '~/assets/images/nophoto_pc.png'

const props = defineProps({
  data: {
    type: Object,
    default: () => {},
  },
  btnLabel: {
    type: String,
    default: 'Подробнее',
  },
  isRating: {
    type: Boolean,
    default: false,
  },
  btnLink: {
    type: String,
    default: '#',
  }
})

</script>

<style lang="scss">

.selectable-entity-card {
  &:not(:last-child) {
    border-bottom: 1px solid var(--border-color-secondary);
    padding-bottom: 2em;
    margin-bottom: 2em;
  }

  &__item-header {
    display: flex;
    align-items: center;
    margin-bottom: 1.6em;
  }

  &__item-image {
    flex: 0 0 4em;
    width: 4em;
    height: 4em;
    margin-right: 1.5em;
    border-radius: 100%;
    overflow: hidden;
  }

  &__item-title {
    flex: 1 1 auto;
    display: flex;
    flex-direction: column;
    font-size: 1.4em;
    line-height: 1em;

    h2 {
      font-size: 1em;
    }

    span {
      font-size: .85em;
      color: #8b92a1;
    }
  }

  &__item-date {
    font-family: 'fira-sans', sans-serif;
    font-size: 1.4em;
    color: #a9abac;
  }

  &__item-rating {
    font-family: 'fira-sans', sans-serif;
    font-size: 1.2em;
    font-weight: 500;
  }

  &__item-text {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    font-family: 'fira-sans', sans-serif;
    font-size: 1.4em;
    min-height: 2.8em;
    margin-bottom: .6em;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  &__item-link {
    font-family: 'fira-sans', sans-serif;
    font-size: 1.2em;
  }
}
</style>
