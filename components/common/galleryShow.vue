<template>
  <div class="gallery-show">
    <template v-for="(video, index) in videoList" :key="'video-' + index">
      <div class="image-box gallery-show__item">
        <a :href="video" data-fancybox="gallery" data-type="iframe">
          <img :src="getVideoThumbnail(video)" alt="Video thumbnail">
          <SvgoPlay class="svg-l gallery-show__play"/>
        </a>
      </div>
    </template>
    <template v-for="(image, index) in images" :key="'image-' + index">
      <div class="gallery-show__item image-box">
        <a :href="image.url" data-fancybox="gallery">
          <img :src="image.url" alt="Gallery image">
        </a>
      </div>
    </template>
  </div>
</template>

<script setup>

const props = defineProps({
  images: {
    type: Array,
    default: [],
  },
  videos: {
    type: Array,
    default: [],
  },
})

const videoList = ref([]);

const getVideoThumbnail = (videoUrl) => {
  const videoId = extractYouTubeId(videoUrl);
  return videoId ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` : null;
};

const extractYouTubeId = (url) => {
  if (!url) return null;
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:.*v=|.*v\/|vi\/|u\/\w\/|embed\/|shorts\/|watch\?v=|&v=))([^#&?]*).*/);
  return match ? match[1] : null;
};

watch(() => props.videos, () => {
  videoList.value = [...props.videos];
}, {deep: true})

</script>

<style lang="scss">

.gallery-show {
  display: flex;
  flex-wrap: wrap;
  font-size: 1rem;
  gap: 2em;

  &__item {
    position: relative;
    margin-right: 0;
    flex-basis: 22%;
    max-width: 22%;
    padding-top: 22%;

    &:hover {
      .gallery-show__play {
        color: #44246c;
        transition-duration: .1s;
        transition-timing-function: ease-in-out;
      }
    }
  }

  &__play {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 10;
    width: 3.8em;
    height: 3.8em;
  }
}

</style>