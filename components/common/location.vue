<template>
  <div class="location">
    <div class="location__city-container">
      <div v-for="(city) in selectedCities" :key="city.id" class="location__location">
        <SvgoChecked class="svg-m location__selected-icon" />
        <p class="location__city-selected">
          {{ locationStore.getLocationsByIds([city.id])[0] }}
        </p>
        <button type="button" class="location__location-delete" @click="deleteLocation(city.id)">
          <SvgoCancel class="svg-m" />
        </button>
      </div>
    </div>
    <UiButton type="button" class="location__btn" variant="tertiary" size="large"
      @click="openAuthModal">{{ buttonLabel }}</UiButton>
    <RegisterChooseCityModal v-model="selectedCities" :maxSelected="maxSelected" :type="type"/>
  </div>
</template>

<script setup>
import { useLocationStore } from '~/store/locationStore';
import { useSettingStore } from '~/store/settingStore';


const props = defineProps({
  buttonLabel: {
    type: String,
    default: 'Выбрать город',
    required: true,
  },
  modelValue: {
    type: Object,
    default: () => {},
    required: true,
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
  }
})

const settingStore = useSettingStore();
const locationStore = useLocationStore();

const emit = defineEmits(['update:modelValue']);

const selectedCities = ref(props.modelValue.fullNameLocation);

function deleteLocation(id) {
  selectedCities.value = selectedCities.value.filter(selectedCity => selectedCity.id !== id);
}

function openAuthModal () {
  settingStore.chooseLocationModal = true;
}

watch(() => selectedCities.value, (newVal) => {
  if(selectedCities.value) {
    emit('update:modelValue', {fullNameLocation: newVal, locationId: selectedCities.value.map(city => city.id)});
  } else {
    emit('update:modelValue', {fullNameLocation: [], locationId: []});
  }
});

// onMounted(() => {
//   selectedCities.value = props.modelValue.fullNameLocation
// })

</script> 

<style lang="scss">

.location {
  &__city-container {
    display: flex;
    flex-wrap: wrap;
    gap: 1.5em 3em;
    margin-bottom: 3em;
  }

  &__location {
    flex: 0 1 45%;
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    column-gap: .5em;
  }

  &__selected-icon {
    width: 1.8em;
  }

  &__city-selected {
    font-size: 1.6em;
    line-height: 1em;
    width: 100%;
  }

  &__location-delete {
    line-height: 1em;
  }

  &__btn {
    font-size: 1.2rem;
    line-height: 1em;
    text-transform: uppercase;
    justify-content: center;
    max-width: 47%;
    width: 100%;
    margin-bottom: 2em;
  }
}

</style>