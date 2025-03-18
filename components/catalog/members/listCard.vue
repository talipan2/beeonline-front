<template>
  <div class="list-card">
    <div class="list-card__col-1">
      <div class="image-box image-box_type_not-border">
        <img :src="data.logo || defaultLogoImage" :alt="data.name">
      </div>
    </div>
    <div class="list-card__col-2">
      <div class="list-card__container">
        <NuxtLink :to="`/members/${data.id}/${data.type}`" class="link">
          <h5 class="list-card__title">{{ data.name || 'Название компании' }}</h5>
        </NuxtLink>
        <CommonRating :rating="data.stars" :reviews="data.reviewCount" :is-count-rating="false"/>
      </div>
    </div>
    <div class="list-card__col-3">
      <CommonLocationsList class="list-card__location" :locations-list="data.countryId" :is-country="true"/>
    </div>
    <div class="list-card__props list-card__col-4">
      <p class="list-card__prop" v-if="data.type === 'performer'">
        {{ data.entityCount 
          ? (data.entityCount + ' ' + plural(data.entityCount, { one: 'услуга', few: 'услуги', many: 'услуг' }) ) 
          : 'Нет услуг' 
        }}
      </p>
      <p class="list-card__prop" v-if="data.type === 'customer'">
        {{ data.entityCount 
          ? (data.entityCount + ' ' + plural(data.entityCount, { one: 'заказ', few: 'заказы', many: 'заказов' }) ) 
          : 'Нет заказов' 
        }}
      </p>
    </div>
    <div class="list-card__props list-card__col-5">
      <p class="list-card__prop-name">Сырье:</p>
      <div class="list-card__prop-container list-card__prop-container_type_desktop">
        <template v-if="data.rawMaterials && data.rawMaterials.length > 0">
          <template v-for="(rawMaterial, index) in data.rawMaterials" :key="index">
            <p class="list-card__prop-value">{{rawMaterial}}</p>
          </template>
        </template>
        <template v-else>
          <p class="list-card__prop-value">Не указано</p>
        </template>
      </div>
      <div class="list-card__prop-container list-card__prop-container_type_mobile">
        <template v-for="(rawMaterial, index) in data.rawMaterials" :key="index">
          <span class="list-card__prop-value">{{rawMaterial}}</span>
          <span class="list-card__prop-value_type_divider" v-if="index < data.rawMaterials.length - 1">/</span>
        </template>
      </div>
    </div>
    <div class="list-card__props list-card__col-6">
      <p class="list-card__prop-name">Категории:</p>
      <div class="list-card__prop-container list-card__prop-container_type_desktop">
        <template v-if="data.category && data.category.length > 0">
          <template v-for="(category, index) in data.category.slice(0, 3)" :key="index">
            <p class="list-card__prop-value">{{ category }}</p>
          </template>
          <ModalsMoreCities
            class="list-card__more-props"
            :list="data.category.slice(3)"
            v-if="data.category && data.category.length > 3"
            title="Категории"
          />
        </template>
        <template v-else>
          <p class="list-card__prop-value">Не указано</p>
        </template>
      </div>
      <div class="list-card__prop-container list-card__prop-container_type_mobile">
        <template v-for="(category, index) in data.category.slice(0, 3)" :key="index">
          <span class="list-card__prop-value">{{ category }}</span>
          <span class="list-card__prop-value_type_divider" v-if="index < data.category.slice(0, 3).length - 1">/</span>
        </template>
        <ModalsMoreCities
          class="list-card__more-props"
          :list="data.category.slice(3)"
          v-if="data.category && data.category.length > 3"
          title="Категории"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import defaultLogoImage from '~/assets/images/nophoto_pc.png';

const props = defineProps({
  data: {
    type: Object,
    default: () => ({})
  }
})

</script>

<style lang="scss">

.list-card {
  display: flex;
  align-items: center;
  column-gap: 1.7em;
  font-size: 1.7rem;
  padding: .625em;
  // border-top: 1px solid var(--border-color-secondary);
  width: 100%;

  &__col-1 {
    flex: 0 0 7%;

    .image-box {
      max-width: 100%;
      padding-top: 100%;
    }
  }

  &__col-2 {
    flex: 1 1 25%;
  }

  &__col-3 {
    flex: 0 1 16%;
  }

  &__col-4 {
    flex: 0 1 9%;
  }

  &__col-5 {
    flex: 0 1 12%;
  }

  &__col-6 {
    flex: 0 1 33%;
  }

  &__title {
    font-size: 1em;
  }

  &__location {
    display: flex;
    align-items: center;
    column-gap: .2em;
    font-size: .88em;
  }

  &__props {
    display: flex;
    flex-direction: column;
    row-gap: .3em;
  }

  &__prop {
    font-size: 1.5rem;
  }

  &__prop-name {
    font-size: 1.7rem;
  }


  &__prop-container {
    display: flex;
    flex-wrap: wrap;
    column-gap: .29em;
    row-gap: .29em;
    align-items: center;

    &_type_mobile {
      display: none;
    }
  }

  &__prop-value {
    font-size: 1.5rem;
    background-color: #E5E5E5;
    padding: .13rem .38rem;
    font-weight: 400;
  }

  &__more-props {
    font-size: 1.5rem;
  }
}

@include mobile {
  .list-card {
    font-size: 1.4rem;
    flex-wrap: wrap;
    row-gap: .5em;
    box-shadow: -2px -2px 0 #6937a5, 0 1px 1px rgba(0, 0, 0, 0.15);
    border: none;
    margin-bottom: 1em;
    box-sizing: border-box;

    &__col-1 {
      flex: 0 0 14%;
    }

    &__col-2 {
      flex: 1 1 35%;
      max-width: calc(100% - 14%);
    }

    &__col-3 {
      flex: 1 1 100%;
    }

    &__col-4 {
      flex: 1 1 100%;
    }

    &__col-5 {
      flex: 1 0 100%;
      display: inline-flex;
      flex-direction: row;
      align-items: center;
    }

    &__col-6 {
      flex: 1 0 100%;
      display: inline-flex;
      flex-direction: row;
      align-items: center;
    }

    &__prop {
      font-size: 1.2rem;
    }

    &__props {
      display: block;
    }

    &__prop-container {
      &_type_mobile {
        display: inline;
      }
      &_type_desktop {
        display: none;
      }
    }

    &__prop-name {
      display: inline;
      font-size: 1.2rem;
      margin-right: .5em;
      color: var(--text-color-ternary);
    }

    &__prop-value {
      padding: 0;
      font-size: 1.2rem;
      background-color: inherit;
      white-space: nowrap;
    }

    &__prop-value_type_divider {
      padding-inline: .5em;
    }

    &__more-props {
      font-size: 1.2rem;
      padding-inline: .5em;
    }
  }
}

</style>
