<template>
  <div class="advice">
    <div class="advice__icon">
      <SvgoAdvice />
    </div>
    <div class="advice__body">
      <div class="advice__title">Совет!</div>
      <div class="advice__text">
        <slot />
      </div>
    </div>
  </div>
</template>

<style lang="scss">

.advice {
  font-size: 10px;
  display: flex;

  .advice__icon {
    flex: 0 0 4em;
    min-width: 4em;
    width: 4em;
    height: 4em;
    margin-right: 1em;
    color: #A9ABAC;
  }

  .advice__body .advice__body {
    flex: 1 1 100%;
    line-height: 1.5;
    font-size: 1em;
  }

  .advice__title {
    font-size: 1.6em;
    color: var(--text-color-secondary);
  }

  .advice__text {
    font-size: 1.2rem;
    color: var(--text-color-secondary);
  }
}


</style>