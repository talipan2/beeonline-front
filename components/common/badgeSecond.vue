<template>
	<div class="badge-second-wrapper">
		<div
			class="badge-second"
			v-for="badge in badges"
			:key="badge"
		>
			<template v-if="type === 'button'">
				<button
					type="button"
					class="badge-second__text badge-second__text-button"
					@click="handleClick(badge)"
				>
					{{ badge?.label || badge?.name }}
					<SvgoClose class="svg-s" />
				</button>
			</template>
			<p
				v-else
				class="badge-second__text"
			>
				{{ badge?.label || badge?.name || badge }}
			</p>
		</div>
	</div>
</template>

<script setup>
	const props = defineProps({
		badges: {
			type: Array,
			default: () => [],
		},
		type: {
			type: String,
			default: 'paragraph',
			validator: (value) => ['button', 'paragraph'].includes(value),
		},
	});

	const emit = defineEmits(['click']);

	const handleClick = (badge) => {
		emit('click', badge);
	};
</script>

<style lang="scss">
	.badge-second-wrapper {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5em;
	}

	.badge-second {
		font-family: 'Inter', sans-serif;
		font-size: 1em;
		display: inline-block;
		padding: 0.5em 1.2em;
		font-weight: 600;
		border-radius: 100px;
		background-color: #f2edff;
		color: #5a2b96;

		&__text {
			opacity: 0.8;
		}

		&__text-button {
			display: flex;
			align-items: center;
			gap: 0.5em;
			color: #5a2b96;

			svg {
				fill: #5a2b96;
			}

			@include hover {
				color: var(--text-color-hexadecimal);

				svg {
					fill: var(--text-color-hexadecimal);
				}
			}
		}
	}
</style>
