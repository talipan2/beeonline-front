<template>
	<UiForm
		class="board-create"
		@submit="submit"
	>
		<CommonLayoutInfoCard>
			<BoardForm v-model="data" />
		</CommonLayoutInfoCard>
		<UiButton
			type="submit"
			variant="quinary"
			size="large"
			class="board-create__btn"
		>
			Создать объявление и перейти к оплате
		</UiButton>
	</UiForm>
	<BoardModalsPay
		:isOpen="isOpenPayModal"
		@update:isOpen="handleClosePayModal"
	/>
</template>

<script setup>
	const data = ref({
		logo: '',
		name: '',
		description: '',
		price: 0,
		currency: 2,
		categories: [],
		gallery: [],
		contact_name: '',
		contact_email: '',
		contact_phone: '',
		company_name: '',
		url_site: '',
	});

	const isOpenPayModal = ref(true);

	const handleClosePayModal = () => {
		isOpenPayModal.value = false;
	};

	const submit = (value, form) => {};
</script>

<style lang="scss">
	.board-create {
		font-size: 1rem;

		&__btn {
			font-size: 1.2em;
			text-transform: uppercase;
			margin-left: auto;
			margin-top: 2.6em;
		}
	}
</style>
