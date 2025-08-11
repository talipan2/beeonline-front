<template>
	<div class="members__list">
		<div
			class="members__item members__item_type_grid"
			v-for="(member, index) in data"
			:key="index"
		>
			<CardsPublic
				:is-props-visible="true"
				:is-description="true"
				:isList="true"
				:data="member"
			/>
		</div>
	</div>
</template>

<script setup>
	const props = defineProps({
		data: {
			type: Array,
			required: true,
		},
	});
</script>

<style lang="scss">
	.members__list {
		display: flex;
		flex-wrap: wrap;
		gap: 3rem;
		justify-content: space-between;

		.members__item_type_grid {
			flex: 0 1 48%;
			display: flex;
			flex-direction: column;

			@include mobile {
				flex: 0 1 100%;
			}
		}
	}
</style>
