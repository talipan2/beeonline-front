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
</template>

<script setup>
	const data = ref({
		logo: '',
		name: '',
		description: '',
		price: '',
		categories: [],
		gallery: [],
		contact_name: '',
		contact_email: '',
		contact_phone: '',
		company_name: '',
		url_site: '',
	});

	const submit = (value, form) => {
		console.log(value, form);
	};
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
