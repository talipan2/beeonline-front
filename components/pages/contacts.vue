<template>
    <div class="contacts-container" v-if="data">
        <h2 class="contacts-container__title"> {{ title }}</h2>
        <div class="contacts-container__managers">
            <div class="contacts-container__manager" v-for="(manager, index) in data" :key="index">
                <div class="contacts-container__manager-image">
                    <UiImage class="contacts-container__manager-pattern" :src="manager.photo" :alt="manager.name" :external="true"/>
                </div>
                <div class="contacts-container__manager-text">
                    <p class="contacts-container__manager-name">{{ manager.name }} <br><span
                            class="contacts-container__manager-role">{{ manager.position }}</span></p>
                    <a :href="`tel:${formatPhone(manager.phone)}`">{{ manager.phone }}</a>
                    <a :href="`mailto:${manager.email}`">{{ manager.email }}</a>
                </div>
            </div>
        </div>
        <!-- <h2 class="contacts-container__title">По вопросам взаимодействия с Фондами и Центрами поддержки предпринимателей</h2>
    <div class="contacts-container__managers">
      <div class="contacts-container__manager" v-for="(manager, index) in onIssuesOfInteraction" :key="index">
        <div class="contacts-container__manager-image">
          <UiImage class="contacts-container__manager-pattern" :src="manager.img" :alt="manager.name" />
        </div>
        <div class="contacts-container__manager-text">
          <p class="contacts-container__manager-name">{{ manager.name }}</p>
          <a :href="`tel:${formatPhone(manager.phone)}`">{{ manager.phone }}</a>
          <a :href="`mailto:${manager.email}`">{{ manager.email }}</a>
        </div>
      </div>
    </div> -->
    </div>
</template>

<script setup>
import { useApi } from '../../composables/useApi';

// Принимаем props, переданные из HTML
const props = defineProps({
    group: {
        type: String,
        default: ''
    },
    title: {
        type: String,
        default: ''
    }
});

const loading = ref(false);
const data = ref(null);

onMounted(() => {
    loading.value = true;
    getContacts();
});

const getContacts = () => {
    useApi().get(`/contacts/?group=${props.group}`)
    .then((res) => {
        data.value = res.data;
    });
}

const managerList = [
    { name: 'Тимур  Османов', role: 'Технический Директор', phone: '+7 (977) 317-84-75', email: 'mail@bee-online.ru', img: '/assets/images/managers/managers-1.jpg' },
    { name: 'Елена Степанова', role: 'Руководитель проекта', phone: '+7 (925) 226-07-30', email: 'bkp@bee-online.ru', img: '/assets/images/managers/managres-2.jpg' },
    { name: "Лариса Литвин", role: 'Менеджер', phone: "+7 (916) 391-57-49", email: "manager2@bee-online.ru", img: "/assets/images/managers/managers-3.png" },
    { name: "Янина Герасимова", role: 'Менеджер', phone: "+7 (977) 132-79-92", email: "sales3@bee-online.ru", img: "/assets/images/managers/managers-4.png" },
    // {name: "Варвара Мишина Менеджер", phone: "+79774367892", email: "adv12@profashion.ru", img: "/assets/images/nophoto_pc.png"}
]

const onIssuesOfInteraction = [
    { name: 'Алёна', phone: '+7 (929) 968-88-58', email: 'promo@profashion.ru', img: '/assets/images/managers/alyona.jpg' },
]

const formatPhone = (phone) => phone.replace(/[\s()-]/g, '');
</script>

<style lang="scss">
.contacts-container {
    font-size: 1.6rem;

    a:hover {
        text-decoration: underline;
    }

    &__text {
        margin-bottom: 2em;
    }

    &__contact-item {
        font-size: 1.19em;
        margin-bottom: 1em;

        a {
            display: inline;
        }

        span {
            margin-left: .3em;
        }
    }

    &__title {
        font-size: 1.5em;
        margin-block: 1.25em .83em;
    }

    &__managers {
        display: flex;
        flex-wrap: wrap;
        gap: 1em;
    }

    &__manager {
        flex: 1 1 29%;
        max-width: 30%;
        display: flex;
        padding: 1.25em 1.25em 2.5em;
        column-gap: 1em;
        background-color: #fff;
        box-shadow: var(--box-shadow-primary);

        img {
            position: absolute;
            inset: 0;
        }
    }

    &__manager-image {
        flex: 0 0 25%;
        border-radius: 100%;
        overflow: hidden;
        height: 0;
        padding-bottom: 25%;
        position: relative;
    }

    &__manager-name {
        font-family: 'fira-sans', sans-serif;
        font-size: 1.3em!important;
        margin-top: 1.1em;
    }

    &__manager-text {
        display: flex;
        flex-direction: column;
        row-gap: 1em;
    }

    @include tablet {
        &__manager {
            padding: .93em .93em 1.875em;
            align-items: center;
        }

        &__manager-name {
            margin-top: .8em;
        }
    }

    @include small-tablet {
        font-size: 1.4rem;

        &__managers {
            gap: 2em;
        }

        &__manager {
            flex-basis: 45%;
            max-width: 47%;
        }

        &__manager-name {
            margin-top: 0;
        }
    }

    @include mobile {
        &__title {
            margin-block: 2.5rem 1.8rem;
            font-size: 1.6rem;
        }

        &__managers {
            gap: 1.7rem;
        }

        &__manager {
            flex-basis: 100%;
            max-width: 100%;
        }
    }
}
</style>
