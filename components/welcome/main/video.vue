<template>
  <div class="welcome-video welcome-container">
    <div v-if="!isPlaying" class="welcome-video__play" @click="isPlaying = !isPlaying">
      <SvgoPlay class="svg-l welcome-video__play-icon"/>
      <SvgoLogo class="welcome-video__logo"/>
      <UiImage class="welcome-video__image" src="/assets/images/welcome/video/video-background.png" alt="Превью видео" />
    </div>
    <iframe v-if="isPlaying" class="welcome-video__video"  src="https://www.youtube.com/embed/cgA4gTDUT_s?autoplay=1" frameborder="0" allowfullscreen></iframe>
  </div>
</template>

<script setup>

const isPlaying = ref(false);

</script>

<style lang="scss">

.welcome-video {
  height: 670px;
  font-size: 1rem;
  margin-bottom: 20em;
  border: 1px solid #f2f2f2;
  border-radius: 24px;
  overflow: hidden;  

  &__play {
    position: relative;
    cursor: pointer;
  }

  &__logo { 
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 34em;
    height: 9.2em;
    z-index: 1;
  }

  &__play-icon {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 7.2em;
    height: 7.2em;
    background-color: #fff;
    box-shadow: 0 12px 48px 0 rgba(0, 0, 0, 0.2);
    border-radius: 100%;
    z-index: 2;
    color: #fff;

    path {
      fill: #6937a5;
    }
  }

  &__video {
    width: 100%;
    height: 100%;
  }
}

</style>