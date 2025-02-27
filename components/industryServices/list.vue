<template>
  <div class="industry-services-list">
    <template v-for="(item, index) in data" :key="index">
      <IndustryServicesCompanyCard :data="item" />
    </template>
  </div>
</template>

<script setup>

const props = defineProps({
  data: {
    type: Object,
    required: true
  }
})


</script>


<style lang="scss">

.industry-services-list {
  display: flex;
  flex-wrap: wrap;
  gap: 3.2rem;
}

</style>