<template>
  <Tippy
    ref="filterModal"
    class="tippy"
    :interactive="true"
    :hideOnClick="true"
    :placement="'bottom-start'"
    arrow="false"
    :maxWidth="744"
  >
    <slot/>
    <template #content>
      <div class="filter-modal">
        <h2>12313123123</h2>
      </div>
    </template>
    </Tippy>
</template>

<script setup>

const filterModal = ref(null);

</script>