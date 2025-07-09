<template>
	<div class="badge-second-wrapper">
		<div
			class="badge-second"
			v-for="badge in badges"
			:key="badge"
		>
			<p class="badge-second__text">{{ badge }}</p>
		</div>
	</div>
</template>

<script setup>
	const props = defineProps({
		badges: {
			type: String,
			default: '',
		},
	});
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
	}
</style>
