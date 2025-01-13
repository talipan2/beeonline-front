<template>
  <VueFinalModal
    class=""
    :content-class="contentClass"
    overlay-transition="vfm-fade"
    :hideOverlay="overlayHide"
    content-transition="vfm-fade"
    :clickToClose="clickToClose"
    :escToClose="true"
    :background="background"
    :lockScroll="lockScroll"
  >
    <div class="modal-content">

      <button href="javascript:;"
        class="modal-close"
        @click="$emit('update:modelValue', false)"
        v-if="closeButton"
      >
        <SvgoClose class="svg-l" />
      </button>
      <div class="modal-header" v-if="$slots.header">
        <h5 class="modal-title">
          {{ title }}
        </h5>
        <slot name="header" />
      </div>
      <div class="modal-body">
        <slot name="content"/>
      </div>
      <div class="modal-footer" v-if="$slots.footer">
        <slot name="footer" />
      </div>
    </div>
  </VueFinalModal>
</template>

<script>
import { VueFinalModal } from "vue-final-modal";

export default {
components: {
  VueFinalModal
},
props: {
  title: {
    type: String,
    default: "Заголовок"
  },
  colClass: {
    type: String,
    default: ""
  },
  clickToClose: {
    type: Boolean,
    default: true,
  },
  closeButton: {
    type: Boolean,
    default: true
  },
  overlayHide: {
    type: Boolean,
    default: false
  },
  background: {
    type: String,
    default: "non-interactive",
  },
  lockScroll: {
    type: Boolean,
    default: true
  }

},
computed: {
  contentClass: function () {
    return `modal-dialog ${this.colClass}`
  }
},

methods: {
    customLockScroll(isLock) {
      const screenWidth = window.innerWidth;

      if (isLock) {
        // Блокируем прокрутку
        document.body.style.overflow = 'hidden';

        // Компенсируем padding-right только на десктопах
        if (screenWidth > 768) {
          const scrollbarWidth =
            window.innerWidth - document.documentElement.clientWidth;
          document.body.style.paddingRight = `${scrollbarWidth}px`;
        }
      } else {
        // Сбрасываем прокрутку и padding
        document.body.style.overflow = '';
        document.body.style.paddingRight = '';
      }
    },
  },

}
</script>

<style lang="scss">
.modal-dialog {
  // max-width: 600px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.modal-close {
  position: absolute;
  right: 0.75em;
  top: 0.75em;
  background-color: rgba(0, 0, 0, 0);

}

.modal-title {
  font-family: fira-sans, sans-serif;
  font-size: 2.4rem;
  margin-bottom: 2rem;
}

.modal {
  .vfm--overlay{
    background-color: rgba(0, 0, 0, 0.6);
  }

  .modal-dialog {
    box-shadow: var(--box-shadow-primary);
  }

  .modal-content {
    background-color: white;
    box-sizing: border-box;
  }

  .modal-title {
    color: var(--text-color-monodecimal);
  }
}

.header-menu {
  .modal-dialog {
    top: 2rem;
    right: 0;
    padding-right: 7%;
    left: auto;
    transform: none;
  }

  .vfm--overlay{
    background-color: rgba(0, 0, 0, 0.9);
  }
}

.add-modal, .error-modal {
  .modal-dialog {
    width: 100%;
    max-width: 400px;

  }
  .modal-content {
    padding: 2rem;
  }
}


</style>