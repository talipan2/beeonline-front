<template>
  <div>
    <label class="form-group__title">
      {{ title }}
    </label>
    <div class="load-image">
        <img src="~/assets/images/nophoto_pc.png">
        <input type="file" name="logo" accept=".jpeg, .png, .jpg, .gif" @change="onFileChange">
        <span class="load-image__title">Загрузить логотип (до 5Мб. Допустимый формат .jpeg, .png, .jpg,
          .gif)</span>
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
});

const organizationStore = useOrganizationStore();
const imagePreview = ref(null);

const onFileChange = (event) => {
  event.preventDefault();
  console.log(12312312312)
  const file = event.target.files[0];
  if (file && file.type.startsWith('image/')) {
    imagePreview.value = URL.createObjectURL(file);
    organizationStore.registerOrg.companyLogo = imagePreview.value
  } else {
    console.log('Invalid file type');
  }
};

</script>

<style lang="scss">

.load-image {
  margin-top: .5em;
  display: flex;
  flex-direction: column;
  border: 1px solid #c4c4c4;
  position: relative;
  cursor: pointer;
  padding-bottom: 63%;

  input {
    position: absolute;
    width: 0;
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
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    height: 100%;
    width: 100%;
    object-fit: contain;
    padding: 1em;
    box-sizing: border-box;
  }
}

</style>