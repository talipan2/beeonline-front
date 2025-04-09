<template>
  <UiModal v-model="isOpenModal" size="lg" title="Выберите город" @confirm="() => confirm()" class="choose-city-modal choose-city-modal-header modal">
    <template #header>
      <CommonLocationSearch :locations="locations" :select-one-city="true" @selectCity="selectCity"/>
      <div class="popular-cities">
        <p class="popular-cities__title">Популярные города</p>
        <div class="popular-cities__list">
          <button class="popular-cities__item">Санкт-Петербург</button>
          <button class="popular-cities__item">Москва</button>
          <button class="popular-cities__item">Новосибирск</button>
          <button class="popular-cities__item">Екатеринбург</button>
          <button class="popular-cities__item">Рим</button>
        </div>
      </div>
    </template>
    <template #content>
      <button class="choose-city__back-btn"  :class="{'choose-city__back-btn_type_visible': activeLevel !== 'country'}" @click="goBack">
        <SvgoDropDownNew class="svg-m" />
        {{ selectedRegion?.name || selectedCountry?.name }}
      </button>
      <div class="choose-city">
        <div class="choose-city__container"
          :class="{ 'choose-city__item_type_selected': activeLevel === 'country' }">
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
          <ul class="choose-city__list" v-if="selectedCountry" >
            <li class="choose-city__item" v-for="region in regions"
              :class="{ 'selected': region.id === selectedRegion?.id }" :key="region.id">
              <button @click="selectRegion(region)">{{ region.name }}</button>
            </li>
          </ul>
        </div>
        <div class="choose-city__container" :class="{ 'choose-city__item_type_selected': activeLevel === 'city' }">
          <p class="choose-city__title">Город</p>
          <ul class="choose-city__list" v-if="selectedRegion">
            <li class="choose-city__item" v-for="city in cities" :class="{ 'selected': city.id === selectedCity?.id }"
              :key="city.id">
              <button @click="selectCity(city)">{{ city.name }}</button>
            </li>
          </ul>
        </div>
      </div>
    </template>
  </UiModal>
</template>

<script setup>
import { useLocationStore } from '~/store/locationStore';
import { useUserStore } from '~/store/userStore';

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  location: {
    type: [String, Number],
    default: null
  }
});


const locationStore = useLocationStore();
const locations = ref([])
const userStore = useUserStore();

const isOpenModal = ref(props.modelValue);
const regions = ref([]);
const cities = ref([]);
const selectedCountry = ref(null);
const selectedRegion = ref(null);
const selectedCity = ref(null);
const activeLevel = ref('country');


const emit = defineEmits(['update:modelValue', 'selectCity']);

function confirm() {
  isOpenModal.value = false;
}

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
}

function selectRegion(region) {
  selectedRegion.value = region;
  cities.value = region.cities;
  activeLevel.value = 'city'
}

function selectCity(city) {
  selectedCity.value = city;
  emit('selectCity', city.name);
  emit('update:modelValue', false);
  userStore.changeUserData(userStore.userData.id, { city_id: city.id })
}

watch(() => props.modelValue, (newVal) => {
  isOpenModal.value = newVal;
});

watch(isOpenModal, (newVal) => {
  isOpenModal.value = newVal;
  selectedCity.value = {... selectedCity.value, id: props.location};
  emit('update:modelValue', newVal);
});

onMounted(() => {
  locationStore.getLocations().then((res) => {
    locations.value = res
  })
})

</script>

<style lang="scss">

.choose-city-modal-header {
  .modal-dialog {
    .modal-content {
      height: max-content;
    }

    .modal-content-lg {
      padding: 0;
    }
  }
}

</style>