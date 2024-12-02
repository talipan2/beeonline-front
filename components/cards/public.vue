<template>
  <div class="card-pub" :class="{'card-pub_type_list': isList}">
    <h5 class="card-pub__title">{{ data.name || 'Название компании' }}</h5>
    <div class="card-pub__content">
      <div class="card-pub__image">
        <img class="" :src="data.logo || defaultCompanyLogo" alt="">
      </div>
      <div class="card-pub__details">
        <div class="card-pub__details-container">
          <CommonRating :isCountRating="false" />
        </div>
        <div class="card-pub__details-container">
          <i class="flag flag_round" :class="selectFlag(data.location)"></i>
          <p>{{ selectRegion(data.location) || '-' }} </p>
        </div>
        <div class="card-pub__details-container">
          <SvgoCase class="svg-m" fill="#C4C4C4" />
          <p>
            {{ data.entityCount 
              ? (data.entityCount + ' ' + plural(data.entityCount, { one: 'услуга', few: 'услуги', many: 'услуг' }) ) 
              : 'Нет услуг' 
            }}
          </p>
        </div>
        <div class="props" v-if="isPropsVisible">
          <div class="prop">
            <p class="prop__name">Сырье:</p>
            <p class="prop__value">Не указано</p>
          </div>
          <div class="prop">
            <p class="prop__name">Категории:</p>
            <p class="prop__value">Не указано</p>
          </div>
        </div>
      </div>
    </div>
    <div class="card-pub__description" v-if="isDescription">
      <div class="form-group__title" >
        Описание
      </div>
      <p class="form-group__value prop_type_hidden">{{ data.description || '-' }}</p>
    </div>
    <slot name="favorite-delete" />
    <NuxtLink class="card-pub__link" :to="`/members/${data.id}`" v-if="isList" :target="linkBlank ? '_blank' : ''"></NuxtLink>
  </div>
</template>


<script setup>
import defaultCompanyLogo from '@/assets/images/nophoto_pc.png';

const props = defineProps({
  data: {
    type: Object,
    default: () => ({}),
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
  isList: {
    type: Boolean,
    default: false,
  },
  linkBlank: {
    type: Boolean,
    default: false,
  }
  
})

</script>

<style lang="scss">

.card-pub {
  display: flex;
  flex-direction: column;
  padding: 2em;
  box-shadow: -2px -2px 0 #6937a5, 0 1px 1px rgba(0, 0, 0, 0.15);
  background-color: var(--bg-secondary-color);
  transition: box-shadow .2s ease;
  position: relative;
  flex-grow: 1;

  &__title {
    font-size: 1.8em;
    margin-bottom: 0.83em;
    padding-bottom: 0.83em;
    border-bottom: 1px solid #C4C4C4;
  }

  &__content {
    display: flex;
    column-gap: 2em;
    margin-bottom: 1em;
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
    flex-grow: 1;

    .form-group__title {
      font-size: 1.4em;
      margin-bottom: .35em;
      line-height: 1em;
    }

    .form-group__value {
      display: -webkit-box;
      -webkit-line-clamp: 4;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
      font-family: 'fira-sans', sans-serif;
      font-size: 1.2em;
      margin-block: 0;
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

  &__link {
    position: absolute;
    inset: 0;
  }
}

.card-pub_type_list:hover {
  box-shadow: -2px -2px 0 #6937a5, 0px 4px 20px rgba(0, 0, 0, 0.1);
}

</style>