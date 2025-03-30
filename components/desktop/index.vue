<template>
  <div class="desktop">
    <div class="desktop__notify" v-if="!emailVerified">
      <h2 class="desktop__notify-title">Уведомления</h2>
      <CommonNotify
        v-if="!emailVerified"
        type="warning"
        text="Ваша электронная почта не подтверждена. Для полноценной работы на портале и доступа ко всем функциям рекомендуем подтвердить."
        btnText="Подтвердить"
      />
    </div>
    <div class="desktop__banner" v-if="role === 'performer'">
      <div class="desktop__banner-content">
        <h2 class="desktop__banner-title">Новые тарифы Премиум и Ультра!</h2>
        <div class="desktop__banner-container">
          <p class="desktop__banner-text">Выделите свое производство среди конкурентов! Используйте прямую связь с заказчиками для эффективного продвижения услуг. Не упустите шанс улучшить результаты!</p>
          <UiButton class="desktop__banner-btn"  variant="quaternary" size="large">Узнать подробнее</UiButton>
        </div>
      </div>
      <div class="desktop__banner-image">
        <UiImage src="/assets/images/desktop-banner.png" />
      </div>
      <NuxtLink class="desktop__banner-link" to="/tariffs"></NuxtLink>
    </div>
    <div class="desktop__card-container">
      <DesktopCard title="Карточка организации" :link="{ url: `/pubcards/edit/${pubCard.id}`, text: 'Изменить'}">
        <template #body>
          <CardsPublic class="desktop__pub-card" :is-props-visible="true" :is-description="true" :data="pubCard" :class="{'loading' : pubCardLoader}"/>
        </template>
      </DesktopCard>
      <DesktopCard title="Баланс" :link="{ url: '/tariffs', text: 'Пополнить баланс'}">
        <template #body>
          <div class="desktop__balance balance-card" :class="{'loading' : pubCardLoader}">
            <div class="balance-card__header">
              <p class="balance-card__balance">{{ formatMoney(userBalance, userCurrency, 2, false) }}<span class="balance-card__currency"> руб.</span></p>
              <p class="balance-card__balance">{{ formatMoney(userBonuses, 'bonuses') }} <span class="balance-card__currency"> баллов</span></p>
            </div>
            <div class="balance-card__details-list balance-card__details-list_type_desktop">
              <div class="balance-card__details-header ">
                <p class="balance-card__details-date desktop__selected">Дата и время</p>
                <p class="balance-card__details-sum desktop__selected">Сумма</p>
                <p class="balance-card__details-type desktop__selected">Операция</p>
              </div>
              <div class="balance-card__details-item" v-for="item in transactionsList" :key="item">
                <p class="balance-card__details-date">{{ formatDate(item.created_at, 'DD.MM.YYYY') }}
                  <span class="balance-card__details-time desktop__selected">{{ formatDate(item.created_at, 'mm:HH') }}</span>
                </p>
                <div class="balance-card__details-sum" :class="{ 'debit': item.type === 'debit', 'credit': item.type === 'credit'}">
                  <SvgoBalanceArrow class="balance-card__details-status" />
                  {{ formatMoney(item.amount, item.currency?.code || 'bonus') }}
                </div>
                <p class="balance-card__details-type">{{ item.message }}</p>
              </div>
            </div>
            <div class="balance-card__details-list balance-card__details-list_type_mobile">
              <template  v-for="item in transactionsList" :key="item">
                <div class="balance-card__details-item-mobile">
                  <div class="balance-card__details-item-line">
                    <p class="balance-card__details-date desktop__selected">Дата и время</p>
                    <p class="balance-card__details-date">{{ formatDate(item.updated_at, 'DD.MM.YYYY') }}
                      <span class="balance-card__details-time desktop__selected">{{ formatDate(item.updated_at, 'mm:HH') }}</span>
                    </p>
                  </div>
                  <div class="balance-card__details-item-line">
                    <p class="balance-card__details-date desktop__selected">Сумма</p>
                    <div class="balance-card__details-sum replenishment">
                      <span>{{ item.type === 'debit' ? '+' : '-' }}</span>
                      {{ formatMoney(item.amount, item.currency?.code || 'bonuses', 2) }}
                    </div>
                  </div>
                  <div class="balance-card__details-item-line">
                    <p class="balance-card__details-type desktop__selected">Операция</p>
                    <p class="balance-card__details-type">{{ item.comment }}</p>
                  </div>
                </div>
              </template>
            </div>
            <NuxtLink class="balance-card__link link" to="/tariffs">Все последние транзакции</NuxtLink>
          </div>
        </template>
      </DesktopCard>
    </div>
    <DesktopStats :role="role" :data="pubCardStats" :class="{'loading' : statsLoader}"/>
      <div class="desktop__card-container" :class="{'loading' : reviewsLoader}">
        <DesktopCard :title="`Отзывы (${reviewsListTotal + reviewsAboutUsListTotal})`" :link="{ url: '/reviews', text: 'Все отзывы'}">
          <template #body>
            <DesktopSelectableEntity class="desktop__chats" :label="['Отзывы о нас', 'Мои отзывы']" :count="[reviewsAboutUsListTotal, reviewsListTotal]">
              <template #firstPage >
                <template v-if="reviewsAboutUsList">
                  <DesktopReviewRating :data="pubCard.ratingData" />
                  <template v-for="review in reviewsAboutUsList" :key="review.id">
                    <DesktopSelectableEntityCard :data="review" btnLabel="Читать полный отзыв" :isRating="true" :btn-link="`/reviews/show/${review.id}`"/>
                  </template>
                </template>
                <template v-else>
                  <DesktopEmptyCard
                    title="У вас нет отзывов"
                    text="Попросите ваших контрагентов оставить отзыв о работе с вами, чем больше отзывов, тем выше ваша карточка организации в поиске"
                  >
                    <template #image>
                      <SvgoEmptyReview class="svg-lx" />
                    </template>
                  </DesktopEmptyCard>
                </template>
              </template>
              <template #secondPage>
                <template v-if="reviewList">
                  <template v-for="review in reviewList" :key="review.id">
                    <DesktopSelectableEntityCard :data="review" btnLabel="Читать полный отзыв" :isRating="true" :btn-link="`/reviews/show/${review.id}`"/>
                  </template>
                </template>
                <template v-else>
                  <DesktopEmptyCard
                    title="Вы не оставляли отзывов"
                  >
                    <template #image>
                      <SvgoEmptyReview class="svg-lx" />
                    </template>
                  </DesktopEmptyCard>
                </template>
              </template>
            </DesktopSelectableEntity>
          </template>
        </DesktopCard>
        <DesktopCard :title="`Чаты (${allChatsListTotal + unreadChatsListTotal})`" :link="{ url: '/chat', text: 'Все чаты'}">
          <template #body>
            <DesktopSelectableEntity class="desktop__chats" :label="['Все чаты', 'Непрочитанные']" :count="[allChatsListTotal, unreadChatsListTotal]">
              <template #firstPage>
                <template v-if="allChatsListTotal">
                  <template v-for="chat in allChatsList" :key="chat.id">
                    <DesktopSelectableEntityCard :data="chat" btnLabel="Читать полностью" :btn-link="`/chat?chat_id=${chat.id}`"/>
                  </template>
                </template>
                <template v-else>
                  <DesktopEmptyCard
                    title="Сообщений пока нет"
                    text="У вас нет активных чатов, начните беседу в карточке участника"
                  >
                    <template #image>
                      <SvgoEmptyMessage class="svg-lx" />
                    </template>
                    <template #button>
                      <UiButton v-if="role === 'customer'" to="/services" variant="quinary" size="large">Каталог услуг</UiButton>
                      <UiButton v-if="role === 'performer'" to="/orders" variant="quinary" size="large">Каталог заказов</UiButton>
                    </template>
                  </DesktopEmptyCard>
                </template>
              </template>
              <template #secondPage>
                <template v-if="unreadChatsListTotal">
                    <template v-for="chat in unreadChatsList" :key="chat.id">
                    <DesktopSelectableEntityCard :data="chat" btnLabel="Читать полностью" :btn-link="`/chat?chat_id=${chat.id}`"/>
                    </template>
                </template>
                <template v-else>
                    <DesktopEmptyCard
                        title="Сообщений пока нет"
                        text="У вас нет непрочитанных сообщений"
                    >
                        <template #image>
                        <SvgoEmptyMessage class="svg-lx" />
                        </template>
                    </DesktopEmptyCard>
                </template>
              </template>
            </DesktopSelectableEntity>
          </template>
        </DesktopCard>
      </div>
      <DesktopEntityList :getEntity="getEntity" :role="role" :filterList="filterList"/>
  </div>
</template>

<script setup>
import { useOrganizationStore } from '~/store/organizationStore';
import { useReviewsStore } from '~/store/reviewsStore';
import { useTariffsStore } from '~/store/tariffsStore';
import { useUserStore } from '~/store/userStore';
import { useChatStore } from '~/store/chatStore';

const props = defineProps({
  getEntity: {
    type: Function,
    required: true
  },
  role: {
    type: String,
    required: true,
  },
  filterList: {
    type: Array,
    required: true
  },
})


const tariffsStore = useTariffsStore();
const reviewStore = useReviewsStore();

const userStore = useUserStore();
const organizationStore = useOrganizationStore();
const chatStore = useChatStore();

const emailVerified = computed(() => userStore.userData.email_verified_at ? true : false);

const pubCardStats = ref({})

const transactionsList = ref([]);
const userBalance = computed(() => tariffsStore.userBalance);
const userBonuses = computed(() => tariffsStore.userBonuses);
const userCurrency = computed(() => tariffsStore.userCurrency);

const reviewList = ref(null)
const reviewsListTotal = ref(0);
const reviewsAboutUsList = ref(null);
const reviewsAboutUsListTotal = ref(0);

const pubCardLoader = ref(false);
const statsLoader = ref(false);
const reviewsLoader = ref(false);

const allChatsList = ref(null);
const unreadChatsList = ref(null);
const allChatsListTotal = ref(0);
const unreadChatsListTotal = ref(0);
// const allChatsList = ref([
//   {
//     id: 1,
//     text: 'Исполнитель оставил отзыв',
//     date: '12.12.2022',
//     fromName: 'Иван Иванов',
//     name: 'Иван Иванов',
//     logo: '',
//   },
//   {
//     id: 2,
//     text: 'Исполнитель оставил отзыв',
//     date: '12.12.2022',
//     fromName: 'Имя исполнитель',
//     name: 'Имя заказчик',
//     logo: '',
//   },
//   {
//     id: 3,
//     text: 'Исполнитель оставил отзыв',
//     date: '12.12.2022',
//     fromName: 'Иван Иванов',
//     name: 'Иван Иванов',
//     logo: '',
//   },
// ]);

const pubCard = computed(() => {
  if (!userStore.userPubCard) return {}
  return {
    id: userStore.userPubCard.id,
    name: userStore.userPubCard.name,
    logo: userStore.userPubCard.logo,
    type: userStore.userPubCard.type,
    description: userStore.userPubCard.description,
    countryId: {countries: [userStore.userPubCard.country]},
    rating: userStore.userPubCard.reviews_stats_about?.stars,
    reviewCount: userStore.userPubCard.reviews_about_count,
    ratingData: {...userStore.userPubCard.reviews_stats_about, reviewCount: userStore.userPubCard.reviews_about_count},
    entityCount: userStore.userPubCard.orders_count || userStore.userPubCard.services_count,
    rawMaterials: [userStore.userPubCard.materials_own ? 'Собственное': '', userStore.userPubCard.materials_tolling ? 'Давальческое' : ''].filter(Boolean),
    category: userStore.userPubCard.categories && userStore.userPubCard.categories.length ? userStore.userPubCard.categories.map(item => item.name) : []
  }
});

onMounted(() => {
  if(userStore.userData && userStore.userData.id) {
    pubCardLoader.value = true;
    tariffsStore.getBalance(userStore.userData.id);
    tariffsStore.getTransactions(userStore.userData.id)
    .then(res => {
      transactionsList.value = res.data && res.data.length ? res.data.slice(0, 5) : [];
    }).finally(() => {
      pubCardLoader.value = false
    })
  }


  reviewsLoader.value = true;
  reviewStore.getReviewsForUs(userStore.userData.organization_id, {limit: 3}).then((res) => {
    if (res) {
      if (res.data && res.data.length) {
        reviewsAboutUsList.value = res.data.map(item => {
          return {
            id: item.id,
            text: item.text_positive,
            rating: item.rate,
            name: item.owner_org?.name,
            logo: item.owner_org?.logo,
            date: item.date_created,
          }
        });
        reviewsAboutUsListTotal.value = res.pagination?.total;
      }
    }
  }).finally(() => {
    reviewsLoader.value = false
  })

  reviewStore.getReviews(userStore.userData.organization_id, {per_page: 3} ).then((res) => {
    if (res) {
      if (res.data && res.data.length) {
        reviewList.value = res.data.map(item => {
          return {
            id: item.id,
            text: item.text_positive,
            rating: item.rate,
            name: item.about_org?.name,
            logo: item.about_org?.logo,
            date: item.date_created,
          }
        });
        reviewsListTotal.value = res.pagination?.total;
      }
    }
  }).finally(() => {
    reviewsLoader.value = false
  });

  statsLoader.value = true;
  organizationStore.getPubCardStats(pubCard.value.id).then((res) => {
    if (res) {
      pubCardStats.value = res;
    }
  }).finally(() => {
    statsLoader.value = false
  })
})

chatStore.getChatList().then((res) => {
    allChatsListTotal.value = res.all_chats_total;
    unreadChatsListTotal.value = res.unread_chats_total;

    function mapChat(item) {
        let message = item.messages[0];
        let user = message?.user;
        let organization = item.organizations[0];
        let pubcard = organization?.pubcard;
        return {
            id: item.id,
            text: message ? message.text : '',
            date: message ? message.created_at : '',
            fromName: user ? user.name : '',
            name: organization ? organization.name : '',
            logo: pubcard ? pubcard.logo : '',
      };
    }

    allChatsList.value = res.all_chats.map(mapChat);
    unreadChatsList.value = res.unread_chats.map(mapChat);
});

</script>

<style lang="scss">

.desktop {
  &__card-container {
    display: flex;
    column-gap: 3em;
  }

  &__notify-title {
    font-size: 1.8em;
    margin-bottom: 1.55em;
  }

  .card-pub{
    box-shadow: none;
    padding: 0;

    .card-pub__title {
      border-bottom: none;
      padding-bottom: 0;
    }

    .card-pub__description .form-group__value {
      -webkit-line-clamp: 6;
      color: #8b92a1;
    }
  }

  &__selected {
    color: #a9abac;
  }

  &__title {
    font-size: 1.8em;
    margin-bottom: 1.66em;
  }

  &__banner {
    background-image: url('/assets/images/desktop-banner-bg.jpg');
    background-position: center center;
    background-size: cover;
    padding: 3em 1em 3em 6.4em;
    display: flex;
    justify-content: space-between;
    column-gap: 1em;
    align-items: center;
    border-radius: 24px;
    margin-bottom: 7em;
    position: relative;

    @include mobile {
      flex-direction: column;
      padding: 3em;
    }

    &-link {
      position: absolute;
      inset: 0;
    }


    &-title {
      font-size: 3.2em;
      font-weight: 600;
      line-height: 120%;
      color: var(--text-color-octonary);
      margin-bottom: .84em;

      @include mobile {
        text-align: center;
      }
    }

    &-container {
      display: flex;
      align-items: flex-end;
      gap: 8.5em;
      max-width: 71em;

      @include mobile {
        flex-direction: column;
        align-items: center;
        gap: 3em;
      }
    }

    &-text {
      font-size: 1.6em;
      font-weight: 500;
      line-height: 1.5em;
      color: var(--text-color-octonary);
      opacity: .8;

      @include mobile {
        text-align: center;
      }
    }

    &-btn {
      font-size: 1.8em;
      font-weight: 600;
      font-family: 'Inter', sans-serif;
      z-index: 2;
    }

    &-image {
      width: 39em;
    }
  }

}

.balance-card {
  flex: 1;
  font-family: 'fira-sans', sans-serif;
  font-size: 1rem;
  display: flex;
  flex-direction: column;

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: .625em;
  }

  &__balance {
    font-size: 4em;
    font-weight: 600;
    color: var(--text-color-ternary);
  }

  &__currency {
    font-size: .35em;
    font-weight: 400;
    color: var(--text-color-primary);
  }

  &__details-list {
    display: flex;
    flex-direction: column;
    font-size: 1.4em;
    margin-bottom: 3em;
  }

  &__details-header {
    display: flex;
    padding-block: .5em;
    margin-bottom: .5em;
    border-bottom: 1px solid var(--border-color-senary);
  }

  &__details-date {
    flex: 0 1 25%;
    align-content: center;
  }

  &__details-sum {
    flex: 0 1 25%;
    display: flex;
  }

  &__details-type {
    flex: 1 1 50%;
  }

  &__details-item {
    display: flex;
    padding-block: .5em;
  }

  &__details-item-line {
    display: flex;
    justify-content: space-between;
    font-size: 1.1rem;
    column-gap: 1em;
  }

  &__details-list_type_mobile {
      display: none;
    }

  &__details-item-mobile {
    display: flex;
    flex-direction: column;
    row-gap: .3em;
    padding-block: 1em;
    border-bottom: 1px solid var(--border-color-senary);
  }

  &__details-status {
    width: 1.3em;
    height: auto;
  }

  &__link {
    margin-top: auto;
    font-size: 1.2em;
    text-transform: uppercase;
  }


}
@include mobile {
  .desktop {
    &__card-container {
      flex-direction: column;
    }
  }

  .balance-card {

    &__balance {
      font-size: 3.1rem;
    }

  }
}

@include small-mobile {
  .balance-card {
    &__details-list_type_desktop {
      display: none;
    }

    &__details-list_type_mobile {
      display: block;
    }

    &__details-date, &__details-sum, &__details-type {
      flex: 0 1 auto;
      text-align: right;
    }
  }
}

</style>
