<template>
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
</template>

<script setup>
	const props = defineProps({
		modelValue: {
			type: Number,
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
		return props.options.find((option) => option.id === props.modelValue);
	});

	const emit = defineEmits(['update:modelValue']);

	const handleSelect = (option) => {
		console.log(option);
		emit('update:modelValue', option.id);
	};

	const isOpen = computed(() => {
		return dropdownRef.value?.tippy?.state?.isVisible;
	});
</script>

<style lang="scss">
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
			border-radius: 1em;
			background-color: var(--color-white);
			box-shadow: 0px 4px 16px 0px rgba(0, 0, 0, 0.08);
			border: 1px solid var(--color-gray-200);
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
