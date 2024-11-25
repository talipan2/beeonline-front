<template>
  <div class="bonus-icon" :class="className">
      <UiImage :src="src" />
  </div>
</template>

<script setup>

const props = defineProps({
  className: {
    type: String,
    default: '',
  },
  src: {
    type: String,
    default: '/assets/images/bonus/achievement.png',
  },
})

</script>

<style lang="scss">

.bonus-icon {
font-size: 1em;
  flex: 0 0 10em;
  width: 10em;
  height: 10em;
  position: relative;
  z-index: 0;
  background-color: #59398b;
  border-radius: 100rem;
  overflow: hidden;
  padding: 1px;
  background-clip: content-box;


  &::after {
      content: "";
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      z-index: 1;
      border-radius: 100rem;
      box-shadow: inset 0 0 0 0.5em #dfd7e7;
  }

  img {
      z-index: 0;
      width: 100%;
      height: 100%;
      position: absolute;
      inset: 0;
      padding: 1px;
      margin: auto;
      object-fit: cover;
      border-radius: 100rem;
  }
}
</style>