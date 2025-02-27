<template>
    <NuxtLayout
        name="profile"
        title="Сделка"
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
                :id="$route.params.id"
                :is-manager="route.query.is_manager"
            />
        </template>
    </NuxtLayout>
</template>

<script setup></script>
