<template>
  <a
    v-if="showBanner"
    :href="banner.url || 'javascript:;'"
    :target="(banner.url && banner.open_new_tab) ? '_blank' : '_self'"
  >
    <img
      :src="currentImageUrl"
      :alt="banner.name"
    >
  </a>
</template>

<script setup>
import { useBreakpoints } from '@vueuse/core';

const props = defineProps({
  banner: {
    type: Object,
    default: () => ({}),
  },
});

const breakpoints = useBreakpoints({
  sm: 640,
  md: 768,
  lg: 1024,
});

const isMobile = breakpoints.smaller('sm');
const isTablet = breakpoints.between('md', 'lg');
const isDesktop = breakpoints.greater('lg');

// Получаем URL изображения для текущего размера экрана
const currentImageUrl = computed(() => {
  if (!props.banner?.images) return '';

  // Порядок приоритетов: текущий размер -> меньшие размеры
  if (isMobile.value) {
    return props.banner.images.sm || '';
  }
  if (isTablet.value) {
    return props.banner.images.md || props.banner.images.sm || '';
  }
  // Для десктопа: lg -> md -> sm
  return props.banner.images.lg || props.banner.images.md || props.banner.images.sm || '';
});

const showBanner = computed(() => {
  if (!props.banner || !props.banner.active) return false;

  // Проверяем текущую дату (если заданы date_active_from/date_active_to)
  const now = new Date();
  if (props.banner.date_active_from && new Date(props.banner.date_active_from) > now) return false;
  if (props.banner.date_active_to && new Date(props.banner.date_active_to) < now) return false;

  // Проверяем наличие хотя бы одного изображения (любого размера)
  return !!props.banner.images?.sm || !!props.banner.images?.md || !!props.banner.images?.lg;
});
</script>
