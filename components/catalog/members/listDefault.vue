<template>
  <div class="members__list">
    <div class="members__item members__item_type_grid" v-for="(member, index) in data" :key="index">
      <CardsPublic :is-props-visible="true" :is-description="true" :isList="true" :data="member"/>
    </div>
  </div>
</template>

<script setup>

const props = defineProps({
  data: {
    type: Array,
    required: true,
  }
})

</script>

<style lang="scss">

.members__list {
  .members__item_type_grid {
    max-width: 48%;
    display: flex;
    flex-direction: column;
  }
}

</style>