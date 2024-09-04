<template>
  <div class="gallery">
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
      <button class="gallery-link__del" @click="removeImage(index)">
        <SvgoClose class="svg-l" fill="#6937a5"/>
      </button>
    </div>
  </div>
</template>

<script setup>

const images = ref([]);

const onFileChange = (event) => {
  const file = event.target.files[0];
  if (file && file.type.startsWith('image/')) {
    const reader = new FileReader();
    const newImage = { src: '', loading: true };
    const index = images.value.length; // Get the current index

    images.value.push(newImage);

    reader.onload = (e) => {
      // Replace the entire object in the array to ensure reactivity
      images.value[index] = { src: e.target.result, loading: false };
    };

    reader.readAsDataURL(file);
  } else {
    console.log('Invalid file type');
  }
};

const removeImage = (index) => {
  images.value.splice(index, 1);
};
</script>

<style lang="scss">

.gallery {
  display: flex;
  flex-wrap: wrap;
  column-gap: 2em;
  row-gap: 2em;
  padding-bottom: 2em;
}

.gallery-link{
  position: relative;
    display: block;
    width: 100%;
    height: 0;
    padding-bottom: 16%;
    box-shadow: 0 0 0 1px var(--border-color-secondary);
    overflow: hidden;
    flex: 0 1 16%;
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