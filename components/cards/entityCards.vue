<template>
  <div class="entity-card" :class="{ 'entity-card_hover': isLinkHovered }" @mouseover="isLinkHovered = true" @mouseleave="isLinkHovered = false">
    <h3 class="entity-card__title">{{ data.name }}</h3>
    <div class="entity-card__body">
      <div class="entity-card__details" v-if="data.placeOfProduction && data.placeOfProduction.length > 0">
        <div class="entity-card__region">
          {{ data.placeOfProduction[0] ? data.placeOfProduction[0].name : 'Не указано' }}
            <ModalsMoreCities 
              :list="data.placeOfProduction.map(el => el.name).slice(1)" 
              title="Регионы" 
              placement="bottom-end" 
              v-if="Array.isArray(data.placeOfProduction) && data.placeOfProduction.length >= 1"
            />
        </div>
        <i class="flag flag_round" :class="data.placeOfProduction && data.placeOfProduction[0]
          ? selectFlag(data.placeOfProduction[0].countryId)
          : ''" />
      </div>
      <div class="entity-card__details" v-if="role === 'customer'">
        <p class="entity-card__details-name">Размер партии</p>
        <p class="entity-card__details-value">{{ Number(data.batch) || 'Не указано' }}</p>
      </div>
      <div class="entity-card__details" v-else>
        <p class="entity-card__details-name">Минимальная партия</p>
        <p class="entity-card__details-value">{{ data.minLot && data.minLot.length ? data.minLot[0] : 'Не указано'}}</p>
      </div>
      <div class="entity-card__details" v-if="role === 'customer'">
        <p class="entity-card__details-name">Срок выполнения</p>
        <p class="entity-card__details-value">До {{ formatDate(data.completionDate) || 'Не указано' }}</p>
      </div>
    </div>
    <div class="props">
      <div class="prop">
        <p class="prop__name">Сырье:</p>
        <p class="prop__value">{{ data.rawMaterials.join(' / ') || 'Не указано' }}</p>
      </div>
      <div class="prop">
        <p class="prop__name">Категории:</p>
        <p class="prop__value">{{ entityCategories && entityCategories.length > 0 ? entityCategories.join(' / ') : 'Не указано' }}</p>
      </div>
      <div class="prop" v-if="role === 'performer'">
        <p class="prop__name">Наличие СТМ:</p>
        <p class="prop__value"> {{ data.availabilityStm }}</p>
      </div>
      <div class="prop" v-if="role === 'performer'">
        <p class="prop__name">Бесплатные образцы:</p>
        <p class="prop__value">{{ data.freeSamples }}</p>
      </div>
    </div>
    <div class="entity-card__footer">
      <UiButton 
        :to="`${role === 'performer' ? `/performer/services/edit/${data.id}` : `/customer/orders/edit/${data.id}`}`" 
        class="entity-card__btn" 
        variant="quinary" 
        size="large"
      > 
        Изменить
      </UiButton>

      <UiButton 
        type="button" 
        class="entity-card__btn"
        variant="quinary" 
        size="large" 
        v-if="data.statusType === 'archived'"
        @click="handleClickActions('published', data.id)"
      >
        Опубликовать
      </UiButton>

      <UiButton 
        type="button" 
        class="entity-card__btn" 
        variant="quinary" 
        size="large" 
        v-if="data.statusType === 'active'"
        @click="handleClickActions('unpublished', data.id)"
      >
        Снять с публикации
      </UiButton>
      <p class="entity-card__status">{{ data.status }}</p>
    </div>
    <NuxtLink class="entity-card__link" :to="`/performer/services/show/${data.id}`" v-if="role === 'performer'"></NuxtLink>
    <NuxtLink class="entity-card__link" :to="`/customer/orders/show/${data.id}`" v-else></NuxtLink>
  </div>
</template>

<script setup>
import { selectFlag } from '#imports';
import { useEntityStore } from '~/store/entityStore';
import { useLocationStore } from '~/store/locationStore';
import { useSettingStore } from '~/store/settingStore';


const props = defineProps({
  role: {
    type: String,
    default: '',
    required: true,
  },
  data: {
    type: Object,
    default: {},
    required: true,
  }
})

const locationStore = useLocationStore();
const entityStore = useEntityStore();
const settingStore = useSettingStore();

const emit = defineEmits(['selectInfoModal']);

const handleClickActions = (type, id) => {
  if(type) emit('selectInfoModal', {type, id});
}


const isLinkHovered = ref(false);

const entityLocations = computed(() => {
  if(props.data.locations && props.data.locations.cities && props.data.locations.regions) {
    const regionsId = props.data.locations.regions.map(item => item.id);
    const citiesId = props.data.locations.cities.map(item => item.id);
    return locationStore.getLocationsByIds([], regionsId, citiesId)
  }
})

const entityCategories = computed(() => {
  if(props.data.category) {
    return entityStore.getEntityLabelById('categories', props.data.category)
  }
})

</script>

<style lang="scss">

.entity-card {
  font-size: 1rem;
  position: relative;
  display: flex;
  flex-direction: column;
  flex: 0 1 45%;
  padding: 2em;
  box-shadow: var(--box-shadow-secondary);
  transition: box-shadow .2s ease-in-out;
  background-color: #fff;

  @include mobile {
    flex-basis: 100%;
    font-size: .9rem;
  }

  &__title {
    font-size: 1.8em;
    padding-bottom: 1em;
    border-bottom: 1px solid var(--border-color-secondary);
    margin-bottom: .8em;
  }

  &__body {
    max-width: 66%;

    @include mobile {
      max-width: 100%;
    }
  }

  .props {
    margin-top: auto;
  }

  &__details {
    display: flex;
    justify-content: space-between;
    font-size: 1.4em;
    line-height: 1em;
    margin-bottom: 1em;
  }

  &__region {
    span {
      position: relative;
      z-index: 4;
    }
  }

  &__details-value {
    font-weight: 700;
  }

  &__footer {
    display: flex;
    align-items: center;
    column-gap: .83em;
    font-size: 1.2em;
    margin-top: 1.66em;

    @include small-mobile {
      flex-direction: column;
      row-gap: 1em;
      align-items: normal;
    }
  }

  &__btn {
    flex: 0 1 36%;
    text-transform: uppercase;
    z-index: 1;

    @include small-mobile {
      flex-basis: 100%;
    }
  }

  &__status {
    flex: 1 1 auto;
    text-align: right;
  }

  &__link {
    position: absolute;
    inset: 0;
    // z-index: 1;
  }
}

.entity-card_hover {
  box-shadow: var(--box-shadow-primary);
}


</style>