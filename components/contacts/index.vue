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
      <div class="contacts-container__manager">
        <div class="contacts-container__manager-image">
          <img src="/assets/images/contacts-image.jpg" alt="">
        </div>
        <div class="contacts-container__manager-text">
          <p class="contacts-container__manager-name">Виктория</p>
          <a href="tel:+79161341321">+7 (916) 134-13-21</a>
          <a href="mailto:manager@rafi.moscow.ru">manager@rafi.moscow</a>
        </div>
      </div>
      <div class="contacts-container__manager">
        <div class="contacts-container__manager-image">
          <img src="/assets/images/contacts-image.jpg" alt="">
        </div>
        <div class="contacts-container__manager-text"> 
          <p class="contacts-container__manager-name">Юлия</p>
          <a href="tel:+79036221886">+7 (903) 622-18-86</a>
          <a href="mailto:adv1@profashion.ru">adv1@profashion.ru</a>
        </div>
      </div>
      <div class="contacts-container__manager">
        <div class="contacts-container__manager-image">
          <img src="/assets/images/contacts-image.jpg" alt="">
        </div>
        <div class="contacts-container__manager-text">
          <p class="contacts-container__manager-name">Татьяна</p>
          <a href="tel:+79104586237">+7 (910) 458-62-37</a>
          <a href="mailto:reklama@profashion.ru">reklama@profashion.ru</a>
        </div>
      </div>
      <div class="contacts-container__manager">
        <div class="contacts-container__manager-image">
          <img src="/assets/images/contacts-image.jpg" alt="">
        </div>
        <div class="contacts-container__manager-text">
          <p class="contacts-container__manager-name">Людмила</p>
          <a href="tel:+79164202013">+7 (916) 420-20-13</a>
          <a href="mailto:sales@profashion.ru">sales@profashion.ru</a>
        </div>
      </div>
      <div class="contacts-container__manager">
        <div class="contacts-container__manager-image">
          <img src="/assets/images/contacts-image.jpg" alt="">
        </div>
        <div class="contacts-container__manager-text">
          <p class="contacts-container__manager-name">Маргарита</p>
          <a href="tel:+79096507336">+7 (909) 650-73-36</a>
          <a href="mailto:sales2@profashion.ru">sales2@profashion.ru</a>
        </div>
      </div>
      <div class="contacts-container__manager">
        <div class="contacts-container__manager-image">
          <img src="/assets/images/contacts-image.jpg" alt="">
        </div>
        <div class="contacts-container__manager-text">
          <p class="contacts-container__manager-name">Ольга Ефимова</p>
          <a href="tel:+79254105800">+7 (925) 410-58-00</a>
          <a href="mailto:Pr@rafi.moscow">Pr@rafi.moscow</a>
        </div>
      </div>
      <div class="contacts-container__manager">
        <div class="contacts-container__manager-image">
          <img src="/assets/images/contacts-image.jpg" alt="">
        </div>
        <div class="contacts-container__manager-text">
          <p class="contacts-container__manager-name">Дарья</p>
          <a href="tel:+79851271131">+7 (985) 127-11-31</a>
          <a href="mailto:adv2@profashion.ru">adv2@profashion.ru</a>
        </div>
      </div>
    </div>
    <h2 class="contacts-container__title">По вопросам взаимодействия с Фондами и Центрами поддержки предпринимателей</h2>
    <div class="contacts-container__managers">
      <div class="contacts-container__manager">
        <div class="contacts-container__manager-image">
          <img src="/assets/images/contacts-image.jpg" alt="">
        </div>
        <div class="contacts-container__manager-text">
          <p class="contacts-container__manager-name">Виктория</p>
          <a href="tel:+79161341321">+7 (916) 134-13-21</a>
          <a href="mailto:manager@rafi.moscow.ru">manager@rafi.moscow</a>
        </div>
      </div>
    </div>
  </div>
</template>

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
    display: flex;
    align-items: center;
    margin-bottom: 1em;

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
    flex: 0 1 30%;
    display: flex;
    padding: 1.25em 1.25em 2.5em;
    column-gap: 1em;
    background-color: #fff;
    box-shadow: var(--box-shadow-primary);

    img {
      border-radius: 100%;
    }
  }

  &__manager-image {
    flex: 0 0 25%;
    border-radius: 100%;
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
}

</style>