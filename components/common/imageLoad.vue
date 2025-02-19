<template>
  <div class="image-loader">
    <label class="form-group__title" v-if="title">
      {{ title }}
    </label>
    <div class="form-group">
      <div class="load-image">
        <img :src="imagePreview" :alt="imagePreview">
        <input type="file" name="logo" accept=".jpeg, .png, .jpg, .gif" @change="onFileChange">
        <span class="load-image__title">{{ label }}</span>
      </div>
      <!-- <div class="load-image" v-if="imagePreview">
        <img :src="imagePreview">
        <div class="load-image__load progress" v-if="isLoading">
          <div class="load-image__progress">Сохранение...</div>
        </div>
        <button class="load-image__del" @click="removeImage(index)">
          <SvgoClose class="svg-l" fill="#6937a5"/>
        </button>
      </div> -->
    </div>
  </div>
</template>

<script setup>
import { useOrganizationStore } from '~/store/organizationStore';
import defaultImage from '~/assets/images/nophoto_pc.png';
import { useUserStore } from '~/store/userStore';
import { useSettingStore } from '~/store/settingStore';
import { useToast } from 'vue-toastification';
const props = defineProps({
  title: {
    type: String,
    default: '',
  },
  label: {
    type: String,
    default: 'Загрузить логотип (до 5Мб. Допустимый формат .jpeg, .png, .jpg, .gif)',
  },
  modelValue: {
    type: [String, Object],
    default: '',
  },
  maxSize: {
    type: Number,
    default: 5,
  }

});

const settingStore = useSettingStore();
const imagePreview = ref(props.modelValue.url || defaultImage);
const userStore = useUserStore();
const toast = useToast();

const emit = defineEmits(['update:modelValue']);

const onFileChange = (event) => {
  const file = event.target.files[0]
  
  if (file && file.type.startsWith('image/')) {
    if(file.size < props.maxSize * 1024 * 1024) {
      const formData = new FormData();
      formData.append('file', file);
      settingStore.uploadFiles(userStore.userData.id, formData)
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

watch(() => props.modelValue, (newVal) => {
  try {
    if (newVal && newVal.url) {
      imagePreview.value = newVal.url;
    }
  } catch (err) {}
}, {deep: true});


</script>

<style lang="scss">

.image-loader {
  .form-group {
    justify-content: flex-start;
  }
}

.load-image {
  border: 1px solid #c4c4c4;
  position: relative;
  cursor: pointer;
  padding-bottom: 33%;
  flex: 1 1 33%;
  overflow: hidden;

  input {
    position: absolute;
    inset: 0;
    width: 100%;
    opacity: 0;
    cursor: pointer;
  }

  span {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    text-align: center;
    background-color: rgba(0, 0, 0, 0.5);
    color: #fff;
    min-height: 15%;
    padding: 1em;
    line-height: 1;
    font-size: 12px;

  }

  img {
    position: absolute;
    inset: 0;
    object-fit: contain;
    box-sizing: border-box;
    height: 100%;
  }

  &__load {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      top: auto;
      height: 25px;
      background-color: #6937a5;
      background-image: linear-gradient(45deg, hsla(0, 0%, 100%, .15) 25%, transparent 0, transparent 50%, hsla(0, 0%, 100%, .15) 0, hsla(0, 0%, 100%, .15) 75%, transparent 0, transparent);
      background-size: 1rem 1rem;
  }

  &__progress {
    height: 100%;
    width: 100%;
    color: #fff;
    font-size: 16px;
    font-weight: 800;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    text-shadow: 0 0 5px #000;
  }

  &__del {
    position: absolute;
    top: 0;
    right: 0;

    svg {
      width: 20px;  
    }
  }

}

</style>