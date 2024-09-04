<template>
  <div>
  <RegisterLayout title="Города фактического производства *">
    <div class="register__step-three">
      <div class="register__text-container">
        <p class="register__text">Укажите город вашего производства. Если производств несколько - выберите несколько городов, но не более пяти.</p>
        <p class="register__text">Указанные города используются для автоматического добавления в новые услуги и позволят потенциальным заказчикам находить их в поиске по регионам.</p>
      </div>
      <CommonLocation />
      <div class="register__btn-container">
        <UiButton type="button" class="register__btn" variant="senary" size="large" @click="router.back">Назад</UiButton>
        <UiButton type="button" class="register__btn" variant="quinary" size="large" @click="router.push({path: '/register/step4'})">Далее
          <SvgoBtnArrow class="svg-lx" />
        </UiButton>
      </div>
    </div>
  </RegisterLayout>
    <RegisterChooseCityModal v-model="selectedCities"/>
  </div>
</template>

<script setup>
import { useOrganizationStore } from '~/store/organizationStore';
import { useSettingStore } from '~/store/settingStore';
;
const router = useRouter();
const settingStore = useSettingStore();
const organizationStore = useOrganizationStore();
const selectedCities = ref([]);


function deleteLocation(id) {
  selectedCities.value = selectedCities.value.filter(selectedCity => selectedCity.id !== id);
  organizationStore.registerOrg.countryId = organizationStore.registerOrg.countryId.filter(cityId => cityId !== id);
}

watch(() => selectedCities.value, (newVal) => {
  organizationStore.registerOrg.selectedProductionCountries = newVal;
});

function openAuthModal () {
  settingStore.chooseLocationModal = true;
}

</script>

<style lang="scss">

.register {
  &__step-three {
    .register__text{
      margin-bottom: 0;
    }

    .register__text-container {
      margin-bottom: 3em;
    }

    .register__btn {
      font-size: 1.2em;
      line-height: 1em;
    }
  }
}


</style>