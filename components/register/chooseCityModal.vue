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
            <li class="choose-city__item " v-for="country in countries"
              :class="{ 'selected': country.id === selectedCountry?.id }" :key="country.id">
              <button @click="selectCountry(country)">{{ country.name }}</button>
            </li>
          </ul>
        </div>
        <div class="choose-city__container" :class="{ 'choose-city__item_type_selected': activeLevel === 'region' }">
          <p class="choose-city__title">Регион</p>
          <ul class="choose-city__list" v-if="selectedCountry">
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

const countries = ref([
  { id: '1', name: 'Россия' },
  { id: '2', name: 'Италия' },
  { id: '3', name: 'Германия' },
]);

const regionsData = {
  '1': [
    { id: '11', name: 'Московская область' },
    { id: '12', name: 'Ленинградская область' }
  ],
  '2': [
    { id: '21', name: 'Лацио' },
    { id: '22', name: 'Тоскана' },
    { id: '21', name: 'Лацио' },
    { id: '22', name: 'Тоскана' },
    { id: '21', name: 'Лацио' },
    { id: '22', name: 'Тоскана' },
    { id: '21', name: 'Лацио' },
    { id: '22', name: 'Тоскана' },
    { id: '21', name: 'Лацио' },
    { id: '22', name: 'Тоскана' },
    { id: '21', name: 'Лацио' },
    { id: '22', name: 'Тоскана' },
    { id: '21', name: 'Лацио' },
    { id: '22', name: 'Тоскана' },
    { id: '21', name: 'Лацио' },
    { id: '22', name: 'Тоскана' },
    { id: '21', name: 'Лацио' },
    { id: '22', name: 'Тоскана' },
    { id: '21', name: 'Лацио' },
    { id: '22', name: 'Тоскана' },
    { id: '21', name: 'Лацио' },
    { id: '22', name: 'Тоскана' },
    { id: '21', name: 'Лацио' },
    { id: '22', name: 'Тоскана' },
    { id: '21', name: 'Лацио' },
    { id: '22', name: 'Тоскана' },
    { id: '21', name: 'Лацио' },
    { id: '22', name: 'Тоскана' },
    { id: '21', name: 'Лацио' },
    { id: '22', name: 'Тоскана' },
    { id: '21', name: 'Лацио' },
    { id: '22', name: 'Тоскана' },
  ],
  '3': [
    { id: '31', name: 'Бавария' },
    { id: '32', name: 'Берлин' }
  ]
};

const citiesData = {
  '11': [
    { id: '111', name: 'Москва' },
    { id: '112', name: 'Подольск' },
    { id: '113', name: 'Москва' },
    { id: '114', name: 'Подольск' },
    { id: '115', name: 'Москва' },
    { id: '116', name: 'Подольск' },
    { id: '117', name: 'Москва' },
    { id: '118', name: 'Подольск' },
    { id: '119', name: 'Москва' },
    { id: '1191', name: 'Подольск' },
    { id: '1192', name: 'Москва' },
    { id: '1193', name: 'Подольск' },
    { id: '1194', name: 'Москва' },
    { id: '1195', name: 'Подольск' }
  ],
  '12': [
    { id: '121', name: 'Санкт-Петербург' },
    { id: '122', name: 'Выборг' }
  ],
  '21': [
    { id: '211', name: 'Рим' },
    { id: '212', name: 'Витербо' }
  ],
  '22': [
    { id: '221', name: 'Флоренция' },
    { id: '222', name: 'Пиза' }
  ],
  '31': [
    { id: '311', name: 'Мюнхен' },
    { id: '312', name: 'Нюрнберг' }
  ],
  '32': [
    { id: '321', name: 'Берлин' }
  ]
};

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
}

// отправка родителю выбранных городов
function handleSubmit () {
  organizationStore.registerOrg.countryId = selectedCities.value.map(city => city.id);
  emit('update:modelValue', [...selectedCities.value]);
  settingStore.chooseLocationModal = false;
}

// обновление выбранных городов
function updateCitySelection() {
  for (const regionId in citiesData) {
    if (citiesData.hasOwnProperty(regionId)) {
      const regionCities = citiesData[regionId];
      const selectedCitiesInRegion = selectedCities.value.filter(selectedCity => 
        regionCities.some(city => city.id === selectedCity.id)
      );

      // Обновляем статус выбранности для каждого города
      regionCities.forEach(city => {
        city.selected = selectedCities.value.some(selectedCity => selectedCity.id === city.id);
      });

      // Обновляем статус выбранности региона
      const region = regionsData[regionId.charAt(0)].find(region => region.id === regionId);
      if (region) {
        // Проверка, выбраны ли все города региона
        const allCitiesSelected = regionCities.length > 0 && selectedCitiesInRegion.length === regionCities.length;
        region.selected = allCitiesSelected;
      }
    }
  }
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
  regions.value = regionsData[country.id]; 
  cities.value = []; 
  activeLevel.value = 'region';
}

function selectRegion(region) {
  selectedRegion.value = region;
  cities.value = citiesData[region.id];
  activeLevel.value = 'city'
}

// выбор всех городов в регионе
function selectAllCities(region) {
  console.log(region)
  if (region.selected) {
    selectRegion(region);
    cities.value.forEach((city) => {
      if (!selectedCities.value.some(selectedCity => selectedCity.id === city.id)) {
        selectedCities.value.push({
          id: city.id,
          region: selectedRegion.value.name,
          country: selectedCountry.value.name,
          countryId: selectedCountry.value.id,
          city: city.name,
          selected: true,
        });
      }
    });
  } else {
    selectedCities.value = selectedCities.value.filter(selectedCity => {
      return !cities.value.some(city => city.id === selectedCity.id);
    });
  }

  cities.value.forEach(city => {
    city.selected = selectedCities.value.some(selectedCity => selectedCity.id === city.id);
  });
}

// добавление неопределенного состояния чекбоксу региона
function updateRegionIndeterminate(region) {
  const selectedRegion = citiesData[region.id];
  const checkedCities = selectedRegion.filter(city => city.selected);

  if (checkedCities.length > 0 && checkedCities.length < selectedRegion.length) {
    region.selected = false;
    return true;
  } 

  return false;
}

// отслеживание состояния выбранных городов в родителе
watch(() => props.modelValue, (newVal) => {
  selectedCities.value = selectedCities.value.filter(selectedCity => {
    return newVal.some(city => city.id === selectedCity.id);
  });
  updateCitySelection();
})

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