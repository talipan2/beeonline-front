<template>
	<div
		v-if="!isAccepted"
		class="cookie-banner"
	>
		<div class="cookie-banner__wrapper">
			<div class="cookie-banner__content">
				<p>
					Сайт bee-online.ru использует файлы cookies и сервисы сбора
					технических данных посетителей для обеспечения работоспособности и
					улучшения качества обслуживания. Продолжая использовать наш сайт, вы
					автоматически соглашаетесь с использованием данных технологий.
					Кликните «Принять и закрыть», чтобы согласиться с использованием
					«cookies» и больше не отображать это предупреждение.
				</p>
			</div>
			<div class="cookie-banner__buttons">
				<button
					class="cookie-banner__button"
					@click="acceptCookies"
				>
					Принять и закрыть
				</button>
			</div>
		</div>
	</div>
</template>

<script setup>
	const COOKIE_NAME = 'cookies-accepted';
	const COOKIE_VALUE = 'true';
	const COOKIE_EXPIRY_DAYS = 30;

	const isAccepted = ref(false);

	// Функция для установки cookie
	const setCookie = (name, value, days) => {
		const maxAge = days * 24 * 60 * 60;
		document.cookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)};max-age=${maxAge};path=/`;
	};

	// Функция для получения cookie
	function getCookie(name) {
		let matches = document.cookie.match(
			new RegExp(
				'(?:^|; )' +
					name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') +
					'=([^;]*)'
			)
		);
		return matches ? decodeURIComponent(matches[1]) : undefined;
	}

	// Функция принятия cookies
	const acceptCookies = () => {
		setCookie(COOKIE_NAME, COOKIE_VALUE, COOKIE_EXPIRY_DAYS);
		isAccepted.value = true;
	};

	onMounted(() => {
		const cookieValue = getCookie(COOKIE_NAME);
		isAccepted.value = cookieValue === COOKIE_VALUE;
	});
</script>

<style lang="scss">
	.cookie-banner {
		font-size: 1rem;
		position: fixed;
		bottom: 3%;
		left: 50%;
		transform: translateX(-50%);
		background-color: #fff;
		padding: 20px;
		z-index: 9999;
		max-width: 70em;
		width: 100%;
		box-shadow:
			0 10px 30px rgba(0, 0, 0, 0.15),
			0 4px 10px rgba(0, 0, 0, 0.1);
		border-radius: 12px;

		&__wrapper {
			display: flex;
			justify-content: space-between;
			align-items: center;
			gap: 3em;
		}

		&__content {
			text-align: justify;
		}

		&__button {
			text-transform: uppercase;
			font-size: 1em;
			background-color: #6937a5;
			padding: 1.2em 2em;
			border-radius: 100px;
			display: flex;
			border: 2px solid transparent;
			align-items: center;
			justify-content: center;
			text-wrap: nowrap;
			color: #fff;
			transition: all 0.3s ease;

			&:hover {
				background-color: #4a2774;
				color: #fff !important;
			}
		}

		@media screen and (max-width: 768px) {
			left: 2em;
			right: 2em;
			transform: none;
			width: auto;
			max-width: none;

			&__wrapper {
				flex-direction: column;
				gap: 1em;
			}
		}
	}
</style>
