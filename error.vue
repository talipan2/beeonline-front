<template>
  <NuxtLayout name="default">
    <section class="error-page">
      <h1 class="error-page__title">К сожалению такая страница не найдена</h1>
      <div class="error-page__container">
        <span class="error-page__code">404</span>
        <UiImage src="/assets/images/error-page.webp" class="error-page__image" />
      </div>
      <h2 class="error-page__message">Ошибка 404 - страница не найдена</h2>
      <UiButton type="button" class="error-page__btn" variant="quinary" size="large" @click="goBack">
        <SvgoBtnArrow class="svg-lx" />
        Назад
      </UiButton>
    </section>
  </NuxtLayout>
</template>

<script setup>

const router = useRouter();

function goBack() {
  const previousRoute = router.options.history.state.back;
  if (previousRoute) {
    router.back();
  } else {
    router.push('/');
  }
}



</script>

<style lang="scss">

.error-page {
  font-size: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3em;
  max-width: 70%;
  margin-inline: auto;
  background-color: var(--bg-primary-color);
  padding-block: 10em;

  &__code {
    font-family: 'fira-sans', sans-serif;
    font-size: 35.8em;
    line-height: 1;
    font-weight: 700;
    color: #EAEAEA;
  }

  &__title {
    font-size: 2.4em;
    line-height: 1.2;
    margin-bottom: 1em;
  }

  &__container {
    position: relative;
  }

  
  &__image {
    position: absolute;
    inset: 0;
    margin: auto;
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
  }
  &__message {
    font-size: 1.8em;
    line-height: 1.2;
    margin-top: 1.5em;
  }

  &__btn {
    font-size: 1.6em;
    text-transform: uppercase;
    column-gap: .5em;
    width: 20%;
    svg {
      transform: rotate(180deg);
    }
  }
}

</style>