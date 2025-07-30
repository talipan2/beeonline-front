<template>
	<div class="board-catalog-details board-details-skeleton">
		<CommonLayoutInfoCard class="board-catalog-details__header">
			<div
				class="board-catalog-details__header-image skeleton skeleton-img"
			></div>
			<div class="board-catalog-details__header-content">
				<div class="board-catalog-details__header-content-row">
					<div class="skeleton skeleton-text skeleton-date"></div>
					<div class="skeleton skeleton-text skeleton-views"></div>
				</div>
				<div class="board-catalog-details__header-badges">
					<div class="skeleton skeleton-badge"></div>
				</div>
				<div class="skeleton skeleton-title"></div>
				<div class="skeleton skeleton-price"></div>
				<div class="skeleton skeleton-company"></div>
				<div class="skeleton skeleton-btn"></div>
			</div>
		</CommonLayoutInfoCard>
		<CommonLayoutInfoCard
			title="Описание"
			class="board-catalog-details__description"
		>
			<div class="skeleton skeleton-desc"></div>
			<div class="skeleton skeleton-desc short"></div>
		</CommonLayoutInfoCard>
		<CommonLayoutInfoCard
			title="Примеры работ"
			class="board-catalog-details__gallery"
		>
			<div class="skeleton skeleton-gallery"></div>
		</CommonLayoutInfoCard>
	</div>
</template>

<script setup>
	// Нет логики, только визуал
</script>

<style lang="scss" scoped>
	.board-details-skeleton {
		.skeleton {
			background: linear-gradient(90deg, #ededf0 25%, #f5f5f7 50%, #ededf0 75%);
			background-size: 200% 100%;
			animation: skeleton-loading 1.2s infinite linear;
			border-radius: 8px;
			display: block;
		}
		.skeleton-img {
			width: 100%;
			aspect-ratio: 1/1.13;
			max-height: 37.8em;
			margin-bottom: 1.5em;
		}
		.skeleton-text {
			height: 1.6em;
			width: 8em;
			margin-bottom: 0.8em;
		}
		.skeleton-date {
			width: 10em;
		}
		.skeleton-views {
			width: 6em;
		}
		.skeleton-badge {
			width: 5em;
			height: 1.2em;
			margin-bottom: 1em;
		}
		.skeleton-title {
			width: 80%;
			height: 2.8em;
			margin-bottom: 1em;
		}
		.skeleton-price {
			width: 40%;
			height: 2em;
			margin-bottom: 1em;
		}
		.skeleton-company {
			width: 50%;
			height: 1.5em;
			margin-bottom: 1em;
		}
		.skeleton-btn {
			width: 50%;
			height: 2.5em;
			margin-bottom: 1em;
		}
		.skeleton-desc {
			width: 100%;
			height: 1.5em;
			margin-bottom: 0.7em;
		}
		.skeleton-desc.short {
			width: 60%;
		}
		.skeleton-gallery {
			width: 100%;
			height: 8em;
			margin-bottom: 1em;
		}
	}
	@keyframes skeleton-loading {
		0% {
			background-position: 200% 0;
		}
		100% {
			background-position: -200% 0;
		}
	}
</style>
