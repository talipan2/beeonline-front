<template>
    <NuxtLayout
        name="profile"
        title="Сделка"
        class="deals-layout"
    >
        <template #header>
            <UiBreadCrumb
                :list="[
                    { label: 'Главная', link: '/' },
                    { label: 'Сделки', link: '/deals' },
                    { label: 'Сделка', link: '' },
                ]"
            />
        </template>
        <template #content>
            <DealsDetails
                :id="id"
                :is-manager="isManager"
                @chat:open="chatId = $event"
            />
        </template>
        <template #rightSide>
            <Chat
                :init_chat_id="chatId"
                :small="true"
            />
        </template>
    </NuxtLayout>
</template>

<script setup>

const router = useRouter();


const id = computed(() => Number(router.currentRoute.value.params.id));
const isManager = computed(() => router.currentRoute.value.query.is_manager);

const chatId = ref(null);

</script>

<style lang="scss">

.deals-layout {
    .profile__container {
        column-gap: 3em;
    }
    .profile__right {
        .sticky {
            border: 1px solid #e9e9e9;
            height: calc(100vh - var(--header-height) - 60px);
        }
    }
}

</style>
