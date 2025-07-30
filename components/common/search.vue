<template>
	<div class="search-input">
		<div
			class="search-input__container"
			@click="handleContainerClick"
		>
			<div
				class="search-input__icon"
				:class="{ 'search-input__icon_loading': isLoading }"
			>
				<SvgoSearchIcon v-if="!$slots.iconLeft" />
				<slot
					name="iconLeft"
					v-else
				/>
			</div>
			<UiInput
				name="search"
				ref="inputRef"
				class="search-input__input"
				:placeholder="placeholder"
				v-model="search"
			></UiInput>
		</div>
	</div>
</template>

<script setup>
	const props = defineProps({
		placeholder: {
			type: String,
			default: 'Поиск',
		},
		modelValue: {
			type: String,
			default: '',
		},
		isLoading: {
			type: Boolean,
			default: false,
		},
	});

	const search = computed({
		get() {
			return props.modelValue || '';
		},
		set(value) {
			debouncedUpdateValue(value);
		},
	});
	const inputRef = ref(null);
	const handleContainerClick = (event) => {
		// Ищем input внутри контейнера, чтобы гарантировать фокус
		const container = event.currentTarget;
		const input = container.querySelector('input');
		if (input) {
			input.focus();
		}
	};

	const emit = defineEmits(['update:modelValue']);

	const updateValue = (value) => {
		emit('update:modelValue', value);
	};

	const debouncedUpdateValue = useDebounce(updateValue, 300);
</script>

<style lang="scss">
	.search-input {
		font-size: 1em;
		box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.07);
		background: #fff;
		border-radius: 8px;
		padding: 1.2em 1.4em;

		&__container {
			display: flex;
			align-items: center;
			gap: 1em;
		}

		&__icon {
			width: 2em;
			height: 2em;
			color: #76768f;

			&_loading {
				animation: search-fade 0.8s infinite alternate;
			}

			svg {
				fill: #76768f;

				path {
					fill: #76768f;
				}
			}
		}

		&__input {
			flex: 1;
			border: none;
			outline: none;
			font-size: 1.6em;
			font-weight: 400;
			color: #76768f;
			background-color: transparent;
			padding: 0;
			line-height: 1.5em;

			@include mobile {
				font-size: 1em;
			}
		}

		.input-container:focus-within {
			box-shadow: none;
		}
	}

	@keyframes search-fade {
		0% {
			opacity: 1;
		}
		100% {
			opacity: 0.3;
		}
	}
</style>
