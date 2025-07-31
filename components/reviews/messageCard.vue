<template>
  <div class="message-card">
    <div class="message-card__container">
      <div class="image-box message-card__image">
        <img :src="data.logo || defaultImage" alt="">
      </div>
      <div class="message-card__content">
        <h3 class="message-card__title">{{ data.name }}</h3>
        <CommonRating :isCountRating="false" :rating="data.reviews_stats_about?.stars" :reviews="data.reviews_about_count"/>
        <div class="details">
          <SvgoCase class="svg-m details__icon" fill="#C4C4C4" />
          <p class="details__content" v-if="data.type === 'performer'">
            {{ data.services_count 
              ? (data.services_count + ' ' + plural(data.services_count, { one: 'услуга', few: 'услуги', many: 'услуг' }) ) 
              : 'Нет услуг' 
            }}
          </p>
          <p class="details__content" v-if="data.type === 'customer'">
            {{ data.orders_count 
              ? (data.orders_count + ' ' + plural(data.orders_count, { one: 'заказ', few: 'заказа', many: 'заказов' }) ) 
              : 'Нет услуг' 
            }}
          </p>
        </div>
      </div>
    </div>
    <!-- <UiButton type="button" class="message-card__btn" variant="quinary" size="large">
      <SvgoMessage class="svg-m" />
      {{ labelButton }}
    </UiButton> -->
  </div>
</template>

<script setup>
import defaultImage from '~/assets/images/nophoto_pc.png';

const props = defineProps({
  data: {
    type: Object,
    required: true,
    default: () => ({})
  }
})

const labelButton = computed(() => {
  if(props.data.type === 'performer') {
    return 'Написать производителю'
  } else {
    return 'Написать заказчику'
  }
})

</script>

<style lang="scss">

.message-card {
  font-size: 1.6rem;
  padding: 1.875em;
  box-shadow: var(--box-shadow-primary);
  background-color: #fff;

  @include mobile {
    padding: 2rem;
  }

  &__container {
    display: flex;
    margin-bottom: 2.5em;
  }

  &__content {
    display: flex;
    flex-direction: column;
    row-gap: .5em;

    @include small-tablet {
      font-size: 1.4rem;
    }
  }

  &__title {
    font-size: 1.5em;

    @include small-tablet {
      font-size: 1.6rem;
    }
  }
  
  &__image {
    background-color: #fff;
    img {
      padding: .5em;
    }
  }

  &__btn {
    font-size: .75em;
    column-gap: .5em;
    text-transform: uppercase;
    width: 100%;

    @include mobile {
      padding: .9rem;
    }
  }
}

</style>