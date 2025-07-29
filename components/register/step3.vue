<template>
  <div>
  <RegisterLayout :title="title" :block-title="blockTitle">
    <div class="register__step-three">
      <UiForm :submit="handleSubmit" @setError="takeErrorMessage">
        <CommonAlerts v-if="errorMessages && errorMessages.selectedLocations" :alert="errorMessages.selectedLocations" />
      <div class="register__text-container">
        <p class="register__text" v-if="userStore.role === 'performer'">
          Укажите город вашего производства. Если производств несколько - выберите несколько городов, но не более пяти.
        </p>
        <p class="register__text" v-if="userStore.role === 'customer'">
          Укажите предпочтительные регионы производства заказа.
        </p>
        <p class="register__text" v-if="userStore.role === 'performer'">
          Указанные города используются для автоматического добавления в новые услуги и позволят потенциальным заказчикам находить их в поиске по регионам.
        </p>
        <p class="register__text" v-if="userStore.role === 'customer'">
          Указанные регионы используются для автоматического добавления в новые заказы и позволят потенциальным производителям находить их в поиске.
        </p>
      </div>
        <CommonLocation 
          v-if="userStore.role === 'performer'" 
          class="register__location"
          buttonLabel="Выбрать город" 
          v-model="data.locations"
          :type="['selectCities']"
          :max-selected="5"
          :is-required="true" 
          errorLabel="Города производства"
        />
        <CommonLocation 
          v-if="userStore.role === 'customer'"
          class="register__location"
          buttonLabel="Выбрать регион" 
          v-model="data.locations"
          :type="['selectCountry', 'selectRegions']" 
          :is-required="true"
          errorLabel="Регионы производства"
          modalTitle="Выберите регион"
          locationsByPerformers
        />
        <div class="register__btn-container" v-if="router.currentRoute.value.path.includes('/register')">
          <UiButton class="register__btn" variant="senary" size="large" to="/register/step2">Назад</UiButton>
          <UiButton type="submit" class="register__btn" variant="quinary" size="large">Далее
            <SvgoBtnArrow class="svg-lx" />
          </UiButton>
        </div>
        <slot></slot>
      </UiForm>
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
    default: 'Регистрация производителя',
  },
  title: {
    type: String,
    default: () => {
      if(useUserStore().role === 'performer') {
        return 'Города фактического производства *';
      } else if(useUserStore().role === 'customer') {
        return 'Регионы фактического производства *';
      } else {
        return ''
      }
    }
  },
  modelValue: {
    type: Object,
    required: true,
  },
  submitFunc: {
    type: Function,
    default: null,
  }
})

const organizationStore = useOrganizationStore();
const errorMessages = ref([]);

const takeErrorMessage = (error) => {
  if (error) {
    errorMessages.value = error;
  }
}

const data = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit('update:modelValue', value);
  }
});

const emit = defineEmits(['update:modelValue']);

const router = useRouter();
const userStore = useUserStore();

const handleSubmit = (values, form) => {
  if(props.submitFunc) {
    props.submitFunc(values, form);
  } else {
    organizationStore.editPubCards({
      id: userStore.userPubCard.id, 
      cities: data.value.locations.cities.map(item => item.id), 
      regions: data.value.locations.regions.map(item => item.id),
      countries: data.value.locations.countries.map(item => item.id),
      currentStep: 2 
    }, form).then(res => {
      router.push({path: '/register/step4'});
    })
  }
}

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