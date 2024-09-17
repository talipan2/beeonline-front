<template>
  <div class="preview-entity">
    <h3 class="preview-entity__title">{{ data.name }}</h3>
    <div class="preview-entity__content">
      <div class="image-box">
        <img :src="logo || defaultImage" alt="">
      </div>
      <div class="props">
      <div class="prop" v-for="prop in data.data" :key="prop.id" :class="{ 'prop_type_text': prop.name === 'Описание' }">
        <p class="prop__name">{{ prop.name }}:</p>
        <p class="prop__value" >
          <i class="flag flag_round" v-if="prop.name === 'Место производства' && prop.value[0]" 
            :class="prop.value[0] 
            ? flagClass
            :''" 
          />
          <span>
            {{ Array.isArray(prop.value) ? (prop.value[0] || 'не указано') : (prop.value || 'не указано') }}
          </span>
          <ModalsMoreCities 
            :list="prop.value" 
            :title="prop.name" 
            placement="bottom-end" 
            v-if="Array.isArray(prop.value) && prop.value && prop.value.length >= 1"
          />
        </p>
      </div>
    </div>
    </div>
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
  }
})

const entityStore = useEntityStore();
const userStore = useUserStore();

const logo = computed(() => props.data.logo)
const entity = computed(() => {
  if(userStore.role === 'performer') {
    return entityStore.service
  } else return entityStore.order
})

const flagClass = computed(() => selectFlag(entity.value.placeOfProduction[0].countryId))


watch(() => props.data, (newVal) => {
  console.log(props.data)
});

</script>

<style lang="scss">

.preview-entity {
  box-shadow: var(--box-shadow-primary);
  padding: 2em;
  margin-top: 2em;

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
}

</style>