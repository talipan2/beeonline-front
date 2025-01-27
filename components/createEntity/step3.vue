<template>
  <div class="entity">
    <h1 class="entity__title">География и Сроки</h1>
    <Form @submit="handleSubmit" v-slot="{ errors }">
      <!-- <div v-if="role == 'customer'">
        <p class="entity__text">Укажите дату до которой заказ будет актуален</p>
        <CommonCalendar v-model="data.completionDate" class="entity__calendar" />
      </div> -->
      <CommonAlerts v-if="errors && errors.selectedLocations" :alert="errors.selectedLocations" />
      <h2 class="entity__subtitle">Города фактического производства заказа</h2>
      <div class="entity__text-container">
        <p class="entity__text" v-if="role === 'performer'">
          Укажите город вашего производства. Если производств несколько - выберите несколько городов, но не более пяти.
        </p>
        <p class="entity__text" v-else>
          Укажите предпочтительные города или регионы производства заказа.
        </p>
        <p class="entity__text" v-if="role === 'performer'">
          Потенциальный заказчик сможет вас найти по регионам указанных городов.
        </p>
        <p class="entity__text" v-else>
          Указанные города и регионы используются для автоматического добавления в новые заказы и позволят потенциальным
          исполнителям находить их в поиске.
        </p>
      </div>
      <CommonLocation 
        v-if="role === 'performer'" 
        buttonLabel="Выбрать город"
        v-model="data.locations" :type="['selectCities']"
        :maxSelected="5"
        :is-required="true"
        errorLabel="Города производства"
      />
      <CommonLocation 
        v-if="role === 'customer'" 
        buttonLabel="Выбрать город или регион"
        v-model="data.locations" 
        :type="['selectCities', 'selectRegions']"
        :is-required="true"
        errorLabel="Города производства"
      />
      <div class="form-group">
        <UiButton type="button"
          @click="router.push(`${role === 'performer' ? '/services/create/step2' : '/orders/create/step2'}`)"
          class="form-group-data form-group-data__btn" variant="tertiary" size="large">Назад</UiButton>
        <UiButton type="submit"
          class="form-group-data form-group-data__btn" variant="quinary" size="large">Далее
          <SvgoBtnArrow class="svg-lx" />
        </UiButton>
      </div>
    </Form>
  </div>
</template>

<script setup>
import { useEntityStore } from '~/store/entityStore';
import { useUserStore } from '~/store/userStore';

const props = defineProps({
  role: {
    type: String,
    default: '',
    required: true,
  },
  data: {
    type: Object,
    default: () => ({}),
    required: true,
  },
  handleSubmit: {
    type: Function,
    default: () => ({}),
    required: true,
  }
})

const router = useRouter();
const userStore = useUserStore();
const entityStore = useEntityStore();

// const role = computed(() => userStore.role);
const dataLocation = computed(() => {
  if(props.role === 'performer') {
    return entityStore.service
  } else return entityStore.order
})

const locationData = ref({
  locationId: dataLocation.value.placeOfProductionId,
  fullNameLocation: dataLocation.value.placeOfProduction,
})

watch(() => locationData.value, (newVal) => {
  dataLocation.value.placeOfProductionId = locationData.value.locationId
  dataLocation.value.placeOfProduction = locationData.value.fullNameLocation
}, {deep: true});


</script>

<style lang="scss">

.entity {

  &__text {
    font-size: 1.3em;
  }

  &__text-container {
    margin-bottom: 1.5em;
  }

  &__calendar {
    margin-top: 2em;
  }

}

</style>