<template>
	<div class="board-card">
		<div class="board-card__container">
			<div class="board-card__image">
				<UiImage
					:src="announcement.image"
					:alt="announcement.name"
					external
				/>
			</div>
			<div class="board-card__content">
				<h3 class="board-card__title">
					{{ announcement.name }}
				</h3>
				<p class="board-card__description">
					{{ announcement.description }}
				</p>
				<p class="board-card__price">
					{{ announcement.price }}
				</p>
				<div class="board-card__info">
					<p>Дата публикации:</p>
					<p>{{ announcement.date }}</p>
				</div>
			</div>
			<UiButton
				:to="`/board/${announcement.id}`"
				class="board-card__button"
				variant="quinary"
				size="large"
			>
				Подробнее
			</UiButton>
		</div>
	</div>
</template>

<script setup>
	const props = defineProps({
		announcement: {
			type: Object,
			default: () => ({}),
		},
	});
</script>

<style lang="scss"></style>
