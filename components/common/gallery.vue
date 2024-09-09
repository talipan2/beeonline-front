<template>
  <div class="gallery">
    <h2 class="gallery__title">Галерея</h2>
    <CommonGalleryLoad />
    <p class="gallery__description">Если у вас есть видео о компании, вы можете указать ссылку на видео в
      Youtube</p>
    <label class="gallery__label" v-for="(link, index) in videoLinks" :key="index">Cсылка на видео в Youtube
      <div class="gallery__link-add">
        <UiInput class="gallery__link" v-model="videoLinks[index]" />
        <UiButton v-if="index === videoLinks.length - 1" class="gallery__btn" type="button" variant="quinary"
          size="around" @click="addLink">
          <SvgoAdd class="svg-m" />
        </UiButton>
        <UiButton v-else class="gallery__btn" type="button" variant="quinary" size="around"
          @click="removeLink(index)">
          <SvgoSub class="svg-m" />
        </UiButton>
      </div>
    </label>
  </div>
</template>

<script setup>
import { useOrganizationStore } from '~/store/organizationStore';


const organizationStore = useOrganizationStore();

const videoLinks = ref(['']); // Изначально один инпут

const addLink = () => {
  videoLinks.value.push(''); // Добавление нового пустого инпута
};

const removeLink = (index) => {
  if (videoLinks.value.length > 1) {
    videoLinks.value.splice(index, 1); // Удаление инпута по индексу
  }
};

watch(() => videoLinks.value, (newVal) => {
  organizationStore.pubCards.url_yt = newVal;
}, {deep: true});

</script>

<style lang="scss">

.gallery {
  margin-bottom: 2.5em;
}

.gallery__title {
  margin-bottom: .71em;
}

.gallery__link-add {
  display: flex;
  column-gap: 1em;
  align-items: center;
}

.gallery__description {
  font-size: 1.6em;
  line-height: 1.5em;
  margin-bottom: 1.5em;
}

.gallery__link {
  flex: 1 1 100%;
}

.gallery__label {
  color: var(--text-color-secondary);
  font-size: 1.3em;
  line-height: 2em;
}
</style>