<template>
  <div class="gallery-load-secondary">
    <template v-if="isPreview">
      <div class="gallery-load-secondary__wrapper gallery-load-secondary__wrapper_type_preview">
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
      </div>
      <div class="gallery-load-secondary__slider-wrapper">
        <Swiper
          :slidesPerView="1.7"
          :loopAddBlankSlides="true"
          :spaceBetween="20"
          class="gallery-load-secondary__slider"
          :modules="modules"
          :breakpoints="{
            512: {
              slidesPerView: 2.5,
            }
          }"
        >
          <SwiperSlide v-for="(image, index) in localModelValue" :key="index" class="gallery-load-secondary__slide">
            <a :href="image.url" class="" data-fancybox="gallery">
              <img :src="image.url" class="gallery-load-secondary__image" :alt="image" />
            </a>
          </SwiperSlide>
        </Swiper>
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
              <UiButton class="gallery-load-secondary__btn gallery-load-secondary__btn_type_setting" type="button" variant="default" :without-padding="true" @click="handleOpenSettingModal(element.id)">
                <SvgoSetting class="svg-l"/>
              </UiButton>
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


const props = defineProps({
  label: {
    type: String,
    default: 'Загрузить фотографию',
  },
  modelValue: {
    type: Array,
    default: () => [],
  },
  maxSize: {
    type: Number,
    default: 5,
  },
  isPreview: {
    type: Boolean,
    default: false
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
const emit = defineEmits(['update:modelValue']);
const progress = ref(0);

const settingStore = useSettingStore();
const settingModal = ref(false);
const imagePreview = ref('');
const cropper = ref(null);

const handleCrop = (data) => {
  if (cropper.value) {
    const { canvas, coordinates } = cropper.value.getResult();
    canvas.toBlob((blob) => {
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
    overflow: hidden;
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
    row-gap: 1.6em;
  }

  &__title {
    font-size: 1.4em;
    font-weight: 600;
    line-height: 1.4em;
    color: #8387a3;
    text-align: center;
  }

  &__progress {
    position: absolute;
    bottom: 1.2em;
    left: 2.5em;
    right: 2.5em;
    width: auto !important;
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

  &__item-container {
    flex: 0 1 calc(25% - 1.6em);
    aspect-ratio: 1 / 1;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
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
    overflow: hidden;
    max-height: 100%;
    aspect-ratio: 1;
    cursor: pointer;
    width: 100%;
    height: 100%;

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
    }
  }

  &__slider-wrapper {
    display: none;
  }

  &__slide {
    aspect-ratio: 1 / 1;
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


/* Состояние при перетаскивании */
.gallery-load-secondary__item.sortable-chosen {
  transform: scale(1.05);
  box-shadow: 0 4px 12px rgba(105, 55, 165, 0.2);
  z-index: 10;
  opacity: 0.9;
}

/* Место, куда можно поместить элемент */
.gallery-load-secondary__item.sortable-ghost {
  background: rgba(105, 55, 165, 0.1);
  border: 2px dashed #6937a5;
  opacity: 0.6;
}

.gallery-load-secondary__item{
  transition: transform .3s cubic-bezier(.65,-0.04,.41,.77), box-shadow .3s cubic-bezier(.65,-0.04,.41,.77);

}


/* Анимация кнопок */
.gallery-load-secondary__btn {
  transition: all 0.2s ease;
  opacity: 0.8;
}

.gallery-load-secondary__item:hover .gallery-load-secondary__btn {
  opacity: 1;
  transform: scale(1.1);
}

@keyframes subtlePulse {
  0%, 100% { opacity: 0.95; transform: scale(1); }
  50% { opacity: 1; transform: scale(1.02); }
}

/* Плавное появление новых элементов */
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.gallery-load-secondary__item-enter {
  animation: fadeInUp 0.4s ease-out;
}

/* Плавное исчезновение элементов */
@keyframes fadeOut {
  from { opacity: 1; }
  to { opacity: 0; }
}

.gallery-load-secondary__item-leave {
  animation: fadeOut 0.3s ease-in;
}

</style>