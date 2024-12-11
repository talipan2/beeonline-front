<template>
  <div class="location-search">
    <UiNewDropdown placement="bottom-start" trigger="manual" class="location-search__q" ref="locationSearch" :arrow="false"  :offset="[0, 0]">
      <UiInput class="location-search__input" name="Поиск города" :placeholder="'Поиск города'" v-model="searchValue">
        <SvgoSearchIcon class="svg-m" />
      </UiInput>
      <template #content>
        <div class="location-search__content">
          <div class="location-search__result">
            <template v-for="result in searchResult" :key="result">
              <UiCheckbox
                v-if="locationTypes.selectCity"
                v-model="result.selected" 
                :isValidated="false" 
                class="location-search__checkbox" 
                variant="square" 
                @change="emit('addCity', result)"
                :disabled="selectedCities.length >= maxSelected && !result.selected && maxSelected"
              >
                <span>{{ result.city }}, {{ result.region }}, {{ result.country }}</span>
              </UiCheckbox>
              <span v-else-if="!selectOneCity" class="location-search__item">{{ result.city }}, {{ result.region }}, {{ result.country }}</span>
              <button v-else-if="selectOneCity" class="location-search__button" @click="$emit('selectCity', {name: result.city})">{{ result.city }}, {{ result.region }}, {{ result.country }}</button>
            </template>
          </div>
        </div>
      </template>
    </UiNewDropdown>
  </div>
</template>

<script setup>
import { useLocationStore } from '~/store/locationStore';

const props = defineProps({
  locations: {
    type: Object,
    required: true,
    default: () => ({})
  },
  maxSelected: {
    type: Number,
    default: null
  },
  selectedCities: {
    type: Array,
    default: () => []
  },
  locationTypes: {
    type: Object,
    default: () => ({})
  },
  selectOneCity: {
    type: Boolean,
    default: false
  }
})

const locationStore = useLocationStore();
const emit = defineEmits(['addCity']);

const locationSearch = ref(null);
const locationList = locationStore.locations;
const searchResult = ref([]);
const searchValue = ref('');

function handleSearch(value) {
  const citiesList = [];

  if(value.length < 2) {
    searchResult.value = [];
    locationSearch.value.tippy.hide();
    return
  };

  props.locations.country.forEach(country => {
    country.regions.forEach(region => {
      region.cities.forEach(city => {
        if (city.name.toLowerCase().includes(value.toLowerCase())) {
          citiesList.push({
            id: city.id,
            city: city.name,
            region: region.name,
            country: country.name,
            countryId: country.id,
            selected: city.selected
          });
        }
      })
    })
  })

  searchResult.value = citiesList;

  if(searchResult.value.length > 0) {
    locationSearch.value.tippy.show();
  }
}

watch(searchValue, () => {
  handleSearch(searchValue.value);
})

</script>

<style lang="scss">

.location-search {
  font-size: 1.6rem;
  position: relative;

  .tippy {
    display: block;
  }

  [data-tippy-root] {
    max-width: none;
    width: 100%;
    box-sizing: border-box;
  }

  &__dropdown {
    width: 100%;
  }

  .tippy-box {
    background-color: #fff;
    border: 1px solid #6937a5;
    box-shadow: 0 5px 5px 0 rgba(0, 0, 0, 0.4);
  }

  &__content {
    padding: 2em;
  }

  &__result {
    display: flex;
    flex-direction: column;
    gap: 1em;
  }

  &__checkbox {
    span {
      font-size: 1.6rem;
    }
  }

  &__button {
    width: fit-content;
  }
}

</style>