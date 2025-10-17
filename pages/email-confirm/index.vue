<template>
  <NuxtLayout name="info" className="email-confirm" title="Подтверждение почты">
    <template #content>
      <CommonAlerts class="email-confirm__alerts" :alert="message" :type="alertStatus" v-if="message"/>
    </template>
  </NuxtLayout>
</template>

<script setup>
definePageMeta({
  ignoreAuth: true,
  disableMetrika: false,
});

import { useSettingStore } from '~/store/settingStore';
import { useUserStore } from '~/store/userStore';


const router = useRouter();
const settingStore = useSettingStore();
const userStore = useUserStore();
const message = ref('');
const alertStatus = ref('');

const handleConfirmEmail = async () => {
    try {
      const res = await settingStore.emailConfirm(
        router.currentRoute.value.query?.id,
        router.currentRoute.value.query?.hash
      );

      message.value = res.message;
      alertStatus.value = 'info';

      setTimeout(() => {
        if (userStore.isAuth && userStore.userData.id) {
          router.push({ path: '/desktop' });
        } else {
          router.push({ path: '/' });
        }
      }, 3000);
    } catch (err) {
      message.value = err.message || 'Ошибка подтверждения email';
      alertStatus.value = 'error';
    }
};

await handleConfirmEmail();

</script>

<style lang="scss">

.email-confirm {
  &__alerts {
    max-width: 50%;

    @include tablet {
      max-width: 100%;
    }
  }
}

</style>
