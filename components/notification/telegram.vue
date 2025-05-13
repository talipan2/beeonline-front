<template>
    <UiButton
        v-if="!isTelegramChatId"
        :class="[$attrs.class]"
        variant="telegram"
        size="small"
        @click="handleOpenTelegram"
        type="button"
        >Включить уведомления в telegram
    </UiButton>
    <UiButton
        v-else
        :class="[$attrs.class]"
        variant="telegram"
        size="small"
        @click="handleResetTelegram"
        type="button"
        >Отключить уведомления в telegram
    </UiButton>
</template>

<script setup>
import { useUserStore } from '~/store/userStore';
import { useSettingStore } from '~/store/settingStore';

const userStore = useUserStore();
const settingStore = useSettingStore();

defineOptions({ inheritAttrs: false });

const loading = ref(false);
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
</script>

<style></style>
