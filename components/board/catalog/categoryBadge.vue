<template>
	<CommonBadgeSecond
		:badges="options"
		@click="handleClickCategory"
		type="button"
		class="board-form__badge-second"
	/>
</template>

<script setup>
	import { useEntityStore } from '~/store/entityStore';

	const props = defineProps({
		listIds: {
			type: Array,
			default: () => [],
		},
	});

	const emit = defineEmits(['click']);

	const entityStore = useEntityStore();

	const options = computed(() => {
		return entityStore.getEntityLabelById(
			'announcementCategories',
			props.listIds,
			true
		);
	});

	const handleClickCategory = (badge) => {
		emit('click', badge);
	};
</script>
