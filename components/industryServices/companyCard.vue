  <template>
  <div class="industry-card" :class="{'industry-card_type_hover': !isPreview}">
    <h5 class="industry-card__title">{{ data.name || 'Название' }}</h5>
    <div class="industry-card__content">
      <div class="industry-card__image image-box image-box_type_frame">
        <img class="" :src="data.logo || defaultCompanyLogo" :alt="data.name || 'Логотип'">
      </div>
      <div class="industry-card__details">
        <CommonLocationsList :locationsList="{countries: [data.country]}"/>
        <div class="industry-card__details-container">
          <SvgoCase class="svg-m" fill="#C4C4C4" />
          <p>
            {{ data.adjacent_services_count
              ? (data.adjacent_services_count + ' ' + plural(data.adjacent_services_count, { one: 'услуга', few: 'услуги', many: 'услуг' }) )
              : 'Нет услуг'
            }}
          </p>
        </div>
        <div class="props">
          <div class="prop">
            <p class="prop__name prop__name_type_grey">Категории:</p>
            <p class="prop__value">{{ data.adjacent_categories && data.adjacent_categories.length > 0 ? data.adjacent_categories[0].name : 'Не указано' }}</p>
            <ModalsMoreCities
              class="prop__more"
              :list="data.adjacent_categories.map(category => category.name).slice(1)"
              v-if="data.adjacent_categories?.length > 1"
              title="Категории"
            />
          </div>
          <div class="prop" v-if="data.siteUrl">
            <p class="prop__name prop__name_type_grey">Сайт:</p>
            <a :href="ensureHttps(data.siteUrl)" class="prop__value link" target="_blank">{{ data.siteUrl }}</a>
          </div>
        </div>
      </div>
    </div>
    <div class="industry-card__description">
      <div class="form-group__title" >
        Описание:
      </div>
      <p class="form-group__value prop_type_hidden">{{ data.description || '-' }}</p>
    </div>
    <template v-if="!isPreview">
      <UiButton :to="`/related-industry-services/${data.id}`" class="industry-card__btn" variant="quinary" size="large">Подробнее</UiButton>
      <NuxtLink class="industry-card__link" :to="`/related-industry-services/${data.id}`"></NuxtLink>
    </template>
  </div>
</template>

<script setup>

import defaultCompanyLogo from '@/assets/images/nophoto_pc.png'

const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
  isPreview: {
    type: Boolean,
    default: false
  }
})

</script>

<style lang="scss">

.industry-card {
  flex: 0 1 calc(50% - 1.6rem);
  font-size: 1rem;
  padding: 2em;
  position: relative;
  display: flex;
  flex-direction: column;
  background-color: var(--bg-secondary-color);
  border: 1px solid var(--border-color-senary);
  transition: box-shadow 0.2s ease;
  position: relative;

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
    font-weight: 400;
    line-height: 1.2em;
    margin-bottom: 0.83em;
    padding-bottom: 0.83em;
    border-bottom: 1px solid #C4C4C4;
  }

  &__content {
    display: flex;
    margin-bottom: 1.5em;

    .image-box {
      flex: 0 0 38%;
      max-width: 38%;
      padding-top: 26%;

    }
  }

  .props {
    row-gap: .9em;
    .prop__name {
      font-family: 'fira-sans', sans-serif;
      padding-block: .2em;
      font-weight: 400;
    }
  }

  &__details {
    display: flex;
    flex-direction: column;
    row-gap: 1em;
  }

  &__details-container {
    display: flex;
    column-gap: .5em;
    font-size: 1.2em;
  }

  &__description {
    flex-grow: 1;
    .form-group__title {
      font-family: 'lato', sans-serif;
      font-size: 1.4em;
      font-weight: 300;
      margin-bottom: 0;
      margin-bottom: .35em;
    }

    .form-group__value {
      font-family: 'fira-sans', sans-serif;
      font-size: 1.2em;
      font-weight: 400;
      line-height: 1.5em;
      margin-top: 0;
    }
  }

  &__btn {
    margin-top: 2em;
    font-size: 1.2em;
    text-transform: uppercase;
    max-width: 31%;
    position: relative;
    z-index: 2
  }

  @include small-tablet {
    &__content {
      .image-box {
        flex-basis: 33%;
      }
    }
  }

  @include mobile {
    flex-basis: 100%;

    &__btn {
      max-width: 100%;
    }
  }

  @include small-mobile {
    &__content {
      .image-box {
        flex-basis: 33%;
      }
    }
  }
}

</style>
