<template>
  <div class="dropdown" ref="dropdown">
    <!-- Слот для кнопки открытия списка -->
    <div @click="toggleDropdown" @click.stop>
      <slot name="trigger" />
    </div>
    
    <!-- Слот для элементов списка -->
    <transition name="slide-down">
      <div v-if="isOpen" class="dropdown__list" :class="type === 'secondary' ? 'dropdown__list_secondary' : ''"
        ref="dropdown">
        <slot name="dropdown-header" />
        <div class="dropdown__link_list">
          <div v-for="(item, index) in options" :key="index" @click="selectItem(item)"
            :class="{ selected: item.value === selectedValue }" class="dropdown-item">
            <slot :item="item" />
          </div>
        </div>
        <slot name="dropdown-footer" />
      </div>
    </transition>

  </div>
</template>

<script setup>
const emit = defineEmits(['update:modelValue']);

const props = defineProps({
  options: {
    type: Array,
    required: true,
    default: () => []
  },
  modelValue: {
    type: [String, Number, Object],
    default: null
  },
  type: {
    type: String,
    default: 'primary',
    validator: value => ['primary', 'secondary'].includes(value),
  }

});

const isOpen = ref(false);
const selectedValue = ref(props.modelValue);
const dropdown = ref(null);


const toggleDropdown = () => {
  isOpen.value = !isOpen.value;

  if (isOpen.value) {
    addClickOutsideListener();
  } else {
    removeClickOutsideListener();

  }
};

const selectItem = (item) => {
  selectedValue.value = item.value;
  isOpen.value = false;
  if (props.modelValue) {
    emit('update:modelValue', selectedValue.value);
  }
};


const handleClickOutside = (event) => {
  if (dropdown.value && !dropdown.value.contains(event.target)) {
    isOpen.value = false;
    removeClickOutsideListener();
  }
};

const addClickOutsideListener = () => {
  document.addEventListener('click', handleClickOutside);
};

const removeClickOutsideListener = () => {
  document.removeEventListener('click', handleClickOutside);
};

onMounted(() => {
  if (props.modelValue) {
    selectedValue.value = props.modelValue.value;
  }
})

</script>

<style lang="scss">

.dropdown {
  position: relative;

  &__list {
    position: absolute;
    top: 100%;
    right: 0;
    // left: 2px;
    width: 100%;
    box-shadow: var(--box-shadow-dropdown);
    background-color: var(--bg-secondary-color);
    z-index: 10

  }
  
  .dropdown-item{
    cursor: pointer;

    &.selected {
      background-color: var(--button-background-primary);

      button {
        color: var(--text-color-octonary);
      }

      &:hover {
        background-color: var(--button-background-primary);
      }

    }

    &:hover {
      background-color: var(--button-background-tertiary-hover);
    }
  }

  .dropdown__list_secondary {
    padding: 2.4rem;
    min-width: 27.6rem;
    box-sizing: border-box;
  }
}

.slide-down-enter-active, .slide-down-leave-active {
  transition: opacity .2s ease, transform .2s ease;
}

.slide-down-enter-from, .slide-down-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

.slide-down-enter-to, .slide-down-leave-from {
  opacity: 1;
  transform: translateY(0);
}

</style>