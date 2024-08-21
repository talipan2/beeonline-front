<template>
  <div>
    <button class="header__location" @click="isOpen = true">
      <SvgoMapPin class="svg-m" filled />
      <span class="header__location-value">
        {{location ? location : 'Город не задан'}}
      </span>
    </button>
    <HeaderChooseCityModal v-model="isOpen" :location="location" @selectCity="selectCity"/>
  </div>
</template>


<script setup>

const isOpen = ref(false);
const location = ref(null);

function selectCity(city) {
  location.value = city
}

watch(() => location.value, (newVal) => {
  console.log(newVal)
});

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
</style>