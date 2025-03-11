<template>
  <div class="notification-card">
    <div class="notification-card__image">
      <SvgoSetting class="svg-lx" v-if="type === 'system'"/>
      <SvgoSewingMachine class="svg-lx" v-if="type === 'information'" />
      <SvgoReview class="svg-lx" v-if="type === 'review'" />
    </div>
    <p class="notification-card__text">Вход в личный кабинет.</p>
    <p class="notification-card__date">22.06.2023 13:25</p>
  </div>
</template>

<script setup>

const type = ref('information');

</script>

<style lang="scss">

.notification-card {
  position: relative;
  display: flex;
  align-items: center;
  font-size: 1em;
  column-gap: 1.25em;
  padding: 1.25em;
  box-shadow: var(--box-shadow-secondary);
  background-color: #fff;

  &__image {
    width: 2.5em;
    height: 2.5em;
    svg {
      width: 100%;
      height: auto;
    }
  }

  &__text {
    font-size: 1em;
    line-height: 1em;
    margin-bottom: 0;
  }

  &__date {
    position: absolute;
    top: .5em;
    right: 1em;
    font-size: .75em;
    font-weight: 400;
  }
}

</style>
