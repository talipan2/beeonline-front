<template>
  <span>{{ translatedText }}</span>
</template>

<script setup>
  const props = defineProps({
      text: {
          type: String,
          required: true
      }
  });

  const { t } = useTranslate();

  const translatedText = computed(() => t(props.text));
</script> 
