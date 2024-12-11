<template>
  <div class="desktop-selectable-entity">
    <div class="desktop-selectable-entity__buttons">
      <button type="button" class="desktop-selectable-entity__btn" :class="{ active: currentPage === 1 }" @click="selectPage(1)">
        {{ label[0] }}
        <span>{{ count[0] }}</span>
      </button>
      <button type="button" class="desktop-selectable-entity__btn" :class="{ active: currentPage === 2 }" @click="selectPage(2)">
        {{ label[1] }}
        <span>{{ count[1] }}</span>
      </button>
    </div>
    <transition name="fade" mode="out-in">
      <div class="desktop-selectable-entity__list" v-if="currentPage === 1">
        <slot name="firstPage" />
      </div>
    </transition>
    <transition name="fade" mode="out-in">
      <div class="desktop-selectable-entity__list" v-if="currentPage === 2">
        <slot name="secondPage" />
      </div>
    </transition>
  </div>
</template>

<script setup>

const props = defineProps({
  label: {
    type: Array,
    default: () => []
  },
  count: {
    type: Array,
    default: () => []
  },
  btnLabel: {
    type: String,
    default: 'Читать полностью'
  },
  disabledPage: {
    type: Array,
    default: () => []
  }

})

const currentPage = ref(1);

const selectPage = (page) => {
  if(props.disabledPage.includes(page) && props.count[page - 1] == 0) return
  currentPage.value = page
}

</script>

<style lang="scss">

.desktop-selectable-entity {
  font-size: 1em;
  display: flex;
  flex-direction: column;
  width: 100%;

  &__buttons {
    display: flex;
    margin-bottom: 3em;
    border-bottom: 1px solid var(--border-color-secondary);

    .active {
      box-shadow: inset 0 -3px #6937a5;
      
      color: var(--text-color-ternary);

      span {
        color: var(--text-color-ternary);
      }
    }
  }

  &__btn {
    flex: 0 1 50%;
    display: flex;
    justify-content: space-between;
    font-size: 1.6em;
    padding: .625em .875em;
    color: var(--text-color-senary);

    span {
      color: var(--text-color-primary);
      font-weight: 600;

    }

    &:hover {
      span {
        color: var(--text-color-ternary);
      }
    }
  }

  &__list {
    display: flex;
    flex-direction: column;
    flex: 1;
  }

  /* Стили для анимации перехода между страницами */
  .fade-enter-active {
    transition: opacity 1s ease;
  }

  .fade-leave-active {
    transition: none;
    display: none;
    opacity: 0;
  }

  .fade-enter-from, .fade-leave-to {
    opacity: 0;
  }
  .fade-enter-to, .fade-leave-from {
    opacity: 1;
  }

}

@include small-mobile {
  .desktop-selectable-entity {
    &__btn {
      font-size: 1.2em;
    }
  }
}

</style>