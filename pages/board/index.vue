<template>
	<NuxtLayout
		name="info"
		title="Объявления"
	>
		<template #header>
			<UiBreadCrumb
				:list="[
					{ label: 'Главная', link: '/' },
					{ label: 'Объявления', link: '' },
				]"
			/>
		</template>
		<template #content>
			<div class="board">
				<BoardCatalogHeader />
				<div class="board__list">
					<BoardCatalogCard
						v-for="announcement in announcements"
						:key="announcement.id"
						:announcement="announcement"
					/>
				</div>
			</div>
		</template>
	</NuxtLayout>
</template>

<script setup>
	const announcements = [
		{
			id: 1,
			name: 'Пошив крупной партии платьев черного цвета из хлопка размер от 38-50, сроки вы',
			description: 'Футболка для мальчика',
			price: '10000',
			date: new Date().toLocaleDateString(),
			image:
				'https://i.pinimg.com/736x/85/1c/91/851c91b4d10abb8ccdaaa9e454fd19b0.jpg',
		},
		{
			id: 2,
			name: 'Пошив крупной партии платьев черного цвета из хлопка размер от 38-50, сроки вы',
			description: 'Футболка для мальчика',
			price: '10000',
			date: new Date().toLocaleDateString(),
			image:
				'https://i.pinimg.com/736x/85/1c/91/851c91b4d10abb8ccdaaa9e454fd19b0.jpg',
		},
		{
			id: 3,
			name: 'Пошив крупной партии платьев черного цвета из хлопка размер от 38-50, сроки вы',
			description: 'Футболка для мальчика',
			price: '10000',
			date: new Date().toLocaleDateString(),
			image:
				'https://i.pinimg.com/736x/85/1c/91/851c91b4d10abb8ccdaaa9e454fd19b0.jpg',
		},
	];
</script>

<style lang="scss">
	.board {
		&__list {
			display: flex;

			gap: 3.2em;
		}
	}
</style>
