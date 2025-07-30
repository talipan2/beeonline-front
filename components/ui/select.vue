<template>
	<Field
		:rules="rules"
		v-slot="{ field, errors, meta }"
		:name="name"
		:label="label"
	>
		<div
			class="select"
			:class="[
				field.class,
				$attrs.class,
				{ invalid: errors.length && meta.touched },
			]"
		>
      <div class="select__wrapper">
  			<select
  				class="select__select"
  				:class="{ select_type_disabled: disabled }"
  				v-bind="field"
  				:disabled="disabled"
  				:required="required"
  				@change="handleSelectChange"
  			>
  				<option
  					class="select__option"
  					v-for="option in options"
  					:key="option.id"
  					:value="returnValue ? option.value : option.id"
  					:disabled="option.disabled"
  				>
  					{{ option.label }}
  				</option>
  			</select>
  			<div class="select__arrow"></div>
      </div>
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
		options: {
			type: Array,
			required: true,
			default: () => [],
		},
		disabled: {
			type: Boolean,
			default: false,
		},
		required: {
			type: Boolean,
			default: false,
		},
		rules: {
			type: [String, Object],
			default: '',
		},
		name: {
			type: String,
			default: '',
		},
		label: {
			type: String,
			default: '',
		},
		errorShow: {
			type: Boolean,
			default: true,
		},
		returnId: {
			type: Boolean,
			default: true,
		},
		returnValue: {
			type: Boolean,
			default: false,
		},
	});

	const handleSelectChange = (event) => {
		// Убираем фокус после выбора опции
		event.target.blur();
	};
</script>

<style lang="scss">
	.select {
		position: relative;

  &__wrapper {
    position: relative;
  }

  &__wrapper:focus-within &__arrow {
    transform: translateY(-50%) rotate(180deg);
  }

		&__select {
			font-size: 1em;
			padding: 1rem 3rem 1rem 1rem;
			width: 100%;
			border: 1px solid var(--border-color-secondary);
			color: var(--text-color-senary);
			appearance: none;
			background: #fff;
			cursor: pointer;

			&:focus {
				border-color: var(--border-color-input-focus);
				box-shadow: 0 0 0 0.2rem rgba(105, 55, 165, 0.25);
				color: var(--text-color-senary);
				outline: none;
			}
		}

		&__arrow {
			position: absolute;
			top: 50%;
			right: 1rem;
			transform: translateY(-50%);
			width: 15px;
			height: 15px;
			background: url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='15' height='15'%3E%3Cpath stroke='%23343a40' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' d='m12 6-4.5 4L3 6' fill='none'/%3E%3C/svg%3E")
				no-repeat center center;
			background-size: contain;
			transition: transform 0.2s ease;
			pointer-events: none;
			z-index: 1;
		}

		&_type_disabled {
			background-color: var(--button-disabled-background);
			color: var(--button-disabled-color);
			cursor: default;
		}
	}
</style>
