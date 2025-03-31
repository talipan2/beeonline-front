<template>
    <div class="order-card">
        <h3 class="order-card__title">{{ data.name }}</h3>
        <div class="order-card__content">
            <div class="order-card__left">
                <div class="image-box">
                    <img
                        :src="logo || defaultImage"
                        :alt="data.name"
                    />
                </div>
                <CommonTooltip class="order-card__tooltip" text="Подробнее о статусах">
                    <template #trigger>
                        <a
                            href="javascript:;"
                            class="order-card__status"
                            :class="`order-card__status_${data.lifecycle_status}`"
                            @click="statusModal.open()"
                        >
                            <span>{{ data.lifecycle_status_name }}</span>
                        </a>
                    </template>
                </CommonTooltip>
            </div>
            <div class="props">
                <div
                    class="prop"
                    v-for="prop in data.data"
                    :key="prop.id"
                    :class="{ prop_type_text: prop.name === 'Описание' }"
                >
                    <p class="prop__name prop__name_type_grey">{{ prop.name }}:</p>
                    <p
                        class="prop__value"
                        :class="{ prop_type_hidden: prop.name === 'Описание' }"
                    >
                        <i
                            :class="`flag flag_round flag_${data.alias}`"
                            v-if="
                                prop.name === 'Место производства'
                            "
                        />
                        <span>
                            {{
                                Array.isArray(prop.value)
                                    ? prop.value[0] || "не указано"
                                    : prop.value || "не указано"
                            }}
                        </span>
                        <ModalsMoreCities
                            :list="prop.value.slice(1)"
                            :title="prop.name"
                            placement="bottom-end"
                            v-if="
                                Array.isArray(prop.value) &&
                                prop.value &&
                                prop.value.length > 1
                            "
                        />
                    </p>
                </div>
            </div>
        </div>
        <div class="order-card__footer" v-if="isFooter">
            <template v-if="userStore.isAuth">
                <div class="order-card__footer-container">
                    <UiButton
                        class="order-card__footer-button"
                        variant="tertiary"
                        :to="`/chat?order_id=${data.id}`"
                    >
                        <SvgoMessage class="svg-m" fill="#6937a5" />
                        Написать
                    </UiButton>
                    <PhoneNumberModal :order-id="data.id">
                        <template #button="{ open }">
                            <UiButton
                                type="button"
                                class="order-card__footer-button"
                                variant="tertiary"
                                @click="open"
                            >
                                <SvgoPhone class="svg-m" fill="#6937a5" />
                                Позвонить
                            </UiButton>
                        </template>
                    </PhoneNumberModal>
                </div>
            </template>
            <template v-else>
                <div class="order-card__footer-container">
                    <UiButton
                        type="button"
                        class="order-card__footer-button"
                        variant="tertiary"
                        @click="settingStore.authModalStatus = true"
                    >
                        <SvgoMessage class="svg-m" fill="#6937a5" />
                        Написать
                    </UiButton>
                    <PhoneNumberModal :order-id="data.id">
                        <template #button>
                            <UiButton
                                type="button"
                                class="order-card__footer-button"
                                variant="tertiary"
                                @click="settingStore.authModalStatus = true"
                            >
                                <SvgoPhone class="svg-m" fill="#6937a5" />
                                Позвонить
                            </UiButton>
                        </template>
                    </PhoneNumberModal>
                </div>
            </template>
        </div>
        <slot name="favorite-delete" />
        <NuxtLink
            v-if="isLink"
            class="order-card__link"
            :to="`/orders/${data.id}`"
            :target="linkBlank ? '_blank' : ''"
        ></NuxtLink>
    </div>
</template>

<script setup>
import defaultImage from "~/assets/images/nophoto_pc.png";
import { selectFlag } from "#imports";
import { useEntityStore } from "~/store/entityStore";
import { useUserStore } from "~/store/userStore";
import { useSettingStore } from "~/store/settingStore";
import { useModal } from 'vue-final-modal';
import CatalogOrdersStatusModal from "~/components/catalog/orders/statusModal.vue";

const props = defineProps({
    data: {
        type: Object,
        default: {},
    },
    linkBlank: {
        type: Boolean,
        default: false,
    },
    isLink: {
        type: Boolean,
        default: true,
    },
    isFooter: {
        type: Boolean,
        default: false
    }
});

const entityStore = useEntityStore();
const userStore = useUserStore();
const settingStore = useSettingStore();

const logo = computed(() => props.data.logo);
const entity = computed(() => {
    if (userStore.role === "performer") {
        return entityStore.service;
    } else return entityStore.order;
});

const statusModal = useModal({
  component: CatalogOrdersStatusModal,
});
</script>

<style lang="scss">
.order-card {
    flex: 1;
    box-shadow: var(--box-shadow-primary);
    padding: 2em;
    // margin-top: 2em;
    background-color: #fff;
    position: relative;
    transition: box-shadow 0.2s ease;
    z-index: 1;

    &.highlight {
        position: relative;
        box-shadow: 0px 0px 0 4px #6937a5, 0 1px 1px rgba(0, 0, 0, 0.15);

        &::after {
            content: "";
            position: absolute;
            pointer-events: none;
            top: 10px;
            z-index: 9999;
            height: 29px;
            width: 29px;
            right: 10px;
            background-size: cover;
            background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' height='24px' viewBox='0 -960 960 960' width='24px' fill='%236937a5'%3E%3Cpath d='m384-334 96-74 96 74-36-122 90-64H518l-38-124-38 124H330l90 64-36 122ZM233-120l93-304L80-600h304l96-320 96 320h304L634-424l93 304-247-188-247 188Zm247-369Z'/%3E%3C/svg%3E");
        }

        &:hover {
            box-shadow: -2px -2px 0 #6937a5, 0px 4px 20px rgba(0, 0, 0, 0.1);
        }
    }

    &:hover {
        box-shadow: -2px -2px 0 #6937a5, 0px 4px 20px rgba(0, 0, 0, 0.1);
    }

    &__tooltip {
        span {
            width: 100%;
        }
    }

    &__title {
        font-size: 1.8em;
        padding-bottom: 1em;
        margin-bottom: 1em;
        border-bottom: 1px solid var(--border-color-secondary);
        min-height: 1.5em;
    }

    &__content {
        display: flex;
        gap: 5%;
        margin-bottom: 3em;
    }

    &__left {
        display: flex;
        flex-direction: column;
        gap: 1em;
        flex: 0 0 30%;
        width: 30%;

        .image-box {
            padding-top: 100%;
            margin-right: 0;
            max-width: 100%;
            flex: 0 0 0;
            height: 0;
        }
    }

    &__status {
        font-weight: 400;
        font-size: 13px;
        line-height: 1;
        padding: 0.25em 0.4em;
        text-align: center;
        transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
            box-shadow 0.15s ease-in-out;
        vertical-align: baseline;
        border-radius: 1px;
        color: #fff;
        z-index: 2;
        position: relative;

        &_green {
            background-color: #6dbf2f;
        }
        &_yellow {
            background-color: #d5a000;
        }
        &_red {
            background-color: #dc3545;
        }
    }

    &__link {
        position: absolute;
        inset: 0;
        z-index: 1;
    }

    &__footer-container {
        display: flex;
        gap: 1em;
        flex-wrap: wrap;
    }

    &__footer-button {
        flex: 0 1 calc(50% - 0.5em);
        z-index: 2;
        column-gap: 1em;
    }
}
</style>
