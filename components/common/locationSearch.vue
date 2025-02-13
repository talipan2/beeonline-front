<template>
  <div class="location-search">
    <UiNewDropdown placement="bottom-start" trigger="manual" class="location-search__q" ref="locationSearch" :arrow="false"  :offset="[0, 0]">
      <UiInput class="location-search__input" name="Поиск города" :placeholder="'Поиск города'" v-model="searchValue" @focus="handleFocus">
        <CommonSpinner type="grow" v-if="loading"/>
        <SvgoSearchIcon class="svg-m location-search__icon" v-if="!loading" />
      </UiInput>
      <template #content>
        <div class="location-search__content">
          <div class="location-search__result">
            <template v-for="result in searchResult" :key="result">
              <UiCheckbox
                v-if="locationTypes.selectCities"
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
const loading = ref(false);

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

  searchResult.value = citiesList.slice(0, 5);

  if(searchResult.value.length > 0) {
    locationSearch.value.tippy.show();
  }
}

const handleFocus = () => {
  if(searchResult.value.length < 1) return
  locationSearch.value.tippy.show();
}

watch(searchValue, () => {
  handleSearch(searchValue.value);
  clearTimeout(loading.value);
  loading.value = true;

  setTimeout(() => {
    loading.value = false;
  }, 300)
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

  &__input {
    color: #a9abac;
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
    // gap: 1em;
  }

  &__checkbox {

    .checkbox__label {
      width: 100%;
      padding: 1em;
    }
    span {
      font-size: 1.6rem;
      transition: color .2s ease;
    }

    &:hover {
      span {
        color: var(--text-color-hover-primary);
      }

      background-color: rgba(0, 0, 0, 0.02);
    }
  }

  &__icon {
    path {
      fill: #a9abac;
    }
  }

  &__button {
    width: fit-content;
    padding: 1em;
  }
}

</style>