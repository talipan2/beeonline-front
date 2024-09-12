<template>
  <section class="create-entity container">
    <div class="create-entity__container">
      <div class="create-entity__left" ref="leftSide">
        <slot  name="left"/>
        <!-- <CommonCheckList class="sticky"  /> -->
      </div>
      <div class="create-entity__content">
        <slot name="content"/> 
      </div>
      <div class="create-entity__right sticky" ref="rightSide">
        <slot name="right"/>
        <!-- <CommonCheckList class="sticky" ref="leftSide" /> -->
      </div>
    </div>
  </section>
</template>

<script setup>

const props = defineProps({

})

</script>

<style lang="scss">

.create-entity {
  padding-block: 10em;

  &__container {
    display: flex;
    column-gap: 10em;
  }

  &__left {
    flex: 0 1 17%;
  }

  &__content {
    flex: 1 1 33%;
  }

  &__right {
    flex: 0 1 33%;
  }
}

</style>

