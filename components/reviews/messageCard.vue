<template>
  <div class="message-card">
    <div class="message-card__container">
      <div class="image-box message-card__image">
        <img :src="defaultImage" alt="">
      </div>
      <div class="message-card__content">
        <h3 class="message-card__title">Организация Исполнитель 2</h3>
        <CommonRating :isCountRating="false" />
        <div class="details">
          <SvgoCase class="svg-m details__icon" fill="#C4C4C4" />
          <p class="details__content">
            {{ data.entityCount 
              ? (data.entityCount + ' ' + plural(data.entityCount, { one: 'услуга', few: 'услуги', many: 'услуг' }) ) 
              : 'Нет услуг' 
            }}
          </p>
        </div>
      </div>
    </div>
    <UiButton class="message-card__btn" variant="quinary" size="large">
      <SvgoMessage class="svg-m" />
      Написать исполнителю
    </UiButton>
  </div>
</template>

<script setup>
import defaultImage from '~/assets/images/nophoto_pc.png';

const data = ref({});

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

    @include mobile {
      padding: .9rem;
    }
  }
}

</style>