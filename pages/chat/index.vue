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
                :init-adjacent-service-id="route.query.adjacent_service_id"
                :init-performer-id="route.query.performer_id"
                :is-manager="route.query.is_manager"
            />
        </template>
    </NuxtLayout>
</template>

<script setup>
definePageMeta({
    disableMetrika: false,
    layout: 'chat',
});

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

    @include mobile {
        .profile__container {
            margin-inline: -13px;
            margin-bottom: 0;
        }
    }
}

.telegram-main {
    .chat-layout {
        @include mobile {
            .profile__title {
                margin-block: 0;
            }
        }
    }
}
</style>
