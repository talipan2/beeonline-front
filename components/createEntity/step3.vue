<template>
  <div class="entity">
    <h1 class="entity__title">География и Сроки</h1>
    <div v-if="role === 'customer'">
      <p class="entity__text">Укажите дату до которой заказ будет актуален</p>
      <CommonCalendar v-model="data.completionDate" class="entity__calendar" />
    </div>
    <h2 class="entity__subtitle">Города фактического производства заказа</h2>
    <div class="entity__text-container">
      <p class="entity__text" v-if="userStore.role === 'performer'">
        Укажите город вашего производства. Если производств несколько - выберите несколько городов, но не более пяти.
      </p>
      <p class="entity__text" v-else>
        Укажите предпочтительные города или регионы производства заказа.
      </p>
      <p class="entity__text" v-if="userStore.role === 'performer'">
        Потенциальный заказчик сможет вас найти по регионам указанных городов.
      </p>
      <p class="entity__text" v-else>
        Указанные города и регионы используются для автоматического добавления в новые заказы и позволят потенциальным
        исполнителям находить их в поиске.
      </p>
    </div>
    <CommonLocation :buttonLabel="role === 'performer' ? 'Выбрать город' : 'Выбрать город или регион'"
      v-model="locationData"/>
    <div class="form-group">
      <UiButton type="button"
        @click="router.push(`${role === 'performer' ? '/services/create/step2' : '/orders/create/step2'}`)"
        class="form-group-data form-group-data__btn" variant="tertiary" size="large">Назад</UiButton>
      <UiButton type="button"
        @click="router.push(`${role === 'performer' ? '/services/create/step4' : '/orders/create/step4'}`)"
        class="form-group-data form-group-data__btn" variant="quinary" size="large">Далее
        <SvgoBtnArrow class="svg-lx" />
      </UiButton>
    </div>
  </div>
</template>

<script setup>
import { useEntityStore } from '~/store/entityStore';
import { useUserStore } from '~/store/userStore';

const router = useRouter();
const userStore = useUserStore();
const entityStore = useEntityStore();

const role = computed(() => userStore.role);
const data = computed(() => {
  if(role.value === 'performer') {
    return entityStore.service
  } else return entityStore.order
})

const locationData = ref({
  locationId: data.value.placeOfProductionId,
  fullNameLocation: data.value.placeOfProduction,
})

watch(() => locationData.value, (newVal) => {
  // console.log(locationData.value)
  data.value.placeOfProductionId = locationData.value.locationId
  data.value.placeOfProduction = locationData.value.fullNameLocation
}, {deep: true});

// onMounted(() => {
//   if(data.value) {
//     locationData.value.locationId = data.value.placeOfProductionId
//     locationData.value.fullNameLocation = data.value.placeOfProduction
//   }
// })

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