<template>
  <div class="entity-card" :class="{ 'entity-card_hover': isLinkHovered }">
    <h3 class="entity-card__title">{{ name }}</h3>
    <div class="entity-card__body">
      <div class="entity-card__details">
        <div class="entity-card__region">
          Регион
          <ModalsMoreCities />
        </div>
        <i class="flag flag_round" :class="organizationStore.registerOrg.selectedProductionCountries[0]
          ? selectFlag(organizationStore.registerOrg.selectedProductionCountries[0].countryId)
          : ''" />
      </div>
      <div class="entity-card__details">
        <p class="entity-card__details-name">Минимальная партия</p>
        <p class="entity-card__details-value">до 100</p>
      </div>
    </div>
    <div class="props">
      <div class="prop">
        <p class="prop__name">Сырье:</p>
        <p class="prop__value">Собственное</p>
      </div>
      <div class="prop">
        <p class="prop__name">Категории:</p>
        <p class="prop__value">Женская одежда / Головные уборы</p>
      </div>
      <div class="prop">
        <p class="prop__name">Наличие СТМ:</p>
        <p class="prop__value">Нет</p>
      </div>
      <div class="prop">
        <p class="prop__name">Бесплатные образцы:</p>
        <p class="prop__value">По запросу</p>
      </div>
    </div>
    <div class="entity-card__footer">
      <UiButton type="button" class="entity-card__btn" variant="quinary" size="large">Изменить</UiButton>
      <UiButton type="button" class="entity-card__btn" variant="quinary" size="large">Опубликовать</UiButton>
      <p class="entity-card__status">На модерации</p>
    </div>
    <NuxtLink class="entity-card__link" to="/" @mouseover="isLinkHovered = true" @mouseleave="isLinkHovered = false"></NuxtLink>
  </div>
</template>

<script setup>
import { useOrganizationStore } from '~/store/organizationStore';
import { selectFlag } from '#imports';


const props = defineProps({
  name: {
    type: String,
    default: '',
  },
})
const organizationStore = useOrganizationStore();
const isLinkHovered = ref(false);
</script>

<style lang="scss">

.entity-card {
  position: relative;
  flex: 0 1 45%;
  padding: 2em;
  margin-bottom: 3em;
  box-shadow: var(--box-shadow-primary);
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

  &__details {
    display: flex;
    justify-content: space-between;
    font-size: 1.4em;
    line-height: 1em;
    margin-bottom: 1em;
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
    z-index: 3;
  }

  &__status {
    flex: 1 1 auto;
    text-align: right;
  }

  &__link {
    position: absolute;
    inset: 0;
    z-index: 2;
  }
}

.entity-card_hover {
  box-shadow: var(--box-shadow-secondary);
}


</style>