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
            />
        </template>
        <template #rightSide></template>
    </NuxtLayout>
</template>

<script setup>

const router = useRouter();


const id = computed(() => Number(router.currentRoute.value.params.id));
const isManager = computed(() => router.currentRoute.value.query.is_manager);

</script>

<style lang="scss">

.deals-layout {
    .profile__container {
        column-gap: 3em;
    }
}

</style>
