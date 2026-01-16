<template>
	<div class="search-entity">
		<div class="search-entity__content">
			<div class="search-entity__header">
				<div class="search-entity__header-title">
					<h2 class="search-entity__title">{{ title }}</h2>
					<p class="search-entity__description">
						{{ description }}
					</p>
				</div>
				<UiButton
					variant="default"
					:to="link"
					class="search-entity__header-button"
				>
					{{ linkText }}
				</UiButton>
			</div>
			<slot />
		</div>
	</div>
</template>

<script setup>
	const props = defineProps({
		title: {
			type: String,
			default: '',
		},
		description: {
			type: String,
			default: '',
		},
		link: {
			type: String,
			default: '/',
		},
		linkText: {
			type: String,
			default: '',
		},
	});
</script>

<style lang="scss" scoped>
	.search-entity {
		font-size: 1rem;

		&__header {
			display: flex;
			justify-content: space-between;
			align-items: center;
			gap: 1em;
		}

		&__header {
			margin-bottom: 5.6em;

			@include mobile {
				display: flex;
				flex-direction: column;
				align-items: flex-start;
			}
		}

		&__header-title {
			display: flex;
			flex-direction: column;
			gap: 1.6em;
			max-width: 99em;
		}

		&__title {
			font-size: 4em;
			font-weight: 500;
			line-height: 1.1em;

			@include mobile {
				font-size: 2rem;
			}
		}

		&__description {
			font-size: 1.6em;
			font-weight: 400;
			line-height: 1.5em;
			color: #62636e;

			@include mobile {
				font-size: 1.4rem;
			}
		}

		&__header-button {
			font-size: 1.8em;
			line-height: 1.3em;
			backdrop-filter: blur(20px);
			background-color: rgb(236, 236, 236);
			text-transform: none;
			color: #303030;
			padding: 0.8em 2.4em;
			transition: background-color 0.3s ease;

			@include hover {
				background-color: #e0e0e0;
			}

			@include mobile {
				font-size: 1.4rem;
				margin-top: 1.2rem;
			}
		}
	}
</style>
