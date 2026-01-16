<template>
	<section class="banner">
		<div class="container">
			<div class="banner__content">
				<h1>
					BEE-online, экосистема для поиска партнеров в легкой промышленности
				</h1>
				<div class="banner__content-text">
					<p class="banner__content-text-item">
						Проект представляет удобный сервис для поиска партнеров и выхода на
						прямые переговоры
					</p>
					<NuxtLink
						type="button"
						class="banner__link"
						@click="handleCreateOrder"
					>
						Разместить заказ
						<div>
							<SvgoLinkArrow
								class="svg-m"
								alt="Стрелка"
							/>
						</div>
					</NuxtLink>
				</div>
			</div>
		</div>
		<div class="banner__pattern"></div>
	</section>
</template>

<script setup>
	import { useUserStore } from '~/store/userStore';

	const userStore = useUserStore();
	const router = useRouter();
	const isAuth = computed(() => userStore.isAuth);

	const handleCreateOrder = () => {
		if (!isAuth.value) {
			router.push({
				path: '/register',
				query: { role: 'customer', action: 'create-order' },
			});
			userStore.role = 'customer';
			localStorage.setItem('role', 'customer');
			settingStore.isCreateOrder = true;
		} else {
			router.push('/orders/create/step1');
		}
	};
</script>

<style lang="scss" scoped>
	.banner {
		font-size: 1rem;
		background-image: url('../../../assets/images/newMain/section-bg.png');
		background-repeat: no-repeat;
		background-position: center;
		position: relative;
		max-height: 43.6em;
		overflow: hidden;
		margin-bottom: 12em;

		@include mobile {
			max-height: 100%;
			background-size: cover;
			margin-bottom: 5.6rem;
		}

		&__link {
			background-color: var(--button-background-quinary);
			display: flex;
			justify-content: space-between;
			align-items: center;
			max-width: 15em;
			width: 100%;
			font-size: 2em;
			line-height: 1.8em;
			padding: 0.4em 0.4em 0.4em 1.2em;
			border-radius: 5em;
			color: var(--text-color-octonary);
			transition: background-color 0.2s ease-in-out;
			position: relative;
			z-index: 2;
			box-sizing: border-box;

			@include mobile {
				font-size: 1.6rem;
			}
		}

		&__link div {
			background-color: var(--button-background-quaternary);
			width: 2.4em;
			height: 2.4em;
			border-radius: 5em;
			display: flex;
			justify-content: center;
			align-items: center;
			transition: background-color 0.2s ease-in-out;
		}

		&__link div img {
			width: 0.8em;
			height: 0.8em;
			transition: filter 0.2s ease-in-out;
		}

		&__link:hover {
			color: var(--text-color-octonary);
			background-color: var(--button-background-primary);
		}

		&__link:hover div {
			background-color: rgba(255, 255, 255, 0.2);
		}

		&__link:hover div img {
			filter: invert(100%) brightness(200%);
		}

		&__content {
			padding-block: 10em 11em;
			max-width: 97em;

			h1 {
				font-size: 4.8em;
				font-weight: 600;
				line-height: 1.1em;
				color: #fff;
				margin-bottom: 0.6em;

				@include mobile {
					text-align: center;
					font-size: 2.6rem;
					margin-bottom: 3.2rem;
				}
			}

			&-text {
				display: flex;
				align-items: center;
				gap: 10em;

				@include mobile {
					flex-direction: column;
					align-items: center;
					gap: 3.2rem;
					text-align: center;
					margin-bottom: 0;
				}

				&-item {
					font-size: 2em;
					font-weight: 400;
					line-height: 1.4em;
					color: #fff;
					opacity: 0.8;
					max-width: 20em;

					@include mobile {
						font-size: 1.4rem;
					}
				}
			}
		}

		&__pattern {
			position: absolute;
			bottom: 0;
			right: 0;
			top: 0;
			z-index: 1;
			width: 75em;
			background-image: url('../../../assets/images/footer/footer-pattern.svg');
			background-size: cover;
			background-position: bottom 60% right 100%;
			background-size: 140%;
			background-repeat: no-repeat;

			@include mobile {
				display: none;
			}
		}
	}
</style>
