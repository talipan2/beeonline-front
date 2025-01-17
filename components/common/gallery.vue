<template>
  <div class="gallery">
    <h2 class="gallery__title">Галерея</h2>
    <Form @submit="handleSubmit"> 
      <CommonGalleryLoad v-model="data.gallery"/>
      {{data.gallery}}
      <p class="gallery__description">Если у вас есть видео о компании, вы можете указать ссылку на видео в
        Youtube</p>
      <label class="gallery__label" v-for="(link, index) in videoLinks" :key="index">Cсылка на видео в Youtube
        <div class="gallery__link-add">
          <UiInput class="gallery__link" v-model="videoLinks[index].external_url" :name='`url_yt-${index}`' label="Ссылка на видео" :rules="{ url: true }">
            <template #action>
              <UiButton v-if="index === videoLinks.length - 1" class="gallery__btn" type="button" variant="quinary"
                size="around" @click="addLink">
                <SvgoAdd class="svg-m" />
              </UiButton>
              <UiButton v-else class="gallery__btn" type="button" variant="quinary" size="around"
                @click="removeLink(index)">
                <SvgoSub class="svg-m" />
              </UiButton>
            </template>
          </UiInput>
        </div>
      </label>
      <slot></slot>
    </Form>
    {{ modelValue }}
  </div>
</template>

<script setup>

const props = defineProps({
  modelValue: {
    type: Object,
    default: () => ({}),
    required: true,
  },
  submitFunc: {
    type: Function,
    default: null,
  }
})

const emit = defineEmits(['update:modelValue']);

const data = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit('update:modelValue', value);
  }
})

const videoLinks = ref([{
  services: 'Youtube',
  external_url: ''
}]);

const addLink = () => {
  videoLinks.value.push({
    services: 'Youtube',
    external_url: ''
  }); // Добавление нового пустого инпута
};

const removeLink = (index) => {
  if (videoLinks.value.length > 1) {
    videoLinks.value.splice(index, 1); // Удаление инпута по индексу
  }
};

const handleSubmit = () => {
  data.value.videos = [...videoLinks.value];
  console.log(data.value.videos);
  if(props.submitFunc) {
    props.submitFunc();
  } 
}

onMounted(() => {
  if(data.value.videos && data.value.videos.length) {
    videoLinks.value = data.value.videos.map(video => ({ services: video.services, external_url: video.external_url }))
  }
})


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
  flex: 0 1 85%;
}

.gallery__label {
  color: var(--text-color-secondary);
  font-size: 1.3em;
  line-height: 2em;
}

.gallery__btn {
  margin-left: auto;
}

</style>