<template>
  <div class="card">
    <h5 class="card__title">{{ data.companyName || 'Название компании' }}</h5>
    <div class="card__content">
      <div class="card__image">
        <img class="" :src="data.companyLogo || defaultCompanyLogo" alt="">
      </div>
      <div class="card__details">
        <div class="card__details-container">
          <CommonRating :isCountReviews="false" />
        </div>
        <div class="card__details-container">
          <i class="flag flag_round" :class="selectFlag(data.location)"></i>
          <p>{{ selectRegion(data.location) || '-' }} </p>
        </div>
        <div class="card__details-container">
          <SvgoCase class="svg-m" fill="#C4C4C4" />
          <p>Нет услуг</p>
        </div>
        <div class="props" v-if="isPropsVisible">
          <div class="prop">
            <p class="prop__name">Сырье:</p>
            <p class="prop__value">-</p>
          </div>
          <div class="prop">
            <p class="prop__name">Категории:</p>
            <p class="prop__value">-</p>
          </div>
        </div>
      </div>
    </div>
      <div class="card__description" v-if="isDescription">
        <div class="form-group__title">
          Описание
          <p class="form-group__value">{{ data.description || '-' }}</p>
        </div>
      </div>
  </div>
</template>


<script setup>
import defaultCompanyLogo from '@/assets/images/nophoto_pc.png';

const props = defineProps({
  data: {
    type: Object,
    default: {},
    required: true,
  },
  isDescription: {
    type: Boolean,
    default: false,
  },
  isPropsVisible: {
    type: Boolean,
    default: false,
  },
})

</script>

<style lang="scss">

.card {
  padding: 2em;
  box-shadow: -2px -2px 0 #6937a5, 0 1px 1px rgba(0, 0, 0, 0.15);
  background-color: var(--bg-secondary-color);
  &__title {
    font-size: 1.8em;
    margin-bottom: 0.83em;
    padding-bottom: 0.83em;
    border-bottom: 1px solid #C4C4C4;
  }

  &__content {
    display: flex;
    column-gap: 2em;
  }

  &__image {
    flex: 0 0 30%;
    border: 1px solid #D9D9D9;
    display: flex;
    align-items: center;
    justify-content: center;
    max-width: 30%;
    // height: 10.8em;

    img {
      object-fit: cover;
      height: 100%;
    }

  }

  &__description {
    .form-group__title {
      font-size: 1.4em;
    }

    .form-group__value {
      font-size: .85em;
    }
  }

  &__details {
    display: flex;
    flex-direction: column;
    row-gap: .4em;
  }

  &__details-container {
    display: flex;
    column-gap: 1em;
    align-items: center;
    font-size: 1.2em;
  }
}

</style>