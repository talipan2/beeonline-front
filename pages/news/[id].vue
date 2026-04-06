<template>
	<NuxtLayout
		name="info"
		title=""
		class="news-layout"
	>
		<template #header>
			<UiBreadCrumb
				:list="[
					{ label: 'Главная', link: '/' },
					{ label: 'Новости', link: '/news' },
					{ label: data.name, link: '' },
				]"
			/>
		</template>
		<template #content>
			<NewsNewDetails
				:data="data"
				:actual-news="actualNews"
				:banners="banners"
			/>
		</template>
	</NuxtLayout>
</template>

<script setup>
	import { useSettingStore } from '~/store/settingStore';

	const settingStore = useSettingStore();
	const data = ref({});
	const actualNews = ref([]);
	const router = useRouter();
	const banners = ref([]);

	// получение детальной новости
	await settingStore
		.getNews(router.currentRoute.value.params.id)
		.then((res) => {
			data.value = res;
		});

	onMounted(() => {
		settingStore.incrementNewsView(router.currentRoute.value.params.id);

		settingStore
			.getBanners({
				banner_type: ['news'],
				banner_count: [2],
			})
			.then((res) => {
				if (res && res.data) {
					banners.value = res.data;
				}
			});
		// получение актуальных новостей
		settingStore.getNewsList({ featured: true }).then((res) => {
			if (res && res.data) {
				actualNews.value = res.data;
			}
		});
	});

	// Функция для генерации JSON-LD schema для новости
	const generateNewsSchema = () => {
		if (!data.value || !data.value.name) return null;

		// Очистка HTML из текста для description
		const cleanText = data.value.detail_text
			? data.value.detail_text
					.replace(/<[^>]*>/g, '')
					.trim()
					.substring(0, 200)
			: data.value.preview_text || '';

		const schema = {
			'@context': 'https://schema.org',
			'@type': 'NewsArticle',
			headline: data.value.name,
			datePublished: data.value.created_at,
			dateModified: data.value.updated_at || data.value.created_at,
			author: {
				'@type': 'Organization',
				name: 'Bee-Online',
				url: 'https://bee-online.ru',
			},
			publisher: {
				'@type': 'Organization',
				name: 'Bee-Online',
				url: 'https://bee-online.ru',
			},
		};

		// Добавляем описание если есть
		if (data.value.preview_text || cleanText) {
			schema.description = data.value.preview_text || cleanText;
		}

		// Добавляем текст статьи
		if (data.value.detail_text) {
			schema.articleBody = data.value.detail_text
				.replace(/<[^>]*>/g, '')
				.trim();
		}

		// Добавляем изображение если есть
		if (data.value.gallery && data.value.gallery.length > 0) {
			schema.image = data.value.gallery;
		}

		return schema;
	};

	useHead({
		title: 'Новости',
		meta: [
			{
				name: 'description',
				content: data.value.preview_text || '',
			},
		],
		script: [
			{
				type: 'application/ld+json',
				children: JSON.stringify(generateNewsSchema()),
			},
		],
	});
</script>
