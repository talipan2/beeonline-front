<template>
  <div class="achievement">
    <div class="achievement__content">
      <BonusIcon class="achievement__image" />
      <div class="achievement__info">
        <div class="achievement__title">{{ achievement.name }}</div>
        <div class="achievement__description">
          {{ achievement.description }}
        </div>
      </div>
      <div class="achievement__completed" v-if="achievement.completed"></div>
      <div class="achievement__action" v-if="showAction">
        <UiButton 
          :to="bonus.link_path"
          variant="secondary" 
          size="small"
          class="bonus-btn" 
          @click="changeFilter('bonus', null)"
        >
          {{ bonus.link_title }}
        </UiButton>
      </div>
    </div>
    <div class="achievement__progress">
      <div class="achievement__progress-line">
        <div class="achievement__progress-line-complete" :style="{
          width: progressPercentage + '%',
        }"></div>
      </div>
      <div class="achievement__progress-text">
        <div class="achievement__progress-value">
          {{ progress || 0 }} из {{ achievement.threshold }}
        </div>
        <div class="achievement__progress-complete" v-if="achievement.completed">
          Задача выполнена
        </div>
      </div>
    </div>
    <div class="achievement__action-mobile" v-if="showAction">
      <UiButton 
        :to="bonus.link_path"
        variant="secondary" 
        size="small" 
        @click="changeFilter('bonus', null)"
      >
        {{ bonus.link_title }}
      </UiButton>

    </div>
  </div>
</template>

<script setup>

const props = defineProps({
  achievement: {
    type: Object,
    default: () => ({}),
  },
  bonuses: {
    type: Array,
    default: () => [],
  },
})

const progress = computed(() => {
  if (props.achievement.progress > props.achievement.threshold) {
    return props.achievement.threshold;
  }
  return props.achievement.progress || 0;
})

const progressPercentage = computed(() => (progress.value / props.achievement.threshold) * 100);
const bonus = computed(() => {
  if (!props.bonuses) return null;
  if (!props.achievement?.bonus_id) return null;
  return props.bonuses.find(bonus => bonus.id === props.achievement.bonus_id);
})

const showAction = computed(() => {
  if (props.achievement.completed) return false;
  if (!bonus.value) return false;
  if (!bonus.value.link_path) return false;
  if (!bonus.value.link_title) return false;
  if (!bonus.value.link_type) return false;
  return true;
})

</script>

<style lang="scss">

.achievement {
  position: relative;
  font-size: 1rem;
  font-family: "fira-sans", sans-serif;
  display: flex;
  gap: 2.4em;
  flex-direction: column;

  background-color: #fff;
  border-radius: 1.2em;
  padding: 2.4em;
  border: 1px solid #f3f4f9;
  box-shadow: 0 1px 2em 0 rgba(0, 0, 0, 0.04);

  &__content {
    position: relative;
    display: flex;
    gap: 2.4em;
  }

  & &__image {
    font-size: 1em;
  }

  &__info {
    flex: 1 1 auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 0.8em;
  }

  &__title {
    font-size: 1.8em;
    line-height: 1.4;
    font-weight: 600;
  }

  &__description {
    font-size: 1.6em;
    line-height: 1.5;
  }

  &__action {
    position: absolute;
    top: -0.8em;
    right: 0;
  }

  &__action-mobile {
    display: none;

  }

  &__completed {
    position: absolute;
    top: 0;
    right: 0;
    width: 2.8em;
    height: 2.8em;
    background: transparent no-repeat center/cover;
    border-radius: 3em;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='28' height='28' fill='none'%3E%3Ccircle cx='14' cy='14' r='14' fill='%2354c18b'/%3E%3Cpath d='M8 13l4.5 4.5 8-8' stroke='%23fff' stroke-width='2'/%3E%3C/svg%3E");
  }

  &__progress {
    display: flex;
    flex-direction: column;
    gap: 0.8em;

    &-line {
      position: relative;
      width: 100%;
      font-size: 0.6em;
      height: 1em;
      border-radius: 1em;
      background-color: #f1f3f9;
      overflow: hidden;

      &-complete {
        position: absolute;
        background-color: var(--primary-color);
        border-radius: 1em;
        height: 100%;
        left: 0;
        top: 0;
      }
    }

    &-text {
      display: flex;
      font-family: "lato", sans-serif;
      justify-content: space-between;
      font-size: 12px;
      line-height: 1.2;
      font-weight: 700;
    }

    &-value {
      color: #2a1947;
    }

    &-complete {
      color: #747087;
      text-align: right;
    }
  }
}

@include mobile {
  .achievement {
    font-size: .9rem;
  }
}

</style>