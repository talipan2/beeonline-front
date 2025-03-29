<template>
  <div class="location">
    <div class="location__city-container">
      <div v-for="(location) in formattedLocation" :key="location.id" class="location__location">
        <SvgoChecked class="svg-m location__selected-icon" />
        <p class="location__city-selected">
          {{ location.name }}
        </p>
        <button type="button" class="location__location-delete" @click="deleteLocation(location.id, location.type)">
          <SvgoCancel class="svg-m" />
        </button>
      </div>
    </div>
    <UiButton type="button" class="location__btn" variant="tertiary" size="large"
      @click="openAuthModal">{{ buttonLabel }}</UiButton>
    <RegisterChooseCityModal v-model="selectedCities" :maxSelected="maxSelected" :type="type" :modalTitle="modalTitle"/>
    <Field v-if="isRequired" name="selectedLocations" :rules="{atLeastOneFilled: true}" v-model="selectedCities" hidden :label="errorLabel" >
    </Field>
  </div>
</template>

<script setup>
import { useLocationStore } from '~/store/locationStore';
import { useSettingStore } from '~/store/settingStore';
import { useField } from 'vee-validate';


const props = defineProps({
  buttonLabel: {
    type: String,
    default: 'Выбрать город',
    required: true,
  },
  modelValue: {
    type: Object,
    default: () => ({}),
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
  },
  isRequired: {
    type: Boolean,
    default: false
  },
  errorLabel: {
    type: String,
    default: 'Города производства'
  },
  modalTitle: {
    type: String,
    default: 'Выберите город'
  }
})

const settingStore = useSettingStore();
const locationStore = useLocationStore();


const emit = defineEmits(['update:modelValue','update:errorMessage']);

const selectedCities = ref({
  countries: [],
  regions: [],
  cities: []
});

// получение название локации по id
const formattedLocation = computed(() => locationStore.getLocationsByIds( selectedCities.value.countries, selectedCities.value.regions, selectedCities.value.cities))

function deleteLocation(id, type) {
  if (!selectedCities.value) {
    console.error('selectedCities не инициализирован');
    return;
  }

  switch (type) {
    case 'country':
      selectedCities.value = {
        ...selectedCities.value,
        countries: selectedCities.value.countries.filter(country => country !== id),
      };
      break;
    case 'region':
      selectedCities.value = {
        ...selectedCities.value,
        regions: selectedCities.value.regions.filter(region => region !== id),
      };
      break;
    case 'city':
      selectedCities.value = {
        ...selectedCities.value,
        cities: selectedCities.value.cities.filter(city => city !== id),
      };
      break;
    default:
      console.warn('Неизвестный тип:', type);
  }
}



function openAuthModal () {
  settingStore.chooseLocationModal = true;
}

// watch(() => props.modelValue, async(newVal) => {
//   await nextTick();
//   if(newVal) {
//     if(newVal.cities) {
//       selectedCities.value = {...selectedCities.value, cities: [...(newVal.cities || [])] };
//     }
//     if(newVal.regions) {
//       selectedCities.value = {...selectedCities.value, regions: [...(newVal.regions || [])] };
//     }
//     if(newVal.countries) {
//       selectedCities.value = {...selectedCities.value, countries: [...newVal.countries || []] };
//     }
//   }
// }, {once: true, deep: true})

// watch(() => props.modelValue, (newVal) => {
//   if(newVal && newVal.length === 0) {
//     selectedCities.value = {countries: [], regions: [], cities: []};
//   }
// }, {deep: true})

watch((selectedCities), (newVal) => {
  emit('update:modelValue', {...newVal});
}, {deep: true},)

// onMounted(() => {
//   console.log(props.modelValue)
//   if(props.modelValue) {
//     if(props.modelValue.cities) {
//       selectedCities.value = {...selectedCities.value, cities: [...(props.modelValue.cities || [])] };
//     }
//     if(props.modelValue.regions) {
//       selectedCities.value = {...selectedCities.value, regions: [...(props.modelValue.regions || [])] };
//     }
//     if(props.modelValue.countries) {
//       selectedCities.value = {...selectedCities.value, countries: [...props.modelValue.countries || []] };
//     }
//   }
// })

const stopWatcher = ref(false);

await nextTick();

watchEffect(() => {
  if(props.modelValue && (props.modelValue.cities || props.modelValue.regions || props.modelValue.countries) && !stopWatcher.value) {
    if(props.modelValue.cities) {
      selectedCities.value = {...selectedCities.value, cities: [...(props.modelValue.cities || [])] };
    }
    if(props.modelValue.regions) {
      selectedCities.value = {...selectedCities.value, regions: [...(props.modelValue.regions || [])] };
    }
    if(props.modelValue.countries) {
      selectedCities.value = {...selectedCities.value, countries: [...props.modelValue.countries || []] };
    }

    stopWatcher.value = true;
  }
})


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

@include mobile {
  .location {
    &__location {
      flex: 0 1 100%;
    }

    &__btn {
      max-width: 100%;
    }
  }
}

</style>