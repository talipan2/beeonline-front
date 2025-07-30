<template>
    <VueFinalModal
        class="modal"
        content-class="modal-vfm-content"
        overlay-transition="vfm-fade"
        :hideOverlay="overlayHide"
        overlay-class="custom-overlay"
        content-transition="vfm-fade"
        :clickToClose="clickToClose"
        :escToClose="true"
        :background="background"
        :lockScroll="lockScroll"
        @closed="$emit('update:modelValue', false)"
    >
        <div class="modal-dialog"
            @mousedown.self="() => $emit('update:modelValue', false)"
        >
            <div :class="[contentClass, {'modal-content_type_full' : fixedHeader}]">
                <button
                    href="javascript:;"
                    class="modal-close"
                    @click="$emit('update:modelValue', false)"
                    v-if="closeButton"
                    :class="{'modal-close_type_desktop' : fixedHeader}"
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
                    :class="{'modal-header_type_fixed' : fixedHeader}"
                    ref="modalHeader"
                >
                    <h5 class="modal-title">
                        {{ title }}
                    </h5>
                    <div class="modal-header__container">
                        <button
                            href="javascript:;"
                            class="modal-fixed-header__btn modal-fixed-header__btn_type_left"
                            @click="$emit('update:modelValue', false)"
                            v-if="closeButton"
                        >
                            <SvgoBtnArrow class="svg-l" />
                        </button>
                        <h5 class="modal-fixed-header__title">
                            {{ title }}
                        </h5>
                        <button
                            href="javascript:;"
                            class="modal-fixed-header__btn modal-fixed-header__btn_type_right"
                            @click="$emit('update:modelValue', false)"
                            v-if="closeButton"
                        >
                            <SvgoClose class="svg-l" />
                        </button>
                    </div>
                </div>
                <div class="modal-body" ref="modalBody">
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

<script setup>
    import { VueFinalModal } from 'vue-final-modal'

    const props = defineProps({
        title: {
            type: String,
            default: '',
        },
        colClass: {
            type: String,
            default: '',
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
            default: 'non-interactive',
        },
        lockScroll: {
            type: Boolean,
            default: true,
        },
        size: {
            type: String,
            default: 'md',
            validator: (value) => ['xs', 'sm', 'md', 'lg', 'xl'].includes(value),
        },
        fixedHeader: {
            type: Boolean,
            default: false,
        }
    })

    const emit = defineEmits(['update:modelValue'])

    const modalHeader = ref(null)
    const modalBody = ref(null)
    const headerHeight = ref(0)
    const isMobile = ref(false)
    const router = useRouter()

    // Вычисляемый класс для контента модалки
    const contentClass = computed(() => {
        return `modal-content modal-content-${props.size} ${props.colClass}`
    })

    // Закрытие модалки при изменении маршрута
    watch(() => router.currentRoute.value, () => {
        emit('update:modelValue', false)
    }, {deep: true})

    // Расчёт высоты хидера и применение отступа
    const calculateHeaderHeight = () => {
        if (props.fixedHeader && modalHeader.value) {
            headerHeight.value = modalHeader.value.getBoundingClientRect().height
            if(window.innerWidth < 768) {
                isMobile.value = true;
            } else {
                isMobile.value = false;
            }
            applyContentPadding()
        }
    }

    // Установка padding-top для контента
    const applyContentPadding = () => {
        if (modalBody.value && props.fixedHeader && isMobile.value) {
            modalBody.value.style.paddingTop = `${headerHeight.value}px`
        } else if (modalBody.value) {
            modalBody.value.style.paddingTop = '0px'
        }
    }

    // Обработчик ресайза
    const handleResize = () => {
        calculateHeaderHeight()
    }

    watch(() => modalHeader.value, () => {
        calculateHeaderHeight()
    })

    onMounted(async() => {
        if (props.fixedHeader) {
            window.addEventListener('resize', handleResize)
            handleResize();
        }
    })

    onBeforeUnmount(() => {
        if (props.fixedHeader) {
            window.removeEventListener('resize', handleResize)
        }
    })
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

    @include mobile {
        &_type_desktop {
            display: none;
        }

    }
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

    &_type_full {


        @include mobile {
            min-height: 100%;
            max-width: 100%;
            display: flex;
            flex-direction: column;

            .modal-body {
                height: 100%;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                flex: 1;
            }
        }
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

    .custom-overlay {
        background-color: rgba(0, 0, 0, 0.6);
    }

    .modal-header {
        &__container {
            display: none;
            justify-content: space-between;
            padding-inline: var(--container-padding-x);
            padding-block: 1rem;
            box-shadow: 0 2px 20px 0 rgba(121, 121, 121, 0.1);
        }

        @include mobile {
            &_type_fixed {
                position: fixed;
                z-index: 2;
                left: 0;
                right: 0;
                top: 0;
                background-color: #fff;

                .modal-header__container {
                    display: flex;
                }

                .modal-title {
                    display: none;
                }
            }
        }


        .modal-fixed-header__btn_type_left {
            transform: rotate(180deg);
        }
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
