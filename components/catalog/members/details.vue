<template>
  <div class="member-details">
    {{ data }}
    <div class="member-details__header">
      <div class="image-box image-box_type_frame">
        <img :src="data.logo || defaultLogoImage" :alt="data.name">
      </div>
      <div class="member-details__header-content">
        <h1 class="member-details__title">{{ data.name || 'Не указано' }}</h1>
        <CommonRating :rating="data.fillRating" :is-count-rating="false" />
        <CommonLocationsList class="member-details__locations" :locationsList="data.location" :is-country="true"/>
        <div class="member-details__props" v-if="data.siteUrl">
          <SvgoWeb class="svg-m" fill="#a9abac"/>
          <a :href="data.siteUrl" _target="_blank">{{ data.siteUrl }}</a>
        </div>
        <div class="member-details__props">
          <SvgoCase class="svg-m" fill="#a9abac" />
          <p> 
            {{ data.entityCount 
              ? (data.entityCount + ' ' + plural(data.entityCount, { one: 'услуга', few: 'услуги', many: 'услуг' }) ) 
              : 'Нет услуг' 
            }}
          </p>
        </div>
        <div class="member-details__soc">
          <NuxtLink :to="data.tgUrl" class="member-details__soc-link" v-if="data.tgUrl" :target="'_blank'">
            <SvgoTelegram class="svg-l" />
          </NuxtLink>
          <NuxtLink :to="data.vkUrl" class="member-details__soc-link" v-if="data.vkUrl" :target="'_blank'">
            <SvgoVkontakte class="svg-l" />
          </NuxtLink>
          <NuxtLink :to="data.ytUrl" class="member-details__soc-link" v-if="data.ytUrl" :target="'_blank'">
            <SvgoYoutube class="svg-l" />
          </NuxtLink>
        </div>
        <div class="member-details__btn-container">
          <UiButton class="member-details__btn" variant="quinary" size="large">
            <SvgoMessage class="svg-m" fill="#6937a5" />
            Написать {{ pubCardType }}
          </UiButton>
          <UiButton class="member-details__btn" variant="tertiary" size="around">
            <SvgoFavorite class="svg-m" />
          </UiButton>
        </div>
      </div>
    </div>
    <div class="member-details__content-container">
      <h3 class="member-details__content-title">Описание</h3>
      <p>{{ data.description || ' Компания «Интай-Текстиль» на протяжении 17 лет обеспечивает потребности в тканях производителей спецодежды, одежды для туристов, охотников и рыболовов, спортивной одежды. Компания отвечает запросам заказчиков по качеству ткани, своевременно обновляет ассортимент в соответствии с мировыми тенденциями рынка. Хорошо отлаженная логистика позволяет курировать доставку ткани от фабрики до производителя строго в согласованные сроки.  В «Интай-Текстиль» разработана гибкая система скидок. Сотрудничество с компанией – это гарантия качества, экономия времени и ресурсов заказчика, это выгодно всем! ' }}</p>
    </div>
    <div class="member-details__content-container" v-if="data.gallery">
      <h3 class="member-details__content-title">Галерея</h3>
      <CommonGallerySlider :images="data.gallery" :videos="data.videos"/>
    </div>
    <div class="member-details__content-container">
      <h3 class="member-details__content-title" style="color: red">отзывы</h3>
      <ReviewsEntity />
    </div>
    <div class="member-details__activity">
      <p>Последняя активность: {{ data.updatedAt }}</p>
    </div>
  </div>
</template>

<script setup>
import defaultLogoImage from '@/assets/images/nophoto_pc.png';

const props = defineProps({
  data: {
    type: Object,
    default: () => ({}),
  },
})

const pubCardType = computed(() => {
  switch (props.data.type) {
    case 'performer':
      return 'исполнителю'
    case 'customer':
      return 'заказчику'
  }
})

</script>

<style lang="scss">

.member-details {
  font-size: 1.6rem;

  &__header{
    margin-top: 3.43em;
    display: flex;
    margin-bottom: 3.125em;
  }

  &__header-content {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    row-gap: 1em;
  }

  &__title {
    font-size: 2em;
    line-height: 1em;
    margin-bottom: .31em;
  }

  &__locations {
    font-size: 1em;
  }

  &__props {
    display: flex;
    column-gap: .5em;
    align-items: center;
  }

  &__soc {
    display: flex;
    column-gap: .5em;
    align-items: center;
  }

  &__content-container {
    margin-bottom: 3.125em;
  }

  &__content-title {
    font-size: 1.5em;
    margin-bottom: .83em;
  }

  &__activity {
    display: flex;
    justify-content: flex-end;
  }

  &__btn-container {
    display: flex;
    align-items: center;
    column-gap: 1em;

    @include mobile {
      flex-direction: column;
      align-items: flex-start;
      row-gap: 1em;
    }
  }

  &__btn {
    font-size: 1.2rem;
    column-gap: 1em;
    text-transform: uppercase;
  }
}

</style>