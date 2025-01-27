<template>
  <div class="location-container">
    <i class="flag flag_round" :class="selectFlag(firstLocation && firstLocation.countryId || '')"></i>
    <p v-if="!isCountry">{{ firstLocation && firstLocation.name || '-' }} </p>
    <p v-else>{{ countryName || '-' }} </p>
    <ModalsMoreCities 
      class="location-container__more-cities"
      :list="otherLocations" 
      :title="title" 
      placement="bottom-end" 
      v-if="otherLocations && !isCountry"
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
  },
  isCountry: {
    type: Boolean,
    default: false
  }

})

const locationStore = useLocationStore();

const cities = computed(() => props.locationsList.cities || []);
const regions = computed(() => props.locationsList.regions || []);
const countries = computed(() => props.locationsList.countries || []);

const data = ref([])

watch(() => [cities.value, regions.value, countries.value], () => {
  data.value = locationStore.getLocationsByIds([...countries.value], [...regions.value], [...cities.value])
  console.log(data.value)
}, {deep: true, immediate: true})

const firstLocation = computed(() => {
  if(!data.value.length) return null;
  return data.value[0];
})

const otherLocations = computed(() => {
  if(!data.value.length && props.isCountry) return null;
  return data.value.slice(1).map(item => item.name);
})

const countryName = computed(() => {
  if(!firstLocation.value || !props.isCountry) return null;
  return firstLocation.value.countryId ? locationStore.getCountryById(firstLocation.value.countryId) : null;
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