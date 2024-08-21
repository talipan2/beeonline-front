<template>
  <NuxtLink
    :class="buttonClass"
    :to="to"
    v-if="type === 'link'"
  >
    <slot />
  </NuxtLink>
  <button v-else :class="buttonClass" :disabled="disabled" @click="emit('click')">
    <slot />
  </button>
</template>

<script setup>

const props = defineProps({
  variant: {
    type: String,
    default: 'primary',
    validator: value => ['primary', 'secondary', 'tertiary', 'quaternary',].includes(value),
  },
  size: {
    type: String,
    default: 'medium',
    validator: value => ['small', 'medium', 'large', 'centered', 'around', 'xl'].includes(value),
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  to: {
    type: [String, Object],
    default: null,
  },
  type: {
    type: String,
    default: 'link',
    validator: value => ['link', 'button'].includes(value),
  }
});


const emit = defineEmits(['click']);

const buttonClass = computed(() => {
  return [
    'btn',
    `btn-${props.variant}`,
    `btn-${props.size}`,
    { 'btn-disabled': props.disabled && isButton.value },
  ];
});

</script>

<style lang="scss">

.btn {
  display: flex;
  align-items: center;
  text-wrap: nowrap;
  position: relative;
}

.btn-primary {
  background-color: var(--button-background-primary);
  color: var(--text-color-octonary);
  font-size: 1.6rem;
  font-weight: 600;
  line-height: 1.6em;
  
  &:hover {
    background-color: var(--button-background-primary-hover);
  }

  @include mobile {
    font-size: 12px;
  }
}

.btn-secondary {
  background-color: var(--button-background-secondary);
  color: var(--text-color-quaternary);
  font-size: 1.4rem;
  font-weight: 600;
  line-height: 1em;

  &:hover {
    background-color: var(--button-background-secondary-hover);
    color: var(--text-color-quaternary);
  }
}

.btn-tertiary {
  background-color: var(--button-background-quaternary);
  color: var(--text-color-ternary);
  font-size: 1.4rem;
  font-weight: 600;
  border: 2px solid var(--border-color-quaternary);
  line-height: 1em;

  &:hover {
    background-color: var(--button-background-primary);
    color: var(--text-color-octonary);

    svg {
      fill: var(--text-color-octonary);
    }
  }
}

.btn-quaternary {
  background-color: hsla(0, 0%, 100%, 0.31);
  color: #fff;
  display: block;
  font-size: 1.8rem;
  line-height: 1.33em;
  transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out;

  &:hover {
    background-color: var(--button-background-quaternary-hover);
    color: var(--text-color-hover-primary)
  }
}

.btn-xl {
  padding: 1.6rem 3.2rem;
  border-radius: 100px;

  @include mobile {
    padding: 12px 24px;
  }
}

.btn-large {
  padding: 1.2rem 2rem;
  border-radius: 100px;

  @include mobile {
    padding: 12px 20px;
  }
}

.btn-small {
  padding: 0.6rem 1.6rem;
  border-radius: 100px;

  @include mobile {
    padding: 6px 16px;
    border-radius: 32px;
  }
}

.btn-centered {
  padding: .75rem 2rem;
  border-radius: 100px;

  @include mobile {
    padding: 7.5px;
  }
}

.btn-around {
  padding: 1.2rem;
  border-radius: 100px;
}

</style>