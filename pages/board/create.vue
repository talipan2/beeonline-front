<template>
	<NuxtLayout
		name="performer-register"
		title="Создание объявления"
		class="board-create"
	>
		<template #header>
			<UiBreadCrumb
				:list="[
					{ label: 'Главная', link: '/' },
					{ label: 'Объявления', link: '/board' },
					{ label: 'Создание объявления', link: '' },
				]"
			/>
		</template>
		<template #leftSide></template>
		<template #content>
			<BoardCreate />
		</template>
		<template #rightSide></template>
	</NuxtLayout>
</template>

<script setup></script>

<style lang="scss">
	.board-create {
		.performer-register__container {
			max-width: 1320px;
			margin-inline: auto;
		}
		.performer-register__left {
			display: none;
		}

		.performer-register__right {
			flex-basis: 31%;
		}
	}
</style>
