<template>
  <div class="industry-services-card" :class="{'industry-services-card_type_hover': !isPreview}">
    <h2 class="industry-services-card__title">{{ data.name || 'Название услуги' }}</h2>
    <div class="industry-services-card__content">
      <div class="image-box">
        <img :src="data.pubcard.logo || defaultImage" alt="">
      </div>
      <div class="industry-services-card__wrapper">
        <div class="props">
          <div class="prop">
            <p class="prop__name prop__name_type_grey">Категории:</p>
            <p class="prop__value">{{ data.categories && data.categories.length > 0 ? data.categories[0].name : 'Не указано' }}</p>
            <ModalsMoreCities
              class="prop__more"
              :list="data.categories.map(category => category.name).slice(1)"
              v-if="data.categories?.length > 1"
              title="Категории"
            />
          </div>
          <div class="prop" v-if="data.pubcard.url_site">
            <p class="prop__name prop__name_type_grey">Сайт:</p>
            <a :href="data.pubcard.url_site" class="prop__value link link_type_hidden" target="_blank">{{ data.pubcard.url_site }}</a>
          </div>
          <div class="prop prop_type_text">
            <p class="industry-services-card__description-title">Описание:</p>
            <p class="prop__value prop_type_hidden">{{ data.description }}</p>
          </div>
        </div>

      </div>
    </div>
    <template v-if="!isPreview">
      <div class="industry-services-card__buttons" v-if="!isChanged">
        <UiButton class="industry-services-card__btn" variant="tertiary" size="large" :to="{path: '/chat', query: { adjacent_service_id: data.id }}">Написать</UiButton>
        <UiButton :to="`/related-industry-services/${data.pubcard.id}/${data.id}`" class="industry-services-card__btn" variant="quinary" size="large">Подробнее</UiButton>
      </div>
      <div class="industry-services-card__buttons industry-services-card__buttons_type_edit" v-else>
        <UiButton
          to="related-industry-services/edit/service/1"
          class="industry-services-card__btn industry-services-card__btn_type_edit"
          variant="quinary"
          size="large"
        >
          Изменить
        </UiButton>
        <UiButton
          v-if="data.type === 'published'"
          type="button"
          class="industry-services-card__btn industry-services-card__btn_type_edit"
          variant="quinary"
          size="large"
          @click="emit('selectInfoModal', {type: 'unpublished', id: data.id})"
        >
          Снять с публикации
        </UiButton>
        <UiButton
          v-if="data.type === 'unpublished'"
          type="button"
          class="industry-services-card__btn industry-services-card__btn_type_edit"
          variant="quinary"
          size="large"
          @click="emit('selectInfoModal', {type: 'published', id: data.id})"
        >
          Опубликовать
        </UiButton>
      </div>
    </template>
    <NuxtLink v-if="!isPreview" class="industry-services-card__link" :to="`/related-industry-services/${data.pubcard.id}/${data.id}`" />
  </div>
</template>

<script setup>
import defaultImage from '~/assets/images/nophoto_pc.png'

const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
  isChanged: {
    type: Boolean,
    default: false
  },
  isPreview: {
    type: Boolean,
    default: false,
  }
})

const emit = defineEmits(['selectInfoModal']);

</script>

<style lang="scss">

.industry-services-card {
  flex: 0 1 calc(33.333% - 1.4rem);
  font-size: 1rem;
  padding: 2em;
  border: 1px solid var(--border-color-senary);
  display: flex;
  flex-direction: column;
  background-color: var(--bg-secondary-color);
  position: relative;
  transition: box-shadow 0.2s ease;

  &_type_hover {
    &:hover {
      box-shadow: var(--box-shadow-primary);
    }
  }

  .link {
    position: relative;
    z-index: 2;
  }

  &__link {
    position: absolute;
    inset: 0;
  }

  &__title {
    font-size: 1.8em;
    line-height: 1.2em;
    margin-bottom: 0.83em;
    padding-bottom: 0.83em;
    border-bottom: 1px solid var(--border-color-secondary);
  }

  &__content {
    display: flex;
    margin-bottom: 4.1em;

    .prop_type_hidden {
      -webkit-line-clamp: 6;
    }
  }

  &__description-title {
    font-family: 'Inter', sans-serif;
    font-weight: 300;
    font-size: 1.4rem;
    margin-block: 1.1em .71em;
  }

  &__buttons {
    display: flex;
    column-gap: 1em;
    justify-content: space-between;
    font-size: 1.2em;
    text-transform: uppercase;
    margin-top: auto;

    .industry-services-card__btn {
      flex: 1 1 50%;
      text-transform: uppercase;
      position: relative;
      z-index: 2;
    }

    &_type_edit {

      justify-content: flex-start;

      .industry-services-card__btn {
        flex: 0 1 33%;
        text-transform: uppercase;
      }
    }
  }

  @include tablet {
    flex-basis: calc(50% - 1.4em);
  }

  @include mobile {
    flex-basis: 100%;

    &__buttons {
      flex-direction: column;
      row-gap: 1em;
    }
  }
}

</style>
