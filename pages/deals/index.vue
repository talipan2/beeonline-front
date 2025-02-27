<template>
    <NuxtLayout
        name="profile"
        title="Сделки"
    >
        <template #header>
            <UiBreadCrumb
                :list="[
                    { label: 'Главная', link: '/' },
                    { label: 'Сделки', link: '' },
                ]"
            />
        </template>
        <template #content>
            <Deals />
        </template>
    </NuxtLayout>
</template>

<script setup>
useHead({
    title: "Сделки",
    meta: [
        {
            name: "description",
            content: "Сделки",
        },
    ],
});
</script>
