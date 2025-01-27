<template>
  <div class="gallery__container">
    <div class="gallery-link">
      <img src="~/assets/images/nophoto_img.png" alt="">
      <div class="gallery-link__title">Загрузить ещё</div>
      <input type="file" accept=".jpeg, .png, .jpg, .gif" @change="onFileChange">
    </div>
    <div class="gallery-link" v-for="(image, index) in images" :key="index">
      <a :href="image.src">
        <img :src="image.src">
      </a>
      <div class="gallery-link__load progress" v-if="image.loading">
        <div class="gallery-link__progress">Сохранение...</div>
      </div>
      <button class="gallery-link__del" @click="removeImage(image.id)">
        <SvgoClose class="svg-l" fill="#6937a5"/>
      </button>
    </div>
  </div>
</template>

<script setup>
import { useOrganizationStore } from '~/store/organizationStore';
import { useSettingStore } from '~/store/settingStore';
import { useUserStore } from '~/store/userStore';

const props = defineProps({
  modelValue: {
    type: Array,
    default: [],
  },
  logo: {
    type: Boolean,
    default: false,
  }

})


const images = ref([]);
const userStore = useUserStore();
const settingStore = useSettingStore();
const emit = defineEmits(['update:modelValue', 'update:logo']);

const onFileChange = (event) => {
  const file = event.target.files[0];
  if (file && file.type.startsWith('image/')) {
    const formData = new FormData();
    formData.append('file', file);

    images.value.push({
      src: URL.createObjectURL(file),
      loading: true
    })
    
    settingStore.uploadFiles(userStore.userData.id, formData)
    .then(res => {
      if(res && res.media_id) {
        images.value[images.value.length - 1] = {...images.value[images.value.length - 1], id: res.media_id, loading: false};
        emit('update:modelValue', [...props.modelValue, {id: res.media_id, url: URL.createObjectURL(file)} ]);
        // if(props.logo && images.value.length === 1) {
        //   emit('update:logo', { url: URL.createObjectURL(file), id: res.media_id});
        // }
      } else {
        images.value.splice(-1, 1);
      }
    })
    .catch(err => {
      console.log(err)
    });

  } else {
    console.log('Invalid file type');
  }
};

watch(() => props.modelValue, (newVal) => {
  if(images.value.length > 0 && newVal.length < 2) {
    emit('update:logo', { url: images.value[0].src, id: images.value[0].id});
  } else if (images.value.length === 0 ) {
    emit('update:logo', { url: null, id: null});
  }
}, {deep: true})

const removeImage = (id) => {
  console.log(id)
  images.value.splice(images.value.findIndex(image => image.id === id), 1);
  emit('update:modelValue', props.modelValue.filter(item => item.id !== id));
  if(images.value.length === 0) {
    emit('update:logo', null);
  }
};

onMounted(() => {
  images.value = props.modelValue.map(item => {
    return {
      src: item.url,
      id: item.id
    }
  });
});

</script>

<style lang="scss">

.gallery__container {
  display: flex;
  flex-wrap: wrap;
  column-gap: 2em;
  row-gap: 2em;
  padding-bottom: 2em;

  @include mobile {
    gap: 1em;
    padding-bottom: 1em;
  }
}

.gallery-link{
  position: relative;
    display: block;
    width: 100%;
    height: 0;
    padding-bottom: 23%;
    box-shadow: 0 0 0 1px var(--border-color-secondary);
    overflow: hidden;
    flex: 0 1 23%;

    @include mobile {
      flex: 0 1 33%;
      padding-bottom: 33%;
    }
}

.gallery-link>input {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    opacity: 0;
    width: 100%;
    height: 100%;
    cursor: pointer;
}

.gallery-link img {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    object-fit: cover;
    margin: auto;
}

.gallery-link__title {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    text-align: center;
    background-color: rgba(0, 0, 0, 0.5);
    color: var(--text-color-octonary);
    min-height: 8%;
    padding: 2rem 1rem;
    line-height: 1;
    font-size: 12px;
}

.gallery-link__load {
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

.gallery-link__progress {
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

.gallery-link__del {
  position: absolute;
  top: 0;
  right: 0;

  svg {
    width: 20px;  
  }
}

</style>