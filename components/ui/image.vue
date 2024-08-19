<template>
  <img :src="computedImagePath" :alt="alt" :loading="loading">
</template>

<script setup>

const props = defineProps({
  src: {
    type: String,
    default: '',
  },
  alt: {
    type: String,
    default: '',
  },
  loading: {
    type: String,
    default: 'lazy',
  },

});

const images = import.meta.glob('~/assets/images/**/*.*', { eager: true });


const computedImagePath = computed(() => {
  const image = images[props.src];
  if (image) {
    return image.default;
  } else {
    console.warn(`Image not found: ${props.src}`);
    return '';
  }
});

</script>