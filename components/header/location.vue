<template>
    <UiNewDropdown placement="bottom-start" trigger="manual" ref="tippy">
      <button class="header__location" @click="isOpen = true">
        <SvgoMapPin class="svg-m" filled />
        <span class="header__location-value">
          {{ location ? location : 'Город не задан' }}
        </span>
      </button>
      <template #content>
        <div class="confirmation-city">
          <p class="confirmation-city__title">Это ваш город?</p>
          <div class="confirmation-city__container">
            <UiButton type="button" class="confirmation-city__btn" variant="quinary" size="large" @click="hideConfirmationModal">Да</UiButton>
            <UiButton type="button" class="confirmation-city__btn" variant="tertiary" size="large" @click="hideConfirmationModal">Нет</UiButton>
          </div>
        </div>
      </template>
    </UiNewDropdown>
    <HeaderChooseCityModal v-model="isOpen" :location="locationId" @selectCity="selectCity" />
</template>


<script setup>
import { useUserStore } from '~/store/userStore';


const isOpen = ref(false);
const location = ref(null);
const locationId = ref(null);
const tippy = ref(null);
const userStore = useUserStore();

onMounted(async () => {
  await nextTick(); // Дожидаемся, пока компонент полностью инициализируется
  if (tippy.value) {
    // showConfirmationModal()
  } else {
    console.error('Tippy instance is not available');
  }

    userStore.getCityByIp().then((res) => {
        console.log(res);
    });
});

function showConfirmationModal() {
  tippy.value.tippy.show();
};

function hideConfirmationModal() {
  tippy.value.tippy.hide();
};

function selectCity(city) {
  location.value = city
}

onMounted(() => {
  location.value = userStore.userData.city ? userStore.userData.city.name : ''
  locationId.value = userStore.userData.city ? userStore.userData.city.id : ''
})

watch(() => userStore.userData.city, (newVal) => {
  location.value = newVal ? newVal.name : ''
  locationId.value = newVal ? newVal.id : ''
})

</script>

<style lang="scss">

  .header__location {
    display: flex;
    column-gap: 0.28em;
    align-items: center;
  }

  .header__location-value {
    font-size: 1em;
    font-weight: 500;
    color: var(--text-color-primary);
  }

  @include mobile {
    .header__location-value {
      font-size: 1em;
      color: var(--text-color-octonary);
    }
  }

  .confirmation-city {
    font-size: 1rem;
    padding: 2em;

    &__title {
      font-family: "Inter", sans-serif;
      font-size: 1.7em;
      margin-bottom: 1em;
      color: var(--text-color-primary);
    }

    &__container {
      display: flex;
      column-gap: 1em;
    }

    &__btn {
      flex: 0 1 50%;
      font-size: 1.2em;
    }
  }
</style>
