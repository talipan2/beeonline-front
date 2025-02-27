<template>
  <div class="service-details">
    <div class="service-details__props">
      <div class="service-details__prop">
        <p class="service-details__prop-name">Категории:</p>
        <p class="service-details__prop-value">{{ service.category?.join(' / ') }}</p>
      </div>
      <div class="service-details__prop">
        <p class="service-details__prop-name">Сайт:
          <a href="http://nccenter.ru" class="link" target="_blank">{{ 'http://nccenter.ru' }}</a>
        </p>
      </div>
    </div>
    <div class="service-details__company">
      <div class="image-box service-details__company-logo">
        <img :src="service.logo || defaultLogoImage" alt="logo">
      </div>
      <div class="service-details__company-info">
        <p class="service-details__company-name">Национальный центр сертификации</p>
        <CommonLocationsList class="service-details__company-locations" :locationsList="{countries: [1]}"/>
      </div>
    </div>
    <UiButton class="service-details__btn" variant="tertiary" size="large">Написать</UiButton>
    <div class="service-details__description">
      <h3 class="service-details__description-title">Описание</h3>
      <p class="service-details__description-text">{{ service.description }}</p>
    </div>
  </div>
</template>

<script setup>
import defaultLogoImage from '~/assets/images/nophoto_pc.png';

const service = ref({});

onMounted(() => {
  service.value =
    {
      description: 'Добровольная сертификация представляет собой процесс получения официального подтверждения, \n\nсвидетельствующего о том, что товары, услуги или выполненные работы отвечают определенным стандартам, включая ГОСТ Р. что товары, услуги или выполненные работы отвечают определенным стандартам, включая ГОСТ Р ',
      siteUrl: 'https://www.youtube.com/feed/subscriptions',
      logo: '',
      category: ['Пошив женской одежды', 'Пошив мужской одежды'],
    }
})

</script>

<style lang="scss">

.service-details {
  font-size: 1rem;

  &__props {
    display: flex;
    flex-direction: column;
    row-gap: 1.2em;
    margin-bottom: 2.4em;
  }

  &__prop {
    font-size: 1.6em;

    a {
      display: inline;
    }
  }

  &__prop-name {
    display: inline;
    margin-right: 1.25em;
  }

  &__prop-value {
    display: inline;
  }

  &__company {
    display: flex;
    max-width: 50em;
    margin-bottom: 2.4em;
  }

  &__company-logo {
    flex-basis: 20%;
    padding-top: 20%;
    max-width: 20%;
  }

  &__company-name {
    font-size: 1.6em;
    line-height: 1.2em;
    margin-bottom: 1em;
  }

  &__company-locations {
    font-size: 1.4em;
    font-family: "fira-sans", sans-serif;

    .flag {
      font-size: 20px;
      width: 20px;
      height: 20px;
    }
  }

  &__btn {
    font-size: 1.2em;
    text-transform: uppercase;
    max-width: 30%;
    margin-bottom: 5.33em;
  }

  &__description-title {
    font-size: 2em;
    line-height: 1,2em;
    margin-bottom: .8em;
  }

  &__description-text {
    font-size: 1.4em;
    line-height: 1.42em;
    white-space: pre-line;
  }

  @include small-mobile {
    &__company-logo {
      flex-basis: 30%;
      padding-top: 30%;
      max-width: 30%;
    } 
  }
}

</style>