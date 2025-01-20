<template>
  <section class="work" >
    <UiImage :src="'/assets/images/welcome/work/pattern.png'" alt="Паттерн" class="work__pattern" />
    <UiImage :src="'/assets/images/welcome/work/pattern-mobile.png'" alt="Паттерн" class="work__pattern work__pattern-mobile" />
    <div class="work__container">
      <div class="work__text">
        <div class="work__text-container">
          <h2 class="work__title">Работаем нон-<br>стоп</h2>
          <h2 class="work__title work__title_second">Работаем нон-стоп</h2>
          <p class="work__subtitle">От Калиниграда до Владивостока мы работаем в более чем в 10 часовых поясах</p>
        </div>
        <div class="work__time" ref="workSection">
          <div class="work__time-container" :style="{ transform: `translateX(${-scrollX}px)` }">
            <template v-for="(i, index) in 10" :key="index">
              <div class="work__time-item">
                <p>{{ i + 8 }}:00</p>
              </div>
            </template>
          </div>
          <p class="work__time-location">Москва</p>
        </div>
      </div>
      <div class="work__cards-container">
        <div class="work__cards-line work__cards-line_first">
          <template v-for="(card, index) in 10" :key="index">
            <WelcomeMainPerformerCard class="work__card" :data="cardData[0]"/>
          </template>
        </div>
        <div class="work__cards-line work__cards-line_second">
          <template v-for="(card, index) in 10" :key="index">
            <WelcomeMainPerformerCard class="work__card" :data="cardData[0]"/>
          </template>
        </div>
      </div>
      <div class="work__time work__time_mobile" ref="workSectionMobile">
          <div class="work__time-container" :style="{ transform: `translateX(${-scrollX}px)` }">
            <template v-for="(i, index) in 10" :key="index">
              <div class="work__time-item">
                <p>{{ i + 8 }}:00</p>
              </div>
            </template>
          </div>
          <p class="work__time-location">Москва</p>
        </div>
    </div>
  </section>
</template>

<script setup>

const workSection = ref(null); 
const workSectionMobile = ref(null);
const scrollX = ref(0);

const handleScroll = () => {
  if (!workSection.value || !workSectionMobile.value) return;

  const sectionTop = workSection.value.getBoundingClientRect().top;
  const sectionTopMobile = workSectionMobile.value.getBoundingClientRect().top;
  const windowHeight = window.innerHeight;

  // Когда блок в пределах видимости
  if (sectionTop < windowHeight || sectionTopMobile < windowHeight) {
    const maxScroll = 0;
    const minScroll = 1400;

    // Вычисляем новое смещение с учетом скролла
    if(sectionTop) {
      scrollX.value = Math.min(minScroll, Math.max(maxScroll, 1600 - sectionTop * 2.3));
    } else if (sectionTopMobile) {
      scrollX.value = Math.min(minScroll, Math.max(maxScroll, 1600 - sectionTopMobile * 2.3));
    }
  }
}

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
  handleScroll(); // Запускаем при загрузке страницы
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});

const cardsData = [{
  id: 11,
  organization_id: 13,
  current_step: 2,
  user_id: 25,
  name: "Индивидуальный пошив партии для маркетплейсов: преимущества от Fusion ",
  description: "testqweqwewqeqwe",
  conditions: "qweqweqweqweqweqwe",
  materials_own: 1,
  materials_tolling: 1,
  is_stm: 0,
  free_samples: "1",
  status: "filling",
  reject_reason: null,
  tz_files: [],
  gallery: [],
  created_at: "2025-01-10T10:22:18.000000Z",
  updated_at: "2025-01-10T10:23:03.000000Z",
  cities: [],
  product_categories: [],
  location: ['Россия, Пензенская область'],
}] 

const cardData = computed(() => {
  return cardsData.map(item => {
    return {
      id: item.id,
      name: item.name,
      logo: 'https://user63758.clients-cdnnow.ru/storage/48826/80989/8f166db3e5bfb838c8a619271fa943b4f8032b3b.png',
      minLot: [500],
      views: 0,
      companyName: 'LUX Persona',
      location: ['Россия, Пензенская область'],
      category: ['Головные уборы','Женская одежда', 'Вязанный трикотаж','Головные уборы','Женская одежда', 'Вязанный трикотаж','Вязанный трикотаж','Вязанный трикотаж'],
      data: [
        { id: 1, name: 'Сырье', value: [item.materials_own ? 'Собственное' : '', item.materials_tolling ? 'Давальческое' : ''].filter(Boolean).join(' / ') },
        { id: 2, name: 'Категории', value: ['Головные уборы','Женская одежда', 'Вязанный трикотаж','Головные уборы','Женская одежда', 'Вязанный трикотаж'].join(' / ') },
        { id: 3, name: 'Наличие СТМ', value: item.is_stm ? 'Да' : 'Нет' },
      ],
  }})
})

</script>

<style lang="scss">

.work {
  font-size: 1rem;
  background-color: #6937A5;
  position: relative;

  &__pattern {
    position: absolute;
    top: 0;
    left: 0;
    width: 480px;

    &-mobile {
      display: none;
    }
  }

  &__container {
    height: 800px;
    max-width:  1579px;
    display: flex;
    overflow: hidden;
    column-gap: 5.3em;
    margin-inline: auto;
    padding-left: 13.9em;
  }

  &__text {
    position: relative;
    flex: 0 1 33%;
    max-width: 33%;

  }

  &__text-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100%;
    max-width: 390px;
  }

  &__title {
    font-family: 'Coolvetica', sans-serif;
    font-size: 5.6em;
    font-weight: 700;
    color: #fff;
    line-height: 1.2em;
    // text-transform: uppercase;

    &_second {
      display: none;
    }
  }

  &__subtitle {
    font-weight: 400;
    font-size: 1.6em;
    line-height: 1.5em;
    color: #fff;
  }

  &__cards-container {
    flex: 0 1 100%;
    max-width: 1110px;
    display: flex;
    column-gap: 3em;
  }

  &__cards-line {
    display: flex;
    flex-direction: column;
    row-gap: 3em;
    animation: scrollDown 30s linear infinite;

    &_first {
      animation-delay: -1s;
    }

    &_second {
      animation-delay: -7s;
    }
  }

  &__time {
    position: absolute;
    bottom: 6.2em;
    left: -10em;
    opacity: .3;
    max-width: 520px;
    overflow: hidden;

    &_mobile {
      display: none;
    }
  }

  &__time-container {
    display: flex;
    column-gap: 6.4em;
    transition: transform .1s ease;
  }

  &__time-item {
    font-family: 'Lato', sans-serif;
    font-size: 2.4em;
    line-height: 1.5em;
    font-weight: 700;
    color: #fff;
    border: 2px solid #fff;
    border-radius: 10px;
    padding: .2em .41em;
  }

  &__time-location {
    font-family: 'Lato', sans-serif;
    font-size: 2.4em;
    line-height: 1.5em;
    font-weight: 700;
    color: #fff;
    margin-left: 20%;
  }

  @include desktop {
    &__container {
      padding-right: 16px;
    
    }

    &__text {
      flex-basis: 50%;
    }
  }

  @media screen and (max-width: 1400px) {
    &__container {
      padding-left: 16px;
    }

    &__time {
      left: 0;
      width: 100%;
    }
  }

  @include small-tablet { 
    overflow: hidden;
    padding-block: 44px 20px;

    &__container {
      flex-direction: column;
      height: auto;
    }

    &__pattern {
      display: none;
      
      &-mobile {
        display: block;
        width: 60%;
      }

    }

    &__cards-line_second {
      display: none;
    }

    &__text {
      flex-basis: auto;
      max-width: 100%;
    }

    &__text-container {
      align-items: center;
      max-width: 100%;
    }

    &__title {
      font-size: 28px;
      font-weight: 400;
      text-transform: none;
      margin-bottom: 32px;
      text-align: center;
      display: none;

      &_second {
        display: block;
      }
    }

    &__subtitle {
      font-size: 16px;
      text-align: center;
      padding-inline: 27px;
      margin-bottom: 56px;
    }

    &__time {
      display: none;
      max-width: 400px;
      margin-inline: auto;
      &_mobile {
        display: block;
        position: static;
      }
    }

    &__time-container {
      column-gap: 42px;
    }

    &__time-item {
      font-size: 16px;
    }

    &__time-location {
      margin-left: 96px;
      font-size: 16px;
    }

    &__cards-container {
      display: block;
      margin-bottom: 56px;
    }

    &__cards-line_first {
      flex-direction: row;
      animation-name: moveRightCards;
      column-gap: 40px;
    }

    &__card {
      flex: 1 0 40%;
    }
  }

  @include mobile {
    &__card {
      flex: 1 0 45%;
    }
  }

  @include small-mobile {
    &__card {
      flex: 1 0 100%;
      width: 100%;
      max-width: 260px;
      padding: 15px;
      box-sizing: border-box;
    }
  }
}


@keyframes scrollDown {
  0% { transform: translateY(0); }
  100% { transform: translateY(-100%); }
}

@keyframes moveLeft {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-200px);
  }
}

@keyframes moveRightCards {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-100%);
  }
}


</style>