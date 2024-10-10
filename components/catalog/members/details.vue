<template>
  <div class="member-details">
    <div class="member-details__header">
      <div class="image-box">
        <img :src="defaultLogoImage" alt="">
      </div>
      <div class="member-details__header-content">
        <h1 class="member-details__title">{{ data.name || 'Не указано' }}</h1>
        <CommonRating :rating="data.fillRating" />
        <div class="member-details__props">
          <i class="flag flag_round"></i>
          <p class="member-details__location">{{ data.location || 'Не указано' }}</p>
        </div>
        <div class="member-details__props" v-if="data.siteUrl">
          <SvgoWeb class="svg-m" />
          <a :href="data.siteUrl" _target="_blank">{{ data.siteUrl }}</a>
        </div>
        <div class="member-details__props">
          <SvgoCase class="svg-m" />
          <p> 
            {{ data.entityCount 
              ? (data.entityCount + ' ' + plural(data.entityCount, { one: 'услуга', few: 'услуги', many: 'услуг' }) ) 
              : 'Нет услуг' 
            }}
          </p>
        </div>
        <div class="member-details__soc">
          <NuxtLink to="#" class="member-details__soc-link">
            <SvgoTelegram class="svg-l" />
          </NuxtLink>
          <NuxtLink to="#" class="member-details__soc-link">
            <SvgoVkontakte class="svg-l" />
          </NuxtLink>
          <NuxtLink to="#" class="member-details__soc-link">
            <SvgoYoutube class="svg-l" />
          </NuxtLink>
        </div>
        <UiButton class="member-details__btn" variant="tertiary" size="around">
          <SvgoFavorite class="svg-m" />
        </UiButton>
      </div>
    </div>
    <div class="member-details__content-container">
      <h3 class="member-details__content-title">Описание</h3>
      <p>{{ data.description || ' Компания «Интай-Текстиль» на протяжении 17 лет обеспечивает потребности в тканях производителей спецодежды, одежды для туристов, охотников и рыболовов, спортивной одежды. Компания отвечает запросам заказчиков по качеству ткани, своевременно обновляет ассортимент в соответствии с мировыми тенденциями рынка. Хорошо отлаженная логистика позволяет курировать доставку ткани от фабрики до производителя строго в согласованные сроки.  В «Интай-Текстиль» разработана гибкая система скидок. Сотрудничество с компанией – это гарантия качества, экономия времени и ресурсов заказчика, это выгодно всем! ' }}</p>
    </div>
    <div class="member-details__content-container">
      <h3 class="member-details__content-title">Галерея</h3>
      <CommonGallerySlider />
    </div>
    <div class="member-details__content-container">
      <h3 class="member-details__content-title" style="color: red">отзывы</h3>
      <CommonReviews />
    </div>
    <div class="member-details__activity" style="color: red">
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
}

</style>