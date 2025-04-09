<template>
  <div class="range-slider">
    <div class="form-group">
      <div class="form-group-data">
        <UiInput 
          v-model="sliderMin" 
          class="form-group__value input_type_min" 
          name="min"
          type="number"
          :min="min"
          :max="max"
        />
      </div>
      <div class="form-group-data">
        <UiInput 
          v-model="sliderMax" 
          class="form-group__value input_type_max" 
          name="max"
          type="number"
          :min="min"
          :max="max"
        />
      </div>
    </div>
    <Slider 
      v-model="sliderData" 
      :min="min" 
      :max="max" 
      :tooltips="false"  
      :lazy="false"
    />
  </div>
</template>

<script setup>
import { ref, watch, computed } from 'vue';

const props = defineProps({ 
  modelValue: {
    type: Array,
    default: () => [0, 10000],
  },
  min: {
    type: Number,
    default: 0,
  },
  max: {
    type: Number,
    default: 10000,
  },
});

const emit = defineEmits(['update:modelValue']);

// Внутреннее состояние
const sliderData = ref([...props.modelValue]);

// Синхронизация с внешними изменениями modelValue
watch(() => props.modelValue, (newVal) => {
  if (JSON.stringify(newVal) !== JSON.stringify(sliderData.value)) {
    sliderData.value = [...newVal];
  }
}, { deep: true });

// Отслеживание изменений sliderData и вызов emit
watch(sliderData, (newVal) => {
  const clampedValue = [
    Math.max(props.min, newVal[0]),
    Math.min(props.max, newVal[1]),
  ];
  
  if (
    clampedValue[0] !== newVal[0] ||
    clampedValue[1] !== newVal[1]
  ) {
    sliderData.value = clampedValue;
    return;
  }

  emit('update:modelValue', [...newVal]);
}, { deep: true });

// Отдельные computed-свойства для инпутов (опционально)
const sliderMin = computed({
  get: () => sliderData.value[0],
  set: (val) => {
    const numVal = Math.max(props.min, Math.min(props.max, Number(val)));
    sliderData.value = [numVal, sliderData.value[1]];
  },
});

const sliderMax = computed({
  get: () => sliderData.value[1],
  set: (val) => {
    const numVal = Math.max(props.min, Math.min(props.max, Number(val)));
    sliderData.value = [sliderData.value[0], numVal];
  },
});

// Если min/max могут меняться, добавляем их в watch
watch([() => props.min, () => props.max], () => {
  sliderData.value = [
    Math.max(props.min, sliderData.value[0]),
    Math.min(props.max, sliderData.value[1]),
  ];
});
</script>

<style lang="scss">

.range-slider {
  .form-group {
    column-gap: 1rem;
  }

  .input_type_max::before {
    content: 'до';
    margin-right: .5em;
  }

  .input_type_min::before {
    content: 'от';
    margin-right: .5em;
    
  }
}

</style>