<template>
	<section class="partners">
		<div class="partners__details container">
			<div class="partners__text-container">
				<h2 class="partners__title">Найдите партнера за 5 минут</h2>
				<ul class="partners__list">
					<li class="partners__item">
						<p class="partners__text">Быстрая регистрация</p>
						<UiImage src="/assets/images/main/partners/partners-registr.png" />
					</li>
					<li class="partners__item">
						<p class="partners__text">Публикация обьявлений</p>
						<UiImage src="/assets/images/main/partners/partners-ads.png" />
					</li>
					<li class="partners__item">
						<p class="partners__text">Уведомления о заказах</p>
						<UiImage
							src="/assets/images/main/partners/partners-notifications.png"
						/>
					</li>
					<li class="partners__item">
						<p class="partners__text">Переговоры в чате</p>
						<UiImage src="/assets/images/main/partners/partners-chats.png" />
					</li>
				</ul>
			</div>
			<UiImage
				class="partners__image"
				src="/assets/images/main/partners/partners-img.png"
			/>
			<UiImage
				class="partners__pattern"
				src="/assets/images/main/partners/partners-pattern.png"
			/>
			<UiImage
				class="partners__pattern-mobile"
				src="/assets/images/main/partners/partners-pattern-mobile.png"
			/>
		</div>
	</section>
</template>

<style lang="scss">
	.partners {
		background-image: url(/assets/images/main/partners/partners-bg.png);
		background-repeat: no-repeat;
		background-size: cover;
		position: relative;
	}

	.partners__details {
		-moz-column-gap: 15.7em;
		column-gap: 15.7em;
		display: flex;
		margin: 0 auto;
		padding-block: 15em 12.7em;
	}

	.partners__image {
		max-width: 70.6em;
		width: 100%;
		height: auto;
		z-index: 2;
		object-fit: contain;

		@include small-tablet {
			max-width: 30em;
		}
	}

	.partners__title {
		color: var(--text-color-octonary);
		font-family: 'Coolvetica', sans-serif;
		font-size: 7.2em;
		font-weight: 500;
		line-height: 1.14em;
		margin-block: 0 0.88em;
		max-width: 8.375em;
		text-transform: uppercase;
	}

	.partners__list {
		display: flex;
		flex-direction: column;
		row-gap: 1.2em;
	}

	.partners__item {
		align-items: center;
		background-color: hsla(0, 0%, 100%, 0.3);
		border-radius: 2.4em;
		box-sizing: border-box;
		display: flex;
		height: 10.2em;
		justify-content: space-between;
		max-width: 47.5em;
		padding: 1.2em 1.4em 1.3em 3.2em;
		position: relative;
		z-index: 4;
	}

	.partners__item img {
		display: block;
		max-height: 7.7em;
		-o-object-fit: contain;
		object-fit: contain;
		width: auto;
	}

	.partners__text {
		color: var(--text-color-octonary);
		font-family: Coolvetica, sans-serif;
		font-size: 2.4em;
		font-weight: 400;
		line-height: 1.5em;
		margin: 0;
	}

	.partners__pattern {
		bottom: 0;
		height: 100%;
		position: absolute;
		right: 0;
		top: 0;
		width: 106em;
		z-index: 1;
	}

	.partners__pattern-mobile {
		display: none;
	}

	@include mobile {
		.partners__details {
			align-items: center;
			flex-direction: column;
			row-gap: 5.6em;
		}

		.partners__text-container {
			align-items: center;
			display: flex;
			flex-direction: column;
			width: 100%;
		}

		.partners__title {
			font-size: 2.8em;
			margin-bottom: 1.14em;
			max-width: 7.5em;
			text-align: center;
		}

		.partners__list {
			row-gap: 1.7em;
			width: 100%;
		}

		.partners__item {
			border-radius: 1.6em;
			height: auto;
			max-width: none;
			padding: 1em 1.6em;
			width: 100%;
		}

		.partners__item img {
			height: 5.3em;
			max-height: none;
		}

		.partners__text {
			font-size: 1.8em;
		}

		.partners__image {
			height: 21.2em;
			width: 21.2em;
		}

		.partners__pattern {
			display: none;
		}

		.partners__pattern-mobile {
			display: block;
			bottom: 0;
			left: 0;
			right: 0;
			position: absolute;
			height: auto;
			object-fit: contain;
			width: 100%;
			z-index: 1;
		}
	}
</style>
