<template>
	<div class="main">
		<!-- <MainBanner />
		<MainServices />
		<MainBrands />
		<MainAdvantages />
		<MainReviews />
		<MainPartners /> -->
		<!-- <MainSearchOptions /> -->
		<!-- <MainSafeTransaction /> -->
		<MainNewMain />
		<BannersPopupBanner />
	</div>
</template>

<script setup>
	const schema = {
		'@context': 'https://schema.org',
		'@type': 'Organization',
		name: 'Bee-Online',
		url: 'https://bee-online.ru',
		contactPoint: {
			'@type': 'ContactPoint',
			telephone: '+7 (499) 705-73-93',
			contactType: 'Поддержка',
			email: 'info@bee-online.ru',
		},
		description:
			'Международный цифровой сервис поиска партнёров в сфере легкой промышленности, соединяющий фабрики и заказчиков.',
		foundingDate: '2020',
		address: {
			'@type': 'PostalAddress',
			addressCountry: 'RU',
			addressLocality: 'Москва',
			postalCode: '125284',
			streetAddress:
				'вн.тер.г. Муниципальный округ Беговой, пр-кт Ленинградский д. 35, стр.2, помещ. 214',
		},
	};

	useHead({
		script: [
			{
				type: 'application/ld+json',
				innerHTML: JSON.stringify(schema),
			},
		],
	});
</script>

<style lang="scss">
	.main {
		font-family: 'Inter', sans-serif;
	}
</style>
