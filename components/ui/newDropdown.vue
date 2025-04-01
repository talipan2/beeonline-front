<template>
  <Tippy
    ref="tippy"
    class="tippy"
    :interactive="true"
    :hideOnClick="true"
    :trigger="trigger"
    :placement="placement"
    :offset="calculateOffset"
    :arrow="arrow"
    :maxWidth="maxWidth"
  >
    <slot/>
    <template #content>
      <div class="dropdown" :class="dropdownClass" @click="handleDropdownClick">
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
    },
    trigger: {
      type: String,
      default: 'click',
    },
    offset: {
      type: Array,
      default: () => ([]),
    },
    maxWidth: {
      type: String,
      default: '350',
    },
    dropdownClass: {
      type: String,
      default: '',
    },
  });

  const tippy = ref(null);

  const close = () => {
    tippy.value?.tippy.hide();
  };

  defineExpose({ tippy, close });

  const calculateOffset = ({ placement }) => {
    if (props.placement === 'bottom-end') {
      return props.offset.length > 0 ? props.offset : [0, 14];
    } else {
      if (placement.startsWith('top')) {
        return props.offset.length > 0 ? props.offset : [0, 0]; // Смещение 0
      }
      if (placement.startsWith('bottom')) {
        return props.offset.length > 0 ? props.offset : [0, 20]; // Смещение больше
      }
      return [props.offset.length > 0 ? props.offset : 0, 5]; // Небольшое смещение
    }
  };

  const handleDropdownClick = (event) => {
    // Закрываем только при клике на кнопки
    if (event.target.tagName === 'BUTTON') {
      close();
    }
  };



</script>

<style lang="scss"> 

.tippy {
  display: inline-block;
}

.tippy-box {
  border: none;
  box-shadow: 0 0 .5em rgba(0, 0, 0, 0.1);
}

.dropdown__container {
  display: flex;
  flex-direction: column;
  row-gap: .5rem;
  font-size: 1em;
  padding: 1.25em;

  .dropdown__item {
    line-height: 2em;
    padding-inline: .4em;
    width: 100%;
    text-align: left;

    &:hover {
      background-color: #e9ecef;
      color: #16181b;
    }
  }

  .dropdown__item_type_active {
    background-color: var(--button-background-primary);
  }
}


</style>