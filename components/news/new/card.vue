<template>
	<div class="news-card">
		<div class="news-card__image">
			<UiImage
				:class="{
					'news-card__image-plug': !data.preview_image_url,
					'news-card__image-img': data.preview_image_url,
				}"
				:src="data.preview_image_url ?? '/assets/images/photo-plug-4.png'"
				:alt="data.name"
				:external="data.preview_image_url ? true : false"
			/>
		</div>
		<div class="news-card__content">
			<div class="news-card__tags">
				<div
					class="news-card__tag"
					v-for="tag in data.tags"
					:key="tag.id"
				>
					{{ tag.name }}
				</div>
			</div>
			<div class="news-card__text-wrapper">
				<h3 class="news-card__title">
					{{ data.name }}
				</h3>
				<p class="news-card__description">
					{{ stripHtml(data.preview_text) }}
				</p>
				<div class="news-card__footer">
					<p class="news-card__date">
						{{ formatDate(data.created_at, 'DD.MM.YYYY') }}
					</p>
					<div class="news-card__views" v-if="data.views_count !== undefined">
						<svg class="news-card__views-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
							<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
							<circle cx="12" cy="12" r="3"/>
						</svg>
						<span>{{ data.views_count }}</span>
					</div>
				</div>
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
				width: 100%;
				height: 100%;
				object-fit: cover;
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

		&__tags {
			display: flex;
			gap: 0.5em;
			flex-wrap: wrap;
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

		&__footer {
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-top: auto;
		}

		&__date {
			font-size: 1.4em;
			font-weight: 400;
			line-height: 1.3em;
			opacity: 0.8;
		}

		&__views {
			display: flex;
			align-items: center;
			gap: 0.4em;
			font-size: 1.4em;
			font-weight: 400;
			opacity: 0.8;
		}

		&__views-icon {
			width: 1.2em;
			height: 1.2em;
		}

		&__link {
			position: absolute;
			inset: 0;
		}
	}
</style>
