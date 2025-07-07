<template>
	<UiNewDropdown
		:placement="'bottom-start'"
		:offset="[0, 10]"
		class="drop-down-multiselect"
		ref="dropdownRef"
		:arrow="false"
	>
		<UiButton
			class="drop-down-multiselect__dropdown-button"
			variant="elevated"
		>
			<div
				class="drop-down-multiselect__dropdown-left-icon"
				v-if="$slots.iconLeft"
			>
				<slot name="iconLeft" />
			</div>
			{{ title }}
			<SvgoDropDownSecondary
				class="svg-m drop-down-multiselect__dropdown-button-icon"
				:class="{ active: isOpen }"
			/>
		</UiButton>
		<template #content>
			<div class="drop-down-multiselect__dropdown-content">
				<div class="drop-down-multiselect__dropdown-list">
					<UiCheckboxGroup
						class="drop-down-multiselect__checkbox-group"
						v-model="selectedOptions"
						:options="options"
						:option-key="'id'"
						:option-label="'label'"
					/>
				</div>
			</div>
		</template>
	</UiNewDropdown>
</template>

<script setup>
	const props = defineProps({
		title: {
			type: String,
			default: '',
		},
		options: {
			type: Array,
			default: () => [],
		},
	});

	const dropdownRef = ref(null);
	const selectedOptions = ref([]);

	const isOpen = computed(() => {
		return dropdownRef.value?.tippy?.state?.isVisible;
	});
</script>

<style lang="scss">
	.drop-down-multiselect {
		font-size: 1em;

		&:hover {
			.drop-down-multiselect__dropdown-left-icon {
				transform: scale(1.1);
			}
		}

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

		&__dropdown-left-icon {
			width: 2.4rem;
			height: 2.4rem;
			transition: transform 0.3s ease-in-out;
		}

		&__checkbox-group {
			flex-direction: column;
			align-items: flex-start;
			row-gap: 1em;
		}
	}

	.tippy-box:has(.drop-down-multiselect__dropdown-content) {
		background-color: transparent !important;
		box-shadow: none !important;
	}
</style>
