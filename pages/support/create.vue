<template>
	<NuxtLayout
		name="profile"
		title="Техническая поддержка"
		class="support-сreate-layout"
	>
		<template #header>
			<UiBreadCrumb
				:list="[
					{ label: 'Главная', link: '/' },
					{ label: 'Техническая поддержка', link: '/support' },
					{ label: 'Новый запрос', link: '' },
				]"
			/>
		</template>
		<template #content>
			<SupportCreate />
		</template>
	</NuxtLayout>
</template>

<script setup>
	useHead({
		title: 'Техническая поддержка',
		meta: [
			{
				name: 'description',
				content: '',
			},
		],
	});

	definePageMeta({
		disableMetrika: false,
	});
</script>

<style lang="scss">
	.support-сreate-layout {
		.profile__content {
			flex: 0 1 30%;
			margin-inline: auto;

			@include tablet {
				flex: 0 1 60%;
			}

			@include mobile {
				flex: 1 1 100%;
				margin-inline: 0;
			}
		}
	}
</style>
