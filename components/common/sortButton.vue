<template>
  <div class="sort-btn">
    Сортировать:
    <UiNewDropdown :arrow="false" :placement="'bottom-start'" :offset="[0, 0]" ref="sortDropdown">
      <button class="sort-btn__btn">
        {{ currentSortList.label }}
        <SvgoDropDown class="svg-m" />
      </button>
      <template #content>
        <div class="dropdown__container">
          <button 
            v-for="item in sortList" 
            @click="changeSortList(item.id)" 
            class="dropdown__item" 
            :key="item.id"
            :class="{'dropdown__item_type_active': item.id === currentSortList.id}"
          >
            {{ item.label }}
          </button>
        </div>
      </template>
    </UiNewDropdown>
  </div>

</template>

<script setup>

const props = defineProps({
  sortList: {
    type: Array,
    required: true,
  },
  currentSortList: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(['changeSort']);
const sortDropdown = ref(null);

const changeSortList = (id) => {
  emit('changeSort', id);
  sortDropdown.value.tippy.hide();
}

</script>

<style lang="scss">

.sort-btn {
  font-size: 1em;
  margin-bottom: 1em;

  &__btn {
    display: flex;
    align-items: center;
    column-gap: .5em;

    @include hover {
      svg {
        fill: var(--text-color-ternary);
      }
    }
  }

  .dropdown__item_type_active {
    color: var(--text-color-hover-secondary);
  }
}

</style>