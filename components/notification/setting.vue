<template>
	<div class="notification-setting">
		<h2 class="notification-setting__title">Настройка уведомлений</h2>
		<div class="form-group">
			<label
				class="form-group__title"
				for="locale"
			>
				Язык уведомлений
				<!-- <UiSelect class="" :options="locales" v-model="locale" name="locale" return-value/> -->
				<CommonDropDownSelect
					:options="locales"
					v-model="locale"
					name="locale"
					return-value
					label="Язык уведомлений"
					class="notification-setting__select"
				/>
			</label>
		</div>
		<div
			class="notification-setting__list"
			v-if="notificationPreferences"
		>
			<template
				v-for="(type, index) in notificationTypes"
				:key="index"
			>
				<div
					class="notification-setting__container"
					v-if="
						(!type.roles?.length || type.roles.includes(userStore.role)) &&
						type.is_active
					"
				>
					<p class="notification-setting__text">{{ type.description }}</p>
					<UiCheckboxGroup
						class="notification-setting__checkbox"
						:options="channels"
						:isValidated="false"
						v-model="preferencesByType[type.id]"
						:disabled="(id) => handleDisableChannel(id)"
					/>
				</div>
			</template>
		</div>
		<div class="notification-setting__buttons">
			<NotificationTelegram class="notification-setting__button" />
			<UiButton
				type="button"
				class="notification-setting__button"
				variant="tertiary"
				size="small"
				@click="handleSave"
			>
				Сохранить
				<SvgoBtnArrow class="svg-lx" />
			</UiButton>
		</div>
	</div>
</template>

<script setup>
	import { useUserStore } from '~/store/userStore';
	import { useToast } from 'vue-toastification';

	const userStore = useUserStore();
	const toast = useToast();

	const loading = ref(false);

	const notificationTypes = ref(null);
	const notificationChannels = ref(null);
	const notificationPreferences = ref(null);
	const preferencesByType = ref(null);
	const locale = ref(userStore.userData.notification_locale || 'ru');

	const locales = ref([
		{
			value: 'ru',
			label: 'Русский',
		},
		{
			value: 'en',
			label: 'English',
		},
	]);

	const initPreferencesByType = () => {
		let preferences = {};
		notificationPreferences.value.forEach(({ type, channel, is_active }) => {
			if (is_active) {
				if (!preferences[type]) {
					preferences[type] = [];
				}
				preferences[type].push(channel);
			}
		});
		return preferences;
	};

	const channels = computed(() => {
		return notificationChannels.value.map((channel) => {
			return {
				id: channel.id,
				label: channel.title,
			};
		});
	});

	const formatPreferencesToRequest = () => {
		let result = [];
		notificationTypes.value.forEach((type) => {
			let channelsByType = preferencesByType.value[type.id] || [];
			notificationChannels.value.forEach((channel) => {
				result.push({
					type: type.id,
					channel: channel.id,
					is_active: channelsByType.includes(channel.id),
				});
			});
		});
		return result;
	};

	const handleSave = () => {
		if (loading.value) return;
		let request = {
			locale: locale.value,
			preferences: formatPreferencesToRequest(),
		};
		loading.value = true;
		userStore
			.setNotificationPreferences(userStore.userData.id, request)
			.then((res) => {
				userStore.userData.notification_locale = locale.value;
				toast.success('Настройки сохранены');
			})
			.finally(() => {
				loading.value = false;
			});
	};

	const handleDisableChannel = (channel_id) => {
		let channel = notificationChannels.value.find(
			({ id }) => id === channel_id
		);
		return channel.is_disabled;
	};

	onMounted(() => {
		if (userStore.userData.id) {
			loading.value = true;
			userStore
				.getNotificationPreferences(userStore.userData.id)
				.then((res) => {
					notificationTypes.value = res.notification_types;
					notificationChannels.value = res.notification_channels;
					notificationPreferences.value = res.notification_preferences;
					preferencesByType.value = initPreferencesByType();
					loading.value = false;
				});
		}
	});
</script>

<style lang="scss">
	.notification-setting {
		font-size: 1.6rem;
		padding: 3.75em 1.875em 1.875em;
		box-shadow: var(--box-shadow-primary);
		background-color: #fff;

		@include tablet {
			padding: 2.25rem;
		}

		&__title {
			font-size: 1.5em;
			margin-bottom: 1.25em;
		}

		&__list {
			display: flex;
			flex-direction: column;
			row-gap: 1.875em;
			margin-bottom: 1.875em;
		}

		&__text {
			margin-bottom: 0.625em;
		}

		&__checkbox {
			flex-direction: column;
			row-gap: 0.3em;
		}

		&__select {
			font-size: 1em;
		}

		&__buttons {
			display: flex;
			flex-direction: column;
			row-gap: 1em;
		}

		&__button {
			font-size: 0.75em;
			line-height: 1em;
			font-weight: 400;
			column-gap: 1em;
			padding: 0.83em;
			color: var(--text-color-primary);
			text-transform: uppercase;

			svg {
				margin-block: -1em;
				fill: var(--text-color-ternary);
			}
		}
	}
</style>
