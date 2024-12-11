<template>
  <div class="selector-buttons">
    <button
      v-for="(button, index) in buttonsList" :key="index"
      class="selector-buttons__btn"
      :class="{
        'selector-buttons__btn_type_active': currentEntityType === button.value,
      }"
      @click="toggleEntity(button.value)"
    >
      {{ button.label }}
      <span>{{ button.count }}</span>
    </button>
  </div>
</template>

<script setup>

const props = defineProps({

  buttonsList: {
    type: Array,
    required: true,
    default: () => ([]),
  },
  activeBtn: {
    type: String,
    default: null,
  },
});

const emit = defineEmits(['updateActiveButton']);


const currentEntityType = ref(props.activeBtn || props.buttonsList[0].value);

const toggleEntity = (type) => {
  currentEntityType.value = type;
  emit('updateActiveButton', type);
};

watch(() => props.activeBtn, (newVal) => {
  if(newVal) {
    currentEntityType.value = newVal;
  }
}, { immediate: true});

</script>

<style lang="scss">

.selector-buttons {
  font-size: 1.6rem;
  display: flex;
  margin-bottom: 2.18em;
  @include small-mobile {
    margin-inline: calc(-1 * var(--container-padding-x));;
  }

  &__btn {
    flex: 0 1 50%;
    display: flex;
    justify-content: space-between;
    font-size: 1.25em;
    padding: 1.25em 1.5em;
    box-shadow: -2px -2px 0 0 #6937a5;
    background-color: var(--text-color-octonary);
    border-right: 2px solid #fff;
    border-bottom: 2px solid #fff;
  
    &:hover {
      border-color: #6937a5;
    }
  
    &_type_active {
      background-color: #6937a5;
      border-color: #6937a5;
      color: #fff;
  
      &:hover {
        color: #fff;
      }
    }
  }
}

@include mobile {
  .selector-buttons {
    font-size: 1rem;
    &__btn {
      font-size: 1.4em;
      padding: 1em 1.42em;
      flex-direction: column;
      align-items: center;
      row-gap: .3em;
    }
  }
}

@include small-mobile {
  .selector-buttons {
    &__btn {
      padding-inline: .5em;
    }
  }
}

</style>