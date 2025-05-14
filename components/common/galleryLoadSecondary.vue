<template>
  <div class="gallery-load-secondary">
    <template v-if="isPreview">
      <div class="gallery-load-secondary__wrapper gallery-load-secondary__wrapper_type_preview">
        <template v-if="localModelValue?.length > 0">
          <div class="gallery-load-secondary__item-container" v-for="element in localModelValue" :key="element.id">
                <div class="gallery-load-secondary__item" :key="element.id">
                  <a :href="element.url" data-fancybox="gallery">
                    <UiImage 
                      :src="element.croppedUrl || element.url" 
                      alt="Фотография" 
                      class="gallery-load-secondary__image" 
                      :external="true"
                    />
                  </a>
              </div>
            </div>
        </template>
        <CommonAlerts v-else alert="Нет загруженных изображений" type="warning" border-radius/>
      </div>
      <div class="gallery-load-secondary__slider-wrapper">
        <template v-if="localModelValue?.length > 0">
          <Swiper
            :slidesPerView="1"
            :spaceBetween="20"
            class="gallery-load-secondary__slider"
            :modules="modules"
            :breakpoints="{
              512: {
                slidesPerView: 1.5,
              }
            }"
            @swiper="setSwiperInstance"
            @slideChange="handleSlideChange"
          >
            <SwiperSlide v-for="(image, index) in localModelValue" :key="index" class="gallery-load-secondary__slide">
              <a :href="image.url" class="" data-fancybox="gallery">
                <img :src="image.url" class="gallery-load-secondary__image" :alt="image" />
              </a>
            </SwiperSlide>
          </Swiper>
          <div class="gallery-load-secondary__slider-navigation" v-if="localModelValue.length > 1" >
              <UiButton
                type="button"
                class="gallery-load-secondary__slider-btn gallery-load-secondary__slider-btn_type_prev"
                variant="secondary"
                @click="slidePrev"
                :disabled="isBeginning"
              >
                <SvgoSlideArrow class="svg-l" />
              </UiButton>
              <UiButton
                type="button"
                class="gallery-load-secondary__slider-btn gallery-load-secondary__slider-btn_type_next"
                variant="secondary"
                @click="slideNext"
                :disabled="isEnd"
              >
                <SvgoSlideArrow class="svg-l" />
              </UiButton>
            </div>
        </template>
        <CommonAlerts v-else alert="Нет загруженных изображений" type="warning" border-radius/>
      </div>
    </template>
    <template v-else>
      <Draggable
        v-model="localModelValue"
        class="gallery-load-secondary__wrapper"
        item-key="id"
        :forceFallback="true"
        :animation="300"
        ghost-class="sortable-ghost"
        chosen-class="sortable-chosen"
        drag-class="sortable-drag"
        :fallbackTolerance="5" 
        :fallbackOnBody="true"
      >
      <template #header>
        <div class="gallery-load-secondary__container">
          <div class="gallery-load-secondary__loader">
            <input type="file" name="logo" accept=".jpeg, .png, .jpg, .gif" @change="onFileChange">
            <div class="gallery-load-secondary__placeholder">
              <SvgoCamera class="svg-lx gallery-load-secondary__camera" fill="#6937a5"/>
              <span class="gallery-load-secondary__title" v-if="label">{{ label }}</span>
              <CommonProgressBar class="gallery-load-secondary__progress" :progress="progress" v-if="progress > 0 && progress < 100"/>
            </div>
          </div>
        </div>
      </template>
        <template #item="{ element }">
          <div class="gallery-load-secondary__item-container">
              <div class="gallery-load-secondary__item gallery-load-secondary__item_type_drag" :key="element.id">
              <UiImage 
                :src="element.croppedUrl || element.url" 
                alt="Фотография" 
                class="gallery-load-secondary__image" 
                :external="true"
              />
              <UiButton class="gallery-load-secondary__btn gallery-load-secondary__btn_type_delete" type="button" variant="default" :without-padding="true" @click="handleDeleteImage(element.id)">
                <SvgoClose class="svg-l"/>
              </UiButton>
              <UiNewDropdown placement="top" :arrow="false" class="gallery-load-secondary__btn gallery-load-secondary__btn_type_setting" :offset="[0, 10]">
                <UiButton class="gallery-load-secondary__tippy-btn" type="button" variant="default" :without-padding="true">
                  <SvgoSetting class="svg-l"/>
                </UiButton>
                <template #content>
                  <div class="gallery-load-secondary__tippy-container">
                    <!-- <UiButton class="gallery-load-secondary__tippy-item" type="button" variant="default" :without-padding="true" @click="handleOpenSettingModal(element.id)">Изменить размер изображения</UiButton> -->
                    <UiButton class="gallery-load-secondary__tippy-item" type="button" variant="default" :without-padding="true" @click="handleMovingForGroup(element)">{{ movingText }}</UiButton>
                  </div>
                </template>
              </UiNewDropdown>
            </div>
          </div>
        </template>
      </Draggable>
    </template>
    
    <!-- <CatalogNewServiceImagesList :data="localModelValue" :show-fancybox="false" /> -->
    <ModalsRoundBorder :is-open="settingModal" title="Выберите область" @close="settingModal = false">
      <div class="gallery-load-secondary__cropper-wrapper">
        <Cropper 
          class="gallery-load-secondary__cropper"
          v-if="imagePreview"
          ref="cropper"
          :src="imagePreview.url" 
          :stencil-component="RectangleStencil" 
          :stencil-props="stencilProps"
          :defaultPosition="{
            left: imagePreview.coordinates?.left || 0,
            top: imagePreview.coordinates?.top || 0,
            width: imagePreview.coordinates?.width || 0,
            height: imagePreview.coordinates?.height || 0
          }"
          :stencil-size="{
            width: 300,
            height: 340
          }"
          :imageRestriction="'fit-area'"
        />
      </div>
      <UiButton class="gallery-load-secondary__btn-resize" type="button" variant="quinary" size="large" @click="handleCrop(imagePreview)">Выбрать область</UiButton>
    </ModalsRoundBorder>
  </div>
</template>

<script setup>
import { useSettingStore } from '~/store/settingStore';
import { useUserStore } from '~/store/userStore';
import { Cropper, RectangleStencil } from 'vue-advanced-cropper';
import 'vue-advanced-cropper/dist/style.css';
import { Navigation } from 'swiper/modules'


const props = defineProps({
  label: {
    type: String,
    default: 'Загрузить фотографию (до 5Мб. Допустимый формат .jpeg, .png, .jpg, .gif)',
  },
  modelValue: {
    type: Array,
    default: () => ([]),
  },
  maxSize: {
    type: Number,
    default: 5,
  },
  isPreview: {
    type: Boolean,
    default: false
  },
  movingText: {
    type: String,
    default: 'Переместить',
  }
})

const localModelValue = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})

const onDragEnd = () => {
  // emit('reorder', localModelValue.value)
}


const stencilProps = {
  aspectRatio: 1 / 1.13,
  resizable: false,
  handlers: {}, 
}

const userStore = useUserStore();
const emit = defineEmits(['update:modelValue', 'movingImage']);
const progress = ref(0);

const settingStore = useSettingStore();
const settingModal = ref(false);
const imagePreview = ref('');
const cropper = ref(null);

const modules = [Navigation];
const swiperInstance = ref(null);

const isBeginning = ref(true);
const isEnd = ref(false);

const handleCrop = (data) => {
  if (cropper.value) {
    const { canvas, coordinates } = cropper.value.getResult();
    canvas.toBlob((blob) => {
      const formData = new FormData();
      formData.append('file', blob, data?.url.split('/').pop());
      console.log(formData.get('file'))

      settingStore.changeFiles(data.id, formData)
      // settingStore.uploadFiles(userStore.userData.id, formData)

      emit('update:modelValue', props.modelValue.map(item => {
        if (item.id === data.id) {
          return { ...item, croppedUrl: URL.createObjectURL(blob), coordinates };
        } else {
          return item;
        }
      }))
    })

    settingModal.value = false
  }
}

const onFileChange = (event) => {
  const file = event.target.files[0]
  
  if (file && file.type.startsWith('image/')) {
    if(file.size < props.maxSize * 1024 * 1024) {
      const formData = new FormData();
      formData.append('file', file);
      const config = {
        onUploadProgress: (progressEvent) => {
          if(progressEvent.lengthComputable) {
            progress.value = Math.round((progressEvent.loaded / progressEvent.total) * 100);
          }
        }
      }
      settingStore.uploadFiles(userStore.userData.id, formData, config)
      .then(res => {
        if(res && res.media_id) {
          emit('update:modelValue', [...props.modelValue, {id: res.media_id, url: res.url}]);
          progress.value = 0;
        } 
      })
    } else {
      toast.error('Файл превышает допустимый размер');
    }
  } else {
    toast.error('Неверный тип файла');
  }
};

const handleDeleteImage = (id) => {
  emit('update:modelValue', props.modelValue.filter(item => item.id !== id));
}

const handleOpenSettingModal = (id) => {
  imagePreview.value = props.modelValue.find(item => item.id === id);
  settingModal.value = true;
}

const handleMovingForGroup = (item) => {
  emit('movingImage', item)
}

const setSwiperInstance = (swiper) => {
  swiperInstance.value = swiper
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


const handleSlideChange = (swiper) => {
  updateNavigationState(swiper);
}

const updateNavigationState = (swiper) => {
  isBeginning.value = swiper.isBeginning;
  isEnd.value = swiper.isEnd;
};

</script>

<style lang="scss">

.gallery-load-secondary {
  font-size: 1rem;

  &__wrapper {
    display: flex;
    flex-wrap: wrap;
    gap: 1.6em;
  }
  
  &__container {
    border: 1px dashed #e1e3f1;
    background-color: #f9f9f9;
    flex: 0 1 calc(25% - 1.6em);
    aspect-ratio: 1 / 1;
    position: relative;
    // overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 8px;


    input {
      position: absolute;
      inset: 0;
      width: 100%;
      opacity: 0;
      cursor: pointer;
    }    
  }

  &__placeholder{
    display: flex;
    flex-direction: column;
    align-items: center;
    row-gap: 1em;
  }

  &__title {
    font-size: 1.3em;
    font-weight: 600;
    line-height: 1.4em;
    color: #8387a3;
    text-align: center;
    padding-inline: .2em;
  }

  &__progress {
    position: absolute;
    bottom: 1.2em;
    left: 2.5em;
    right: 2.5em;
    width: auto !important;
    background-color: rgb(255, 255, 255);
    border-radius: 8px;
    padding: .2em 1em; 
    border: 1px solid var(--text-color-ternary);

    @include mobile {
      left: .5em;
      right: .5em;
    }
  }

  &__tippy-btn {
    width: 2.4em;
    height: 2.4em;
    box-shadow: 0 1px 5px 0 rgba(0, 0, 0, 0.1);
    background: #fff;
  }

  &__btn {
    position: absolute;
    width: 2.4em;
    height: 2.4em;
    box-shadow: 0 1px 5px 0 rgba(0, 0, 0, 0.1);
    background: #fff;

    svg {
      width: 100%;
    }

    &_type_delete {
      top: 1em;
      right: 1em;

      svg {
        width: 55%;
        path {
          fill: #000;
        }
      }

      &:hover {
        path {
          fill: #6937a5;
        }
      }
    }


    &_type_setting {
      top: 1em;
      left: 1em;
      background-color: transparent;

      svg {
        path {
          stroke: #000;
        }
      }

      &:hover {
        path {
          stroke: #6937a5;
        }
      }
    }
  }

  &__btn-resize {
    margin-top: 2em;
    margin-left: auto;
    font-size: 1.2em;
    text-transform: uppercase;
  }

  &__del {
    position: absolute;
    top: 1em;
    right: 1em;
    background-color: transparent;
  }

  &__tippy-item {
    font-size: 1em;
    text-transform: none;
  }

  &__tippy-container {
    padding: 1em;
    display: flex;
    flex-direction: column;
    row-gap: .5em;
    align-items: flex-start;
  }

  &__item-container {
    flex: 0 1 calc(25% - 1.6em);
    aspect-ratio: 1 / 1;
    display: flex;
    align-items: center;
    justify-content: center;
    // overflow: hidden;
    position: relative;
    // background: #f0f0f2;
    background-color: transparent;
    border-radius: 8px;
  }

  &__cropper-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__cropper {
    max-width: 100%;
    max-height: 540px;
    width: 100%;
    height: 100%;

    .vue-advanced-cropper__background {
      background: #F0F0F2;
    }

    img {
      width: 100%;
      height: auto;
      object-fit: contain; /* Сохраняет пропорции */
    }
  }

  &__item {
    position: relative;
    // overflow: hidden;
    max-height: 100%;
    aspect-ratio: 1;
    cursor: pointer;
    width: 100%;
    height: 100%;
    border-radius: 8px;

    a {
      position: absolute;
      inset: 0;
    }

    &_type_drag {
      transition: all .3s cubic-bezier(0.25, 0.8, 0.25, 1);
      cursor: grab;

      &:hover {
        transform: translateY(-3px);
        box-shadow: 0 6px 16px rgb(104, 55, 165);
      }
    }

    img {
      height: 100%;
      object-fit: cover;
      border-radius: 8px;
    }
  }

  &__slider-wrapper {
    display: none;
  }

  &__slide {
    aspect-ratio: 1 / 1.2;
    overflow: hidden;
    position: relative;
    background-color: transparent;
    border-radius: 8px;

    a {
      position: absolute;
      inset: 0;
    }

    img {
      height: 100%;
      object-fit: cover;
    }
  }

  @include mobile {
    &__wrapper {
      &_type_preview {
        display: none;
      }
    }

    &__slider-wrapper {
      display: block;
      position: relative;
    }

    &__item-container {
      flex-basis: calc(33% - 1.6em);
    }
    &__container {
      flex-basis: calc(33% - 1.6em);
    }

    &__title {
      font-size: 1em;
    }

    &__slider-navigation {
      position: absolute;
      z-index: 2;
      left: -15px;
      right: -15px;
      top: 50%;
      transform: translateY(-50%);
      display: flex;
      justify-content: space-between;
    }

    &__slider-btn {
      box-shadow: 0 2px 10px 0 rgba(89, 89, 89, 0.25);
      background: #fff;

      &_type_prev {
        transform: rotate(-180deg);
      }
    }
  }

  @include small-mobile {
    &__item-container {
      flex-basis: calc(50% - 1.6em);
    }
    &__container {
      flex-basis: calc(50% - 1.6em);
    }
  }
}

.gallery-load-secondary__item {
  transition: transform .3s cubic-bezier(.65,-0.04,.41,.77), box-shadow .3s cubic-bezier(.65,-0.04,.41,.77);
}


</style>