<template>
  <div class="other-entity">
    <h2 class="other-entity__title" v-if="title">{{ title }}</h2>
    <h2 class="other-entity__title" v-else >Другие {{ type === 'customer' ? 'заказы' : 'услуги' }} компании</h2>
    <div class="other-entity__container">
      <template v-if="type === 'customer'">
        <div class="other-entity__item" v-for="(order, index) in data" :key="index">
          <NuxtLink :to="`/orders/${order.id}`" class="other-entity__item-title link">{{ order.name }}</NuxtLink>
          <div class="other-entity__item-details">
            <p class="other-entity__item-text">
              Размер партии: {{ order.batch ? Number(order.batch) : '' }}
            </p>
            <p class="other-entity__item-text" v-if="type === 'customer'">
              Срок выполнения: до {{ order.deadline_at ? formatDate(order.deadline_at, 'DD/MM/YYYY') : '' }}
            </p>
          </div> 
        </div>
      </template>
      <template v-if="type === 'performer'">
        <div class="other-entity__item" v-for="(service, index) in data" :key="index">
          <NuxtLink :to="`/services/${service.id}`" class="other-entity__item-title link">{{ service.name }}</NuxtLink>
          <div class="other-entity__item-details">
            <p class="other-entity__item-text">
              Минимальная партия: {{ service.batches && service.batches.length ? service.batches[0].name : '' }}
            </p>
          </div> 
        </div>
      </template>
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
  },
  data: {
    type: Array,
    default: [],
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