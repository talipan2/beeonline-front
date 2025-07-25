<template>
	<div class="bottom-menu">
		<ul class="bottom-menu__list">
			<li class="bottom-menu__item">
				<NuxtLink
					to="/chat?platform=telegram"
					class="bottom-menu__link"
					:class="{ active: isActiveRoute('/chat') }"
				>
					<div class="bottom-menu__icon">
						<SvgoMessage
							class="svg-m"
							fill="currentColor"
						/>
					</div>
					<span class="bottom-menu__text">Сообщения</span>
				</NuxtLink>
			</li>
			<li class="bottom-menu__item">
				<NuxtLink
					to="/orders/create/step1?platform=telegram"
					class="bottom-menu__link"
					:class="{ active: isActiveRoute('/orders/create') }"
				>
					<div class="bottom-menu__icon">
						<SvgoAdd
							class="svg-m"
							fill="currentColor"
						/>
					</div>
					<span class="bottom-menu__text">
						Разместить
						<br />
						заказ
					</span>
				</NuxtLink>
			</li>
			<li class="bottom-menu__item">
				<NuxtLink
					to="/board/create?platform=telegram"
					class="bottom-menu__link"
					:class="{ active: isActiveRoute('/board/create') }"
				>
					<div class="bottom-menu__icon">
						<SvgoAdd
							class="svg-m"
							fill="currentColor"
						/>
					</div>
					<span class="bottom-menu__text">
						Разместить
						<br />
						объявление
					</span>
				</NuxtLink>
			</li>
			<li class="bottom-menu__item">
				<NuxtLink
					to="/services?platform=telegram"
					class="bottom-menu__link"
					:class="{ active: isActiveRoute('/services') }"
				>
					<div class="bottom-menu__icon">
						<SvgoCase
							class="svg-m"
							fill="currentColor"
						/>
					</div>
					<span class="bottom-menu__text">
						Каталог
						<br />
						исполнителей
					</span>
				</NuxtLink>
			</li>
		</ul>
	</div>
</template>

<script setup>
	const route = useRoute();

	const isActiveRoute = (path) => {
		return route.path.startsWith(path);
	};
</script>

<style lang="scss" scoped>
	.bottom-menu {
		font-size: 1rem;
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		background-color: var(--bg-secondary-color);
		box-shadow: var(--box-shadow-tertiary);
		z-index: 10;

		&__list {
			display: flex;
			justify-content: space-between;
			align-items: top;
			padding: 0;
		}

		&__item {
			flex: 0 1 33.33333333333333%;
			padding-block: 1.1em;
			font-size: 1.4em;
		}

		&__link {
			display: flex;
			flex-direction: column;
			align-items: center;
			gap: 0.4em;
		}

		&__icon {
			width: 2.2em;
			height: 2.2em;
			display: flex;
			align-items: center;
			justify-content: center;
			color: var(--text-color-primary);
			border: 1px solid var(--button-background-secondary);
			background-color: var(--bg-primary-color);
			border-radius: 50%;
			// padding: 0.6em;
			transition: all 0.3s ease;

			svg {
				width: 40%;
				height: auto;
			}
		}

		&__text {
			font-family: 'Inter', sans-serif;
			font-size: 0.8em;
			font-weight: 600;
			color: var(--text-color-secondary);
			text-align: center;
			transition: all 0.3s ease;
		}

		&__link.active {
			.bottom-menu__icon {
				background-color: var(--button-background-primary);
				color: var(--text-color-octonary);
				border-color: var(--button-background-primary);
			}

			.bottom-menu__text {
				color: var(--text-color-hover-primary);
			}
		}
	}
</style>
