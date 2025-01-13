<template>
  <UiModal 
      class="alert" 
      v-model="settingStore.alertModal.isOpen" 
      @confirm="() => confirm()" 
      :overlayHide="true" 
      :class="status"
      background="interactive"
      :focusTrap="false"
      :lockScroll="false"
    >
    <template #content>
      <div class="alert-container">
        <div class="alert__content">
          <!-- <div class="alert__timer"></div> -->
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
    default: 'error',
    validator: value => ['success', 'error'].includes(value),
  }
})

const settingStore = useSettingStore();

watch(() =>  settingStore.alertModal.isOpen, (newVal) => {
  if(newVal === true) {
    setTimeout(() => {
      confirm();
      settingStore.alertModal.text = null;
      settingStore.alertModal.status = null;
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
    max-width: 50rem;
    width: 100%;
  }

  .modal-body {
    font-family: 'fira-sans', sans-serif;
    font-size: 1.4rem;
    padding: 1rem 3rem 1rem 1rem;
    background-color: #fff;
    border: 2px solid transparent;
    overflow: hidden;
  }
  
  .modal-content {
    .modal-close {
      top: 50%;
      right: 1rem;
      transform: translateY(-50%);
      
      svg {
        width: 2rem;
      }
    }

    .alert__text {
      line-height: 1.5em;
      text-align: center;
    }
  }
}

.error {
  .alert__text {
    color: var(--text-color-danger);
  }

  .modal-body {
    border-color: var(--text-color-danger);
  }

  .modal-close {
    svg {
      fill: var(--text-color-danger);
    }
  }
}

.success {
  .alert__text {
    color: var(--text-color-success);
  }

  .modal-body {
    border-color: var(--text-color-success);
  }

  .modal-close {
    svg {
      fill: var(--text-color-success);
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
  background-color: var(--text-color-ternary);
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