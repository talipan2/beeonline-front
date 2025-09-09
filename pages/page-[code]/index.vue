<template>
	<DynamicPage :code="code" />
</template>

<script setup>
	const router = useRouter();
	const code = router.currentRoute.value.params.code;
</script>
