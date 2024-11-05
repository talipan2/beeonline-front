<template>
  <UiNewDropdown :placement="placement">
    <a class="more-btn link more-list" ref="moreCities" href="javascript:;">
      {{ list.length > 1
        ? '+ еще&nbsp;' + (list.length - 1)
        : ''
      }}
    </a>
    <template #content>
      <div class="more-modal">
        <h4 v-if="title" class="more-modal__title">{{ title }}</h4>
        <ul class="more-modal__list">
          <li class="more-modal__item" v-for="(item, index) in list.slice(1)" :key="index">
            {{ item }}
          </li>
        </ul>
      </div>
    </template>
  </UiNewDropdown>
</template>

<script setup>

const props = defineProps({
  placement: {
    type: String,
    default: 'top',
  },
  title: {
    type: String,
    default: 'Регионы',
  },
  list: {
    type: Object,
    default: () => [],
  },
});

</script>

<style lang="scss">

.more-btn {
  font-size: 1em;
}

.more-modal {
  padding: 2.4rem;

  &__check-company-more {
    white-space: nowrap;
    font-size: 1.6rem;
  }

  &__title {
    font-size: 1.8rem;
    padding-bottom: 1.2em;
    margin-bottom: 1.2em;
    border-bottom: 1px solid #e9ecef;
  }

  &__list {
    display: flex;
    flex-direction: column;
    row-gap: .72rem;
    padding-left: 2.8rem
  }

  &__item {
    font-size: 1.4rem;
  }
}

</style>
