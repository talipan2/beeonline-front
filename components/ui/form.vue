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
  console.log(form)
  if (!props.submit || loading.value) return;

  loading.value = true;

  console.log(props.submit)

  try {
    await props.submit(values, form);
  } finally {
    loading.value = false;
  }
}, (errors) => {
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
