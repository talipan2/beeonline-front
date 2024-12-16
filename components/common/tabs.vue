<template>
  <div class="tabs-secondary">
    <template v-for="(tab, index) in tabs" :key="index">
      <button 
        class="tabs-secondary__tab"
        :class="{'tabs-secondary__tab_type_active': modelValue === tab.value}"
        @click="selectTab(tab.value)"
      >
        {{ tab.label }}
      </button>
    </template>
  </div>
</template>

<script setup>

const props = defineProps({
  modelValue: {
    type: String,
    required: true
  },
  tabs: {
    type: Array,
    required: true,
  },
})

const emit = defineEmits(['update:modelValue']);

const selectTab = (tab) => {
  emit('update:modelValue', tab);
}

</script>

<style lang="scss">

.tabs-secondary {
  display: flex;
  font-size: 1rem;
  background-color: #fff;
  border-radius: .4em;
  padding: .6em;
  gap: .6em;

  &__tab {
    flex: 1 1 auto;
    font-size: 1.4em;
    font-weight: 600;
    line-height: 1.4em;
    padding: .57em 1.5em;
    border-radius: .4em;
    background: #fff;
    color: #989898;
    transition: box-shadow .2s ease-in, color .2s ease-in;

    &_type_active {
      color: #2e3241;
      box-shadow: 0 1px 4px 0 rgba(33, 33, 52, 0.08), 0 1px 2px 0 rgba(33, 33, 52, 0.06);
    }

    &:hover {
      color: #2e3241;
      box-shadow: 0 1px 4px 0 rgba(33, 33, 52, 0.08), 0 1px 2px 0 rgba(33, 33, 52, 0.06);
    }
  }
}

</style>