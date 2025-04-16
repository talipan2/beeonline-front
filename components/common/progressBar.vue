<template>
  <div class="upload-loader">
    <div class="progress-container">
      <div class="progress-bar" :style="{ width: `${progress}%` }"></div>
    </div>
    <div class="progress-percent">{{ progress }}%</div>
  </div>
</template>

<script setup>
const props = defineProps({
  progress: {
    type: Number,
    default: 0,
  },
})

</script>

<style scoped>
.upload-loader {
  font-family: "lato", sans-serif;
  font-size: 1rem;
  display: flex;
  align-items: center;
  gap: 1.2em;
  width: 100%;
}

.progress-container {
  width: 100%;
  height: .8em;
  background-color: #f0f0f0;
  border-radius: 2px;
  overflow: hidden;
  border-radius: 100px;
}

.progress-bar {
  height: 100%;
  background-color: #6937A5;
  transition: width 0.3s ease;
}

.progress-percent {
  font-size: 1.4em;
  font-weight: 600;
  line-height: 1.4em;
  color: #000;
}
</style>