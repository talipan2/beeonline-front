<template>
  <div class="range-slider">
    <div class="form-group">
      <div class="form-group-data">
        <UiInput v-model="sliderData[0]" class="form-group__value input_type_min" name="min"/>
      </div>
      <div class="form-group-data">
        <UiInput v-model="sliderData[1]" class="form-group__value input_type_max" name="max" />
      </div>
    </div>

    <Slider v-model="sliderData" :min="min" :max="max" :tooltips="false"  :lazy="false"/>
  </div>
</template>

<script setup>

const props = defineProps({ 
  modelValue: {
    type: Array,
    default: () => ([0, 10000]),
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

const sliderData = ref(props.modelValue);
const emit = defineEmits(['update:modelValue']);

watch(() => sliderData.value, (newVal) => {
  emit('update:modelValue', newVal);
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