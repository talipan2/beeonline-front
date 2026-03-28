<template>
  <div class="body" :style="styles">
    <Header />
    <main>
      <slot />
    </main>
    <Footer />
  </div>
  <ModalsContainer />
  <TariffsNoTariffModal />
</template>

<script setup>
    import { ModalsContainer } from 'vue-final-modal';
    import { useSettingStore } from '~/store/settingStore';

    const settingStore = useSettingStore();

    const styles = computed(() => {
        return {
            '--header-height': `${settingStore.headerHeight}px`,
        }
    });
</script>
