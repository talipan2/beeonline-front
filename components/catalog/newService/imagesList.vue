<template>
  <div class="images-list">
    <div class="images-list__container">
      <div 
        class="images-list__item" 
        v-for="(image, index) in visibleImages" 
        :key="image.id"
        :class="{ 'has-more': showMoreOverlay && index === visibleImages.length - 1 }"
      >
        <a :href="image.url" class="images-list__link" data-fancybox="service-gallery" v-if="showFancybox">
          <UiImage class="images-list__item-image" :src="image.url" :alt="image.url" :external="true" />
        </a>
        <UiImage v-else class="images-list__item-image" :src="image.url" :alt="image.url" :external="true" />
        <div v-if="showMoreOverlay && index === visibleImages.length - 1" class="images-list__more-overlay">
          + {{ hiddenImagesCount }}
        </div>
      </div>
    </div>
    
    <UiButton
      type="button" 
      v-if="showMoreButtonVisible"
      class="images-list__show-more"
      @click="showAllImages"
      variant="quinary"
      size="large"
    >
      {{ showAll ? 'Скрыть' : 'Показать все' }}
    </UiButton>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  data: {
    type: Array,
    required: true,
  },
  limit: {
    type: Number,
    default: 4,
  },
  showMore: {
    type: Boolean,
    default: false,
  },
  showFancybox: {
    type: Boolean,
    default: false
  }
})

const showAll = ref(false)

// Вычисляемые свойства
const visibleImages = computed(() => {
  return showAll.value || (props.showMore && showAll.value) 
    ? props.data 
    : props.data.slice(0, props.limit)
})

const showMoreButtonVisible = computed(() => {
  return props.showMore && props.data.length > props.limit
})

const hiddenImagesCount = computed(() => {
  return props.data.length - props.limit
})

const showMoreOverlay = computed(() => {
  return !showAll.value && props.data.length > props.limit
})

// Методы
const showAllImages = () => {
  showAll.value = !showAll.value
}
</script>

<style lang="scss">

.images-list {
  font-size: 1rem;


  &__container {
    display: flex;
    gap: 2em;
    flex-wrap: wrap;
    margin-bottom: 2em;
  }

  &__item {
    flex: 0 1 calc(25% - 1.5em);
    max-width: calc(25% - 1.5em);
    position: relative;
    aspect-ratio: 1 / 1.18;
    border-radius: 8px;
    overflow: hidden;

    &.has-more {
      .images-list__item-image {
        filter: brightness(0.7);
      }
    }
    
    a {
      position: absolute;
      inset: 0;
      overflow: hidden;
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  &__more-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(0, 0, 0, 0.5);
    color: white;
    font-size: 2rem;
    font-weight: bold;
  }

  &__show-more {
    margin-left: auto;
    font-size: 1.2em;
    text-transform: uppercase;
  }

}

</style>