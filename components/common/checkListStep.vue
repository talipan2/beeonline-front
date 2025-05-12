<template>
  <div class="step-checklist">
    <template v-if="!isMobile">
      <div v-for="(step, index) in steps" :key="step.id" class="step-checklist__item" :class="{
        'completed': isStepCompleted(index),
        'active': currentStep === index
      }">
        <div class="step-checklist__indicator">
          <div class="step-checklist__number">
            <span>{{ index + 1 }}</span>
          </div>
          <div class="step-checklist__connector" v-if="index < steps.length - 1"></div>
        </div>
        <div class="step-checklist__content">
          <p class="step-checklist__title">{{ step.title }}</p>
        </div>
      </div>
    </template>
    <template v-else>
      <div class="step-checklist__mobile">
        <div class="step-checklist__number step-checklist__number_type_mobile">
          <span>{{ currentStep + 1 }}</span>
        </div>
        <p class="step-checklist__text">{{ `Шаг ${currentStep + 1} из ${steps.length}` }}</p>
      </div>
    </template>
  </div>
</template>

<script setup>
const props = defineProps({
  steps: {
    type: Array,
    required: true,
  },
  currentStep: {
    type: Number,
    default: 0
  },
  completedSteps: {
    type: Array,
    default: () => []
  }
})

const isMobile = ref(false)

const router = useRouter()

const isStepCompleted = (index) => {
  return props.completedSteps.includes(index) || index < props.currentStep
}

const checkScreenSize = () => {
  isMobile.value = window.innerWidth <= 768
}

onMounted(() => {
  checkScreenSize()
  window.addEventListener('resize', checkScreenSize)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', checkScreenSize)
})

</script>

<style lang="scss">

.step-checklist {
  font-size: 1rem;
  display: flex;
  flex-direction: column;
  // row-gap: 2em;

  &__item {
    display: flex;
    align-items: flex-start;
    column-gap: 1.6em;
    color: #68727D;
    position: relative;
  }

  &__indicator {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
  }

  &__number {
    font-family: 'Inter', sans-serif;
    font-size: 1.6em;
    font-weight: 500;
    width: 3em;
    height: 3em;
    background-color: #fff;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 0 0 auto;
    border: 1px solid #eaebf0;
    position: relative;
    z-index: 1;

    &_type_mobile {
      background-color: #6937a5;
      color: #fff;
      border-color: #6937a5;
    }
  }

  &__connector {
    height: 3.2em;
    width: 2px;
    flex-shrink: 0;
    margin-block: .8em;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='2' height='24' viewBox='0 0 2 24' fill='none'%3E%3Cline x1='1' y1='30' x2='1' y2='1' stroke='%23EAEBF0' stroke-width='2' stroke-linecap='round' stroke-dasharray='4 8'/%3E%3C/svg%3E");
  }

  &__content {
    font-size: 2em;
    line-height: 1em;
    font-weight: 400;
    padding-top: 0.8em;
  }

  &__item.completed {
    .step-checklist__number {
      background-color: #6937a5;
      color: #fff;
      border-color: #6937a5;
    }

    .step-checklist__content {
      color: #6937a5;
    }

    .step-checklist__connector {
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='2' height='24' viewBox='0 0 2 24' fill='none'%3E%3Cline x1='1' y1='30' x2='1' y2='1' stroke='%236937A5' stroke-width='2' stroke-linecap='round' stroke-dasharray='4 8'/%3E%3C/svg%3E");
    }
  }

  &__item.active {
    .step-checklist__number {
      background-color: #6937a5;
      color: #fff;
      border-color: #6937a5;
    }
    
    .step-checklist__content {
      color: #6937a5;
    }
  }

  &__mobile {
    display: flex;
    align-items: center;
    column-gap: 1.6em;
    margin-bottom: 2.4em;
  }

  &__text {
    font-size: 1.6em;
    font-weight: 400;
    line-height: 1.5em;
    color: #6937a5;
  }

  @include tablet {
    font-size: .8em;
  }

}

</style>