<template>
  <div class="order-card">
    <h3 class="order-card__title">{{ data.name }}</h3>
    <div class="order-card__content">
      <div class="image-box">
        <img :src="logo || defaultImage" :alt="data.name">
      </div>
      <div class="props">
        <div class="prop" v-for="prop in data.data" :key="prop.id"
          :class="{ 'prop_type_text': prop.name === 'Описание' }">
          <p class="prop__name prop__name_type_grey">{{ prop.name }}:</p>
          <p class="prop__value " :class="{ 'prop_type_hidden': prop.name === 'Описание' }">
            <i class="flag flag_round" v-if="prop.name === 'Место производства' && data.countryId" :class="data.countryId
              ? selectFlag(data.countryId)
              : ''" />
            <span>
              {{ Array.isArray(prop.value) ? (prop.value[0] || 'не указано') : (prop.value || 'не указано') }}
            </span>
            <ModalsMoreCities :list="prop.value.slice(1)" :title="prop.name" placement="bottom-end"
              v-if="Array.isArray(prop.value) && prop.value && prop.value.length > 1" />
          </p>
        </div>
      </div>
    </div>
    <slot name="favorite-delete" />
    <NuxtLink class="order-card__link" :to="`/orders/${data.id}`" :target="linkBlank ? '_blank' : ''"></NuxtLink>
  </div>
</template>

<script setup>
import defaultImage from '~/assets/images/nophoto_pc.png';
import { selectFlag } from '#imports';
import { useEntityStore } from '~/store/entityStore';
import { useUserStore } from '~/store/userStore';

const props = defineProps({
  data: {
    type: Object,
    default: {},
  },
  linkBlank: {
    type: Boolean,
    default: false,
  }
})

const entityStore = useEntityStore();
const userStore = useUserStore();

const logo = computed(() => props.data.logo)
const entity = computed(() => {
  if (userStore.role === 'performer') {
    return entityStore.service
  } else return entityStore.order
})

</script>

<style lang="scss">
.order-card {
  flex: 1;
  box-shadow: var(--box-shadow-primary);
  padding: 2em;
  // margin-top: 2em;
  background-color: #fff;
  position: relative;
  transition: box-shadow .2s ease;

  &.highlight {
    position: relative;
    box-shadow: 0px 0px 0 4px #6937a5, 0 1px 1px rgba(0, 0, 0, 0.15);

    &::after {
      content: "";
      position: absolute;
      pointer-events: none;
      top: 10px;
      z-index: 9999;
      height: 29px;
      width: 29px;
      right: 10px;
      background-size: cover;
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' height='24px' viewBox='0 -960 960 960' width='24px' fill='%236937a5'%3E%3Cpath d='m384-334 96-74 96 74-36-122 90-64H518l-38-124-38 124H330l90 64-36 122ZM233-120l93-304L80-600h304l96-320 96 320h304L634-424l93 304-247-188-247 188Zm247-369Z'/%3E%3C/svg%3E");
    }

    &:hover {
      box-shadow: -2px -2px 0 #6937a5, 0px 4px 20px rgba(0, 0, 0, 0.1);
    }
  }

  &:hover {
    box-shadow: -2px -2px 0 #6937a5, 0px 4px 20px rgba(0, 0, 0, 0.1);
  }

  &__title {
    font-size: 1.8em;
    padding-bottom: 1em;
    margin-bottom: 1em;
    border-bottom: 1px solid var(--border-color-secondary);
    min-height: 1.5em;
  }

  &__content {
    display: flex;
  }

  &__link {
    position: absolute;
    inset: 0;
  }
}
</style>