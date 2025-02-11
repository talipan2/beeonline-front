<template>
  <div>
  <RegisterLayout :title="title" :block-title="blockTitle">
    <div class="register__step-three">
      <Form @submit="handleSubmit" v-slot="{ errors }" ref="form">
        <CommonAlerts v-if="errors && errors.selectedLocations" :alert="errors.selectedLocations" />
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
        <CommonLocation 
          v-if="userStore.role === 'performer'" 
          class="register__location"
          buttonLabel="Выбрать город" 
          v-model="data.locations"
          :type="['selectCities']"
          :max-selected="5"
          :is-required="true" 
          errorLabel="Города производства"
          @update:errorMessage="takeErrorMessage"
        />
        <CommonLocation 
          v-if="userStore.role === 'customer'"
          class="register__location"
          buttonLabel="Выбрать город или регион" 
          v-model="data.locations"
          :type="['selectCities', 'selectRegions']" 
          :is-required="true"
          errorLabel="Города производства"
          @update:errorMessage="takeErrorMessage"
        />
        <div class="register__btn-container" v-if="router.currentRoute.value.path.includes('/register')">
          <UiButton type="button" class="register__btn" variant="senary" size="large" @click="router.back">Назад</UiButton>
          <UiButton type="submit" class="register__btn" variant="quinary" size="large">Далее
            <SvgoBtnArrow class="svg-lx" />
          </UiButton>
        </div>
        <slot></slot>
      </Form>
    </div>
  </RegisterLayout>
  </div>
</template>

<script setup>

import { useOrganizationStore } from '~/store/organizationStore';
import { useUserStore } from '~/store/userStore';
import { useForm } from 'vee-validate';

const {meta} = useForm()

const props = defineProps({
  blockTitle: {
    type: String,
    default: 'Регистрация исполнителя',
  },
  title: {
    type: String,
    default: 'Города фактического производства *',
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

const handleSubmit = () => {
  if(props.submitFunc) {
    props.submitFunc();
  } else {
    router.push({path: '/register/step4'});
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