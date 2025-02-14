<template>
    <NuxtLayout
        name="profile"
        title="Сообщения"
        class="chat-layout"
    >
        <template #header>
            <UiBreadCrumb
                :list="[
                    { label: 'Главная', link: '/' },
                    { label: 'Сообщения', link: '' },
                ]"
            />
        </template>
        <template #content>
            <ChatPage
                :init-chat-id="route.query.chat_id"
                :init-order-id="route.query.order_id"
                :is-manager="route.query.is_manager"
            />
        </template>
    </NuxtLayout>
</template>

<script setup>
const route = useRoute();
</script>

<style lang="scss">
.chat-layout {
    .profile__content {
        max-width: 81%;
    }

    @include tablet {
        .profile__content {
            max-width: 100%;
        }
    }
}
</style>
