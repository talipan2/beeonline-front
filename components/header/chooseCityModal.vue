<template>
  <UiModal v-model="isOpenModal" title="Выберите город" @confirm="() => confirm()" class="choose-city-modal modal">
    <template #header>
      <UiInput :placeholder="'Поиск города'">
        <SvgoSearchIcon class="svg-m" />
      </UiInput>
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
            <li class="choose-city__item " v-for="country in countries"
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

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
});

const isOpenModal = ref(props.modelValue);
const regions = ref([]);
const cities = ref([]);
const selectedCountry = ref(null);
const selectedRegion = ref(null);
const selectedCity = ref(null);
const activeLevel = ref('country');


const emit = defineEmits(['update:modelValue']);

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
  console.log(country.id)
  regions.value = regionsData[country.id]; 
  cities.value = []; 
  activeLevel.value = 'region';
}

function selectRegion(region) {
  selectedRegion.value = region;
  cities.value = citiesData[region.id];
  activeLevel.value = 'city'
}

function selectCity(city) {
  selectedCity.value = city;
}

watch(() => props.modelValue, (newVal) => {
  isOpenModal.value = newVal;
});

watch(isOpenModal, (newVal) => {
  isOpenModal.value = newVal;
  emit('update:modelValue', newVal);
});




</script>

<style lang="scss" >
.choose-city-modal {
  .modal-dialog {
    max-width: 82.5rem;
    width: 100%;
  }

  .modal-content {
    max-height: 80rem;
    min-height: 60rem;
    height: 100%;
    padding-bottom: 6rem;
    overflow: hidden;
  }

  .modal-header {
    background-color: var(--bg-tertiary-color);
    padding: 3rem 6rem;
  }

  .modal-content-header {
    background-color: var(--bg-tertiary-color);
  }

  .modal-body {
    margin-bottom: 7rem;
  }
}

.popular-cities {
  margin-block: 2rem 0;

  &__title {
    font-size: 1.2rem;
    text-transform: uppercase;
    color: var(--text-color-decimal);
    margin-bottom: .6rem;
  }

  &__list {
    display: flex;
    flex-wrap: wrap;
    font-size: 1.4rem;
  }

  &__item {
    flex: 0 0 33%;
    text-align: left;
    line-height: 1.5em;
    font-size: 1.4rem;
  }

}

.choose-city {
  display: flex;
  column-gap: 6.3rem;
  padding: 3rem 6rem;
  overflow-y: auto;
  min-height: 50rem;

  &__title {
    font-size: 1.4rem;
    color: var(--text-color-decimal);
    text-transform: uppercase;
    margin-bottom: 2rem;
  }

  &__list {
    display: flex;
    flex-direction: column;
    row-gap: 1.6rem;
    height: 100%;
    max-height: 47rem;
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
    font-size: 1.6rem;
  }

  .choose-city__container {
    display: flex;
    flex-direction: column;
    flex: 1;
    min-width: 15.2rem;

    &:nth-child(2) {
      flex: 2;
    }
    
    &:not(:last-child) {
      border-right: 2px solid #dcdce4;
      padding-right: 15px;
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
    column-gap: 5px;
    text-transform: uppercase;
    font-size: 12px;
    padding: 9px;
    border-radius: 300px;
    width: calc(100% - 78px);
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
      max-height: 50rem;
    }
  }

  @include mobile {

    .choose-city-modal .modal-dialog {
      width: calc(100% - 30px);
    }

    .choose-city__back-btn {
      display: flex;
    }

    .popular-cities__title {
      font-size: 14px;
      margin-bottom: 6px;
    }
    
    .popular-cities__item {
      font-size: 14px;
      text-wrap: nowrap;
      flex: 0 0 50%;
    }
    
    .choose-city {
      max-height: 40px;

      .choose-city__list {
      max-height: 190px;
    }



      .choose-city__title {
        font-size: 14px;
      }

      .choose-city__item {
        font-size: 16px;
      }

      .choose-city__container {
        display: none;
      }

      .choose-city__item_type_selected {
        display: flex;
        padding: 0 !important;
        border: none !important;
      }
    }
  }


</style>