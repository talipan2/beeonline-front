<template>
	<div class="edit-toggler">
		<slot
			name="old"
			:oldProps="oldProps"
			v-if="oldProps"
		/>
		<div :class="{ 'd-none': oldProps }">
			<slot
				name="new"
				:oldProps="oldProps"
			/>
		</div>
		<button
			v-if="showButton"
			type="button"
			@click="handleChange"
		>
			change
		</button>
		{{ oldProps }}
	</div>
</template>

<script setup>
	const props = defineProps({
		oldValue: {
			type: [String, Number, Object],
			default: () => ({}),
		},
		newValue: {
			type: [String, Number, Object],
			default: () => ({}),
		},
	});

	const oldProps = ref(false);

	const handleChange = () => {
		oldProps.value = !oldProps.value;
	};

	const showButton = computed(() => {
		return JSON.stringify(props.oldValue) !== JSON.stringify(props.newValue);
	});
</script>

<style lang="scss" scoped>
	.d-none {
		display: none;
	}
</style>
