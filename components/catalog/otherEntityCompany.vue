<template>
  <div class="other-entity">
    <h2 class="other-entity__title" v-if="title">{{ title }}</h2>
    <h2 class="other-entity__title" v-else >Другие {{ type === 'order' ? 'заказы' : 'услуги' }} компании</h2>
    <div class="other-entity__container">
      <div class="other-entity__item">
        <NuxtLink class="other-entity__item-title link">Изготовление школьных вязаных жилетов.</NuxtLink>
        <div class="other-entity__item-details">
          <p class="other-entity__item-text">
            Размер партии: до 100
          </p>
          <p class="other-entity__item-text" v-if="type === 'customer'">
            Срок выполнения: до 31/12/2024
          </p>
        </div> 
      </div>
      <div class="other-entity__item">
        <NuxtLink class="other-entity__item-title link">Изготовление школьных вязаных жилетов.</NuxtLink>
        <div class="other-entity__item-details">
          <p class="other-entity__item-text">
            Размер партии: до 100
          </p>
          <p class="other-entity__item-text" v-if="type === 'customer'">
            Срок выполнения: до 31/12/2024
          </p>
        </div> 
      </div>
      <div class="other-entity__item">
        <NuxtLink class="other-entity__item-title link">Изготовление школьных вязаных жилетов.</NuxtLink>
        <div class="other-entity__item-details">
          <p class="other-entity__item-text">
            Размер партии: до 100
          </p>
          <p class="other-entity__item-text" v-if="type === 'customer'">
            Срок выполнения: до 31/12/2024
          </p>
        </div> 
      </div>
    </div>
  </div>
</template>

<script setup>

const props = defineProps({
  type: {
    type: String,
    default: '',
  },
  title: {
    type: String,
    default: '',
  }
})

</script>

<style lang="scss">

.other-entity {
  background-color: var(--bg-secondary-color);
  font-size: 1rem;
  box-shadow: var(--box-shadow-primary);
  padding: 3em;

  &__title {
    font-size: 2em;
    margin-bottom: 1.5em;
  }

  &__item-details {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__item {
    padding-block: 2em;

    &:not(:last-child) {
      border-bottom: 1px solid var(--border-color-secondary);
    }
  }

  &__item-title {
    font-size: 1.6em;
    line-height: 1.1em;
    padding-bottom: 1.2em;
    font-family: 'fira-sans', sans-serif;
  }

  &__item-text {
    font-size: 1.4em;
  }
}

</style>