<template>
    <UiButton
        class="header__page-link"
        to="/chat"
        variant="secondary"
        size="around"
    >
        <SvgoMessage class="svg-m" />
        <UiAlertBadge v-if="count" :count="count"/>
    </UiButton>
</template>

<script setup>
import { useUserStore } from '~/store/userStore';
const userStore = useUserStore();

const count = computed(() => {
    return userStore.unreadChatsCount;
});

onMounted(() => {
    eventBus.on('UnreadChatsCountEvent', UnreadChatsCountEvent);
    userStore.sendUnreadChatsCount();
});

onBeforeUnmount(() => {
    eventBus.off('UnreadChatsCountEvent', UnreadChatsCountEvent);
});

function UnreadChatsCountEvent(event) {
    console.log('UnreadChatsCountEvent', event);
    if (!userStore.isAuth) return;
    if (userStore.role !== event.role) return;
    userStore.unreadChatsCount = event.count;
}
</script>

<style>

</style>
