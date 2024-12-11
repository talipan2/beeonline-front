<template>
  <div>
  <RegisterLayout :title="title" :block-title="blockTitle">
    <div class="register__step-three">
      <div class="register__text-container">
        <p class="register__text" v-if="userStore.role === 'performer'">
          Укажите город вашего производства. Если производств несколько - выберите несколько городов, но не более пяти.
        </p>
        <p class="register__text" v-else>
          Укажите предпочтительные города или регионы производства заказа.
        </p>
        <p class="register__text" v-if="userStore.role === 'performer'">
          Указанные города используются для автоматического добавления в новые услуги и позволят потенциальным заказчикам находить их в поиске по регионам.
        </p>
        <p class="register__text" v-else>
          Указанные города и регионы используются для автоматического добавления в новые заказы и позволят потенциальным исполнителям находить их в поиске.
        </p>
      </div>
      <CommonLocation buttonLabel="Выбрать город или регион" v-model="selectedCities" class="register__location"/>
      <div class="register__btn-container" v-if="router.currentRoute.value.path.includes('/register')">
        <UiButton type="button" class="register__btn" variant="senary" size="large" @click="router.back">Назад</UiButton>
        <UiButton type="button" class="register__btn" variant="quinary" size="large" @click="router.push({path: '/register/step4'})">Далее
          <SvgoBtnArrow class="svg-lx" />
        </UiButton>
      </div>
    </div>
  </RegisterLayout>
  </div>
</template>

<script setup>

import { useOrganizationStore } from '~/store/organizationStore';
import { useUserStore } from '~/store/userStore';

const props = defineProps({
  blockTitle: {
    type: String,
    default: 'Регистрация исполнителя',
  },
  title: {
    type: String,
    default: 'Города фактического производства *',
  },
})


const router = useRouter();
const organizationStore = useOrganizationStore();
const userStore = useUserStore();
const selectedCities = ref([]);

watch(() => selectedCities.value, (newVal) => {
  organizationStore.registerOrg.selectedProductionCountries = newVal.fullNameLocation;
  organizationStore.registerOrg.locationId = newVal.locationId;
});


</script>

<style lang="scss">

.register__step-three {
  .register__text{
    margin-bottom: 0;
    font-size: 1.3em;
  }

  .register__text-container {
    margin-bottom: 3em;
  }

  .register__btn {
    font-size: 1.2em;
    line-height: 1em;
  }
  .register__preview-title {
    margin-top: 1em;
  }
}

.register__preview-title {
  margin-top: 1em;
}

@include small-mobile {
  .register__location {
    .location__btn {
      width: 100%;
      max-width: none;
    }
  }
}



</style>