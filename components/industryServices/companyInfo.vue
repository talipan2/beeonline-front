<template>
    <div class="company-info">
        <div class="company-info__header">
            <h3 class="company-info__title title-hidden">{{ data.name }}</h3>
            <SvgoVerified class="svg-l" />
            <UiButton
                v-if="isChange"
                :to="`/pubcards/edit/${data.id}`"
                class="company-info__link link"
                variant="default"
                withoutPadding
            >
                Изменить
            </UiButton>
        </div>
        <div class="company-info__content" :class="[`company-info__content_${data.template}`]">
            <div class="image-box company-info__logo">
                <img
                    :src="data.logo || defaultCompanyLogo"
                    :alt="data.name"
                />
            </div>
            <div class="company-info__wrapper company-info__mobile">
                <CommonLocationsList
                    class="company-info__locations"
                    :locationsList="{countries: [data.country]}"
                />
                <!-- <h4 class="company-info__site" v-if="data.url_site">
                    Сайт:
                    <a
                        :href="data.url_site"
                        class="link link_type_hidden"
                        target="_blank"
                        >{{ data.url_site }}</a
                    >
                </h4> -->
                <h4 class="company-info__site" v-if="data.url_site">
                    Номер менеджера:
                    <a
                        href="tel:+79651807700"
                        class="link link_type_hidden"
                        target="_blank"
                        >+79651807700</a
                    >
                </h4>
            </div>
            <div class="company-info__wrapper">
                <CommonLocationsList
                    class="company-info__locations company-info__desktop"
                    :locationsList="{countries: [data.country]}"
                />
                <!-- <h4 class="company-info__site company-info__desktop" v-if="data.url_site">
                    Сайт:
                    <a
                        :href="data.url_site"
                        class="link"
                        target="_blank"
                        >{{ data.url_site }}</a
                    >
                </h4> -->
                <!-- <h4 class="company-info__site company-info__desktop" v-if="data.url_site">
                    Номер менеджера:
                    <a
                        href="tel:+79651807700"
                        class="link"
                        >+79651807700</a
                    >
                </h4> -->
                <div class="company-info__description">
                    <h4>Описание:</h4>
                    <p
                        class="company-info__description-text"
                        :class="{
                            'company-info__description-text_type_hidden':
                                !isVisible,
                        }"
                    >
                        {{ data.description }}
                    </p>
                </div>
                <div
                    class="company-info__gallery"
                    v-if="isVisible"
                >
                    <h4>Галерея:</h4>
                    <CommonGalleryShow :images="data.gallery" />
                </div>
                <UiButton
                    type="button"
                    class="company-info__btn link"
                    variant="default"
                    withoutPadding
                    @click="handleMoreShow"
                >
                    {{ isVisible ? "Свернуть" : "Подробнее" }}
                </UiButton>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useUserStore } from "~/store/userStore";
import defaultCompanyLogo from "~/assets/images/nophoto_pc.png";

const userStore = useUserStore();

const props = defineProps({
    data: {
        type: Object,
        default: {},
    },
});

const isChange = computed(() => {
    return props.data.organization_id === userStore.userOrganizationId;
});

// const data = ref({
//     name: "Национальный центр сертификации",
//     logo: "",
//     countryId: { countries: [1] },
//     siteUrl: "https://ncceasdasdasdasdasdasdasdasdasdasdnter.ru",
//     description:
//         "Компания «НЦС» является аккредитованным органом по сертификации. Мы оказываем спектр услуг в области разрешительной документации с 2016 года. Занимаемся услугами по оценке соответствия, испытаниям продукции, разработке технической документации \n\nУспешно выполняет задачи по оформлению сертификатов и деклараций о соответствии. Имеет в своем распоряжении два собственных органа по сертификации и готовы выполнить задачи любой сложности. \n\nНаша компания зарекомендовала себя в качестве одного из лидеров в своей области. У нас многолетний опыт, положительная репутация и большой компетентный штат сотрудников, включая технических специалистов и экспертов, которые проходят обучение и повышают свою квалификацию, чтобы гарантировать высокий уровень профессионализма и надежности. \n\nСреди наших клиентов: \n\n• Газпром Стройтек \n• МАНГО РАША \n• МЕЛОН ФЕШН \n• ZOLLA \n• WILDBERRIES \n• METRO CASH AND CARRY \n• ВЕСЕЛАЯ ЗАТЕЯ",
//     gallery: [
//         {
//             url: "https://i.pinimg.com/236x/98/a4/35/98a435a660d05c7bf2a453dba4b12c29.jpg",
//         },
//         {
//             url: "https://i.pinimg.com/236x/98/a4/35/98a435a660d05c7bf2a453dba4b12c29.jpg",
//         },
//         {
//             url: "https://i.pinimg.com/236x/98/a4/35/98a435a660d05c7bf2a453dba4b12c29.jpg",
//         },
//         {
//             url: "https://i.pinimg.com/236x/98/a4/35/98a435a660d05c7bf2a453dba4b12c29.jpg",
//         },
//         {
//             url: "https://i.pinimg.com/236x/98/a4/35/98a435a660d05c7bf2a453dba4b12c29.jpg",
//         },
//         {
//             url: "https://i.pinimg.com/236x/98/a4/35/98a435a660d05c7bf2a453dba4b12c29.jpg",
//         },
//         {
//             url: "https://i.pinimg.com/236x/98/a4/35/98a435a660d05c7bf2a453dba4b12c29.jpg",
//         },
//     ],
// });

const isVisible = ref(false);

function handleMoreShow() {
    isVisible.value = !isVisible.value;
}
</script>

<style lang="scss">
.company-info {
    font-size: 1rem;
    border: 1px solid var(--border-color-senary);
    padding: 4.3em 2.4em;
    margin-bottom: 10em;
    background-color: var(--bg-secondary-color);

    &__header {
        display: flex;
        align-items: center;
        column-gap: 0.8em;
        margin-bottom: 2.4em;

        svg {
            align-self: flex-start;
            width: 2em;
            height: 2em;
        }
    }

    &__title {
        font-size: 1.8em;
        font-weight: 400;
        line-height: 1.2em;
    }

    &__link {
        margin-left: auto;
        color: var(--text-color-ternary);
    }

    &__content {
        display: flex;

        &_reverse {
            flex-direction: row-reverse;
            justify-content: space-between;

            .company-info__logo {
                margin-right: 0;
                margin-left: 5%;
            }
        }
    }

    &__logo {
        flex: 0 0 38%;
        max-width: 35%;
        padding-top: 24%;
    }

    &__wrapper {
        flex: 1 1 auto;
        display: flex;
        flex-direction: column;
        row-gap: 2.4em;
    }

    &__site {
        font-size: 1.4em;
        font-weight: 400;

        a {
            display: inline;
        }
    }

    &__description {
        font-family: "fira-sans", sans-serif;

        h4 {
            font-size: 1.4em;
            font-weight: 400;
            margin-bottom: 0.85em;
        }
    }

    &__description-text {
        font-size: 1.4em;
        color: var(--text-color-tertiary);
        line-height: 1.42em;
        white-space: pre-wrap;

        &_type_hidden {
            display: -webkit-box;
            -webkit-line-clamp: 7;
            -webkit-box-orient: vertical;
            overflow: hidden;
            text-overflow: ellipsis;
            overflow-wrap: anywhere;
        }
    }

    &__gallery {
        h4 {
            font-size: 1.4em;
            margin-bottom: 1.42em;
        }

        .gallery-show__item {
            box-shadow: 0 4px 12px 0 rgba(0, 0, 0, 0.04);
            position: relative;
            flex-basis: 15%;
            max-width: 15%;
            padding-top: 23%;

            img {
                border-color: #ebebeb;
                padding: 2.2em 1.3em;
            }
        }
    }

    &__btn {
        font-size: 1.2em;
        font-weight: 600;
        text-transform: uppercase;
        color: var(--text-color-ternary);
        width: fit-content;
        margin-top: 2.6em;
    }

    &__mobile {
        display: none;
    }

    @include tablet {
        &__gallery {
            .gallery-show__item {
                flex-basis: 20%;
                max-width: 20%;
                padding-top: 30%;
            }
        }
    }

    @include mobile {
        &__content {
            flex-wrap: wrap;
            row-gap: 1.6em;
        }

        &__header {
            svg {
                width: 3em;
            }
        }

        &__logo {
            flex-basis: 40%;
            max-width: 40%;
            padding-top: 30%;
        }

        &__wrapper {
            flex-basis: 100%;
        }

        &__mobile {
            display: flex;
            flex: 0 1 50%;
            row-gap: 1em;
        }

        &__desktop {
            display: none;
        }

        &__gallery {
            .gallery-show__item {
                flex-basis: 30%;
                max-width: 30%;
                padding-top: 40%;

                img {
                    padding: 1.2em 0.3em;
                }
            }
        }
    }

    @include small-mobile {
        &__gallery {
            .gallery-show {
                gap: 0.5em;
            }

            .gallery-show__item {
                flex-basis: 32%;
                max-width: 32%;
                padding-top: 47%;
            }
        }
    }
}
</style>
