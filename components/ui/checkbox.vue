<template>
    <Field
        :rules="rules"
        v-slot="{ field, errors }"
        type="checkbox"
        :name="name"
        :value="true"
        :unchecked-value="false"
        :label="label"
    >
        <div :class="['checkbox', className, field.class, $attrs.class]">
            <label class="checkbox__label">
                <input
                    type="checkbox"
                    class="checkbox__input"
                    v-bind="field"
                    :disabled="disabled"
                    :readonly="readonly"
                    :indeterminate="indeterminate"
                />
                <div class="checkbox__icon"></div>
                <slot></slot>
            </label>
            <div
                class="invalid-error"
                v-if="isValidated"
            >
                <span
                    v-if="errors.length"
                    class="invalid-error__text"
                    >{{ errors[0] }}</span
                >
            </div>
        </div>
    </Field>
</template>

<script setup>
import { ref, computed } from "vue";

const props = defineProps({
    variant: {
        type: String,
        default: "square",
        validator: (value) => ["square", "round", "rounded"].includes(value),
    },
    disabled: {
        type: Boolean,
        default: false,
    },
    readonly: {
        type: Boolean,
        default: false,
    },
    indeterminate: {
        type: Boolean,
        default: false,
    },
    name: {
        type: String,
        default: "",
    },
    label: {
        type: String,
        default: "",
    },
    rules: {
        type: [String, Object],
        default: "",
    },
    isValidated: {
        type: Boolean,
        default: true,
    },
});

// const emit = defineEmits(['update:modelValue']);
// const internalValue = ref(props.modelValue);

const className = computed(() => {
    let classList = [];
    if (props.variant === "round") {
        classList.push("checkbox_type_round");
    }
    if (props.variant === "square") {
        classList.push("checkbox_type_square");
    }
    if (props.variant === "rounded") {
        classList.push("checkbox_type_rounded");
    }
    if (props.disabled) {
        classList.push("checkbox_disabled");
    }
    if (props.readonly) {
        classList.push("checkbox_readonly");
    }
    return classList.join(" ");
});

// function emitChange() {
//   emit('update:modelValue', internalValue.value);
// }

// watch(() => props.modelValue, (newValue) => {
//   internalValue.value = newValue;
// });
</script>

<style lang="scss">
.invalid {
    .checkbox__icon::before {
        border-color: var(--text-color-danger);
    }
}

.checkbox__label {
    cursor: pointer;
    display: flex;
    align-items: center;
    flex-wrap: nowrap;
    width: fit-content;
}

.checkbox__input {
    position: absolute;
    z-index: -1;
    opacity: 0;
}

.checkbox__icon {
    width: 1.8rem;
    height: 1.8rem;
    margin-right: 1rem;
}

.checkbox__icon::before {
    content: "";
    display: inline-block;
    width: 1.8rem;
    height: 1.8rem;
    box-sizing: border-box;
    flex-shrink: 0;
    flex-grow: 0;
    border: 1px solid #adb5bd;
    margin-right: 0.5rem;
    background-repeat: no-repeat;
    background-position: center center;
    background-size: 100%;
    background-color: #fff;
    border: 1px solid #c4c4c4;
    border-radius: 2px;
    min-width: 1rem;
    position: relative;
    transition: border-color 0.2s ease-in-out;
}

.checkbox_type_square .checkbox__input:checked + .checkbox__icon::before {
    background-image: url("@/assets/svg/checked.svg");
}

.checkbox__input:focus + .checkbox__icon::before {
    box-shadow: 0 0 0 0.2rem hsla(240, 2%, 87%, 0.5);
}

.checkbox__label:hover .checkbox__icon::before {
    border-color: #6937a5;
}

.checkbox_type_round .checkbox__input:checked + .checkbox__icon::before {
    background-image: url("@/assets/svg/checked-circle.svg");
}

.checkbox_type_square .checkbox__input:indeterminate + .checkbox__icon::before {
    background-image: url("@/assets/svg/checkbox-indeterminate.svg");
}

.checkbox_type_round .checkbox__icon::before {
    border-radius: 50%;
}

.checkbox_type_rounded .checkbox__input:checked + .checkbox__icon::before {
    background-image: url("@/assets/svg/checked.svg");
}

.checkbox_type_rounded .checkbox__icon::before {
    border-radius: 4px;
}

.checkbox_disabled,
.checkbox__readonly {
    pointer-events: none;
    cursor: default;
}

.checkbox__label {
    font-size: 1.3rem;
    color: var(--text-color-primary);
    line-height: 1em;

    a:hover {
        text-decoration: underline;
        color: #44246c;
    }
}

.checkbox__input:disabled {
    cursor: not-allowed;

    & + .checkbox__icon::before {
        background-color: #e9ecef;
        border-color: #c4c4c4;
    }
}
</style>
