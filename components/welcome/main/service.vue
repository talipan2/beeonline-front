<template>
  <div class="service welcome-container">
    <div class="welcome-block-wrapper">
      <h2 class="welcome-block-name">О нас</h2>
      <h3 class="welcome-title"><span>Bee-online</span> сервис</h3>
      <p class="welcome-subtitle">
        Международный цифровой сервис поиска партнеров для контрактного производства в сфере легкой промышленности.
      </p>
    </div>
    <UiImage class="service__pattern" :src="'/assets/images/welcome/service/pattern.png'" alt="Паттерн" />
    <div class="service__container">
      <div class="service__col">
        <div class="service__col-item">
          <div class="service__col-item-icon">
            <UiImage :src="'/assets/images/welcome/service/block-icon.svg'" class="svg-l" alt="Иконка блока"/>
          </div>
          <p class="service__col-item-title">8 лет на рынке</p>
          <p class="service__col-item-subtitle">
            С 2016 года ассоциация (РАФИ) организует выставку-платформу по аутсорсингу в легкой промышленности BEE-TOGETHER.ru
          </p> 
        </div>
        <div class="service__col-item">
          <div class="service__col-item-icon">
            <UiImage :src="'/assets/images/welcome/service/block-icon.svg'" class="svg-l" alt="Иконка блока"/>
          </div>
          <p class="service__col-item-title">Широкий выбор фабрик и брендов</p>
          <p class="service__col-item-subtitle">
            Основная аудитория пользователей — представители предприятий легкой промышленности, принимающих заказы на изготовление продукции, 
            а также брендов и ритейла, заинтересованных в их услугах.
          </p> 
        </div>
        <div class="service__col-item">
          <div class="service__col-item-icon">
            <UiImage :src="'/assets/images/welcome/service/block-icon.svg'" class="svg-l" alt="Иконка блока"/>
          </div>
          <p class="service__col-item-title">Удобный поиск партнеров</p>
          <p class="service__col-item-subtitle">
            Удобный фильтр по категориям продукции, объему партии и виду сырья 
            в каталогах заказов и услуг позволит быстро найти подходящего партнера.
          </p> 
        </div>
        <div class="service__col-item">
          <div class="service__col-item-icon">
            <UiImage :src="'/assets/images/welcome/service/block-icon.svg'" class="svg-l" alt="Иконка блока"/>
          </div>
          <p class="service__col-item-title">Прямые переговоры</p>
          <p class="service__col-item-subtitle">
            Формат BEE-online.ru позволяет исполнителям максимально подробно презентовать услуги своей компании, 
            используя текстовый, фото и видеоконтент, а заказчикам – дает возможность задать интересующие вопросы любому производителю.
          </p> 
        </div>
      </div>
      <div class="service__col-image">
        <UiImage src="/assets/images/welcome/service/service-1.png" alt="bee-online сервис" class="service__col-image-top" />
        <UiImage src="/assets/images/welcome/service/service-2.png" alt="bee-online сервис" class="service__col-image-bottom-right" />
        <UiImage src="/assets/images/welcome/service/service-3.png" alt="bee-online сервис" class="service__col-image-bottom-left"/>
      </div>
    </div>
  </div>
</template>

<style lang="scss">

.service {
  position: relative;
  font-size: 1rem;
  font-family: 'Inter', sans-serif;
  padding-block: 10em 10.8em;

  .welcome-block-wrapper {
    max-width: 534px;
  }

  &__pattern {
    position: absolute;
    top: 119px;
    right: -200px;
    width: 35.7em;
    height: auto;
  }


  &__container {
    display: flex;
    justify-content: space-between;
    column-gap: 10em;
    margin-top: 9em;
  }

  &__col {
    flex: 0 45%;
    display: flex;
    flex-direction: column;
    row-gap: 8em;
  }

  &__col-item {
    display: flex;
    flex-direction: column;
    row-gap: 1.6em;
  }

  &__col-item-icon {
    width: 4.4em;
    height: 4.4em;
    background-color: rgba(105, 55, 165, 0.1);
    border-radius: 8px;
    display: flex;
    justify-content: center;
    align-items: center;

    img {
      width: 1.9em;
    }
  }

  &__col-item-title {
    font-size: 2.4em;
    font-weight: 700;
    color: #2d2f38;
  }

  &__col-item-subtitle {
    font-size: 1.6em;
    font-weight: 400;
    line-height: 1.44em;
    color: #989ea5;
  }

  &__col-image {
    display: grid;
    grid-template-columns: 63% auto;
    grid-template-rows: auto auto;
    gap: 4em;
  }

  &__col-image-top {
    grid-column: span 2;
  }

  &__col-image-bottom-right,
  &__col-image-top {
    border-radius: 32px;
  }

  &__col-image-bottom-left {
    border-radius: 32px 0 320px 32px;
  }
}

</style>