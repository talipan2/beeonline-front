<template>
  <div class="notification-card" :class="{ 'notification-card_type_not-readad': !data.readed }">
    {{ data }}
    <div class="notification-card__image">
      <SvgoSetting class="svg-lx" v-if="data.group === 'system'"/>
      <SvgoSewingMachine class="svg-lx" v-if="data.group === 'orders' || data.group === 'services'" />
      <SvgoReview class="svg-lx" v-if="data.group === 'reviews'" />
      <SvgoNotifyMessage class="svg-lx" v-if="data.group === 'chat'" />
      <SvgoNotifyDeal class="svg-lx" v-if="data.group === 'deals'" />
    </div>
    <p class="notification-card__text">
      {{ data.message }}.
      <NuxtLink class="notification-card__link" :to="data.link">{{ data.link_text }}</NuxtLink>
    </p>
    <p class="notification-card__date">{{ data.date }}</p>
  </div>
</template>

<script setup>

const props = defineProps({
  data: {
    type: Object,
    default: () => ({})
  }
})

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

  &_type_not-readad {
    box-shadow: var(--box-shadow-primary);
  }

  &__text {
    font-size: 1em;
    line-height: 1em;
    margin-bottom: 0;
    display: inline;
  }

  &__link {
    display: inline;
    
    &:hover {
      color: var(--text-color-hover-primary);
      text-decoration: underline;
    }
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
