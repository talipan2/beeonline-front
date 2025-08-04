<template>
	<Field
		:name="name"
		:label="label"
		:rules="rules"
		ref="fieldRef"
		v-slot="{ errors, meta }"
		:class="$attrs.class"
	>
		<div
			class="drop-down-select-wrapper"
			:class="[
				$attrs.class,
				`drop-down-select-wrapper_variant_${variant}`,
				{ 'drop-down-select-wrapper_variant_no-border': !showBorder },
				{ invalid: errors.length && meta.touched },
			]"
		>
			<UiNewDropdown
				:arrow="false"
				placement="bottom-start"
				:offset="offset"
				class="drop-down-select"
				ref="dropdownRef"
			>
				<UiButton
					type="button"
					class="drop-down-select__dropdown-button"
					variant="elevated"
					:class="{
						'drop-down-select__dropdown-button_placeholder':
							selectedOption?.disabled,
					}"
					:key="selectKey"
				>
					<slot name="icon-left" />
					{{ selectedOption?.label }}
					<SvgoDropDownSecondary
						class="svg-m drop-down-select__dropdown-button-icon"
						:class="{ active: isOpen }"
					/>
				</UiButton>
				<template #content>
					<div class="drop-down-select__dropdown-content">
						<div class="drop-down-select__dropdown-list">
							<UiButton
								class="drop-down-select__dropdown-item"
								v-for="option in options"
								:key="option.id"
								variant="default"
								size="large"
								type="button"
								:without-padding="true"
								@click="(event) => handleSelect(option, event)"
								:disabled="option?.disabled"
								:class="{
									'drop-down-select__dropdown-item_selected':
										isOptionSelected(option),
								}"
							>
								{{ option.label }}
							</UiButton>
						</div>
					</div>
				</template>
			</UiNewDropdown>
			<div
				class="invalid-error"
				v-if="errorShow"
			>
				<span
					v-if="errors.length && meta.touched"
					class="invalid-error__text"
				>
					{{ errors[0] }}
				</span>
			</div>
		</div>
	</Field>
</template>

<script setup>
	import { useTranslateStore } from '~/store/translateStore';

	const props = defineProps({
		/** Текущее выбранное значение */
		modelValue: {
			type: String,
			default: null,
		},
		/** Массив опций для выбора. Каждая опция должна содержать {label, value || id} */
		options: {
			type: Array,
			default: () => [],
		},
		/** Имя поля для формы */
		name: {
			type: String,
			default: '',
		},
		/** Правила валидации */
		rules: {
			type: [String, Object],
			default: '',
		},
		/** Показывать ли ошибку валидации */
		errorShow: {
			type: Boolean,
			default: true,
		},
		/** Текст лейбла поля */
		label: {
			type: String,
			default: '',
		},
		/** Вариант отображения: 'default' | 'elevated' */
		variant: {
			type: String,
			default: 'default',
			validator: (value) =>
				['default', 'elevated', 'default-no-border'].includes(value),
		},
		/** Показывать ли border у кнопки */
		showBorder: {
			type: Boolean,
			default: true,
		},
		/** Возвращает value вместо id */
		returnValue: {
			type: Boolean,
			default: false,
		},
	});

	const fieldRef = ref(null);
	const dropdownRef = ref(null);
	const translateStore = useTranslateStore();

	const offset = computed(() => {
		if (props.variant === 'elevated') {
			return [0, 10];
		}
		return [0, 2];
	});

	const selectedOption = computed(() => {
		if (!props.modelValue) return props.options[0];
		if (props.returnValue) {
			return props.options.find((option) => option.value === props.modelValue);
		} else {
			return props.options.find((option) => option.id === props.modelValue);
		}
	});

	const isOptionSelected = (option) => {
		if (!selectedOption.value || !option) return false;

		if (props.returnValue) {
			return (
				selectedOption.value.value &&
				option.value &&
				selectedOption.value.value === option.value
			);
		} else {
			return (
				selectedOption.value.id &&
				option.id &&
				selectedOption.value.id === option.id
			);
		}
	};

	const emit = defineEmits(['update:modelValue']);

	const selectKey = ref();

	const handleSelect = (option) => {
		const valueToSet = props.returnValue ? option.value : option.id;

		emit('update:modelValue', valueToSet);

		if (fieldRef.value) {
			fieldRef.value?.setValue(valueToSet);
			fieldRef.value?.setTouched(true);
		}
		if (translateStore.langDefault != translateStore.lang) {
			selectKey.value = `select-${option.id || option.value}`;
		}
	};

	const isOpen = computed(() => {
		return dropdownRef.value?.tippy?.state?.isVisible;
	});

	watch(
		() => isOpen.value,
		(newVal, oldVal) => {
			if (newVal === false && oldVal === true) {
				fieldRef.value?.setTouched(true);
				fieldRef.value?.validate();
			}
		}
	);
</script>

<style lang="scss">
	.drop-down-select-wrapper {
		font-size: 1rem;
		position: relative;
		[data-tippy-root] {
			box-shadow: 0px 4px 16px 0px rgba(0, 0, 0, 0.08);
			border-radius: 1em;
			overflow: hidden;
			background-color: var(--color-white);
			border: 1px solid var(--color-gray-200);
			width: 100%;
			max-height: 30em;
			max-width: 100%;
			overflow-y: auto;
		}

		&_variant_default {
			[data-tippy-root] {
				border-radius: 0;
				border: 1px solid var(--border-color-secondary);
				min-width: auto;
				box-shadow: 0px 21px 24px 7px rgba(34, 60, 80, 0.2);
			}
			.drop-down-select {
				width: 100%;

				&__dropdown-content {
					padding: 0;
				}

				&__dropdown-list {
					row-gap: 0;
				}

				&__dropdown-button {
					border-radius: 0;
					border: 1px solid var(--border-color-secondary);
					padding: 0.625em;
					color: var(--text-color-senary);
					box-shadow: none;

					@include hover {
						color: var(--text-color-senary);
						box-shadow: none;
					}

					&:focus {
						border-color: var(--border-color-input-focus) !important;
						box-shadow: var(--box-shadow-input) !important;
					}

					svg {
						width: 1.4em;
						height: 1.4em;
						path {
							fill: #000;
						}
					}
				}

				&__dropdown-item {
					border-radius: 0;
					padding: 0.5em !important;
					width: 100%;
					justify-content: flex-start;
					transition: none;

					&:hover:not(:disabled) {
						background-color: var(--primary-color);
						color: var(--color-white);
					}

					&_selected {
						background-color: var(--primary-color);
						color: var(--color-white);
					}
				}
			}
		}

		&_variant_no-border {
			.drop-down-select {
				&__dropdown-button {
					border: none;
					background: transparent;
					background-color: transparent;
					box-shadow: none;
					padding: 0;

					@include hover {
						box-shadow: none;
					}
				}
			}
		}

		&.invalid {
			.drop-down-select {
				&__dropdown-button {
					border-color: var(--text-color-danger);
				}
			}
		}
	}

	.drop-down-select {
		font-size: 1em;

		&__dropdown-button {
			font-size: 1em;
			font-weight: 400;
			column-gap: 1em;
			text-transform: none;
			justify-content: space-between;
			width: 100%;

			@include hover {
				color: inherit;
			}

			&_placeholder {
				color: var(--color-gray-500);
			}

			svg {
				width: 1.5em;
				height: 1.5em;
			}

			&-icon.active {
				transform: rotate(180deg);
			}
		}

		&__dropdown-content {
			padding: 1em;
		}

		&__dropdown-list {
			display: flex;
			flex-direction: column;
			align-items: flex-start;
			row-gap: 1em;
		}

		&__dropdown-item {
			&_selected {
				color: var(--text-color-hover-primary);
				cursor: default;
			}
		}
	}

	.tippy-box:has(.drop-down-select__dropdown-content) {
		background-color: transparent !important;
		box-shadow: none !important;
	}
</style>
