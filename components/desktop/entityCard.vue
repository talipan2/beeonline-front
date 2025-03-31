<template>
  <div class="desktop-entity-card">
    <div class="image-box desktop-entity-card__image">
      <img :src="data.logo || defaultImage" :alt="data.name">
    </div>
    <div class="desktop-entity-card__body">
      <div class="desktop-entity-card__header">
        <div class="desktop-entity-card__category">
          <p class="desktop-entity-card__category-name form-group__inline">
            {{ data.categories && data.categories.length ? data.categories[0] : 'не указано' }}
          </p>
          <ModalsMoreCities 
            class="desktop-entity-card__category-list form-group__inline" 
            v-if="data.categories && data.categories.length > 1"
            placement="bottom-end" 
            title="Категории" 
            :list="data.categories.slice(1)"
          />
        </div>
        <h3 class="desktop-entity-card__title">{{ data.name }}</h3>
      </div>
      <div class="desktop-entity-card__footer">
        <div class="desktop-entity-card__activity">
          <div class="desktop-entity-card__activity-item">
            <SvgoNviews class="svg-m desktop-entity-card__activity-icon"/>
            <span class="desktop-entity-card__activity-value">{{ data.viewsCount }}</span>
          </div>
          <div class="desktop-entity-card__activity-item">
            <SvgoUser class="svg-m desktop-entity-card__activity-icon"/>
            <span class="desktop-entity-card__activity-value">{{ data.chatsCount }}</span>
          </div>
          <div class="desktop-entity-card__activity-item">
            <SvgoFavorite class="svg-m desktop-entity-card__activity-icon"/>
            <span class="desktop-entity-card__activity-value">{{ data.favoritesCount }}</span>
          </div>
        </div>
        <p class="desktop-entity-card__status">{{ data.status }}</p>
      </div>
    </div>
    <NuxtLink v-if="data.type" class="desktop-entity-card__link" :to="`/${data.type}/${data.type === 'performer' ? 'services' : 'orders'}/show/${data.id}`"></NuxtLink>
  </div>
</template>

<script setup>
import defaultImage from '~/assets/images/nophoto_pc.png'

const props = defineProps({
  data: {
    type: Object,
    default: () => {},
  }
})

</script>


<style lang="scss">

.desktop-entity-card {
  font-family: 'fira-sans', sans-serif;
  flex: 1 1 50%;
  position: relative;
  max-width: calc(50% - 1.2em);
  display: flex;
  background-color: #fff;
  border: 1px solid #dcdce4;
  font-size: 1rem;
  padding: 2.4em;
  transition: border-color .2s ease;

  &:hover {
    border-color: #6937a5;
  }

  &__body {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  &__image {
    padding-top: 25%;
    max-width: 35%;
    flex-basis: 35%;
    img {
      padding: .5em;
    }
  }

  &__category {
    font-family: 'lato', sans-serif;
    margin-bottom: 1em;
    line-height: 1em;
  }


  &__category-name {
    font-size: 1.2em;
    line-height: 1em;
    color: var(--text-color-ternary);
    margin-right: .5em;
  }

  &__category-list {
    position: relative;
    font-size: 1.2em;
    color: var(--text-color-tertiary);
    z-index: 2;
  }

  &__title {
    font-size: 1.4em;
    line-height: 1em;
  }

  &__footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__activity {
    display: flex;
    column-gap: 1.5em;
    align-items: center;
  }

  &__activity-item {
    display: flex;
    align-items: center;
    column-gap: .4em;
  }

  &__activity-icon {
    fill: #a9abac;
  }

  &__activity-value {
    display: block;
    font-size: 1.2em;
    line-height: 1em;
  }

  &__status {
    font-size: 1.4em;
    line-height: 1em;
    color: var(--text-color-tertiary);
  }

  &__link {
    position: absolute;
    inset: 0;
  }
}

@include mobile {
  .desktop-entity-card {
    flex-basis: 100%;
    max-width: 100%;
  }
}

@include small-mobile {
  .desktop-entity-card {
    &__title {
      font-size: 1.2rem;
    }

    &__activity {
      column-gap: .5rem;
    }

    &__activity-value {
      font-size: 1rem;
    }

    &__status {
      font-size: 1.2rem;
    }
  }
}

</style>