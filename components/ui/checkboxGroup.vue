<template>
  <Field
    :rules="rules"
    v-model="internalValue"
    v-slot="{ errors }"
    :name="name"
    :label="label"
  >
    <div class="checkbox-group" :class="$attrs.class">
      <UiCheckbox
        v-for="option in visibilityElement"
        :key="option.id"
        :id="option.id"
        :label="label"
        :modelValue="isChecked(option.id)"
        :disabled="disabled(option.id)"
        :indeterminate="indeterminate"
        :required="required"
        @update:modelValue="handleChange(option.id, $event)"
        :variant="variant"
        :isValidated="false"
        :name="`${name}-${option.id}`"
        :class="{ invalid: errors.length }"
      >
        {{ option.label }}
      </UiCheckbox>
      <div class="invalid-error" v-if="isValidated">
        <span v-if="errors.length" class="invalid-error__text">{{
          errors[0]
        }}</span>
      </div>
    </div>
    <UiButton
      class="checkbox-group__btn"
      :class="{ 'checkbox-group__btn_type_active': showAllElement }"
      type="button"
      @click="() => (showAllElement = !showAllElement)"
      :variant="typeButton.variant"
      :size="typeButton.size"
      v-if="isDropDown"
    >
      {{ showAllElement ? "Свернуть" : "Показать еще" }}
      <slot name="btn-image" />
    </UiButton>
  </Field>
</template>

<script setup>

const props = defineProps({
  modelValue: {
    type: Array,
    default: () => [],
  },
  options: {
    type: Array,
    required: true,
  },
  variant: {
    type: String,
    default: "square",
    validator: (value) => ["square", "round"].includes(value),
  },
  required: {
    type: Boolean,
    default: false,
  },
  indeterminate: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Function,
    default: () => false,
  },
  rules: {
    type: [String, Object],
    default: "",
  },
  isValidated: {
    type: Boolean,
    default: true,
  },
  name: {
    type: String,
    default: "",
  },
  label: {
    type: String,
    default: "",
  },
  isDropDown: {
    type: Boolean,
    default: false,
  },
  priorityShowed: {
    type: Array,
    default: () => [],
  },
  countShowed: {
    type: Number,
    default: 4,
  },
  typeButton: {
    type: Object,
    default: () => ({
      variant: "tertiary",
      size: "large",
    }),
  },
});

const emit = defineEmits(["update:modelValue"]);
const internalValue = ref([...props.modelValue]);
const showAllElement = ref(false);

const sortedOptions = computed(() => {
  const priorityOptions = props.options.filter((option) =>
    props.priorityShowed.includes(option.id)
  );
  const remainingOptions = props.options.filter(
    (option) => !props.priorityShowed.includes(option.id)
  );
  return [...priorityOptions, ...remainingOptions];
});

const visibilityElement = computed(() =>
  (showAllElement.value && props.isDropDown) || !props.isDropDown
    ? sortedOptions.value
    : sortedOptions.value.slice(0, props.countShowed)
);

watch(
  () => props.modelValue,
  (newValue) => {
    internalValue.value = [...newValue];
  }
);

const isChecked = (id) => {
  return internalValue.value.includes(id);
};

const handleChange = (id, isChecked) => {
  if (isChecked) {
    if (!internalValue.value.includes(id)) {
      internalValue.value.push(id);
    }
  } else {
    internalValue.value = internalValue.value.filter((item) => item !== id);
  }
  emit("update:modelValue", [...internalValue.value]);
};
</script>

<style lang="scss">
.checkbox-group {
  display: flex;
  flex-wrap: wrap;
  gap: 1.6rem;

  .checkbox__label {
    font-size: 1.6rem;
  }

  &__btn {
    font-size: 1rem;
    margin-top: 1em;
    width: 50%;
    text-transform: uppercase;
  }
}
</style>
