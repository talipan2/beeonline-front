<template>
	<section class="banners">
		<div class="container">
			<div class="banners__list">
				<div class="banners__item">
					<Banners
						v-if="bannerPerformer"
						:banner="bannerPerformer"
					/>
					<UiButton
						v-if="bannerPerformer?.button?.enabled"
						variant="default"
						class="banners__button"
						:to="bannerPerformer?.button?.url || 'javascript:;'"
					>
						{{ bannerPerformer.button.text || 'Подробнее' }}
					</UiButton>
				</div>
				<div class="banners__item">
					<Banners
						v-if="bannerCustomer"
						:banner="bannerCustomer"
					/>
					<UiButton
						v-if="bannerCustomer?.button?.enabled"
						variant="default"
						class="banners__button"
						:to="bannerCustomer?.button?.url || 'javascript:;'"
					>
						{{ bannerCustomer.button.text || 'Подробнее' }}
					</UiButton>
				</div>
			</div>
		</div>
	</section>
</template>

<script setup>
	import Banners from '~/components/banners/index.vue';
	import { useSettingStore } from '~/store/settingStore';

	const settingStore = useSettingStore();
	const bannerCustomer = ref({});
	const bannerPerformer = ref({});

	onMounted(() => {
		settingStore
			.getBanners({
				banner_type: ['search_customer', 'search_performer'],
				banner_count: [1],
			})
			.then((res) => {
				if (res && res.data) {
					const customerBanner = res.data.find(
						(banner) => banner.type === 'search_customer'
					);

					if (customerBanner) {
						if (customerBanner?.url) {
							customerBanner.url = '';
						}
						bannerCustomer.value = customerBanner;
					}

					const performerBanner = res.data.find(
						(banner) => banner.type === 'search_performer'
					);

					if (performerBanner) {
						if (performerBanner?.url) {
							performerBanner.url = '';
						}
						bannerPerformer.value = performerBanner;
					}
				}
			});
	});
</script>

<style lang="scss" scoped>
	.banners {
		font-size: 1rem;
		margin-bottom: 10em;

		@include mobile {
			margin-bottom: 6.4rem;
		}

		&__list {
			display: grid;
			grid-template-columns: repeat(2, 1fr);
			gap: 24px;

			@include mobile {
				grid-template-columns: repeat(1, 1fr);
			}
		}

		&__item {
			position: relative;
			border-radius: 24px;
			max-height: 34.8em;
			overflow: hidden;

			a:not(.banners__button) {
				cursor: auto;
			}

			img {
				object-fit: cover;
				height: auto;
			}
		}
		&__button {
			position: absolute;
			bottom: 2.6em;
			left: 2.6em;
			font-weight: 600;
			font-size: 1.8em;
			line-height: 1.3em;
			color: #fff;
			backdrop-filter: blur(20px);
			background: rgba(255, 255, 255, 0.3);
			text-transform: none;
			padding: 0.8em 1.7em;

			&:hover {
				background: rgba(255, 255, 255, 0.5);
			}
		}
	}
</style>
