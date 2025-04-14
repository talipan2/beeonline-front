<template>
  <div ref="container" class="selectable-buttons">
    <div class="selectable-buttons__list" ref="listRef">
      <!-- Все кнопки рендерятся, но часть скрывается CSS -->
      <template v-for="(item, index) in options" :key="index">
        <UiButton
          ref="buttons"
          type="button"
          class="selectable-buttons__btn"
          :class="{ 'is-hidden': !isExpanded && index >= visibleCount, 'is-active': modelValue.includes(item.id) }"
          variant="secondary"
          size="small"
          @click="toggleSelection(item)"
        >
          {{ item.name }}
        </UiButton>
      </template>
      <UiButton
        v-if="showMoreButton"
        type="button"
        class="selectable-buttons__more"
        variant="quinary"
        size="small"
        @click="toggleExpand"
      >
        {{ isExpanded ? 'Свернуть' : 'Еще' }}
      </UiButton>
    </div>
    <slot />
    <div class="selectable-buttons__select-list">
      <template v-for="(item, index) in selectedList" :key="index">
        <UiButton
          type="button"
          class="selectable-buttons__btn selectable-buttons__btn-delete"
          variant="quinary"
          size="small"
          @click="deleteItem(item)"
        >
          {{ item.name }}
          <SvgoCancel class="svg-m selectable-buttons__btn-delete" />
        </UiButton>
      </template>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  modelValue: { 
    type: Array, 
    default: () => [] 
  },
  options: { 
    type: Array, 
    default: () => [] 
  },
})

const container = ref(null)
const listRef = ref(null)
const buttons = ref([])
const isExpanded = ref(false)
const visibleCount = ref(0)
const resizeObserver = ref(null)
const selectedList = ref([])

const showMoreButton = computed(() => {
  return buttons.value.length > visibleCount.value
})

const emit = defineEmits(['update:modelValue'])

function toggleSelection(button) {
  const buttonId = button.id; // Получаем id из объекта кнопки
  
  if (props.modelValue.includes(buttonId)) {
    // Удаляем id из modelValue
    const newIds = props.modelValue.filter(id => id !== buttonId);
    emit('update:modelValue', newIds);
  } else {
    // Добавляем id в modelValue
    emit('update:modelValue', [...props.modelValue, buttonId]);
  }
}

function deleteItem(item) {
  const buttonId = item.id; // Получаем id из объекта кнопки
  if (props.modelValue.includes(buttonId)) {
    // Удаляем id из modelValue
    const newIds = props.modelValue.filter(id => id !== buttonId);
    emit('update:modelValue', newIds);
  } else {
    return
  }
}

function toggleExpand() {
  isExpanded.value = !isExpanded.value
}

function getComputedGap(element) {
  const styles = window.getComputedStyle(element)
  
  // Пробуем современное свойство и префиксные варианты
  const gap = styles.gap || 
              styles.columnGap || 
              styles.rowGap || 
              styles['-webkit-gap'] || 
              styles['-moz-gap'] || 
              '0 0'
  
  // Разбираем значение (может быть "8px 12px" для row/column раздельно)
  const gaps = gap.split(/\s+/).map(g => {
    if (g.endsWith('rem')) return parseFloat(g) * 16
    if (g.endsWith('em')) return parseFloat(g) * parseFloat(styles.fontSize)
    return parseFloat(g)
  })
  
  // Возвращаем среднее значение gap
  return gaps.reduce((sum, val) => sum + val, 0) / gaps.length
}

function calculateVisible() {
  if (!container.value || buttons.value.length === 0) return

  const gap = getComputedGap(listRef.value)
  const containerWidth = container.value.offsetWidth
  let totalWidth = 0
  let count = 0
  const moreBtnWidth = showMoreButton.value ? 80 : 0

  for (const [index, btn] of buttons.value.entries()) {
    if (!btn?.$el) continue
    
    const btnWidth = btn.$el.offsetWidth
    const currentGap = index > 0 ? gap : 0
    const newTotalWidth = totalWidth + currentGap + btnWidth
    
    if (newTotalWidth + (showMoreButton.value ? gap + moreBtnWidth : 0) > containerWidth && count > 0) {
      break
    }
    
    totalWidth = newTotalWidth
    count++
  }

  if (visibleCount.value !== count) {
    visibleCount.value = count
  }
}

// Отслеживаем появление кнопок
watch(() => [...buttons.value], () => {
  nextTick(calculateVisible);
});

// Также отслеживаем изменения options
watch(() => props.options, () => {
  nextTick(() => {
    calculateVisible()
  })
})

watch(() => [...props.modelValue, ...props.options], () => {
  selectedList.value = props.options.filter(item => 
    props.modelValue.includes(item.id)
  );
}, { immediate: true });


onMounted(() => {
  // Инициализация при монтировании, если кнопки уже есть
  if (buttons.value.length > 0) {
    nextTick(() => {
      calculateVisible()
    })
  }
})

</script>

<style lang="scss">
.selectable-buttons {
  width: 100%;
  font-size: 1rem;
  margin-bottom: 2em;

  &__list {
    display: flex;
    flex-wrap: wrap;
    gap: 1em;
    margin-bottom: 4em;
  }

  &__btn {
    font-size: 1.6em;
    line-height: 1.5em;
    font-weight: 500;
    background-color: #f0eff4;
    &.is-hidden {
      display: none;
    }
    &.is-active {
      border: 2px solid #6937a5;
    }

    &-delete {
      background-color: var(--button-background-primary);
      column-gap: .5em;

      @include hover {
        background-color: var(--button-background-primary);
        color: var(--text-color-octonary);

        svg{
          path {
            fill: var(--text-color-octonary);
          }
        }
      }
    }
  }

  &__more {
    font-size: 1.6em;
    line-height: 1.5em;
    font-weight: 500;
    width: 8.43em;
  }

  &__select-list {
    display: flex;
    flex-wrap: wrap;
    gap: 1em;
  }
}
</style>