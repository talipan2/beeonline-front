<template>
  <div class="images-list">
    <div 
      class="images-list__item" 
      v-for="image in visibleImages" 
      :key="image.id"
    >
      <UiImage class="images-list__item-image" :src="image.url" :alt="image.url" :external="true" />
    </div>
    
    <button 
      v-if="showMoreButtonVisible"
      class="images-list__show-more"
      @click="showAllImages"
    >
      Показать еще
    </button>
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
  }
})

const showAll = ref(false)

// Вычисляемые свойства
const visibleImages = computed(() => {
  return showAll.value || !props.showMore 
    ? props.data 
    : props.data.slice(0, props.limit)
})

const showMoreButtonVisible = computed(() => {
  return props.showMore && 
         props.data.length > props.limit && 
         !showAll.value
})

// Методы
const showAllImages = () => {
  showAll.value = true
}
</script>

<style lang="scss">

.images-list {
  font-size: 1rem;
  display: flex;
  gap: 2em;

  &__item {
    flex: 0 1 calc(25% - 1em);
    max-width: calc(25% - 1em);
    position: relative;
    height: 0;
    padding-top: 32%;
    border-radius: 8px;
    overflow: hidden;
    
    img {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

}

</style>