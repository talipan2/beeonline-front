<template>
	<div class="drop-down-select-wrapper">
		<UiNewDropdown
			:arrow="false"
			:placement="'bottom-start'"
			:offset="[0, 10]"
			class="drop-down-select"
			ref="dropdownRef"
		>
			<UiButton
				class="drop-down-select__dropdown-button"
				variant="elevated"
			>
				<slot name="icon-left" />
				{{ selectedOption.label }}
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
							@click="handleSelect(option)"
						>
							{{ option.label }}
						</UiButton>
					</div>
				</div>
			</template>
		</UiNewDropdown>
	</div>
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
	});

	const dropdownRef = ref(null);

	const selectedOption = computed(() => {
		if (!props.modelValue) return props.options[0];
		return props.options.find((option) => option.value === props.modelValue);
	});

	const emit = defineEmits(['update:modelValue']);

	const handleSelect = (option) => {
		emit('update:modelValue', option.value);
	};

	const isOpen = computed(() => {
		return dropdownRef.value?.tippy?.state?.isVisible;
	});
</script>

<style lang="scss">
	.drop-down-select-wrapper {
		[data-tippy-root] {
			box-shadow: 0px 4px 16px 0px rgba(0, 0, 0, 0.08);
			border-radius: 1em;
			overflow: hidden;
			background-color: var(--color-white);
			border: 1px solid var(--color-gray-200);
		}
	}

	.drop-down-select {
		font-size: 1em;

		&__dropdown-button {
			font-size: 1.6em;
			font-weight: 400;
			column-gap: 1em;
			text-transform: none;

			svg {
				width: 2.4rem;
				height: 2.4rem;
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
