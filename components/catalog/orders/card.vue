<template>
  <div class="order-card">
    <h3 class="order-card__title">{{ data.name }}</h3>
    <div class="order-card__content">
      <div class="image-box">
        <img :src="logo || defaultImage" alt="">
      </div>
      <div class="props">
        <div class="prop" v-for="prop in data.data" :key="prop.id"
          :class="{ 'prop_type_text': prop.name === 'Описание' }">
          <p class="prop__name">{{ prop.name }}:</p>
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