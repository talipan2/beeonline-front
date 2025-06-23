<template>
    <div class="show-contacts-button" v-if="!contacts">
        <UiButton
            variant="primary"
            size="medium"
            type="button"
            @click="open"
        >
            Показать контакты
        </UiButton>
    </div>
    <div class="show-contacts" v-if="contacts">
        <CatalogNewServiceDetailsBadge
            :specs="{
                name: 'Сайт',
                value: contacts.site || 'Не указан',
            }"
            :line-limit="false"
        />
        <CatalogNewServiceDetailsBadge
            :specs="{
                name: 'Email',
                value: contacts.email || 'Не указан',
            }"
            :line-limit="false"
        />
        <CatalogNewServiceDetailsBadge
            :specs="{
                name: 'Телефон',
                value: contacts.phone || 'Не указан',
            }"
            :line-limit="false"
        />
    </div>
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

const loading = ref(false);
const contacts = ref(null);
const infoModal = ref(null);

const open = () => {
    if (loading.value) return;
    loading.value = true;

    organizationStore
        .showPubCardContacts(props.id)
        .then((res) => {
            contacts.value = res;
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

<style lang="scss">
.show-contacts-button {
    grid-column: span 4;
    display: flex;
    justify-content: center;
    margin: 1em 0;
}
.show-contacts {
    grid-column: span 4;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: inherit;

    p {
        overflow-wrap: anywhere;
    }

    @include mobile {
      display: flex;
      flex-direction: column;
    }
}
</style>
