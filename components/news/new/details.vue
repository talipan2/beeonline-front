<template>
	<div class="news-details">
		<div class="news-details__container">
			<div class="news-details__header">
				<p class="news-details__header-date">
					Дата публикации: {{ formatDate(data.created_at, 'DD.MM.YYYY') }}
				</p>
				<div class="news-details__header-tags">
					<div
						class="news-details__header-tag"
						v-for="tag in data.tags"
						:key="tag.id"
					>
						{{ tag.name }}
					</div>
				</div>
			</div>
			<div
				class="news-details__image"
				v-if="data.preview_image_url"
			>
				<UiImage
					:src="data.preview_image_url"
					:alt="data.name"
					external
				/>
			</div>
			<h2 class="news-details__title">{{ data.name }}</h2>
			<div
				class="news-body"
				v-html="data.detail_text"
			></div>
		</div>
		<div class="news-details__right-side">
			<Banners
				class="news-details__banner"
				v-if="banners.length > 0"
				v-for="banner in banners"
				:key="banner.id"
				:banner="banner"
			/>
			<div class="news-details__actual-news-container">
				<h4 class="news-details__actual-news-title">Актуальные новости</h4>
				<div
					class="news-details__actual-news"
					v-if="actualNews.length > 0"
				>
					<NewsNewCard
						v-for="item in actualNews"
						:key="item.id"
						:data="item"
					/>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
	import { useSettingStore } from '~/store/settingStore';

	const props = defineProps({
		data: {
			type: Object,
			default: () => ({}),
		},
		actualNews: {
			type: Array,
			default: () => [],
		},
		banners: {
			type: Array,
			default: () => [],
		},
	});
	const settingStore = useSettingStore();
	const router = useRouter();

	const goBack = () => {
		if (history.state.back != null && history.state.back.includes('news')) {
			router.back();
		} else {
			router.push('/news');
		}
	};
</script>

<style lang="scss">
	.news-details {
		font-size: 1.6rem;
		display: flex;
		justify-content: space-between;
		gap: 1em;

		@include mobile {
			flex-direction: column;
			gap: 2em;
		}

		&__container {
			max-width: 53em;
			width: 100%;

			@include mobile {
				max-width: 100%;
			}
		}

		&__right-side {
			max-width: 27%;
			width: 100%;

			@include mobile {
				max-width: 100%;
			}
		}

		&__title {
			font-size: 1.75em;
			margin-bottom: 0.92em;
		}

		&__image {
			aspect-ratio: 16/9;
			display: flex;
			align-items: center;
			justify-content: center;
			border-radius: 12px;
			overflow: hidden;
			margin-bottom: 2em;

			img {
				width: 100%;
				height: 100%;
				object-fit: cover;
			}
		}

		&__header {
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-bottom: 1.6em;
		}

		&__header-date {
			font-size: 1em;
			font-weight: 400;
		}

		&__header-tags {
			display: flex;
			gap: 1em;
			flex-wrap: wrap;
		}

		&__header-tag {
			border: 1px solid #6937a5;
			padding: 2px 0.75em;
			color: var(--text-color-ternary);
			font-weight: 700;
			font-size: 0.7em;
			line-height: 1.8em;
			opacity: 0.8;
			text-transform: uppercase;
		}

		&__title {
			font-family: 'lato', sans-serif;
			font-weight: 700;
			font-size: 2.25em;
			line-height: 1.1em;
			color: #000;

			@include mobile {
				font-size: 1.75em;
			}
		}

		&__actual-news {
			display: flex;
			flex-direction: column;
			gap: 1.25em;
		}

		&__actual-news-title {
			font-family: 'lato', sans-serif;
			font-size: 1.5em;
			font-weight: 700;
			margin-bottom: 0.83em;
		}

		&__banner {
			margin-bottom: 13em;

			@include mobile {
				display: none;
			}
		}
	}

	.news-body {
		a {
			display: inline;
			color: var(--primary-color);
			overflow-wrap: anywhere;

			&:hover {
				text-decoration: underline;
			}
		}

		p {
			overflow-wrap: anywhere;
		}

		img {
			max-width: 100%;
		}

		table {
			max-width: 100% !important;
			// display: block;
			width: 100% !important;
		}
	}
</style>
