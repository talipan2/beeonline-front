<template>
	{{ counter }}
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
				{ invalid: errors.length && meta.touched },
			]"
		>
			{{ selectedOption }}
			<UiNewDropdown
				:arrow="false"
				placement="bottom-start"
				:offset="offset"
				class="drop-down-select"
				ref="dropdownRef"
			>
				<UiButton
					class="drop-down-select__dropdown-button"
					variant="elevated"
					:class="{
						'drop-down-select__dropdown-button_placeholder':
							selectedOption?.disabled,
					}"
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
	const props = defineProps({
		modelValue: {
			type: String,
			default: null,
		},
		options: {
			type: Array,
			default: () => [],
		},
		name: {
			type: String,
			default: '',
		},
		rules: {
			type: [String, Object],
			default: '',
		},
		errorShow: {
			type: Boolean,
			default: true,
		},
		label: {
			type: String,
			default: '',
		},
		variant: {
			type: String,
			default: 'default',
			validator: (value) => ['default', 'elevated'].includes(value),
		},
		returnValue: {
			type: Boolean,
			default: false,
		},
	});

	const fieldRef = ref(null);
	const dropdownRef = ref(null);

	const offset = computed(() => {
		if (props.variant === 'elevated') {
			return [0, 10];
		}
		return [0, 2];
	});

	const selectedOption = computed(() => {
		if (!props.modelValue) return props.options[0];
		if (props.returnValue) {
			console.log(
				props.options.find((option) => option.value === props.modelValue)
			);
			return props.options.find((option) => option.value === props.modelValue);
		} else {
			return props.options.find((option) => option.id === props.modelValue);
		}
	});

	const emit = defineEmits(['update:modelValue']);

	const counter = ref(0);

	const handleSelect = (option) => {
		if (props.returnValue) {
			emit('update:modelValue', option.value);
		} else {
			emit('update:modelValue', option.id);
		}
		if (fieldRef.value) {
			fieldRef.value?.setValue(option.value);
			fieldRef.value?.setTouched(true);
		}
		counter.value++;
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

	const updateCounter = () => {
		counter.value++;
	};

	// onMounted(() => {
	// 	setInterval(updateCounter, 1000);
	// });
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
		}

		&_variant_default {
			[data-tippy-root] {
				border-radius: 0;
			}
			.drop-down-select {
				width: 100%;

				&__dropdown-content {
					padding: 1em 0;
				}

				&__dropdown-list {
					row-gap: 0;
				}

				&__dropdown-button {
					border-radius: 0;
					border: 1px solid var(--border-color-secondary);
					padding: 0.625em;
					color: var(--text-color-senary);

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

			&_placeholder {
				color: var(--color-gray-500);
			}

			svg {
				width: 2.4em;
				height: 2.4em;
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
	}

	.tippy-box:has(.drop-down-select__dropdown-content) {
		background-color: transparent !important;
		box-shadow: none !important;
	}
</style>
