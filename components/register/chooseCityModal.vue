<template>
  <UiModal v-model="settingStore.chooseLocationModal" size="lg" :title="modalTitle" @confirm="() => confirm()"
    class="choose-city-modal choose-city-modal-register modal">
    <template #header>
      <CommonLocationSearch 
        @addCity="AddCityForSearchList" 
        :locations="locations" 
        :maxSelected="maxSelected" 
        :selectedCities="selectedCities" 
        :locationTypes="locationTypes"
      />
      <div class="choose-city__count" v-if="maxSelected">
        <p class="choose-city__count-value">Выбрано локаций: {{ selectedCities.length || 0 }}/{{ maxSelected }}</p>
      </div>
    </template>
    <template #content>
      <button class="choose-city__back-btn" :class="{'choose-city__back-btn_type_visible': activeLevel !== 'country'}"
        @click="goBack">
        <SvgoDropDownNew class="svg-m" />
        {{ selectedRegion?.name || selectedCountry?.name }}
      </button>
      <div class="choose-city">
        <div class="choose-city__container" :class="{ 'choose-city__item_type_selected': activeLevel === 'country' }">
          <p class="choose-city__title">Страна</p>
          <ul class="choose-city__list">
            <li class="choose-city__item " v-for="country in locations.country"
              :class="{ 'selected': country.id === selectedCountry?.id }" :key="country.id">
              <UiCheckbox :isValidated="false" ref="countryCheckbox" :indeterminate="updateCountryIndeterminate(country)"
                v-if="locationTypes.selectCountry" class="choose-city__checkbox" variant="square"
                v-model="country.selected" :id="country.id" @change="selectAllRegions(country)" :name="`country-${country.id}`">
              </UiCheckbox>
              <button @click="selectCountry(country)">{{ country.name }}</button>
            </li>
          </ul>
        </div>
        <div class="choose-city__container" :class="{ 'choose-city__item_type_selected': activeLevel === 'region' }">
          <p class="choose-city__title">Регион</p>
          <ul class="choose-city__list" v-if="selectedCountry">
            <li class="choose-city__item" v-if="locationTypes.selectRegions || locationTypes.selectCountry">
              <UiCheckbox 
                :isValidated="false" 
                class="choose-city__checkbox" 
                variant="square"
                @change="selectAllRegions(selectedCountry)"
                name='region-all' 
                v-model="selectedCountry.selected"
              >
                Любой
              </UiCheckbox>
            </li>
            <li class="choose-city__item" v-for="region in regions"
              :class="{ 'selected': region.id === selectedRegion?.id }" :key="region.id">
              <UiCheckbox 
                :isValidated="false" 
                ref="regionCheckbox" 
                :indeterminate="updateRegionIndeterminate(region)"
                v-if="locationTypes.selectRegions || locationTypes.selectCountry" 
                class="choose-city__checkbox"
                variant="square"
                v-model="region.selected" 
                :id="region.id" 
                @change="selectAllCities(region)" 
                :name="`region-${region.id}`"
              >
              </UiCheckbox>
              <button @click="selectRegion(region)">{{ region.name }}</button>
              
            </li>
          </ul>
        </div>
        <div class="choose-city__container" :class="{ 'choose-city__item_type_selected': activeLevel === 'city' }">
          <p class="choose-city__title">Город</p>
          <ul class="choose-city__list" v-if="selectedRegion">
            <li class="choose-city__item" v-if="(locationTypes.selectCountry || locationTypes.selectRegions) && locationTypes.selectCities">
              <UiCheckbox 
                :isValidated="false" 
                class="choose-city__checkbox" 
                variant="square" 
                v-model="selectedRegion.selected"
                @change="selectAllCities(selectedRegion)" 
                name='city-all'
              >
                Любой
              </UiCheckbox>
            </li>
            <li class="choose-city__item" v-for="city in cities" :key="city.id">
              <UiCheckbox 
                :isValidated="false"
                class="choose-city__checkbox" 
                variant="square" 
                v-model="city.selected" 
                :id="city.id"
                :disabled="!city.selected && maxSelected && selectedCities.length >= maxSelected" 
                :name='`city-${city.id}`'
                @change="toggleCitySelection(city)" 
                v-if="locationTypes.selectCities"
              >
                {{ city.name }}
              </UiCheckbox>
              <button v-if="!locationTypes.selectCities">{{ city.name }}</button>
            </li>
          </ul>
        </div>
      </div>
      <div class="choose-city__btn-container">
        <UiButton type="button" class="choose-city__btn" variant="quinary" size="large" @click="handleSubmit">
          Применить
          <SvgoBtnArrow class="svg-l" />
        </UiButton>
      </div>
    </template>
  </UiModal>
</template>

<script setup>
import { useSettingStore } from '~/store/settingStore';
import { useUserStore } from '~/store/userStore';
import { useLocationStore } from '~/store/locationStore';

const locationStore = useLocationStore();

const locations = ref([]);

const props = defineProps({
  modelValue: {
    type: Object,
    default: () => {},
  },
  type: {
    type: [String, Array],
    default: 'selectCities',
    validate: (value) => {
      const validTypes = ['selectCity', 'selectCities', 'selectRegions', 'selectCountry'];
      if (Array.isArray(value)) {
        return value.every(v => validTypes.includes(v));
      }
      return validTypes.includes(value);
    },
  },
  maxSelected: {
    type: Number,
    default: null,
  },
  modalTitle: {
    type: String,
    default: 'Выберите город',
  }
});

const locationTypes = computed(() => {
  const types = Array.isArray(props.type) ? props.type : [props.type];

  return {
    selectCity: types.includes('selectCity'),
    selectCities: types.includes('selectCities'),
    selectRegions: types.includes('selectRegions'),
    selectCountry: types.includes('selectCountry'),
  };
});

const settingStore = useSettingStore();
const userStore = useUserStore();

const emit = defineEmits(['update:modelValue']);

const regions = ref([]);
const cities = ref([]);
const selectedCountry = ref(null);
const selectedRegion = ref(null);
const selectedCity = ref(null);
const activeLevel = ref('country');

const selectedCities = ref([]);
const selectedRegionIds = ref([]);
const selectedCountryIds = ref([]);

const AddCityForSearchList = (city) => {
  if (selectedCities.value.find(selectedCity => selectedCity === city.id)) {
    selectedCities.value = selectedCities.value.filter(selectedCity => selectedCity !== city.id);
  } else if(!selectedCities.value.includes(city.id) && selectedCities.value.length < props.maxSelected && props.maxSelected) {
    selectedCities.value.push(city.id)
  } else if (!selectedCities.value.includes(city.id) && !props.maxSelected) {
    selectedCities.value.push(city.id)
  }
  updateCitySelection();
}

// выбор города с чекбокса  ИСПРАВЛЕНО
function toggleCitySelection(city) {
  if (!selectedRegionIds.value.some(regionId => regionId === selectedRegion.value.id)) {

    if (selectedCities.value.find(selectedCity => selectedCity === city.id)) {
      selectedCities.value = selectedCities.value.filter(selectedCity => selectedCity !== city.id);
    } else if(selectedCities.value.length < props.maxSelected && props.maxSelected) {
      selectedCities.value.push(city.id);
    } else if (!selectedCities.value.includes(city.id)) {
      selectedCities.value.push(city.id);
    }
    selectedRegion.value.selected = cities.value.length > 0 && cities.value.every(city => city.selected);
  } else {
    selectedRegion.value.cities.forEach(regionCity => {
      // Добавляем все города региона, кроме того, с которого сняли выбор
      if (regionCity.id !== city.id) {
        const alreadySelected = selectedCities.value.some(selectedCity => selectedCity === regionCity.id);
        if (!alreadySelected) {
          selectedCities.value.push(regionCity.id);
        }
      }
    });

    // Убираем регион из selectedCities
    selectedRegionIds.value = selectedRegionIds.value.filter(selectedRegionId => selectedRegionId !== selectedRegion.value.id);
  }

  console.log(locationTypes.value)
  // добавление региона
  if(selectedRegion.value.cities.every(city => city.selected) && locationTypes.value.selectRegions) {
    console.log(1)
    selectedRegionIds.value.push(selectedRegion.value.id);
    selectedCities.value = selectedCities.value.filter(selectedCity => {
      return !selectedRegion.value.cities.some(city => city.id === selectedCity)
    });

  } else {
    selectedCities.value = selectedCities.value.filter(selectedCity => selectedCity !== selectedRegion.value.id);
  }
  
}

// отправка родителю выбранных городов
function handleSubmit () {
  emit('update:modelValue', {countries: selectedCountryIds.value, regions: selectedRegionIds.value, cities: selectedCities.value});
  confirm();
}

// обновление выбранных городов
function updateCitySelection() {
  if(locations.value && !locations.value.country) return // из за ошибки добавил проверку, надо будет проверить везде
  locations.value.country.forEach(country => {
    if(locationTypes.value.selectCountry) {
      country.selected = selectedCountryIds.value.some(selectedCountryId => selectedCountryId == country.id);
    } else {
      country.selected = country.regions.every(region => region.selected);
    }
    country.regions.forEach(region => {
      region.selected = selectedRegionIds.value.some(selectedRegionId => selectedRegionId == region.id);
      if(country.selected) {
        region.selected = true;
      } else if(region.selected) {
        region.cities.forEach(city => {
          city.selected = true;
        })
      } else {
        region.cities.forEach(city => {
          city.selected = selectedCities.value.some(selectedCity => selectedCity == city.id);
        })
      }
    })
  })
}

// закрытие модального окна
function confirm() {
  settingStore.chooseLocationModal = false;
}

// навигация по уровням
function goBack() {
  if (activeLevel.value === 'city') {
    activeLevel.value = 'region';
    selectedCity.value = null;
    selectedRegion.value = null;
  } else if (activeLevel.value === 'region') {
    activeLevel.value = 'country';
    cities.value = [];
  } else if (activeLevel.value === 'country') {
    selectedCountry.value = null;
    regions.value = [];
  }
}

function selectCountry(country, regionClear = true) {
  selectedCountry.value = country;
  selectedRegion.value = null;
  regions.value = country.regions;
  cities.value = []; 
  activeLevel.value = 'region';
  locationStore.selectedCountry = country;
  if(regionClear) {
    locationStore.selectedRegion = null;
  }
}

function selectRegion(region) {
  selectedRegion.value = region;
  cities.value = region.cities;
  activeLevel.value = 'city'
  locationStore.selectedRegion = region;
}



// выбор всех городов в регионе
function selectAllCities(region) {
  // Проверяем, выбраны ли все регионы
  const allRegionsSelected = selectedCountry.value.regions.every(region => region.selected);

  if(!locationTypes.value.selectCountry && allRegionsSelected) {
    selectedCountry.value.selected = true;
  }

  // 1. Если все регионы выбраны, добавляем страну и удаляем регионы
  if (allRegionsSelected && locationTypes.value.selectCountry) {
    selectedCountry.value.selected = true;
    selectedCountryIds.value.push(selectedCountry.value.id);

    // Убираем регионы из selectedCities
    selectedCountry.value.regions.forEach(region => {
      selectedRegionIds.value = selectedRegionIds.value.filter(selectedRegionId => selectedRegionId !== region.id);
    });

  } else {
    // 2. Если страна выбрана, но регион убирается
    if (!region.selected && selectedCountry.value.selected) {
      selectedCountry.value.selected = false;

      // Добавляем все регионы, кроме убранного
      selectedCountry.value.regions.forEach(countryRegion => {
        if (countryRegion.id !== region.id && !selectedRegionIds.value.some(selectedRegionId => selectedRegionId === countryRegion.id)) {
          countryRegion.selected = true;
          selectedRegionIds.value.push(countryRegion.id);
        }
      });

      // Удаляем страну из selectedCities, так как один регион убран
      selectedCountryIds.value = selectedCountryIds.value.filter(selectedCountryId => selectedCountryId !== selectedCountry.value.id);
    }
    // 3. Если регион выбран, добавляем его и все города
    if (region.selected) {
      selectedRegionIds.value.push(region.id);

      // Устанавливаем все города как выбранные
      region.cities.forEach(city => {
        city.selected = true;
      });
      selectedCities.value = selectedCities.value.filter(selectedCity => !region.cities.some(regionCity => regionCity.id === selectedCity));
    } else {
      // 4. Если регион убирается, удаляем его и все города
      selectedRegionIds.value = selectedRegionIds.value.filter(selectedRegionId => selectedRegionId !== region.id);

      // Убираем выбранные города региона
      region.cities.forEach(city => {
        city.selected = false;
        selectedCities.value = selectedCities.value.filter(selectedCity => selectedCity !== city.id);
      });
    }
  }


}
function selectAllRegions(country) {
  // если страна выбрана
  if (country.selected) {
    // добавляем страну если есть пропс с выбором стран
    if(locationTypes.value.selectCountry) {
      selectedCountryIds.value.push(country.id)
    }

    // если страна выбрана удаляем регионы из массива и прописываем селектед для их отображения в списке
    country.regions.forEach(region => {
      region.selected = true;
      selectedRegionIds.value = selectedRegionIds.value.filter(selectedRegionId => selectedRegionId !== region.id);

      // если нет пропса с выбором регионов, добавляем регионы в массив
      if(!locationTypes.value.selectCountry) {
        selectedRegionIds.value.push(region.id);
      }
      region.cities.forEach(city => {
        city.selected = true;
      })
    });
  } else {
    // если страна не выбрана удаляем страну из массива
    selectedCountryIds.value = selectedCountryIds.value.filter(selectCountryId => selectCountryId !== country.id);
    country.regions.forEach(region => {
      region.selected = false;

      // если нет пропса с выбором стран, удаляем регионы из массив
      if(!locationTypes.value.selectCountry) {
        selectedRegionIds.value = selectedRegionIds.value.filter(selectedRegionIds => selectedRegionIds !== region.id);
      }
      region.cities.forEach(city => {
        city.selected = false;
      })
    });
  }
}


// добавление неопределенного состояния чекбоксу региона
function updateRegionIndeterminate(region) {
  const checkedCities = region.cities.filter(city => city.selected);

  if (checkedCities.length > 0 && checkedCities.length < region.cities.length) {
    return true;
  } 

  return false;
}

// добавление неопределенного состояния чекбоксу Стране
function updateCountryIndeterminate(country) {
  const checkedRegions = country.regions.filter(region => region.selected);
  const regionIndeterminate = country.regions.filter(region =>{
    if(!region.selected) {
     return region.cities.some(city => city.selected)
    }
  });

  if (checkedRegions.length > 0 && checkedRegions.length < country.regions.length) {
    return true;
  }

  if(regionIndeterminate.length > 0 ) {
    return true
  }

  return false;
}

// отслеживание состояния выбранных городов в родителе
watch(() => props.modelValue, (newVal, oldVal) => {

  if (newVal) {
    selectedCountryIds.value = [...newVal.countries];
    selectedRegionIds.value = [...newVal.regions];
    selectedCities.value = [...newVal.cities];
    updateCitySelection();
  } 
}, {deep: true})

// выставление значений из стора 

// watch(() => settingStore.chooseLocationModal, (newVal) => {
//   if(newVal === true) {
//     if(locationStore.selectedCountry){
//       selectCountry(locationStore.selectedCountry, false);
//       if(locationStore.selectedRegion) {
//         selectRegion(locationStore.selectedRegion);
//       }
//     }
//   }
// });

watch(() => props.modelValue, (newValue) => {
  if (!newValue) return;
  
  const { cities = [], regions = [], countries = [] } = props.modelValue;

  if(cities.length > 0) {
    cities.forEach(city => {
      selectedCities.value.push(city);
    });
  }

  if(regions.length > 0) {
    regions.forEach(region => {
      selectedRegionIds.value.push(region);
    })
  }

  if(countries.length > 0) {
    countries.forEach(country => {
      selectedCountryIds.value.push(country);
    })
  }
  if(selectedCountryIds.value.length > 0 || selectedRegionIds.value.length > 0 || selectedCities.value.length > 0) {
    
  }
}, { immediate: true, once: true });


function searchRegionAndCountry(cityId, regionId) {
  if(cityId) {
    locations.value.country.forEach(country => {
      country.regions.forEach(region => {
        if(region.cities.some(city => city.id === cityId)) {
          selectCountry(country);
          selectRegion(region);
        }
      })
    })
  } else if(regionId) {
    locations.value.country.forEach(country => {
      if(country.regions.some(region => region.id === regionId)) {
        selectCountry(country);
      }
    })
  }
}

onMounted(() => {
  locationStore.getLocations()
  .then(res => {
    locations.value = locationStore.locations
    updateCitySelection();
    if(selectedRegionIds.value.length > 0) {
      searchRegionAndCountry(null, selectedRegionIds.value[0]);
    } else if(selectedCities.value.length > 0) {
      searchRegionAndCountry(selectedCities.value[0]);
    }
  })
  .catch(err => console.log(err));
})

</script>

<style lang="scss" >

.choose-city-modal {
  

  .modal-content {
    // max-width: 82.5em;
    width: 100%;
  }

  .modal-content {
    max-height: 80em;
    min-height: 60em;
    height: 100%;
    // padding-bottom: 6em;
    // overflow: hidden;
    display: flex;
    flex-direction: column;
  }

  .modal-header {
    background-color: var(--bg-tertiary-color);
    padding: 3em 6em;
  }

  .modal-content-header {
    background-color: var(--bg-tertiary-color);
  }

  .modal-body {
    // margin-bottom: 7em;
    height: 100%;
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  &__search {
    font-size: 1.6em;

    @include mobile {
      font-size: 1em;
    }
  }
}

.popular-cities {
  margin-block: 2em 0;

  &__title {
    font-size: 1.2em;
    text-transform: uppercase;
    color: var(--text-color-decimal);
    margin-bottom: .5em;
  }

  &__list {
    display: flex;
    flex-wrap: wrap;
    font-size: 1.2em;
  }

  &__item {
    flex: 0 0 33%;
    text-align: left;
    font-size: 1.2em;
    line-height: 1.5em;
  }

}

.choose-city {
  display: flex;
  column-gap: 6.3em;
  padding: 3em 6em;
  overflow-y: auto;
  height: 48em;
  flex-grow: 1;

  &__title {
    font-size: 1.4em;
    color: var(--text-color-decimal);
    text-transform: uppercase;
    margin-bottom: 1.43em;
  }

  &__list {
    display: flex;
    flex-direction: column;
    row-gap: 1.6em;
    height: 100%;
    max-height: 47em;
    overflow-y: auto;

    /* Стили для скроллбара */
    &::-webkit-scrollbar {
      width: 7px;
      /* Ширина вертикального скроллбара */
    }

    &::-webkit-scrollbar-thumb {
      background-color: #888;
      /* Цвет ползунка */
      border-radius: 5px;
      /* Радиус скругления ползунка */
    }

    &::-webkit-scrollbar-track {
      background-color: inherit;
      /* Цвет трека (фона) */
      border-radius: 5px;
      /* Радиус скругления трека */
    }

  }

  &__item {
    font-size: 1.6em;

    button {
      text-align: left;
    }
  }

  .choose-city__container {
    display: flex;
    flex-direction: column;
    flex: 1;
    min-width: 15.2em;

    &:nth-child(2) {
      flex: 1;
    }

    &:not(:last-child) {
      border-right: 2px solid #dcdce4;
      padding-right: 1.5em;
    }
  }

  .selected {
    button {
      color: var(--text-color-ternary);
    }
  }

}

.choose-city__back-btn {
  display: flex;
  align-items: center;
  margin: 0 auto;
  visibility: hidden;

  svg {
    rotate: 90deg;
  }
}

.choose-city__back-btn_type_visible {
  visibility: visible;
}

.choose-city__back-btn {
  background-color: var(--button-background-primary);
  color: var(--text-color-octonary);
  display: flex;
  align-items: center;
  column-gap: 0.416em;
  text-transform: uppercase;
  font-size: 1.2em;
  padding: 0.75em;
  border-radius: 300px;
  width: calc(100% - 6.5em);
  justify-content: center;
  // margin-inline: 19.5px;
  flex-basis: auto;
  display: none;


  &:hover {
    color: var(--text-color-octonary);
  }

  svg {
    path {
      fill: #fff;
    }
  }
}

@include tablet {
  .choose-city__list {
    max-height: none;
  }

  .choose-city {
    // max-height: 50em;
  }
}

@include mobile {
  
  .choose-city-modal .modal-content {
    padding-bottom: 0;
    max-height: 70em;
  }

  .modal-title {
    font-size: 1.6em;
  }

  .choose-city-modal {
    font-size: 1em;
  }

  .choose-city-modal .modal-content {
    width: calc(100% - 3em);
    max-height: 70em;
  }

  .choose-city-modal .modal-header {
    padding: 1em 2em;
  }

  .choose-city {
    padding: 1em 2em;
  }

  .choose-city__back-btn {
    display: flex;
  }

  .popular-cities__title {
    font-size: 1.2em;
    margin-bottom: .5em;
  }

  .popular-cities__item {
    font-size: 1.16em;
    text-wrap: nowrap;
    flex: 0 0 50%;
  }

  .choose-city {
    .choose-city__list {
      max-height: 38em;
      height: 100%;
    }

    .choose-city__title {
      font-size: 1.4em;
    }

    .choose-city__item {
      font-size: 1.6em;
    }

    .choose-city__container {
      display: none;
    }

    .choose-city__item_type_selected {
      display: flex;
      padding: 0 !important;
      border: none !important;
      flex: 1;
    }
  }
}

.choose-city__count {
  margin-top: 2em;
}

.choose-city__count-value {
  font-size: 1.6em;
}

.choose-city-modal-register .choose-city {
  height: 40em;
  // max-height: 48em;
  flex-grow: 1;
}

.choose-city__btn-container {
  padding: 3em 6em;
  background-color: var(--bg-primary-color);
}

.choose-city__btn {
  width: 33%;
  margin-left: auto;
  justify-content: center;
  column-gap: 1em;
  font-size: 1.2em;
  text-transform: uppercase;

  @include mobile {
    width: 100%;
    padding: 9px;
  }
}

.choose-city__checkbox {
  label {
    font-size: 1em;
  }
}

.choose-city__item {
  display: flex;
}


</style>