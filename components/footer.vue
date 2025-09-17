<template>
	<footer class="footer">
		<div class="footer__menu-container">
			<div class="footer__menu container">
				<div class="footer__menu-links">
					<div class="footer__logo">
						<NuxtLink to="/">
							<UiImage
								src="/assets/images/footer/footer-logo.svg"
								alt="Логотип"
							/>
						</NuxtLink>
					</div>
					<nav class="footer__nav">
						<ul class="footer__list">
							<li class="footer__links-item">
								<NuxtLink
									to="/services"
									class="footer__link"
								>
									Найти производителя
								</NuxtLink>
							</li>
							<li class="footer__links-item">
								<NuxtLink
									to="/orders"
									class="footer__link"
								>
									Найти заказчика
								</NuxtLink>
							</li>
							<!-- <li class="footer__links-item">
                <NuxtLink to="/members" class="footer__link">Участники портала</NuxtLink>
              </li> -->
							<li class="footer__links-item">
								<NuxtLink
									to="/board"
									class="footer__link"
								>
									Объявления
								</NuxtLink>
							</li>
							<li class="footer__links-item">
								<NuxtLink
									to="https://expo.bee-online.ru"
									class="footer__link"
									target="_blank"
								>
									Выставки
								</NuxtLink>
							</li>
							<li class="footer__links-item">
								<NuxtLink
									to="/contacts"
									class="footer__link"
								>
									Контакты
								</NuxtLink>
							</li>
							<li class="footer__links-item">
								<NuxtLink
									to="/help"
									class="footer__link"
								>
									Помощь
								</NuxtLink>
							</li>
						</ul>
					</nav>
				</div>
				<p class="footer__copyright">
					© Бизнес Технологии 2020-2025.
					<br />
					При копировании любого материала сайта ссылка на сайт обязательна.
				</p>
				<UiImage
					class="footer__pattern"
					src="/assets/images/footer/map.png"
				/>
			</div>
		</div>
		<div class="footer__additionally-container">
			<div class="footer__additionally container">
				<ul class="footer__additionally-list">
					<li class="footer__additionally-item">
						<NuxtLink
							to="/page-policy"
							class="footer__additionally-link"
						>
							Политика по обработке персональных данных
						</NuxtLink>
					</li>
					<li class="footer__additionally-item">
						<NuxtLink
							to="/page-personal-data"
							class="footer__additionally-link"
						>
							Согласие на обработку персональных данных
						</NuxtLink>
					</li>
					<li class="footer__additionally-item">
						<NuxtLink
							to="/page-consent-mailings"
							class="footer__additionally-link"
						>
							Согласие на получение рекламной рассылки
						</NuxtLink>
					</li>
					<li class="footer__additionally-item">
						<NuxtLink
							to="/page-oferta"
							class="footer__additionally-link"
						>
							Оферта
						</NuxtLink>
					</li>
					<li class="footer__additionally-item">
						<NuxtLink
							to="/page-requisites"
							class="footer__additionally-link"
						>
							Реквизиты
						</NuxtLink>
					</li>
					<li class="footer__additionally-item">
						<NuxtLink
							to="/sitemap"
							class="footer__additionally-link"
						>
							Карта сайта
						</NuxtLink>
					</li>
				</ul>
			</div>
		</div>
	</footer>
</template>

<script setup></script>

<style lang="scss">
	.footer {
		color: var(--text-color-octonary);
		font-family: 'Inter', sans-serif;
	}

	.footer__menu-container {
		overflow: hidden;
		padding-block: 6.8em 3.6em;
		position: relative;
	}

	.footer__menu-container:before {
		background-image: url(/assets/images/footer/footer-bg.png);
		background-position: center 30%;
		background-repeat: no-repeat;
		background-size: cover;
		content: '';
		height: 100%;
		inset: 0;
		position: absolute;
		width: 100%;
		z-index: -1;
	}

	.footer__menu-links {
		align-items: center;
		-moz-column-gap: 14.9em;
		column-gap: 14.9em;
		display: flex;
		flex-direction: row;
		margin-bottom: 3.6em;
	}

	.footer__list {
		align-items: center;
		-moz-column-gap: 3.2em;
		column-gap: 3.2em;
		display: flex;
		flex-wrap: wrap;
		row-gap: 3.2em;
	}

	.footer__link {
		color: var(--text-color-octonary);
		font-size: 1.6em;
		font-weight: 600;
		position: relative;
		z-index: 4;
	}

	.footer__logo img {
		height: auto;
		width: 28.4em;
	}

	.footer__copyright {
		color: var(--text-color-octonary);
		font-size: 1.4em;
		font-weight: 500;
		line-height: 1.42em;
		margin: 0;
		max-width: 25.07em;
		opacity: 0.8;
	}

	.footer__pattern {
		bottom: 0;
		opacity: 0.5;
		position: absolute;
		right: 0;
		width: 54.5em;
		height: auto;
		z-index: 0;
	}

	.footer__additionally-container {
		background-color: #4b1d7e;
	}

	.footer__additionally {
		padding-block: 2.6em;
	}

	.footer__additionally-list {
		align-items: center;
		-moz-column-gap: 3.2em;
		column-gap: 3.2em;
		display: flex;
		flex-wrap: wrap;
		row-gap: 1em;
	}

	.footer .footer__additionally-link {
		color: hsla(0, 0%, 100%, 0.5);
		font-size: 1.3em;
		font-weight: 600;
	}

	@include mobile {
		.footer .scope-container {
			padding-inline: 3.2em;
		}

		.footer__menu-container {
			padding-block: 3.2em;
		}

		.footer__menu-container:before {
			transform: rotate(-90deg) scale(2);
		}

		.footer__menu {
			display: flex;
			flex-direction: column;
			min-height: 52.5em;
			box-sizing: border-box;
		}

		.footer__logo img {
			width: 20em;
		}

		.footer__menu-links {
			row-gap: 4.4em;
			margin-bottom: 3.2em;
		}

		.footer__list,
		.footer__menu-links {
			align-items: flex-start;
			flex-direction: column;
		}

		.footer__list {
			position: relative;
			row-gap: 3.2em;
		}

		.footer__link {
			font-size: 1.6em;
		}

		.footer__copyright {
			display: block;
			font-size: 1.4em;
			margin-block: auto 0;
			max-width: none;
		}

		.footer__additionally {
			padding-block: 3.2em;
		}

		.footer__additionally-list {
			align-items: flex-start;
			flex-direction: column;
			row-gap: 2.4em;
		}

		.footer .footer__additionally-link {
			font-size: 1.3em;
		}

		.footer__pattern {
			bottom: 0.9em;
			height: auto;
			left: 1.3em;
			max-width: calc(100% - 2.6em);
			right: auto;
			width: 35em;
		}
	}
</style>
