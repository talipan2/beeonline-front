<template>
  <div class="preview-entity">
    <h3 class="preview-entity__title">{{ data.name }}</h3>
    <div class="preview-entity__content">
      <div class="image-box">
        <img :src="logo || defaultImage" alt="">
      </div>
      <div class="props">
      <div class="prop" v-for="prop in mappedPropsData" :key="prop.id" :class="{ 'prop_type_text': prop.name === 'Описание' }">
        <p class="prop__name">{{ prop.name }}:</p>
        <p class="prop__value">
          {{ Array.isArray(prop.value) ? (prop.value[0] || '-') : (prop.value || '-') }}
          &nbsp;
          <ModalsMoreCities :list="prop.value" v-if="Array.isArray(prop.value)"/>
          </p>
      </div>
    </div>
    </div>
  </div>
</template>

<script setup>
import defaultImage from '~/assets/images/nophoto_pc.png';
import { useEntityStore } from '~/store/entityStore';
import { useUserStore } from '~/store/userStore';
import { mapValuesToDictionary } from '~/utils/valuesToDictonary';

const userStore = useUserStore();
const entityStore = useEntityStore();

const props = defineProps({
  data: {
    type: Object,
    default: () => {
      return {}
    }
  }
})

const logo = computed(() => props.data.logo)
const propsData = computed(() => [...props.data.data,])
const entityData = computed(() => entityStore.entityData)

const mappedPropsData = computed(() => {
  return mapValuesToDictionary(propsData.value, entityData.value, getDictionaryKey);
});

const getDictionaryKey = (propName) => {
  switch (propName) {
    case 'Категории':
      return 'categories';
    case 'Место производства':
      return 'places';
    case 'Сырье':
      return 'rawMaterials';
    case 'Лекала': 
      return 'patterns'
    default:
      return null;
  }
};

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