<template>
	<Teleport to="body">
		<Transition name="popup-banner">
			<div
				v-if="isVisible && banner"
				class="popup-banner-overlay"
				@click.self="close"
			>
				<div class="popup-banner">
					<button class="popup-banner__close" @click="close" aria-label="Закрыть">
						<SvgoClose class="svg-l" />
					</button>

					<div class="popup-banner__inner">
						<div
							class="popup-banner__image-wrap"
							:style="backgroundStyle"
						>
							<div class="popup-banner__content" v-if="banner.text || (banner.button?.enabled && banner.button?.title)">
								<p v-if="banner.text" class="popup-banner__text">
									{{ banner.text }}
								</p>
								<a
									v-if="banner.button?.enabled && banner.button?.title && banner.button?.url"
									:href="banner.button.url"
									:target="banner.open_new_tab ? '_blank' : '_self'"
									rel="noopener noreferrer"
									class="popup-banner__btn"
									@click="handleBannerClick"
								>
									{{ banner.button.title }}
								</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		</Transition>
	</Teleport>
</template>

<script setup>
	import { useSettingStore } from '~/store/settingStore';
	import { useBreakpoints } from '@vueuse/core';

	const STORAGE_KEY = 'popup_banner_last_shown';
	const SHOW_AGAIN_AFTER_HOURS = 24;

	const settingStore = useSettingStore();
	const banner = ref(null);
	const isVisible = ref(false);

	const breakpoints = useBreakpoints({ sm: 640, md: 768 });
	const isMobile = breakpoints.smaller('sm');
	const isTablet = breakpoints.between('sm', 'md');

	const backgroundStyle = computed(() => {
		if (!banner.value?.images) return {};

		let imageUrl = '';
		if (isMobile.value) {
			imageUrl = banner.value.images.sm || banner.value.images.md || banner.value.images.lg || '';
		} else if (isTablet.value) {
			imageUrl = banner.value.images.md || banner.value.images.lg || banner.value.images.sm || '';
		} else {
			imageUrl = banner.value.images.lg || banner.value.images.md || banner.value.images.sm || '';
		}

		if (!imageUrl) return {};

		return {
			backgroundImage: `url('${imageUrl}')`,
		};
	});

	const shouldShow = () => {
		if (import.meta.server) return false;
		const lastShown = localStorage.getItem(STORAGE_KEY);
		if (!lastShown) return true;
		const hoursSince = (Date.now() - Number(lastShown)) / (1000 * 60 * 60);
		return hoursSince >= SHOW_AGAIN_AFTER_HOURS;
	};

	const close = () => {
		isVisible.value = false;
		localStorage.setItem(STORAGE_KEY, String(Date.now()));
	};

	const handleBannerClick = () => {
		if (banner.value?.id) {
			settingStore.bannerClick(banner.value.id);
		}
	};

	onMounted(async () => {
		if (!shouldShow()) return;

		try {
			const res = await settingStore.getBanners({
				banner_type: ['popup_main'],
				banner_count: [1],
			});

			if (res?.data?.length) {
				banner.value = res.data[0];
				const hasImage = banner.value.images?.sm || banner.value.images?.md || banner.value.images?.lg;
				if (hasImage) {
					setTimeout(() => {
						isVisible.value = true;
						if (banner.value?.id) {
							settingStore.bannerView?.(banner.value.id);
						}
					}, 1500);
				}
			}
		} catch (e) {
			console.error('Ошибка загрузки popup баннера:', e);
		}
	});
</script>

<style lang="scss" scoped>
	.popup-banner-overlay {
		position: fixed;
		inset: 0;
		z-index: 9999;
		background-color: rgba(0, 0, 0, 0.65);
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 2rem;

		@include mobile {
			padding: 1.6rem;
			align-items: flex-end;
		}
	}

	.popup-banner {
		position: relative;
		width: 100%;
		max-width: 72rem;
		border-radius: 2rem;
		overflow: hidden;
		box-shadow: 0 2.4rem 6rem rgba(0, 0, 0, 0.4);

		@include mobile {
			border-radius: 1.6rem;
			max-width: 100%;
		}

		&__close {
			position: absolute;
			top: 1.6rem;
			right: 1.6rem;
			z-index: 10;
			width: 4rem;
			height: 4rem;
			border-radius: 50%;
			background: rgba(255, 255, 255, 0.25);
			backdrop-filter: blur(8px);
			display: flex;
			align-items: center;
			justify-content: center;
			color: #fff;
			transition: background 0.2s;

			&:hover {
				background: rgba(255, 255, 255, 0.45);
			}

			svg {
				width: 1.8rem;
				height: 1.8rem;
			}
		}

		&__inner {
			width: 100%;
		}

		&__image-wrap {
			position: relative;
			width: 100%;
			min-height: 42rem;
			background-size: cover;
			background-position: center;
			background-repeat: no-repeat;
			background-color: #1a1a2e;

			@include mobile {
				min-height: 32rem;
			}

			&::after {
				content: '';
				position: absolute;
				inset: 0;
				background: linear-gradient(
					to top,
					rgba(0, 0, 0, 0.75) 0%,
					rgba(0, 0, 0, 0.2) 50%,
					rgba(0, 0, 0, 0) 100%
				);
			}
		}

		&__content {
			position: absolute;
			bottom: 0;
			left: 0;
			right: 0;
			z-index: 2;
			padding: 3.2rem;
			display: flex;
			flex-direction: column;
			gap: 1.6rem;

			@include mobile {
				padding: 2.4rem;
				gap: 1.2rem;
			}
		}

		&__text {
			font-size: 3.2rem;
			font-weight: 700;
			line-height: 1.2;
			color: #fff;
			text-transform: uppercase;
			letter-spacing: 0.02em;
			max-width: 52rem;

			@include mobile {
				font-size: 2.2rem;
			}
		}

		&__btn {
			display: inline-flex;
			align-items: center;
			gap: 0.8rem;
			padding: 1.2rem 2.4rem;
			font-size: 1.6rem;
			font-weight: 600;
			line-height: 1.3;
			color: #fff;
			background: rgba(255, 255, 255, 0.2);
			backdrop-filter: blur(20px);
			border-radius: 10rem;
			border: 1.5px solid rgba(255, 255, 255, 0.4);
			transition: background 0.2s, border-color 0.2s;
			width: fit-content;
			text-decoration: none;

			&:hover {
				background: rgba(255, 255, 255, 0.35);
				border-color: rgba(255, 255, 255, 0.7);
			}

			@include mobile {
				font-size: 1.4rem;
				padding: 1rem 2rem;
			}
		}
	}

	.popup-banner-enter-active,
	.popup-banner-leave-active {
		transition: opacity 0.35s ease;

		.popup-banner {
			transition: transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.35s ease;
		}
	}

	.popup-banner-enter-from,
	.popup-banner-leave-to {
		opacity: 0;

		.popup-banner {
			transform: scale(0.94) translateY(1.6rem);
			opacity: 0;
		}
	}
</style>
