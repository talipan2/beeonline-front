<template>
	<div class="news-banner">
		<h3 class="news-banner__title">
			Вступайте в Bee-online сообщество: общение без границ!
		</h3>
		<UiButton
			type="link"
			to="https://t.me/BeeonlineCommunity"
			target="_blank"
			class="news-banner__button"
			variant="quaternary"
		>
			Вступить
		</UiButton>
		<UiImage
			class="news-banner__image"
			src="/assets/images/news-banner.png"
			:external="false"
			alt="Bee-online сообщество: общение без границ!"
		/>
	</div>
</template>

<script setup></script>

<style lang="scss">
	.news-banner {
		font-size: 1rem;
		background-image: url('/assets/images/news-banner-bg.png');
		background-size: cover;
		padding: 2.8em 3.2em;
		border-radius: 12px;
		position: relative;
		overflow: hidden;
		margin-bottom: 4em;

		@include mobile {
			display: none;
		}

		&__title {
			font-weight: 500;
			font-size: 2em;
			line-height: 1.4em;
			color: #fff;
			margin-bottom: 1.35em;
			max-width: 75%;

			@include tablet {
				max-width: 100%;
			}
		}

		&__button {
			text-transform: initial;
			font-size: 1.6em;
			font-weight: 600;
			max-width: fit-content;
			padding: 0.75em 1.5em;
		}

		&__image {
			position: absolute;
			right: -4.5em;
			bottom: -4.5em;
			width: 17.2em;
			height: auto;
		}
	}
</style>
