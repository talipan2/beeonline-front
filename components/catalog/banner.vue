<template>
  <div class="catalog__banner" v-if="items.length > 0">
    <div class="catalog__banner-wrapper">
      <h2 class="catalog__banner-title">{{ title }}</h2>
      <div class="catalog__banner-content">
        <Swiper
          :slidesPerView="1"
          :spaceBetween="32"
          :breakpoints="breakpoints"
          class="catalog__banner-slider"
          :modules="modules"
          :pagination="{ clickable: true, dynamicBullets: true, dynamicMainBullets: 2,  }"
          @slideChange="handleSlideChange"
          @swiper="setSwiperInstance"
        >
          <SwiperSlide v-for="(item, index) in items" :key="item.id || index">
            <slot name="item" :item="item" />
          </SwiperSlide>
        </Swiper>
      </div>
      <div class="catalog__banner-navigation">
        <UiButton
          type="button"
          class="catalog__banner-btn catalog__banner-btn_type_prev"
          variant="secondary"
          @click="slidePrev"
        >
          <SvgoSlideArrow class="svg-l" />
        </UiButton>
        <UiButton
          type="button"
          class="catalog__banner-btn catalog__banner-btn_type_next"
          variant="secondary"
          @click="slideNext"
        >
          <SvgoSlideArrow class="svg-l" />
        </UiButton>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Pagination, Navigation } from 'swiper/modules'

const props = defineProps({
  fetchFunction: {
    type: Function,
    required: true
  },
  title: {
    type: String,
    default: 'Рекомендуем'
  },
  preloadOffset: {
    type: Number,
    default: 3
  }
})

const items = ref([])
const paginationMeta = ref(null)
const isLoading = ref(false)
const swiperInstance = ref(null)
const modules = [Pagination, Navigation]
const breakpoints = ref({
  768: { slidesPerView: 1, spaceBetween: 32 },
  1200: { slidesPerView: 1, spaceBetween: 34 }
})

const setSwiperInstance = (swiper) => {
  swiperInstance.value = swiper
}

const loadData = async () => {
  if (isLoading.value || (paginationMeta.value && paginationMeta.value.current_page >= paginationMeta.value.last_page)) return
  
  isLoading.value = true
  
  try {
    const response = await props.fetchFunction(
      paginationMeta.value ? paginationMeta.value.current_page + 1 : 1
    )
    
    if (!response.data || response.data.length === 0) {
      return
    }
    
    // Сохраняем мета-данные пагинации
    paginationMeta.value = response.meta
    
    // Добавляем новые элементы
    items.value = [...items.value, ...response.data]
  } finally {
    isLoading.value = false
  }
}

const handleSlideChange = () => {
  if (!swiperInstance.value || !paginationMeta.value) return
  
  const currentIndex = swiperInstance.value.activeIndex
  const totalSlides = items.value.length
  const remainingSlides = totalSlides - currentIndex
  
  // Подгружаем данные, когда осталось preloadOffset слайдов
  if (remainingSlides <= props.preloadOffset && 
      paginationMeta.value.current_page < paginationMeta.value.last_page) {
    loadData()
  }
}

const slidePrev = () => {
  if (swiperInstance.value) {
    swiperInstance.value.slidePrev()
  }
}

const slideNext = () => {
  if (swiperInstance.value) {
    swiperInstance.value.slideNext()
  }
}

// Первая загрузка
onMounted(() => {
  loadData()
})
</script>

<style lang="scss">

.catalog__banner {
  font-size: 1rem;
  max-width: 100%;
  box-sizing: border-box;
  margin-bottom: 6em;
  padding: 3em 1.5em;
  background-color: rgba(105, 55, 165, 0.1);
  border-radius: 15px;
  position: relative;

  @include small-mobile {
    padding-inline: 0;
  }

  .catalog__banner-content {
  display: flex;
  flex-wrap: wrap;
  max-width: 100%;
  overflow: hidden;
  margin-inline: 12.5em;
}

  &-title {
    font-size: 3.2em;
    font-weight: 500;
    margin-left: .46em;
    margin-bottom: .93em;
    text-align: center;
  }

  &-slider {
    padding: .5em 1.7em 3em;
    max-width: 100%;
    width: 100%;
    overflow: hidden;
  }


  &-navigation {
    position: absolute;
    top: 50%;
    left: 5.6em;
    right: 5.6em;
    transform: translateY(-50%);
    z-index: 10;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 2em;
  }

  &-btn {
    &_type_prev {
      transform: rotate(180deg);
    }
  }

  .swiper-pagination-bullet {
    background: #000;
    opacity: .2;
    scale: .66;
  }

  .swiper-pagination-bullet-active {
    background: #6937a5;
    opacity: 1;
    scale: 1;
  }

  .swiper-pagination {
    bottom: 0;
    z-index: 0;
  }

  .swiper-slide {
    display: flex;
    flex-direction: column;
    justify-content: stretch;
    height: auto;
  }
}


</style>