<template>
  <Form @submit="handleSubmit" as="form">
    <slot />
  </Form>
</template>

<script setup>

const props = defineProps({
  submitFunc: {
    type: Function,
    default: null,
  }
})

const loading = ref(false);

const handleSubmit = (values, form) => {
  if (loading.value) return;
  
  loading.value = true;

  props.submitFunc(values, form).finally(() => loading.value = false);
};
</script>
