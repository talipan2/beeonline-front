<template>
  <div class="image-loader">
    <label class="form-group__title" v-if="title">
      {{ title }}
    </label>
    <div class="form-group">
      <div class="load-image">
        <img src="~/assets/images/nophoto_pc.png">
        <input type="file" name="logo" accept=".jpeg, .png, .jpg, .gif" @change="onFileChange">
        <span class="load-image__title">{{ label }}</span>
      </div>
      <div class="load-image" v-if="imagePreview">
        <img :src="imagePreview">
        <div class="load-image__load progress" v-if="isLoading">
          <div class="load-image__progress">Сохранение...</div>
        </div>
        <button class="load-image__del" @click="removeImage(index)">
          <SvgoClose class="svg-l" fill="#6937a5"/>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useOrganizationStore } from '~/store/organizationStore';

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
    type: String,
    default: '',
  }

});

const organizationStore = useOrganizationStore();
const imagePreview = ref(null);
const isLoading = ref(false);
const formData = new FormData();

const emit = defineEmits(['update:modelValue']);

const onFileChange = (event) => {
  const file = event.target.files[0]
  
  if (file && file.type.startsWith('image/')) {
    // Установить состояние загрузки
    isLoading.value = true;
    
    const reader = new FileReader();
    
    reader.onload = (e) => {
      imagePreview.value = e.target.result;
      console.log(e.target.result);
      formData.append('logo', file);
      emit('update:modelValue', file);
      console.log(formData.get('logo'));
      isLoading.value = false;
    };
    
    reader.onerror = () => {
      console.log('Ошибка при загрузке файла');
      isLoading.value = false;
    };

    reader.readAsDataURL(file);
  } else {
    console.log('Неверный тип файла');
  }
};

const removeImage = (index) => {
  imagePreview.value = '';
  emit('update:modelValue', '');
};

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