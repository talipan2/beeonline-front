<template>
	<CommonBadgeSecond :badges="items.map((item) => item?.label || item?.name)" />
</template>

<script setup>
	const props = defineProps({
		items: {
			type: Array,
			default: () => [],
		},
	});
</script>
