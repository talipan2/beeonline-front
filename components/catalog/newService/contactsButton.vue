<template>
    <slot :open="open"/>
    <InfoModal :text="infoModal.text" :title="infoModal.title" v-if="infoModal">
      <template #content>
          <ProfileSendEmailConfirm v-if="!emailVerified" v-slot="{ send }" @success="settingStore.infoModal = false">
            <UiButton type="button" @click="send" class="info-modal__btn" variant="quinary" size="large">Подтвердить</UiButton>
          </ProfileSendEmailConfirm>
          <UiButton type="button" class="info-modal__btn" variant="tertiary" @click="settingStore.infoModal = false" size="large">Закрыть</UiButton>
      </template>
    </InfoModal>
</template>

<script setup>
import { useOrganizationStore } from "~/store/organizationStore";
import { useSettingStore } from "~/store/settingStore";

const organizationStore = useOrganizationStore();
const settingStore = useSettingStore();

const props = defineProps({
    id: {
        type: Number,
    },
});

const emits = defineEmits(["show"]);

const loading = ref(false);
const infoModal = ref(null);

const open = () => {
    if (loading.value) return;
    loading.value = true;

    organizationStore
        .showPubCardContacts(props.id)
        .then((res) => {
            emits("show", res);
        })
        .catch((error) => {
            if (error?.data?.code === 401) {
                settingStore.authModalStatus = true;
                return;
            }
            if (error?.data?.error_key === "email_not_confirmed") {
                infoModal.value = {
                    title: "Подтвердите email",
                    text: "Для доступа к контактам необходимо подтвердить email",
                }
                settingStore.infoModal = true;
            }
            console.log(error);
        })
        .finally(() => (loading.value = false));
};
</script>
