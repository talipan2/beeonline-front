<template>
  <UiModal v-model="settingStore.chooseLocationModal" title="Выберите город" @confirm="() => confirm()"
    class="choose-city-modal choose-city-modal-register modal">
    <template #header>
      <UiInput :placeholder="'Поиск города'">
        <SvgoSearchIcon class="svg-m" />
      </UiInput>
      <div class="choose-city__count" v-if="userStore.role === 'performer'">
        <p class="choose-city__count-value">Выбрано локаций: {{ selectedCities.length || 0 }}/5</p>
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
              <button @click="selectCountry(country)">{{ country.name }}</button>
            </li>
          </ul>
        </div>
        <div class="choose-city__container" :class="{ 'choose-city__item_type_selected': activeLevel === 'region' }">
          <p class="choose-city__title">Регион</p>
          <ul class="choose-city__list" >
            <li class="choose-city__item" v-for="region in regions"
              :class="{ 'selected': region.id === selectedRegion?.id }" :key="region.id">
              <UiCheckbox ref="regionCheckbox" :indeterminate="updateRegionIndeterminate(region)"
                v-if="userStore.role === 'customer'" class="choose-city__checkbox" variant="square"
                v-model="region.selected" :id="region.id" @change="selectAllCities(region)">
              </UiCheckbox>
              <button @click="selectRegion(region)">{{ region.name }}</button>
              
            </li>
          </ul>
        </div>
        <div class="choose-city__container" :class="{ 'choose-city__item_type_selected': activeLevel === 'city' }">
          <p class="choose-city__title">Город</p>
          <ul class="choose-city__list" v-if="selectedRegion">
            <li class="choose-city__item" v-if="userStore.role === 'customer'">
              <UiCheckbox class="choose-city__checkbox" variant="square" v-model="selectedRegion.selected"
                @change="selectAllCities(selectedRegion)">
                Любой
              </UiCheckbox>
            </li>
            <li class="choose-city__item" v-for="city in cities" :key="city.id">
              <UiCheckbox class="choose-city__checkbox" variant="square" v-model="city.selected" :id="city.id"
                :disabled="!city.selected && selectedCities.length >= 5 && userStore.role === 'performer'"
                @change="toggleCitySelection(city)">
                {{ city.name }}
              </UiCheckbox>
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
import { useOrganizationStore } from '~/store/organizationStore';
import { useSettingStore } from '~/store/settingStore';
import { useUserStore } from '~/store/userStore';
import { useLocationStore } from '~/store/locationStore';

const locationStore = useLocationStore();

const locations = computed(() => locationStore.locations )

const props = defineProps({
  modelValue: {
    type: Array,
    default: [],
  },
});

const organizationStore = useOrganizationStore();
const settingStore = useSettingStore();
const userStore = useUserStore();
const selectedCities = ref([]);

const emit = defineEmits(['update:modelValue']);

const regions = ref([]);
const cities = ref([]);
const selectedCountry = ref(null);
const selectedRegion = ref(null);
const selectedCity = ref(null);
const activeLevel = ref('country');

// выбор города с чекбокса
function toggleCitySelection(city) {
  if (!selectedCities.value.some(selectedCity => selectedCity.id === selectedRegion.value.id)) {

    if (selectedCities.value.find(selectedCity => selectedCity.id === city.id)) {
      selectedCities.value = selectedCities.value.filter(selectedCity => selectedCity.id !== city.id);
    } else if(selectedCities.value.length < 5 && userStore.role === 'performer') {
      selectedCities.value = [...selectedCities.value, { 
        id: city.id, 
        region: selectedRegion.value.name, 
        country: selectedCountry.value.name,
        countryId: selectedCountry.value.id,
        city: city.name,
        selected: false,
      }];
    } else if (userStore.role === 'customer' && !selectedCities.value.includes(city.id)) {
      selectedCities.value = [...selectedCities.value, { 
        id: city.id, 
        region: selectedRegion.value.name, 
        country: selectedCountry.value.name,
        countryId: selectedCountry.value.id,
        city: city.name,
        selected: false,
      }];
    }
    selectedRegion.value.selected = cities.value.length > 0 && cities.value.every(city => city.selected);
  } else {
    selectedRegion.value.cities.forEach(regionCity => {
      // Добавляем все города региона, кроме того, с которого сняли выбор
      if (regionCity.id !== city.id) {
        const alreadySelected = selectedCities.value.some(selectedCity => selectedCity.id === regionCity.id);
        if (!alreadySelected) {
          selectedCities.value.push({
            id: regionCity.id, 
            region: selectedRegion.value.name, 
            country: selectedCountry.value.name,
            countryId: selectedCountry.value.id,
            city: regionCity.name,
            selected: false,
          });
        }
      }
    });

    // Убираем регион из selectedCities
    selectedCities.value = selectedCities.value.filter(selectedCity => selectedCity.id !== selectedRegion.value.id);
  }


  if(selectedRegion.value.cities.every(city => city.selected)) {
    selectedCities.value.push({
     id: selectedRegion.value.id,
     region: selectedRegion.value.name,
     country: selectedCountry.value.name,
     countryId: selectedCountry.value.id,
     selected: true
   })
    selectedCities.value = selectedCities.value.filter(selectedCity => 
      !selectedRegion.value.cities.some(city => city.id === selectedCity.id)
    );
  } else {
    selectedCities.value = selectedCities.value.filter(selectedCity => selectedCity.id !== selectedRegion.value.id);
  }
}

// отправка родителю выбранных городов
function handleSubmit () {
  // organizationStore.registerOrg.countryId = selectedCities.value.map(city => city.id);
  emit('update:modelValue', [...selectedCities.value]);
  settingStore.chooseLocationModal = false;
}

// обновление выбранных городов
function updateCitySelection() {
  locations.value.country.forEach(country => {
    country.regions.forEach(region => {
      region.selected = selectedCities.value.some(selectedCity => selectedCity.id === region.id);
      if(region.selected) {
        region.cities.forEach(city => {
          city.selected = true;
        })
      } else {
        region.cities.forEach(city => {
          city.selected = selectedCities.value.some(selectedCity => selectedCity.id === city.id);
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
  } else if (activeLevel.value === 'region') {
    activeLevel.value = 'country';
    selectedRegion.value = null;
    cities.value = [];
  } else if (activeLevel.value === 'country') {
    selectedCountry.value = null;
    regions.value = [];
  }
}

function selectCountry(country) {
  selectedCountry.value = country;
  selectedRegion.value = null;
  regions.value = country.regions;
  cities.value = []; 
  activeLevel.value = 'region';
  locationStore.selectedCountry = country;
}

function selectRegion(region) {
  selectedRegion.value = region;
  cities.value = region.cities;
  activeLevel.value = 'city'
  locationStore.selectedRegion = region;
}

// выбор всех городов в регионе
function selectAllCities(region) {
 if(region.selected) {
   selectedCities.value.push({
     id: region.id,
     region: region.name,
     country: selectedCountry.value.name,
     countryId: selectedCountry.value.id,
     selected: true
   })
   region.cities.forEach(city => {
     city.selected = true;
   });
 } else {
   selectedCities.value = selectedCities.value.filter(selectedCity => selectedCity.id !== region.id);
   region.cities.forEach(city => {
     city.selected = false;
   });
 }
}

// добавление неопределенного состояния чекбоксу региона
function updateRegionIndeterminate(region) {
  const checkedCities = region.cities.filter(city => city.selected);

  if (checkedCities.length > 0 && checkedCities.length < region.cities.length) {
    region.selected = false;
    return true;
  } 

  return false;
}

// отслеживание состояния выбранных городов в родителе
watch(() => props.modelValue, (newVal) => {
  if (newVal && newVal.length > 0) {
      selectedCities.value = [...newVal]; 
      updateCitySelection();
    } else {
      selectedCities.value = [];
      console.log('Cleared selectedCities');
    }
})

watch(() => settingStore.chooseLocationModal, (newVal) => {
  updateCitySelection();
  if(newVal === true) {
    if(locationStore.selectedCountry){
      selectCountry(locationStore.selectedCountry);
      if(locationStore.selectedRegion) {
        selectRegion(locationStore.selectedRegion);
      }
    }
  }
});

</script>

<style lang="scss" >

.choose-city__count {
  margin-top: 2em;
}

.choose-city__count-value {
  font-size: 1.6em;
}

.choose-city-modal-register .choose-city {
  height: 40em;
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