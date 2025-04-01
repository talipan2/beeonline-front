<template>
  <form @submit="onSubmit" as="form">
    <slot/>
  </form>
</template>

<script setup>

const props = defineProps({
  submit: {
    type: Function,
    default: null,
  }
})

const emit = defineEmits(['setError']);

const { handleSubmit, errors } = useForm();

const loading = ref(false);

const onSubmit = handleSubmit(async (values, form) => {
  if (!props.submit || loading.value) return;

  loading.value = true;

  try {
    await props.submit(values, form);
  } catch (error) {
    console.log(error);
    const errors = error.data.errors;
    form.setErrors(errors);
    for (let key in errors) {
        form.setFieldTouched(key, true);
    }
    form.evt.target.scrollIntoView({ behavior: "smooth", block: "center" });
    scrollToError(errors);
    emit('setError', errors);
  } finally {
    loading.value = false;
  }
}, (errors) => {
    console.log(errors);
  // Обработка ошибок
  scrollToError(errors.errors);
  emit('setError', errors.errors);
});

// Очистка ошибок при валидной форме
watch(errors, (newErrors) => {
  if (Object.keys(newErrors).length === 0) {
    emit("setError", {});
  }
});
</script>
