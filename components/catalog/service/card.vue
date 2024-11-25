<template>
  <div class="service-card">
    <div class="service-card__header">
      <h3>{{ data.name || 'не указано' }}</h3>
    </div>
    <div class="service-card__body">
      <div class="service-card__content">
        <div class="service-card__image">
          <img :src="data.logo || defaultImage" alt="">
        </div>
        <p class="service-card__company-name">{{ data.companyName || 'не указано' }}</p>
      </div>
      <div class="service-card__content">
        <div class="service-card__props">
          <div class="service-card__prop">
            <p class="service-card__prop-name">{{data.location && data.location[0] ? data.location : 'Не указано'}}</p>
            <p class="service-card__prop-value"><i class="flag flag_round"></i></p>
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
    <NuxtLink class="service-card__link" :to="`/services/${data.id}`" :target="linkBlank ? '_blank' : ''"></NuxtLink>
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
  }
});

watch(() => props.data, (newVal) => {
  console.log(newVal)
}, {deep: true})

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


</style>