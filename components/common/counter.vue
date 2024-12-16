<template>
  <div class="counter">
    <UiButton type="button" class="counter__btn" variant="default" size="around" @click="decrement">
      <SvgoMinus class="svg-m" />
    </UiButton>
    <div class="counter__count">
      {{ modelValue }}
    </div>
    <UiButton type="button" class="counter__btn" variant="default" size="around" @click="increment">
      <SvgoPlus class="svg-m" />
    </UiButton>
  </div>
</template>

<script setup>

const props = defineProps({
  modelValue: {
    type: Number,
    default: 0,
  }
})

const emit = defineEmits(['update:modelValue']);

function increment() {
  emit('update:modelValue', props.modelValue + 1);
}
function decrement() {
  if(props.modelValue <= 0) return
  emit('update:modelValue', props.modelValue - 1);
}

</script>

<style lang="scss">

.counter {
  font-size: 1rem;
  display: flex;
  align-items: center;
  gap: .5em;

  &__count {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.4em;
    line-height: 1.42em;
    color: #353535;
    width: 3em;
    height: 2.57em;
    background-color: #fafafb;
    border-radius: 8px;
  }

  &__btn {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1rem;

    svg {
      width: 1.4rem;
      height: 1.4rem;
      display: block;
      path {
        stroke: #353535;
        fill: #353535;
      }
    }

    &:active {
      svg {
        path {
          stroke: #6937a5;
          fill: #6937a5;
        }
      }
    }
  }

}

</style>