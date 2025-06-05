<template>
  <div class="contacts-container">
    <p class="contacts-container__text">
      Если у вас есть вопросы, касающиеся организации бизнес-платформы, участия в ней, технических проблем, или любые другие, обратитесь к менеджерам проекта или отправьте нам сообщение, воспользовавшись размещенной ниже формой.
    </p>
    <div class="contacts-container__contacts">
      <div class="contacts-container__contact-item">
        123007, Москва, Ленинградский проспект, 35, стр. 2, помещ 329
      </div>
      <div class="contacts-container__contact-item">
        <a href="tel:+7(495)256-06-26">+7 (495) 256-06-26</a>
      </div>
      <div class="contacts-container__contact-item">
        <a href="mailto:info@profashion.ru">info@profashion.ru</a>
      </div>
      <div class="contacts-container__contact-item">
        <a href="mailto:internet@profashion.ru">internet@profashion.ru</a>
        <span>- Почта для пресс-релизов</span>
      </div>
      <div class="contacts-container__contact-item">
        <a href="mailto:fair@profashion.ru">fair@profashion.ru</a>
        <span>- По вопросам информационного сотрудничества</span>
      </div>
    </div>
    <h2 class="contacts-container__title">Менеджеры проекта</h2>
    <div class="contacts-container__managers">
      <div class="contacts-container__manager" v-for="(manager, index) in managerList" :key="index">
        <div class="contacts-container__manager-image">
          <UiImage class="contacts-container__manager-pattern" :src="manager.img" :alt="manager.name" />
        </div>
        <div class="contacts-container__manager-text">
          <p class="contacts-container__manager-name">{{ manager.name }}</p>
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

const managerList = [
  {name: 'Тимур  Османов Технический Директор', phone: '89773178475', email: 'mail@profashion.ru', img: '/assets/images/managers/managers-1.jpg'},
  {name: 'Елена Степанова Руководитель проекта', phone: '+7 (925) 226-07-30', email: 'bkp@profashion.ru', img: '/assets/images/managers/managres-2.jpg'},
  {name: "Лариса Литвин Менеджер", phone: "+79163915749", email: "manager2@profashion.ru", img: "/assets/images/nophoto_pc.png" },
  {name: "Янина Герасимова Менеджер", phone: "+79771327992", email: "sales3@profashion.ru", img: "/assets/images/nophoto_pc.png"},
  // {name: "Варвара Мишина Менеджер", phone: "+79774367892", email: "adv12@profashion.ru", img: "/assets/images/nophoto_pc.png"}
]

const onIssuesOfInteraction = [
  {name: 'Алёна', phone: '+7 (929) 968-88-58', email: 'promo@profashion.ru', img: '/assets/images/managers/alyona.jpg'},
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
    font-size: 1.3em;
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