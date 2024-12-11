<template>
	<div class="bonus-banner" v-bind="$attrs">
		<div class="bonus-banner__body">
			<div class="bonus-banner__title">Мы готовы подвести первые итоги работы платформы BEE-Online</div>
			<div class="bonus-banner__description">Используйте все возможности платформы, зарабатывайте бонусные рубли и повышайте свой профессиональный уровень. Самые активные и&nbsp;преданные пользователи будут номинированы на&nbsp;получение статуэтки за значительный вклад в развитие нашего сервиса. Торжественное награждение пройдет 11&nbsp;ноября&nbsp;2024г в отеле «Рэдиссон Славянская», в рамках форума «Bee-Fashion&nbsp;Forum»</div>
		</div>
		<div class="bonus-banner__image">
			<UiImage src="/assets/images/bonus/bonus-bff.png"/>
		</div>
	</div>
</template>

<script>
export default {
    props: [],

    components: {},

    data: () => ({}),
};
</script>

<style lang="scss">

.bonus-banner {
	font-size: 1rem;
	border-radius: 2.4em;
	display: flex;
	gap: 3em;
	padding: 4.4em;
	background: var(--primary-color) url(/assets/images/bonus/bg.jpg) no-repeat center/cover;
	overflow: hidden;
	color: #FFF;
	position: relative;
	z-index: 0;
	margin-bottom: 0;

	&__body {
		display: flex;
		flex-direction: column;
		gap: 3em;
	}

	&__title {
		font-family: 'fira-sans', sans-serif;
		font-size: 2.8em;
		line-height: 1.14;
		font-weight: 500;
		max-width: 12em;

	}

	&__description {
		font-size: 1.6em;
		line-height: 1.5;
		max-width: 26em;
	}

	&__image {
		flex: 1 0 auto;
		position: relative;
		z-index: -1;

		img {
			position: absolute;
			right: 0;
			bottom: 0;
			pointer-events: none;
			transform: translate(23%, 25.5%);
			width: 36em;
			height: auto;
			max-width: none;
		}
	}

}

@media screen and (max-width: 1500px) {
	.bonus-banner {
		font-size: 0.8rem;
	}
}

@include mobile {
	.bonus-banner {
		padding: 40px 18px;

		&__body {
			flex-direction: column;
			text-align: center;
		}

		&__title {
			font-size: 24px;
			text-align: center;
			max-width: 100%;
		}

		&__description {
			font-size: 14px;
			text-align: center;
			max-width: 100%;
		}

		&__image {
			height: 200px;
		}
	}
}
</style>