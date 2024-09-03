<template>
  <Tippy
    ref="tippy"
    :interactive="true"
    :hideOnClick="true"
    trigger="click"
    :placement="placement"
    :offset="calculateOffset"
    :arrow="arrow"
  >
    <slot/>
    <template #content>
      <div class="dropdown">
        <slot name="content"></slot>
      </div>
    </template>
    </Tippy>
</template>

  <script setup>

  const props = defineProps({
    placement: {
      type: String,
      default: 'top-end',
    },
    arrow: {
      type: Boolean,
      default: true
    }
  });

  const tippy = ref(null);
  defineExpose({ tippy });

  const calculateOffset = ({ placement }) => {
  if(props.placement === 'bottom-end') {
    return [0, 5];
  } else {
    if (placement.startsWith('top')) {
    return [0, 0]; // Смещение 0
  }
  if (placement.startsWith('bottom')) {
    return [0, 20]; // Смещение больше
  }
  return [0, 5]; // Небольшое смещение
  }

};

</script>