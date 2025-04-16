<template>
  <div class="load-image-secondary">
    <label class="form-group__title" v-if="title">
      {{ title }}
    </label>
    <div class="form-group">
      <div class="load-image-secondary__container">
        <template v-if="imagePreview">
          <img :src="imagePreview" :alt="imagePreview">
          <UiButton class="load-image-secondary__del" type="button" variant="default" :without-padding="true" @click="handleDeleteImage">
            <SvgoDelete class="svg-l" fill="#6937a5"/>
          </UiButton>
        </template>
        <div v-else class="load-image-secondary__loader">
          <input type="file" name="logo" accept=".jpeg, .png, .jpg, .gif" @change="onFileChange">
          <div class="load-image-secondary__placeholder">
            <SvgoCamera class="svg-lx load-image-secondary__camera" fill="#6937a5"/>
            <span class="load-image-secondary__title" v-if="label">{{ label }}</span>
            <CommonProgressBar class="load-image-secondary__progress" :progress="progress" v-if="progress > 0 && progress < 100"/>
          </div>
        </div>
      </div>
    </div>
    <Cropper :src="imagePreview" :stencil-component="Stencil" :stencil-props="stencilProps" @change="handleCrop"/>
  </div>
</template>

<script setup>
import { useUserStore } from '~/store/userStore';
import { useSettingStore } from '~/store/settingStore';
import { useToast } from 'vue-toastification';
import { Cropper } from 'vue-advanced-cropper';
import 'vue-advanced-cropper/dist/style.css';

const props = defineProps({
  title: {
    type: String,
    default: '',
  },
  label: {
    type: String,
    default: 'Загрузить фотографию',
  },
  modelValue: {
    type: [String, Object],
    default: '',
  },
  maxSize: {
    type: Number,
    default: 5,
  },

});

const settingStore = useSettingStore();
const imagePreview = ref(props.modelValue.url || '');
const userStore = useUserStore();
const toast = useToast();
const progress = ref(0);

const emit = defineEmits(['update:modelValue']);

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
          imagePreview.value = URL.createObjectURL(file);
          emit('update:modelValue', {id: res.media_id, url: imagePreview.value});
        }
      })
    } else {
      toast.error('Файл превышает допустимый размер');
    }
  } else {
    toast.error('Неверный тип файла');
  }
};

watch(() => progress.value, (newVal) => {
  console.log(progress.value)
})

const handleDeleteImage = () => {
  imagePreview.value = '';
  emit('update:modelValue', {});
}

watch(() => props.modelValue, (newVal) => {
  try {
    if (newVal && newVal.url) {
      imagePreview.value = newVal.url;
    }
  } catch (err) {}
}, {deep: true});


</script>

<style lang="scss">


.load-image-secondary {
  font-size: 1rem;
  
  &__container {
    border: 1px dashed #e1e3f1;
    background-color: #f9f9f9;
    flex: 0 0 26%;
    aspect-ratio: 1 / .7;
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
  }

  &__progress {
    position: absolute;
    bottom: 1.2em;
    left: 2.5em;
    right: 2.5em;
    width: auto !important;
  }

  &__del {
    position: absolute;
    top: 1em;
    right: 1em;
    background-color: transparent;

    &:hover {
      path {
        fill: #6937a5;
      }
    }
  }

}


</style>