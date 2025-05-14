<template>
  <div class="member-details">
    <div class="member-details__header">
      <div class="image-box image-box_type_frame">
        <img :src="data.logo || defaultLogoImage" :alt="data.name">
      </div>
      <div class="member-details__header-content">
        <h1 class="member-details__title">{{ data.name || 'Не указано' }}</h1>
        <CommonRating :rating="data.rating" :is-count-rating="false" :reviews="data.reviewCount" />
        <CommonLocationsList class="member-details__locations" :locationsList="data.location"/>
        <div class="member-details__props" v-if="data.siteUrl">
          <SvgoWeb class="svg-m" fill="#a9abac"/>
          <a :href="ensureHttps(data.siteUrl)" _target="_blank">{{ data.siteUrl }}</a>
        </div>
        <div class="member-details__props">
          <SvgoCase class="svg-m" fill="#a9abac" />
          <p v-if="data.type === 'performer'">
            {{ data.entityCount
              ? (data.entityCount + ' ' + plural(data.entityCount, { one: 'услуга', few: 'услуги', many: 'услуг' }) )
              : 'Нет услуг'
            }}
          </p>
          <p v-if="data.type === 'customer'">
            {{ data.entityCount
              ? (data.entityCount + ' ' + plural(data.entityCount, { one: 'заказ', few: 'заказа', many: 'заказов' }) )
              : 'Нет заказов'
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
        <div class="member-details__btn-container" v-if="userStore.isAuth">
          <!-- <UiButton :to="`/pubcards/edit/${data.id}`" class="member-details__btn" variant="quinary" size="large" v-if="isSelfEntity">
            Редактировать
          </UiButton> -->
          <PaidServiceCounterpartyCheck
                :id="data.organizationId"
            >
                <template #button="{ open }">
                    <UiButton class="member-details__btn" variant="quinary" size="large" type="button" @click="open">
                        <SvgoSearch class="svg-m" fill="#6937a5" />
                        Проверить контрагента
                    </UiButton>
                </template>
            </PaidServiceCounterpartyCheck>
          <UiButton type="button" class="member-details__btn" :class="{ 'member-details__btn_type_active': isFavorite }" variant="tertiary" size="around" @click="handleAddFavorite">
            <SvgoFavorite class="svg-m" />
          </UiButton>
        </div>
        <div class="member-details__btn-container" v-else>
          <PaidServiceCounterpartyCheck
                :id="data.organizationId"
            >
                <template #button>
                    <UiButton class="member-details__btn" variant="quinary" size="large" type="button" @click="settingStore.authModalStatus = true">
                        <SvgoSearch class="svg-m" fill="#6937a5" />
                        Проверить контрагента
                    </UiButton>
                </template>
            </PaidServiceCounterpartyCheck>
          <UiButton type="button" class="member-details__btn" :class="{ 'member-details__btn_type_active': isFavorite }" variant="tertiary" size="around" @click="settingStore.authModalStatus = true">
            <SvgoFavorite class="svg-m" />
          </UiButton>
        </div>
        <!-- <div class="member-details__btn-container">
            <PaidServiceCounterpartyCheck
                :id="data.organizationId"
            >
                <template #button="{ open }">
                    <UiButton class="member-details__btn" variant="quinary" size="large" type="button" @click="open">
                        <SvgoSearch class="svg-m" fill="#6937a5" />
                        Проверить контрагента
                    </UiButton>
                </template>
            </PaidServiceCounterpartyCheck>
        </div> -->
      </div>
    </div>
    <div class="member-details__content-container">
      <h3 class="member-details__content-title">Описание</h3>
      <p class="multiline-text">{{ data.description || '' }}</p>
    </div>
    <div class="member-details__content-container" v-if="data.gallery.length || data.videos.length">
      <h3 class="member-details__content-title">Галерея</h3>
      <CommonGallerySlider :images="data.gallery" :videos="data.videos"/>
    </div>
    <div class="member-details__content-container" v-if="reviews?.length">
      <h3 class="member-details__content-title">Отзывы</h3>
      <p class="member-details__content-rating">Общий рейтинг {{ props.data.type === 'performer' ? 'исполнителя' : props.data.type === 'customer' ? 'заказчика' : '' }}: {{ data.rating }}/5</p>
      <ReviewsEntity :data="reviews"/>
      <CommonPagination v-if="reviewsPage.lastPage > 1" class="member-details__pagination" :current-page="reviewsPage.currentPage" :total-pages="reviewsPage.lastPage" @change-page="handleChangeReviewsPage" />
    </div>
    <div class="member-details__activity">
      <p>Последняя активность: {{ data.updatedAt }}</p>
    </div>
  </div>
</template>

<script setup>
import defaultLogoImage from '@/assets/images/nophoto_pc.png';
import { useUserStore } from '~/store/userStore';
import { useToast } from 'vue-toastification';
import { useReviewsStore } from '~/store/reviewsStore';
import { useSettingStore } from '~/store/settingStore';

const props = defineProps({
  data: {
    type: Object,
    default: () => ({}),
  },
})

const toast = useToast();
const userStore = useUserStore();
const reviewStore = useReviewsStore();
const settingStore = useSettingStore();
const isFavorite = ref(false);
const reviews = ref(null);
const isLoading = ref(false);

const isSelfEntity = computed(() => props.data.id === userStore.userPubCard?.id)

const pubCardType = computed(() => {
  switch (props.data.type) {
    case 'performer':
      return 'исполнителю'
    case 'customer':
      return 'заказчику'
  }
})

const organizationId = computed(() => props.data.organizationId || null)

watch(() => organizationId.value, (newVal) => {
  if(newVal) {
    isLoading.value = true
    reviewStore.getOrganizationReviews(newVal).then((res) => {
      reviews.value = res.data
      reviewsPage.value = {
        currentPage: res.pagination.current_page,
        lastPage: res.pagination.last_page
      }
    }).finally(() => isLoading.value = false)
  }
}, { immediate: true })

const reviewsPage = ref({
  currentPage: 1,
  lastPage: 1
})

const handleChangeReviewsPage = (page) => {
  isLoading.value = true
  reviewStore.getOrganizationReviews(organizationId.value, {page}).then((res) => {
    console.log(res)
    reviews.value = res.data
    reviewsPage.value = {
      currentPage: res.pagination.current_page,
      lastPage: res.pagination.last_page
    }
  }).finally(() => isLoading.value = false)
}

function handleAddFavorite() {
  if(isLoading.value) return;
  isLoading.value = true

  if(isFavorite.value) {
    userStore.removeFavorite( userStore.userData.id, props.data.id, 'pubCard').then(res => {
      isFavorite.value = false;
      toast.info('Удалено из избранных');
    }).finally(() => isLoading.value = false)
  } else {
    userStore.addFavorite( userStore.userData.id, props.data.id, 'pubCard').then(res => {
      isFavorite.value = true;
      toast.success('Добавлено в избранные');
    }).finally(() => isLoading.value = false)
  }
}

onMounted(() => {
  userStore.getFavorites(userStore.userData.id).then(res => {
    if(res && res.pubCard && res.pubCard.data) {
      res.pubCard.data.forEach(item => {
        if(item.id === props.data.id) {
          isFavorite.value = true;
        }
      })
    }
  })
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

    &_type_active {
      background-color: var(--border-color-quaternary);
      color: var(--text-color-octonary);

      svg {
        fill: var(--text-color-octonary);
      }
    }
  }

  &__content-rating {
    font-size: 1em;
    margin-bottom: 2em;
  }
}

</style>
