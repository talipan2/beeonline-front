<template>
	<ModalsRoundBorder
		:is-open="editServiceModal"
		title="Редактирование услуги"
		@close="editServiceModal = false"
		size="lg"
		class="service-modal"
	>
		<UiForm
			:submit="
				(values, form) => handleUpdateService(values, form, editServiceData)
			"
			class="service-modal__form"
		>
			<PerformerRegisterServiceForm :service="editServiceData" />
			<UiButton
				class="new-service-card-layout__remove-service"
				type="button"
				variant="default"
				without-padding
				@click="handleDeleteService(editServiceData)"
			>
				<SvgoDelete class="svg-m" />
				Удалить услугу
			</UiButton>
			<div class="new-service-card-layout__edit-service-buttons">
				<UiButton
					class="new-service-card-layout__edit-service-button"
					type="button"
					variant="tertiary"
					size="large"
				>
					Отмена
				</UiButton>
				<UiButton
					class="new-service-card-layout__edit-service-button"
					type="submit"
					variant="quinary"
					size="large"
				>
					Сохранить изменения
				</UiButton>
			</div>
		</UiForm>
	</ModalsRoundBorder>
</template>

<script setup></script>
