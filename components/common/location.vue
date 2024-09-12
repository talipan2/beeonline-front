<template>
  <div class="location">
    <div class="location__city-container">
      <div v-for="city in modelValue.fullNameLocation" :key="city.id" class="location__location">
        <SvgoChecked class="svg-m location__selected-icon" />
        <p class="location__city-selected">
          {{ city.city ? `${city.city},` : '' }} {{ city.region }}, {{ city.country }}
        </p>
        <button type="button" class="location__location-delete" @click="deleteLocation(city.id)">
          <SvgoCancel class="svg-m" />
        </button>
      </div>
    </div>
    <UiButton type="button" class="location__btn" variant="tertiary" size="large"
      @click="openAuthModal">{{ buttonLabel }}</UiButton>
    <RegisterChooseCityModal v-model="selectedCities"/>
  </div>
</template>

<script setup>
import { useOrganizationStore } from '~/store/organizationStore';
import { useSettingStore } from '~/store/settingStore';


const props = defineProps({
  buttonLabel: {
    type: String,
    default: 'Выбрать город',
    required: true,
  },
  modelValue: {
    type: Object,
    default: {},
    required: true,
  }
})

const organizationStore = useOrganizationStore();
const settingStore = useSettingStore();

const emit = defineEmits(['update:modelValue']);

const selectedCities = ref([]);

function deleteLocation(id) {
  selectedCities.value = selectedCities.value.filter(selectedCity => selectedCity.id !== id);
  // organizationStore.registerOrg.countryId = organizationStore.registerOrg.countryId.filter(cityId => cityId !== id);
}

function openAuthModal () {
  settingStore.chooseLocationModal = true;
}

watch(() => selectedCities.value, (newVal) => {
  // console.log(selectedCities.value)
  organizationStore.registerOrg.selectedProductionCountries = newVal;
  emit('update:modelValue', {fullNameLocation: newVal, locationId: selectedCities.value.map(city => city.id)});
});

onMounted(() => {
  selectedCities.value = props.modelValue.fullNameLocation
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

</style>