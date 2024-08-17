<template>
  <VueFinalModal
    class=""
    :content-class="contentClass"
    overlay-transition="vfm-fade"
    content-transition="vfm-slide-up"
    :clickToClose="clickToClose"
    :escToClose="clickToClose"
  >
    <div class="modal-content">

      <a href="javascript:;"
        class="btn-close close btn"
        @click="$emit('update:modelValue', false)"
        v-if="clickToClose"
      ></a>
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
  }
},
computed: {
  contentClass: function () {
    return `modal-dialog ${this.colClass}`
  }
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

.modal-content {
}

.modal-title {
  font-family: fira-sans, sans-serif;
  font-size: 2.4rem;
  margin-bottom: 2rem;
}

.modal {
  .vfm--overlay{
    background-color: rgba(0, 0, 0, 0.9);
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
    margin-right: 7%;
    left: auto;
    transform: none;
  }

  .vfm--overlay{
    background-color: rgba(0, 0, 0, 0.9);
  }
}
</style>