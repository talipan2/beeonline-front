<template>
	<NuxtLayout
		name="info"
		className="page-policy"
		:title="data?.title"
	>
		<template #header>
			<UiBreadCrumb
				:list="[
					{ label: 'Главная', link: '/' },
					{ label: data?.title, link: '' },
				]"
			/>
		</template>
		<template #content>
			<div
				class="wysiwyg"
				v-html="data?.text"
			></div>
		</template>
	</NuxtLayout>
</template>

<script setup>
	import { useSettingStore } from '~/store/settingStore';

	const data = ref({});

	const settingStore = useSettingStore();
	const router = useRouter();
	const isLoading = ref(false);

	const code = router.currentRoute.value.path.replace('/page-', '');
	await settingStore
		.getPageContent(code)
		.then((res) => {
			data.value = res;
		})
		.catch((err) => {
			showError({
				status: err.statusCode,
				message: err.message,
			});
		})
		.finally(() => {
			isLoading.value = false;
		});

	useHead({
		title: data?.value?.title,
		meta: [
			{
				name: 'description',
				content: data?.value?.description || data?.value?.title,
			},
		],
	});
</script>

<style lang="scss">
	.wysiwyg {
		font-size: 1rem;

		p {
			font-size: 1.6em;
			// margin-bottom: 1.5em;
		}

		li {
			font-size: 1.6em;
			list-style-type: decimal;
			list-style-position: inside;
			padding-left: 1em;

			p {
				font-size: 1em;
				display: inline;
			}
		}

		a {
			display: inline;
		}

		a:hover {
			text-decoration: underline;
			color: var(--text-color-hover-primary);
		}

		ol {
			list-style-position: inside;
			padding: 0;
		}

		table {
			border-collapse: collapse;

			th,
			td {
				border: 1px solid var(--border-color-secondary);
				padding: 8px 12px;
			}

			@include mobile {
				font-size: 0.7em;
			}
		}
	}
</style>
