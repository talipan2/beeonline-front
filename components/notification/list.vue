<template>
  <div class="notifications">
    <UiSelect class="notifications__filter" :options="filterOptions" v-model="selectedFilter" />
    <div class="notifications__list">
      <NotificationCard v-for="index in 3" :key="index" />
    </div>
    <CommonPagination />
  </div>
</template>

<script setup>

const router = useRouter()
const selectedFilter = ref(null)

const filterOptions = [
  { id: 1, label: 'Все уведомления', value: 'all' },
  { id: 2, label: 'Системные', value: 'system' },
  { id: 3, label: 'Заказы/услуги', value: 'product' },
  { id: 4, label: 'Сообщения', value: 'message' },
  { id: 5, label: 'Отзывы', value: 'reply' },
  { id: 6, label: 'Сделки', value: 'deal' },
]

watch(() => selectedFilter.value, (newVal) => {
  router.replace({ query: { filter: 1, type: newVal } })
})

onMounted(() => {
  if(router.currentRoute.value.query && router.currentRoute.value.query.type) {
    selectedFilter.value = router.currentRoute.value.query.type
  }
})

</script>

<style lang="scss">

.notifications {
  font-size: 1.6rem;

  &__filter {
    font-size: 1em;
    margin-bottom: 1.875em;
    max-width: 33%;
    
    .select__select {
      color: #667085;
    }
    .select__option {
      color: #667085;
    }
  }
  
  &__list {
    display: flex;
    flex-direction: column;
    row-gap: .625em;
  }
}

</style>