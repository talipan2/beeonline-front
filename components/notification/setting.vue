<template>
  <div class="notification-setting">
    <h2 class="notification-setting__title">Настройка уведомлений</h2>
    <div class="notification-setting__list">
      <template v-for="notification in notificationsSetting" :key="notification.id">
        <div class="notification-setting__container" v-if="notification.role.includes(userStore.role)">
            <p class="notification-setting__text">{{ notification.label }}</p>
            <UiCheckboxGroup
              class="notification-setting__checkbox"
              :options="notification.settings"
              :isValidated="false"
              v-model="selectedSettings[notification.value]"
              :disabled="(id) => handleDisableSettings(notification.value, id)"

            />
        </div>
      </template>
    </div>
    <div class="notification-setting__buttons">
      <UiButton
        v-if="!isTelegramChatId"
        class="notification-setting__button"
        variant="telegram"
        size="small"
        @click="handleOpenTelegram"
        type="button"
        >Включить уведомления в telegram
      </UiButton>
      <UiButton
        v-else
        class="notification-setting__button"
        variant="telegram"
        size="small"
        @click="handleResetTelegram"
        type="button"
        >Отключить уведомления в telegram
      </UiButton>
      <UiButton
        type="button"
        class="notification-setting__button"
        variant="tertiary"
        size="small"
        @click="handleSelectSettings"
      >
        Сохранить
        <SvgoBtnArrow class="svg-lx" />
      </UiButton>
    </div>
  </div>
</template>

<script setup>
import { useUserStore } from '~/store/userStore';
import {useToast} from "vue-toastification";
import { useSettingStore } from '~/store/settingStore';

const userStore = useUserStore();
const settingStore = useSettingStore();
const toast = useToast();

const loading = ref(false);

// список выбранных уведомлений
const selectedSettings = ref({
  'Новые заказы': [1],
  'Новые отзывы или ответы': [1],
  'Новые сообщения в чате': [1],
  'Системные уведомления': [1],
  'Новости': [1],
  // 'Сделки': [1],
});

function handleDisableSettings(type, id) {
  // Находим настройку по типу и id
  const notification = notificationsSetting.value.find(n => n.value === type);
  if (notification) {
    const setting = notification.settings.find(s => s.id === id);
    return setting ? setting.disabled : false; // Возвращаем значение disabled
  }
  return false; // Если настройка не найдена, возвращаем false
}

// список уведомлений
const notificationsSetting = ref([
  {
    id: 0,
    label: 'Хочу получать уведомления о новых заказах',
    value: 'Новые заказы',
    role: 'performer',
    settings: [
      {id: 0, label: 'по электронной почте', value:'email',},
      {id: 1, label: 'в личном кабинете', value: 'cabinet', disabled: true, },
      {id: 2, label: 'в Telegram', value: 'telegram'},
      {id: 3, label: 'в WhatsApp', value: 'whatsapp'},
    ]
  },
  {
    id: 1,
    label: 'Хочу получать уведомления о новых отзывах или ответах на мои отзывы',
    value: 'Новые отзывы или ответы',
    role: 'customer/performer',
    settings: [
      {id: 0, label: 'по электронной почте', value:'email'},
      {id: 1, label: 'в личном кабинете', value: 'cabinet', disabled: true},
      {id: 2, label: 'в Telegram', value: 'telegram'},
      {id: 3, label: 'в WhatsApp', value: 'whatsapp'},
    ]
  },
  {
    id: 1,
    label: 'Хочу получать уведомления о новых сообщениях в чате',
    value: 'Новые сообщения в чате',
    role: 'customer/performer',
    settings: [
      {id: 0, label: 'по электронной почте', value:'email'},
      {id: 1, label: 'в личном кабинете', value: 'cabinet', disabled: true},
      {id: 2, label: 'в Telegram', value: 'telegram'},
      {id: 3, label: 'в WhatsApp', value: 'whatsapp'},
    ]
  },
  {
    id: 2,
    label: 'Хочу получать системные уведомления',
    value: 'Системные уведомления',
    role: 'customer/performer',
    settings: [
      {id: 0, label: 'по электронной почте', value:'email'},
      {id: 1, label: 'в личном кабинете', value: 'cabinet', disabled: true},
      {id: 2, label: 'в Telegram', value: 'telegram'},
      {id: 3, label: 'в WhatsApp', value: 'whatsapp'},
    ]
  },
  {
    id: 3,
    label: 'Хочу получать уведомления о новостях',
    value: 'Новости',
    role: 'customer/performer',
    settings: [
      {id: 0, label: 'по электронной почте', value:'email'},
      {id: 1, label: 'в личном кабинете', value: 'cabinet', disabled: true},
      {id: 2, label: 'в Telegram', value: 'telegram'},
      {id: 3, label: 'в WhatsApp', value: 'whatsapp'},
    ]
  },
  // {
  //   id: 4,
  //   label: 'Хочу получать уведомления о сделках',
  //   value: 'Сделки',
  //   role: 'customer/performer',
  //   settings: [
  //     {id: 0, label: 'по электронной почте', value:'email'},
  //     {id: 1, label: 'в личном кабинете', value: 'cabinet', disabled: true},
  //     {id: 2, label: 'в Telegram', value: 'telegram'},
  //     {id: 3, label: 'в WhatsApp', value: 'whatsapp'},
  //   ]
  // },
])

// список значений
const settingValues = [
  {
    id: 0,
    value: 'email'
  },
  {
    id: 1,
    value: 'cabinet'
  },
  {
    id: 2,
    value: 'telegram'
  },
  {
    id: 3,
    value: 'whatsapp'
  },
]

// изменение с id на value
const formatSettingsToRequest = (settings) => {
  const result = {};

  for (const key in settings) {
    if (settings[key].length > 0) {
      // Фильтруем, чтобы не отправлять личный кабинет (так как он всегда включен)
      result[key] = settings[key]
        .filter(id => id !== 1) // Исключаем ID личного кабинета
        .map(setting => {
          return settingValues.find(item => item.id === setting)?.value;
        })
        .filter(Boolean);
    }
  }

  return result;
};

const formatSettingsToState = (settings) => {
  const result = {};

  // Проходим по всем типам уведомлений из notificationsSetting
  notificationsSetting.value.forEach(notification => {
    const key = notification.value;

    // Если настройки для этого типа есть и это массив
    if (settings[key] && Array.isArray(settings[key])) {
      // Объединяем пришедшие настройки с обязательным личным кабинетом (id=1)
      result[key] = [...new Set([
        1, // Всегда добавляем личный кабинет
        ...settings[key].map(value => {
          return settingValues.find(item => item.value === value)?.id;
        }).filter(id => id !== undefined)
      ])];
    } else {
      // Если настройки не пришли или пустые - только личный кабинет
      result[key] = [1];
    }
  });

  return result;
};

const handleSelectSettings = () => {
  let formattedSettings = formatSettingsToRequest(selectedSettings.value)
  console.log(formattedSettings)
  if(userStore.userData.id) {
    userStore.setNotification(userStore.userData.id, formattedSettings).then(res => {
      if(res) {
        toast.success(res.message);
      }
    })
  }
}

const isTelegramChatId = computed(() => userStore.userData.telegram_chat_id !== null)

const handleOpenTelegram = () => {
  if(!userStore.userData.id) return;
  if (loading.value) return;

  loading.value = true;
  settingStore.telegramNotify(userStore.userData.id).then(res => {
        if (res && res.telegram_chat_link) {
            window.open(res.telegram_chat_link, '_blank');
            // userStore.checkAuth();
        }
    }).catch(err => {
        console.log(err)
    })
    .finally(() => {
        loading.value = false;
    });
}

const handleResetTelegram = () => {
    if(!userStore.userData.id) return
    if (loading.value) return;

    loading.value = true;
    settingStore.resetTelegramNotify(userStore.userData.id)
    .then(res => {
        userStore.userData.telegram_chat_id = null;
    })
    .finally(() => {
        loading.value = false;
    })
}

onMounted(() => {
  if(userStore.userData.id) {
    loading.value = true;
    userStore.getNotifications(userStore.userData.id)
    .then(res => {
      if(res && res.notification_settings) {
        selectedSettings.value = formatSettingsToState(res.notification_settings);
        loading.value = false;
      }
    })
  }
})

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
    margin-bottom: .625em;
  }

  &__checkbox {
    flex-direction: column;
    row-gap: .3em;
  }

  &__buttons {
    display: flex;
    flex-direction: column;
    row-gap: 1em;
  }

  &__button {
    font-size: .75em;
    line-height: 1em;
    font-weight: 400;
    column-gap: 1em;
    padding: .83em;
    color: var(--text-color-primary);
    text-transform: uppercase;

    svg {
      margin-block: -1em;
      fill: var(--text-color-ternary);
    }
  }
}
</style>
