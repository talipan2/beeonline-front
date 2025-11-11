<template>
	<div class="news-card">
		<div class="news-card__image">
			<UiImage
				:class="{
					'news-card__image-plug': !data.image,
					'news-card__image-img': data.image,
				}"
				:src="data.image ?? '/assets/images/photo-plug-3.svg'"
				:alt="data.name"
			/>
		</div>
		<div class="news-card__content">
			<p class="news-card__tag">
				{{ 'Мода' }}
			</p>
			<div class="news-card__text-wrapper">
				<h3 class="news-card__title">
					{{ data.name }}
				</h3>
				<p class="news-card__description">
					{{ stripHtml(data.detail_text) }}
				</p>
				<p class="news-card__date">
					{{ formatDate(data.created_at, 'DD.MM.YYYY') }}
				</p>
			</div>
		</div>
		<NuxtLink
			class="news-card__link"
			:to="`/news/${data.id}`"
		/>
	</div>
</template>

<script setup>
	const props = defineProps({
		data: {
			type: Object,
			default: () => ({}),
		},
	});

	function stripHtml(html) {
		const div = document.createElement('div');
		div.innerHTML = html;
		return div.textContent || div.innerText || '';
	}
</script>

<style lang="scss">
	.news-card {
		font-size: 1rem;
		display: flex;
		flex-direction: column;
		border-radius: 12px;
		background-color: #fff;
		overflow: hidden;
		cursor: pointer;
		height: 100%;
		position: relative;
		transition:
			transform 0.2s ease,
			box-shadow 0.2s ease;

		&:hover {
			transform: translateY(-8px);
			box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
		}

		&__image {
			aspect-ratio: 16/9;
			display: flex;
			align-items: center;
			justify-content: center;
			overflow: hidden;

			&:has(.news-card__image-plug) {
				border-bottom: 1px solid rgba(0, 0, 0, 0.1);
			}

			&-plug {
				max-width: 50%;
				height: 100%;
				object-fit: contain;
			}

			&-img {
				width: 100%;
				height: 100%;
				object-fit: cover;
			}
		}

		&__content {
			padding: 2.4em;
			display: flex;
			flex-direction: column;
			gap: 0.8em;
			flex: 1;
		}

		&__text-wrapper {
			display: flex;
			flex-direction: column;
			gap: 1.2em;
			flex: 1;
		}

		&__tag {
			font-size: 1.2em;
			font-weight: 800;
			color: var(--text-color-ternary);
			line-height: 1.3em;
			text-transform: uppercase;
		}

		&__title {
			font-family: 'lato', sans-serif;
			font-size: 2em;
			font-weight: 700;
			line-height: 1.3em;
			display: -webkit-box;
			-webkit-box-orient: vertical;
			-webkit-line-clamp: 2;
			overflow: hidden;
			text-overflow: ellipsis;
		}

		&__description {
			font-size: 1.6em;
			font-weight: 400;
			line-height: 1.3em;
			display: -webkit-box;
			-webkit-box-orient: vertical;
			-webkit-line-clamp: 4;
			overflow: hidden;
			text-overflow: ellipsis;
			opacity: 0.8;
		}

		&__date {
			font-size: 1.4em;
			font-weight: 400;
			line-height: 1.3em;
			opacity: 0.8;
			margin-top: auto;
		}

		&__link {
			position: absolute;
			inset: 0;
		}
	}
</style>
