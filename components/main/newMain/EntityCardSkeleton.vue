<template>
	<div class="entity-card skeleton">
		<div
			v-if="type !== 'customer'"
			class="entity-card__image skeleton-block"
		></div>
		<div class="entity-card__content">
			<div class="entity-card__title skeleton-block"></div>
			<div class="entity-card__description skeleton-block"></div>
			<div class="entity-card__price skeleton-block"></div>
			<div class="entity-card__date-container">
				<div class="entity-card__date-title skeleton-block"></div>
				<div class="entity-card__date skeleton-block"></div>
			</div>
		</div>
		<div class="entity-card__button skeleton-block"></div>
	</div>
</template>

<script setup>
	const props = defineProps({
		type: {
			type: String,
			default: '',
			validator: (value) => {
				return ['announcement', 'performer', 'customer'].includes(value);
			},
		},
	});
</script>

<style lang="scss" scoped>
	.skeleton-block {
		background: linear-gradient(90deg, #eee 25%, #f5f5f5 50%, #eee 75%);
		background-size: 400px 100%;
		border-radius: 8px;
		position: relative;
		overflow: hidden;
		min-height: 1em;
		animation: shimmer 1.5s infinite linear;
	}

	.entity-card {
		font-family: 'lato', sans-serif;
		font-size: 1rem;
		border: 1px solid rgba(0, 0, 0, 0.1);
		border-radius: 24px;
		padding: 2em 2.4em;
	}

	.entity-card__image.skeleton-block {
		aspect-ratio: 3/2;
		width: 100%;
		margin-bottom: 2.3em;
	}

	.entity-card__content {
		display: flex;
		flex-direction: column;
		gap: 1.2em;
		margin-bottom: 2.4em;
	}

	.entity-card__title.skeleton-block {
		height: 2.8em;
		width: 70%;
	}

	.entity-card__description.skeleton-block {
		height: 2.4em;
		width: 90%;
	}

	.entity-card__price.skeleton-block {
		height: 2.4em;
		width: 40%;
	}

	.entity-card__date-container {
		display: flex;
		gap: 1em;
		justify-content: space-between;
		align-items: center;
	}

	.entity-card__date-title.skeleton-block {
		height: 1.6em;
		width: 45%;
	}

	.entity-card__date.skeleton-block {
		height: 1.6em;
		width: 30%;
	}

	.entity-card__button.skeleton-block {
		height: 40px;
		width: 100%;
	}

	@keyframes shimmer {
		0% {
			background-position: -400px 0;
		}
		100% {
			background-position: 400px 0;
		}
	}
</style>
