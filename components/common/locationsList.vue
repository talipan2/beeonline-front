<template>
  <div class="location-container">
    <i class="flag flag_round" :class="selectFlag(firstLocation && firstLocation.countryId || '')"></i>
    <p>{{ firstLocation && firstLocation.name || '-' }} </p>
    <ModalsMoreCities 
      class="location-container__more-cities"
      :list="otherLocations" 
      :title="title" 
      placement="bottom-end" 
      v-if="otherLocations"
    />
  </div>
</template>

<script setup>
import { useLocationStore } from '~/store/locationStore';


const props = defineProps({
  locationsList: {
    type: Object,
    default: () => ({}),
  },
  title: {
    type: String,
    default: 'География фактического производства',
  }
})

const locationStore = useLocationStore();

const cities = computed(() => props.locationsList.cities || []);
const regions = computed(() => props.locationsList.regions || []);
const countries = computed(() => props.locationsList.countries || []);

const data = ref([])

watch(() => [cities.value, regions.value, countries.value], () => {
  data.value = locationStore.getLocationsByIds([...countries.value], [...regions.value], [...cities.value])
}, {deep: true, immediate: true})

const firstLocation = computed(() => {
  if(!data.value.length) return null;
  return data.value[0];
})

const otherLocations = computed(() => {
  if(!data.value.length) return null;
  return data.value.slice(1).map(item => item.name);
})

</script>

<style lang="scss">

.location-container {
  display: inline-block;
  vertical-align: middle;
  font-size: 1.2rem;

  p {
    vertical-align: middle;
    display: inline;
    margin-inline: .5em;
  }

  &__more-cities {
    vertical-align: middle
  }

  .tippy-box {
    max-width: 20em;
  }
}


</style>