<template>
  <div class="entity-card" :class="{ 'entity-card_hover': isLinkHovered }" @mouseover="isLinkHovered = true" @mouseleave="isLinkHovered = false">
    <h3 class="entity-card__title">{{ data.name }}</h3>
    <div class="entity-card__body">
      <div class="entity-card__details">
        <div class="entity-card__region">
          {{ 'Не указано' }}
          <span>
            <ModalsMoreCities 
              :list="data.placeOfProductionId" 
              title="Регионы" 
              placement="bottom-end" 
              v-if="Array.isArray(data.minLot) && data.minLot && data.minLot.length >= 1"
            />
          </span>
        </div>
        <i class="flag flag_round" :class="organizationStore.registerOrg.selectedProductionCountries[0]
          ? selectFlag(organizationStore.registerOrg.selectedProductionCountries[0].countryId)
          : ''" />
      </div>
      <div class="entity-card__details">
        <p class="entity-card__details-name">Минимальная партия</p>
        <p class="entity-card__details-value">{{ 'Не указано' }}</p>
      </div>
    </div>
    <div class="props">
      <div class="prop">
        <p class="prop__name">Сырье:</p>
        <p class="prop__value">{{ data.rawMaterials.join(' / ') || 'Не указано' }}</p>
      </div>
      <div class="prop">
        <p class="prop__name">Категории:</p>
        <p class="prop__value">{{ 'Не указано' }}</p>
      </div>
      <div class="prop">
        <p class="prop__name">Наличие СТМ:</p>
        <p class="prop__value"> {{ data.availabilityStm }}</p>
      </div>
      <div class="prop">
        <p class="prop__name">Бесплатные образцы:</p>
        <p class="prop__value">{{ data.freeSamples }}</p>
      </div>
    </div>
    <div class="entity-card__footer">
      <UiButton :to="`${role === 'performer' ? `/performer/services/edit/${1}` : `/customer/orders/edit/${1}`}`" class="entity-card__btn" variant="quinary" size="large">Изменить</UiButton>
      <UiButton type="button" class="entity-card__btn" variant="quinary" size="large">Опубликовать</UiButton>
      <p class="entity-card__status">На модерации</p>
    </div>
    <NuxtLink class="entity-card__link" :to="`/performer/services/show/${data.id}`"></NuxtLink>
  </div>
</template>

<script setup>
import { useOrganizationStore } from '~/store/organizationStore';
import { selectFlag } from '#imports';


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

const organizationStore = useOrganizationStore();
const isLinkHovered = ref(false);

</script>

<style lang="scss">

.entity-card {
  position: relative;
  display: flex;
  flex-direction: column;
  flex: 0 1 45%;
  padding: 2em;
  margin-bottom: 3em;
  box-shadow: var(--box-shadow-secondary);
  transition: box-shadow .2s ease-in-out;

  &__title {
    font-size: 1.8em;
    padding-bottom: 1em;
    border-bottom: 1px solid var(--border-color-secondary);
    margin-bottom: .8em;
  }

  &__body {
    max-width: 66%;
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
  }

  &__btn {
    flex: 0 1 36%;
    text-transform: uppercase;
    z-index: 1;
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