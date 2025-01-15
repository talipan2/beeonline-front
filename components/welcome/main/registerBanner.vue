<template>
  <section class="register-banner" ref="bannerRef">
    <div class="register-banner__inner">
      <div class="register-banner__content" :class="{ 'animate': isVisible }">
        <h2 class="register-banner__title">Зарегистрируйтесь и мы поможем вам с подбором исполнителей.</h2>
        <UiButton variant="quinary" size="large" class="register-banner__btn">Зарегистрироваться</UiButton>
      </div>
      <UiImage class="register-banner__image" :src="'/assets/images/welcome/registerBanner/register-banner-img.png'" alt="Фотография швеи" :class="{ 'animate': isVisible }"/>
    </div>
  </section>
</template>

<script setup>

const bannerRef = ref(null);
const isVisible = ref(false);

onMounted(() => {
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        isVisible.value = true;
        observer.disconnect(); // Останавливаем наблюдение после появления
      }
    },
    { threshold: 0.2 } 
  );

  if (bannerRef.value) {
    observer.observe(bannerRef.value);
  }
});

</script>

<style lang="scss">

.register-banner {
  font-size: 1rem;
  padding-block: 10.3em 12.3em;
  background-image: url('/assets/images/welcome/registerBanner/pattern.png');
  background-repeat: no-repeat;
  background-size: cover;


  &__inner {
    display: flex;
    max-width: 130em;
    column-gap: 10em;
    margin-inline: auto;
    align-items: center;
  }

  &__content {
    flex: 1 0 561px;

    &.animate {
      animation: moveRight 2s ease;
    }
  }

  &__image {
    &.animate {
      animation: moveLeft 2s ease;
    }
  }

  &__title {
    font-family: 'Coolvetica', sans-serif;
    font-size: 3.6em;
    line-height: 1.2em;
    color: #32354c;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 2px;
    margin-bottom: 2.33em;
  }

  &__btn {
    font-size: 1.8em;
    line-height: 1.33em;
    font-weight: 600;
  }

}

@keyframes moveRight {
  0% {
    opacity: 0;
    transform: translateX(-100px);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes moveLeft {
  0% {
    opacity: 0;
    transform: translateX(100px);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
}

</style>