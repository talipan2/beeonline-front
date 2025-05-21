<template>
    <div
        class="card-pub"
        :class="{ 'card-pub_type_list': isList }"
    >
        <div class="card-pub__head">
            <h5 class="card-pub__title">{{ data.name || "Название компании" }}</h5>
            <div class="card-pub__status" v-if="statusVisible">Статус: {{ data.statusName }}</div>
        </div>
        <div class="card-pub__content">
            <div class="card-pub__image image-box image-box_type_frame">
                <img
                    class=""
                    :src="data.logo || defaultCompanyLogo"
                    :alt="data.name || 'Логотип'"
                />
            </div>

            <div class="card-pub__details">
                <div class="card-pub__details-container">
                    <CommonRating
                        :isCountRating="false"
                        :rating="data.stars"
                        :reviews="data.reviewCount"
                    />
                </div>
                <CommonLocationsList :locationsList="data.countryId" is-country/>
                <div class="card-pub__details-container">
                    <SvgoCase
                        class="svg-m"
                        fill="#C4C4C4"
                    />
                    <p v-if="data.type === 'performer'">
                        {{
                            data.entityCount
                                ? data.entityCount +
                                  " " +
                                  plural(data.entityCount, {
                                      one: "услуга",
                                      few: "услуги",
                                      many: "услуг",
                                  })
                                : "Нет услуг"
                        }}
                    </p>
                    <p v-if="data.type === 'customer'">
                        {{
                            data.entityCount
                                ? data.entityCount +
                                  " " +
                                  plural(data.entityCount, {
                                      one: "заказ",
                                      few: "заказа",
                                      many: "заказов",
                                  })
                                : "Нет заказов"
                        }}
                    </p>
                </div>
                <div
                    class="props"
                    v-if="isPropsVisible"
                >
                    <div class="prop">
                        <p class="prop__name prop__name_type_grey">Сырье:</p>
                        <p class="prop__value">
                            {{
                                data.rawMaterials &&
                                data.rawMaterials.length > 0
                                    ? data.rawMaterials.join(", ")
                                    : "Не указано"
                            }}
                        </p>
                    </div>
                    <div class="prop">
                        <p class="prop__name prop__name_type_grey">
                            Категории:
                        </p>
                        <p class="prop__value">
                            {{
                                data.category && data.category.length > 0
                                    ? data.category[0]
                                    : "Не указано"
                            }}
                        </p>
                        <ModalsMoreCities
                            class="prop__more"
                            :list="data.category.slice(1)"
                            v-if="data.category && data.category.length > 1"
                            title="Категории"
                        />
                    </div>
                </div>
            </div>
        </div>
        <div
            class="card-pub__description"
            v-if="data.description"
        >
            <div class="form-group__title">Описание</div>
            <p class="form-group__value prop_type_hidden">
                {{ data.description || "-" }}
            </p>
        </div>
        <slot name="favorite-delete" />
        <NuxtLink
            class="card-pub__link"
            :to="`/members/${data.id}/${data.type}`"
            v-if="isList && data.type === 'customer'"
            :target="linkBlank ? '_blank' : ''"
        >
        </NuxtLink>
        <NuxtLink
            class="card-pub__link"
            :to="`/services/${data.id}`"
            v-if="isList && data.type === 'performer'"
            :target="linkBlank ? '_blank' : ''"
        >
        </NuxtLink>
        <div class="card-pub__footer" v-if="data.status == 2 && isPubCardUp">
            <div class="card-pub__footer-container">
                <PaidServiceRaisingService
                    :id="data.id"
                >
                    <template #button="{ open }">
                        <UiButton
                            variant="tertiary"
                            size="medium"
                            type="button"
                            @click="open"
                            class="card-pub__footer-container-button"
                        >
                            Поднять карточку в каталоге
                        </UiButton>
                    </template>
                </PaidServiceRaisingService>
                <CommonTooltip
                    text="Ваша компания становится первая в каталоге исполнителей. При появлении новых исполнителей ваша карточка будет опускаться. Данной услугой можно пользоваться не более 1 раза в день"
                >
                    <template #trigger>
                        <UiButton
                            variant="tertiary"
                            size="around"
                            type="button"
                            @click="open"
                        >
                            <SvgoQuestion class="svg-m" />
                        </UiButton>
                    </template>
                </CommonTooltip>
            </div>
        </div>
    </div>
</template>

<script setup>
import defaultCompanyLogo from "@/assets/images/nophoto_pc.png";

const props = defineProps({
    data: {
        type: Object,
        default: () => ({}),
        required: true,
    },
    isDescription: {
        type: Boolean,
        default: false,
    },
    isPropsVisible: {
        type: Boolean,
        default: false,
    },
    isList: {
        type: Boolean,
        default: false,
    },
    linkBlank: {
        type: Boolean,
        default: false,
    },
    statusVisible: {
        type: Boolean,
        default: false,
    },
    isPubCardUp: {
        type: Boolean,
        default: false,
    }
});
</script>

<style lang="scss">
.card-pub {
    display: flex;
    flex-direction: column;
    padding: 2em;
    box-shadow: -2px -2px 0 #6937a5, 0 1px 1px rgba(0, 0, 0, 0.15);
    background-color: var(--bg-secondary-color);
    transition: box-shadow 0.2s ease;
    position: relative;
    flex-grow: 1;

    &__head {
        display: flex;
        flex-wrap: wrap;
        margin-bottom: 1.5em;
        padding-bottom: 1.5em;
    }

    &__status {
        align-self: center;
        font-size: 1.2em;
        padding: .2em;
        flex: 0 0 auto;
    }

    &__title {
        font-size: 1.8em;
        border-bottom: 1px solid #c4c4c4;
        // align-self: center;
        flex: 1 1 auto;
    }

    &__content {
        display: flex;
        column-gap: 2em;
        margin-bottom: 1em;
    }

    &__image {
        flex: 0 0 30%;
        // border: 1px solid #D9D9D9;
        display: flex;
        align-items: center;
        justify-content: center;
        max-width: 30%;
        // height: 10.8em;

        img {
            height: 100%;
        }
    }

    &__description {
        flex-grow: 1;

        .form-group__title {
            font-size: 1.4em;
            margin-bottom: 0.35em;
            line-height: 1em;
        }

        .form-group__value {
            display: -webkit-box;
            -webkit-line-clamp: 4;
            -webkit-box-orient: vertical;
            overflow: hidden;
            text-overflow: ellipsis;
            font-family: "fira-sans", sans-serif;
            font-size: 1.2em;
            margin-block: 0;
        }
    }

    &__details {
        display: flex;
        flex-direction: column;
        row-gap: 0.4em;
    }

    &__details-container {
        display: flex;
        column-gap: 0.5em;
        align-items: center;
        font-size: 1.2em;
    }

    &__link {
        position: absolute;
        inset: 0;
    }

    @include small-mobile {
        &__image {
            flex-basis: 35%;
            max-width: 35%;
        }
    }

    &__footer {
        margin-top: auto;
    }

    &__footer-container {
        display: flex;
        gap: 1em;
        flex-wrap: wrap;

        &-button {
            flex: 1 1 auto;
        }
    }
}

.card-pub_type_list:hover {
    box-shadow: -2px -2px 0 #6937a5, 0px 4px 20px rgba(0, 0, 0, 0.1);
}
</style>
