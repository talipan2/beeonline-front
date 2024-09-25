<template>
  <UiModal 
      class="alert" 
      v-model="settingStore.alertModal.isOpen" 
      @confirm="() => confirm()" 
      :overlayHide="true" 
      :class="status"
      background="interactive"
      :focusTrap="false"
    >
    <template #content>
      <div class="alert-container">
        <div class="alert__content">
          <div class="alert__timer"></div>
          <p class="alert__text">{{ text }}</p>
        </div>
        </div>
    </template>
  </UiModal>
</template>

<script setup>
import { useSettingStore } from '~/store/settingStore';

const props = defineProps({
  status: {
    type: String,
    default: 'success',
    validator: value => ['success', 'error'].includes(value),
  }
})

const settingStore = useSettingStore();

watch(() =>  settingStore.alertModal.isOpen, (newVal) => {
  if(newVal === true) {
    setTimeout(() => {
      settingStore.alertModal.isOpen = false;
    }, 5000)
  }
});

const status = computed(() => settingStore.alertModal.status)
const text = computed(() => settingStore.alertModal.text)

const confirm = () => {
  settingStore.alertModal.isOpen = false;
}

</script>

<style lang="scss">

.alert {

  bottom: 0;
  pointer-events: none;

  .modal-dialog {
    bottom: 2%;
    top: auto;
    max-width: 30rem;
    width: 100%;
  }

  .modal-body {
    padding: 1rem;
  }
}

.error {
  .modal-body {
    background-color: #fff;
    box-shadow: var(--box-shadow-primary);
    border: none;
    font-size: 1.4rem;
    font-family: 'fira-sans', sans-serif;
  }
  
  .modal-content {
    .modal-close {
      top: 50%;
      right: 1rem;
      transform: translateY(-50%);
      
      svg {
        width: 1.5rem;
      }
    }

    .alert__text {
      color: var(--text-color-danger);
      line-height: 1em;
    }
  }
}

    // Таймер-индикатор
.alert__timer {
  position: absolute;
  top: 0;
  left: 0;
  height: 2px;
  width: 100%;
  background-color: var(--text-color-danger);
  animation: shrink 5s linear forwards;
}


@keyframes shrink {
  0% {
    width: 100%;
  }
  100% {
    width: 0;
  }
}

</style>