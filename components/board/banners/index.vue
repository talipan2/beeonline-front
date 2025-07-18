<template>
	<div class="board-banners">
		<h3 class="board-banners__title">
			{{ title }}
		</h3>
		<div class="board-banners__list">
			<div
				class="board-banners__item"
				v-for="item in data"
				:key="item.id"
			>
				<div class="board-banners__item-image">
					<UiImage
						:src="item?.image || defaultImage"
						:alt="item?.name"
						external
					/>
				</div>
				<h4 class="board-banners__item-title">{{ item?.name }}</h4>
				<NuxtLink
					:to="`${link}/${item?.id}`"
					class="board-banners__item-link"
				></NuxtLink>
			</div>
		</div>
	</div>
</template>

<script setup>
	import defaultImage from '@/assets/images/photo-plug-second.svg';

	const props = defineProps({
		title: {
			type: String,
			default: 'Доска объявлений',
		},
		data: {
			type: Array,
			default: () => [],
		},
		link: {
			type: String,
			default: '/board',
		},
	});
</script>

<style lang="scss">
	.board-banners {
		font-size: 1rem;
		border-radius: 24px;
		background-color: #ededf0;
		padding: 3.2em;

		@include hover {
			.board-banners__item:not(:hover) {
				filter: blur(2px);
				opacity: 0.6;
				transform: scale(0.98);
			}
		}

		&__title {
			font-size: 2.2em;
			font-weight: 400;
			color: #000;
			line-height: 1.2;
			margin-bottom: 2.4em;
			text-align: center;
		}

		&__list {
			display: flex;
			flex-direction: column;
			row-gap: 1.8em;
			align-items: center;
		}

		&__item {
			display: flex;
			flex-direction: column;
			row-gap: 1.6em;
			padding: 2.4em;
			background-color: #fff;
			border-radius: 24px;
			cursor: pointer;
			transition: all 0.3s ease;
			position: relative;

			@include hover {
				transform: scale(1.02);
				z-index: 10;
				box-shadow: 0 15px 50px rgba(0, 0, 0, 0.2);
			}
		}

		&__item-link {
			position: absolute;
			inset: 0;
		}

		&__item-image {
			aspect-ratio: 1/1;
			overflow: hidden;
			background-color: #ededf0;
			border-radius: 12px;

			img {
				width: 100%;
				height: 100%;
				object-fit: cover;
			}
		}

		&__item-title {
			font-family: 'lato', sans-serif;
			font-size: 1.6em;
			font-weight: 700;
			color: #000;
			line-height: 1.5em;
		}
	}
</style>
