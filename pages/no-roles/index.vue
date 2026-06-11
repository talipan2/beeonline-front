<template>
  <div>
    <NuxtLayout name="profile">
      <template #content>
        <h2>Вы перешли на сайт онлайн платформы по контрактному производству, благодаря единой регистрации вы можете начать диалог с любым пользователем, для этого в боковом меню выберите свою роль «Стать производителем» или «Стать заказчиком»</h2>
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