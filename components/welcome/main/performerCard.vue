<template>
  <div class="welcome-service-card">
    <div class="welcome-service-card__header">
      <h3>{{ data.name || 'не указано' }}</h3>
    </div>
    <div class="welcome-service-card__body">
      <div class="welcome-service-card__content welcome-service-card__content_type_image" >
        <div class="welcome-service-card__image">
          <img :src="data.logo || defaultImage" alt="Фотография услуги">
        </div>
        <p class="welcome-service-card__company-name">{{ data.companyName || 'не указано' }}</p>
      </div>
      <div class="welcome-service-card__content">
        <div class="welcome-service-card__props">
          <div class="welcome-service-card__prop">
            <p class="welcome-service-card__prop-name">{{data.location && data.location[0] ? data.location[0] : 'Не указано'}}</p>
            <p class="welcome-service-card__prop-value"><i class="flag flag_round flag_russia"></i></p>
          </div>
          <div class="welcome-service-card__prop">
            <p class="welcome-service-card__prop-name">Размер партии:</p>
            <p class="welcome-service-card__prop-value">{{ data.minLot && data.minLot[0] ? data.minLot[0] : 'Не указано' }}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="welcome-service-card__footer">
      <div class="props" v-if="data.data">
        <div class="prop" v-for="prop in data.data" :key="prop.id">
          <p class="prop__name">{{ prop.name }}</p>
          <p class="prop__value">{{ prop.value || 'не указано' }}</p>
          <span 
            class="prop__more" 
            v-if="prop.name === 'Категории' && data.category && data.category.length > 6 "
          > 
            <span> / </span>
            еще + {{ data.category.length - 6 }} категории
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>

const props = defineProps({
  data: {
    type: Object,
    default: () => ({})
  }
})

</script>

<style lang="scss">

.welcome-service-card {
  flex: 1;
  padding: 2rem;
  box-shadow: var(--box-shadow-primary);
  background-color: #fff;
  position: relative;

  &__header {
    border-bottom: 1px solid var(--border-color-secondary);

    h3 {
      font-size: 1.8rem;
      line-height: 1.2em;
      margin-bottom: .4em;
    }

  }

  &__body {
    display: flex;
    column-gap: 1em;
    margin-top: 1.5em;
    margin-bottom: 1.5em;
  }

  &__content {
    flex: 1 1 48%;
    // max-width: 48%;

    &_type_image {
      flex: 0 0 30%;
      max-width: 30%;
    }
  }

  &__image {
    width: 11rem;
    height: 10rem;

    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
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

  &__prop-name {
    font-weight: 300;
  }

  .prop__more {
    color: #6937a5;

    span {
      color: #212529;
    }
  }

}

@include tablet {
  .welcome-service-card {

    &__content {
      flex: 1 1 50%;
    }
  }
}

@include mobile {
  .welcome-service-card {

    &__content {
      max-width: none;
      flex: 1 1 100%;
      
      &_type_image {
        flex-basis: 40%;
      }
    }

    &__header {
      h3 {
        font-size: 10px;
      }
    }

    &__prop {
      font-size: 8px;
    }

    &__image {
      width: 40px;
      height: 40px;
    }

    &__company-name {
      font-size: 8px;
    }

    &__body {
      margin-block: 10px;
    }

    .props {
      font-size: 8px;
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