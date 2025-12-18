<template>
	<div class="new-main__entity-card entity-card">
		<div
			class="entity-card__image"
			v-if="entityType !== 'customer'"
		>
			<UiImage
				external
				v-if="entity.image"
				class="entity-card__image-img"
				:src="entity.image || '../../../assets/images/nophoto_img.png'"
			/>
			<img
				v-else
				src="~/assets/images/nophoto_img.png"
				alt="no photo"
				class="entity-card__image-placeholder"
			/>
		</div>
		<div class="entity-card__content">
			<h3 class="entity-card__title">{{ entity.title }}</h3>

			<!-- ОБЪЯВЛЕНИЕ -->
			<template v-if="entityType === 'announcement'">
				<p class="entity-card__description">{{ entity.description }}</p>
				<p class="entity-card__price">
					{{ addCurrency(entity.price, 'RUB', 2, true) }}
				</p>
				<div class="entity-card__container">
					<p class="entity-card__date-title">Дата публикации:</p>
					<p class="entity-card__date">
						{{ formatDate(entity.date, 'DD.MM.YYYY') }}
					</p>
				</div>
			</template>

			<!-- ПРОИЗВОДИТЕЛЬ -->
			<template v-if="entityType === 'performer'">
				<!-- Страна -->
				<div class="entity-card__container">
					<p class="entity-card__country-title">Страна</p>
					<CommonLocationsList
						class="entity-card__country"
						:locationsList="{
							cities: entity?.cities,
							regions: entity?.regions,
							countries: entity?.countries,
						}"
						:isCountry="true"
						:show-only-country="true"
					/>
				</div>
				<!-- Категории -->
				<div class="entity-card__container">
					<p class="entity-card__category-title">Категории</p>
					<div class="entity-card__categories">
						<template v-if="entity?.categories?.length">
							<div class="entity-card__category-badge">
								<p class="entity-card__category-badge-name">
									{{
										entity?.categories?.length
											? entity?.categories[0].name
											: '-'
									}}
								</p>
								<ModalsMoreCities
									v-if="entity?.categories?.length > 1"
									:list="
										entity?.categories?.slice(1)?.map((item) => item.name) || []
									"
									title="Категории"
									placement="bottom-end"
									class="entity-card__category-badge-more"
								/>
							</div>
						</template>
						<template v-else>
							<p class="">-</p>
						</template>
					</div>
				</div>
				<!-- Количество просмотров -->
				<div class="entity-card__container entity-card__container_type_views">
					<p class="entity-card__views-title">Кол-во просмотров</p>
					<div class="entity-card__views-value">
						<SvgoViewsSecondary />
						<span>{{ entity.views }}</span>
					</div>
				</div>
			</template>

			<!-- ЗАКАЗЧИК -->
			<template v-if="entityType === 'customer'">
				<div class="entity-card__container">
					<p class="entity-card__batch-title">Объем партии</p>
					<p class="entity-card__batch">{{ entity.batch }}</p>
				</div>
				<div class="entity-card__container">
					<p class="entity-card__deadline-title">Срок выполнения</p>
					<p class="entity-card__deadline">
						{{ formatDate(entity.deadline_at, 'DD.MM.YYYY') }}
					</p>
				</div>
			</template>
		</div>
		<UiButton
			v-if="link"
			class="entity-card__button"
			:to="`${link}/${entity.id}`"
		>
			Подробнее
		</UiButton>
	</div>
</template>

<script setup>
	const props = defineProps({
		entity: {
			type: Object,
			default: () => {},
		},
		entityType: {
			type: String,
			default: '',
			validator: (value) => {
				return ['announcement', 'performer', 'customer'].includes(value);
			},
		},
		link: {
			type: String,
			default: '',
		},
	});
</script>

<style lang="scss" scoped>
	.entity-card {
		font-family: 'lato', sans-serif;
		font-size: 1rem;
		border: 1px solid rgba(0, 0, 0, 0.1);
		border-radius: 24px;
		padding: 2em 2.4em;
		display: flex;
		flex-direction: column;
		&__image {
			aspect-ratio: 3/2;
			max-height: 18.2em;
			position: relative;
			margin-bottom: 2.3em;

			&-img {
				width: 100%;
				height: 100%;
				object-fit: contain;
			}

			&-placeholder {
				width: 100%;
				height: 100%;
				object-fit: contain;
			}

			@include mobile {
				max-height: 28.8rem;
			}
		}

		&__content {
			display: flex;
			flex-direction: column;
			gap: 1.2em;
			margin-bottom: 2.4em;
			flex: 1;
		}

		&__title {
			font-family: 'lato', sans-serif;
			font-size: 2em;
			font-weight: 700;
			line-height: 1.4em;
			color: #000;
			display: -webkit-box;
			-webkit-line-clamp: 2; /* Количество строк */
			-webkit-box-orient: vertical;
			overflow: hidden;
			text-overflow: ellipsis;
			word-break: break-word;

			@include mobile {
				font-size: 1.6rem;
			}
		}

		&__description {
			font-size: 1.6em;
			font-weight: 400;
			line-height: 1.5em;
			color: #62636e;
			opacity: 0.8;
			display: -webkit-box;
			-webkit-line-clamp: 2; /* Количество строк */
			-webkit-box-orient: vertical;
			overflow: hidden;
			text-overflow: ellipsis;
			word-break: break-word;

			@include mobile {
				font-size: 1.4rem;
			}
		}

		&__button {
			margin-top: auto;
		}

		&__price {
			font-weight: 800;
			font-size: 2.4em;
			line-height: 1em;
			color: #000;

			@include mobile {
				font-size: 2rem;
			}
		}

		&__container {
			display: flex;
			flex-wrap: wrap;
			gap: 1em;
			justify-content: space-between;
			align-items: center;
			font-weight: 400;
			font-size: 1.6em;
			line-height: 1.5em;
			color: #62636e;

			@include mobile {
				font-size: 1.4rem;
			}

			&_type_views {
				border-top: 1px solid #e9ecef;
				padding-top: 2.4rem;
				margin-top: auto;
			}
		}

		&__country {
			font-size: 1.6rem;
			font-weight: 500;
			color: #000;

			.flag {
				width: 2.4rem;
				height: 2.4rem;
			}
		}
		&__categories {
			font-size: 1.2rem;
			font-weight: 600;
		}

		&__category-badge {
			display: flex;
			flex-wrap: wrap;
			gap: 1em;
			align-items: center;
		}

		&__category-badge-name {
			background: #f2f0f8;
			color: #5a2b96;
			height: 2.4rem;
			vertical-align: middle;
			padding-inline: 1.2rem;
			border-radius: 100px;
			display: flex;
			align-items: center;
		}
		&__category-badge-more {
			display: flex;
			align-items: center;
			font-size: 1.2rem;
			height: 2.4rem;
			background: #f2f0f8;
			color: #5a2b96;
			padding-inline: 1.2rem;
			border-radius: 100px;
		}

		&__views-value {
			display: flex;
			gap: 8px;
			align-items: center;
			color: #000;

			svg {
				flex-shrink: 0;
				width: 2rem;
				height: 2rem;
			}
		}

		&__batch {
			font-weight: 500;
			color: #000;
		}

		&__deadline {
			font-weight: 500;
			color: #000;
		}
	}
</style>
