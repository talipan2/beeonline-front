<template>
	<div class="board-card skeleton">
		<div class="board-card__container">
			<div class="board-card__image skeleton-block"></div>
			<div class="board-card__content">
				<div class="board-card__title skeleton-block"></div>
				<div class="board-card__description skeleton-block"></div>
				<div class="board-card__price skeleton-block"></div>
				<div class="board-card__info skeleton-block"></div>
			</div>
			<div class="board-card__button skeleton-block"></div>
		</div>
	</div>
</template>

<script setup>
	// пусто
</script>

<style lang="scss" scoped>
	.skeleton-block {
		background: #eee;
		border-radius: 8px;
		position: relative;
		overflow: hidden;
		min-height: 1em;
		animation: shimmer 1.5s infinite linear;
	}

	.board-card__image.skeleton-block {
		height: 180px;
		margin-bottom: 1.2em;
	}
	.board-card__title.skeleton-block {
		height: 32px;
		width: 70%;
		margin-bottom: 0.8em;
	}
	.board-card__description.skeleton-block {
		height: 24px;
		width: 90%;
		margin-bottom: 0.8em;
	}
	.board-card__price.skeleton-block {
		height: 28px;
		width: 40%;
		margin-bottom: 1em;
	}
	.board-card__info.skeleton-block {
		height: 20px;
		width: 60%;
		margin-bottom: 1.2em;
	}
	.board-card__button.skeleton-block {
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
	.skeleton-block {
		background: linear-gradient(90deg, #eee 25%, #f5f5f5 50%, #eee 75%);
		background-size: 400px 100%;
	}
</style>
