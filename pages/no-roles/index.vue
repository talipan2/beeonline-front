<template>
  <div>
    <NuxtLayout name="profile">
      <template #content>
        <h2>Для продолжения работы на сайте выберите свою роль: «Производитель», «Заказчик». Выбор можно сделать в правом меню или в верхнем меню (на мобильном устройстве).</h2>
      </template>
    </NuxtLayout>
  </div>
</template>

<script setup>
import { useUserStore } from '~/store/userStore';


const userStore = useUserStore();
const router = useRouter();

watch(() => userStore.role, ()=> {
  if(userStore.role) {
    router.push({path: '/'});
  }
}, {deep: true, immediate: true})

</script>