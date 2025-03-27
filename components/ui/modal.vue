<template>
    <VueFinalModal
        class="modal"
        content-class="modal-vfm-content"
        overlay-transition="vfm-fade"
        :hideOverlay="overlayHide"
        content-transition="vfm-fade"
        :clickToClose="clickToClose"
        :escToClose="true"
        :background="background"
        :lockScroll="lockScroll"
        @closed="$emit('update:modelValue', false)"
    >
        <div class="modal-dialog"
            @click.self="() => $emit('update:modelValue', false)"
        >
            <div :class="contentClass">
                <button
                    href="javascript:;"
                    class="modal-close"
                    @click="$emit('update:modelValue', false)"
                    v-if="closeButton"
                >
                    <SvgoClose class="svg-l" />
                </button>
                <div
                    class="modal-header"
                    v-if="$slots.header"
                >
                    <h5 class="modal-title" v-if="title?.length">
                        {{ title }}
                    </h5>
                    <slot name="header" />
                </div>
                <div
                    class="modal-header"
                    v-else-if="title?.length"
                >
                    <h5 class="modal-title">
                        {{ title }}
                    </h5>
                </div>
                <div class="modal-body">
                    <slot name="content" />
                </div>
                <div
                    class="modal-footer"
                    v-if="$slots.footer"
                >
                    <slot name="footer" />
                </div>
            </div>
        </div>
    </VueFinalModal>
</template>

<script>
import { VueFinalModal } from "vue-final-modal";

export default {
    emits: ["update:modelValue"],
    components: {
        VueFinalModal,
    },
    props: {
        title: {
            type: String,
            default: "",
        },
        colClass: {
            type: String,
            default: "",
        },
        clickToClose: {
            type: Boolean,
            default: true,
        },
        closeButton: {
            type: Boolean,
            default: true,
        },
        overlayHide: {
            type: Boolean,
            default: false,
        },
        background: {
            type: String,
            default: "non-interactive",
        },
        lockScroll: {
            type: Boolean,
            default: true,
        },
        size: {
            type: String,
            default: "md",
            validator: (value) =>
                ["xs", "sm", "md", "lg", "xl"].includes(value),
        },
    },
    computed: {
        contentClass: function () {
            return `modal-content modal-content-${this.size} ${this.colClass}`;
        },
    },

    methods: {
        customLockScroll(isLock) {
            const screenWidth = window.innerWidth;
            const headerFixed = document.querySelector(".header");

            if (isLock) {
                // Блокируем прокрутку
                document.body.style.overflow = "hidden";

                // Компенсируем padding-right только на десктопах
                if (screenWidth > 768) {
                    const scrollbarWidth =
                        window.innerWidth -
                        document.documentElement.clientWidth;
                    document.body.style.paddingRight = `${scrollbarWidth}px`;
                    headerFixed.style.paddingRight = `${scrollbarWidth}px`;
                    console.log(scrollbarWidth);
                }
            } else {
                // Сбрасываем прокрутку и padding
                document.body.style.overflow = "";
                document.body.style.paddingRight = "";
            }
        },
    },
};
</script>

<style lang="scss">
.modal-vfm-content {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
}
.modal-dialog {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    height: 100%;
    overflow: auto;
    inset: 0;
    padding: var(--container-padding-x);

    @include small-tablet {
        align-items: normal;
    }
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

.modal-content {
    position: relative;
    width: 100%;
    max-width: 100%;
    // margin: auto;
    flex-grow: 1;
    box-shadow: var(--box-shadow-primary);
    margin-block: auto;

    &-xs {
        padding: 1em;
        max-width: 40em;
    }

    &-md {
        padding: 2em;
        max-width: 60em;
    }

    &-lg {
        padding: 2em;
        max-width: 82.5em;
    }

    &-xl {
        padding: 2em;
        max-width: 110em;
    }
}

.modal {
    font-size: 1rem;
    .vfm--overlay {
        background-color: rgba(0, 0, 0, 0.6);
    }

    .modal-content {
        // padding: 1em;
        background-color: white;
        box-sizing: border-box;
    }

    .modal-title {
        color: var(--text-color-monodecimal);
    }
}

.header-menu {

    .modal-dialog {
        align-items: flex-start;
        padding: 0;
    }

    .modal-content {
        box-shadow: none;
        top: 2rem;
        right: 0;
        padding-right: 7%;
        left: auto;
        transform: none;
    }

    .modal-body {
        margin-left: auto;
    }

    .vfm--overlay {
        background-color: rgba(0, 0, 0, 0.9);
    }
}

.add-modal,
.error-modal {
    .modal-dialog {
        width: 100%;
        max-width: 400px;
    }
    .modal-content {
        padding: 2rem;
    }
}
</style>
