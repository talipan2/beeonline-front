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
    <div class="desktop__card-container">
      <DesktopCard title="Карточка организации" :link="{ url: getLinkWithRole(`/pubcards/edit/${pubCard.id}`), text: 'Изменить'}" >
        <template #body>
          <CardsPublic class="desktop__pub-card" :is-props-visible="true" :is-description="true" :data="pubCard"/>
        </template>
      </DesktopCard>
      <DesktopCard title="Баланс" :link="{ url: getLinkWithRole('/pubcards/edit/1'), text: 'Пополнить баланс'}">
        <template #body>
          <div class="desktop__balance balance-card">
            <div class="balance-card__header">
              <p class="balance-card__balance">{{ '559,03' }} ₽ <span class="balance-card__currency"> руб.</span></p>
              <p class="balance-card__balance">{{ '190' }} <span class="balance-card__currency"> баллов</span></p>
            </div>
            <div class="balance-card__details-list balance-card__details-list_type_desktop">
              <div class="balance-card__details-header ">
                <p class="balance-card__details-date desktop__selected">Дата и время</p>
                <p class="balance-card__details-sum desktop__selected">Сумма</p>
                <p class="balance-card__details-type desktop__selected">Операция</p>
              </div>
              <div class="balance-card__details-item" v-for="item in 5" :key="item">
                <p class="balance-card__details-date">28.10.2024 <span class="balance-card__details-time desktop__selected">12:00</span></p>
                <div class="balance-card__details-sum replenishment">
                  <SvgoBalanceArrow class="balance-card__details-status" />
                  1000
                </div>
                <p class="balance-card__details-type">Пополнение баллов</p>
              </div>
            </div>
            <div class="balance-card__details-list balance-card__details-list_type_mobile">
              <template  v-for="item in 5" :key="item">
                <div class="balance-card__details-item-mobile">
                  <div class="balance-card__details-item-line">
                    <p class="balance-card__details-date desktop__selected">Дата и время</p>
                    <p class="balance-card__details-date">28.10.2024 <span class="balance-card__details-time desktop__selected">12:00</span></p>
                  </div>
                  <div class="balance-card__details-item-line">
                    <p class="balance-card__details-date desktop__selected">Сумма</p>
                    <div class="balance-card__details-sum replenishment">
                      <span>+</span>
                      1000
                    </div>
                  </div>
                  <div class="balance-card__details-item-line">
                    <p class="balance-card__details-type desktop__selected">Операция</p>
                    <p class="balance-card__details-type">Пополнение баллов</p>
                  </div>
                </div>
              </template>
            </div>
            <NuxtLink class="balance-card__link link">Все последние транзакции</NuxtLink>
          </div>
        </template>
      </DesktopCard>
    </div>
    <DesktopStats :role="role"/>
      <div class="desktop__card-container">
        <DesktopCard title="Отзывы (8)" :link="{ url: getLinkWithRole('/my-reviews'), text: 'Все отзывы'}">
          <template #body>
            <DesktopSelectableEntity class="desktop__chats" :label="['Отзывы о нас', 'Мои отзывы']" :count="[8, 10]">
              <template #firstPage >
                <template v-if="true">
                  <DesktopReviewRating :role="role"/>
                  <DesktopSelectableEntityCard v-for="(item, index) in 2" :key="index" btnLabel="Читать полный отзыв" :isRating="true"/>
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
                <template v-if="true">
                  <DesktopSelectableEntityCard v-for="(item, index) in 3" :key="index" btnLabel="Читать полный отзыв" :isRating="true"/>
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
        <DesktopCard title="Чаты (8)" :link="{ url: getLinkWithRole('/my-reviews'), text: 'Все чаты'}">
          <template #body>
            <DesktopSelectableEntity class="desktop__chats" :label="['Все чаты', 'Непрочитанные']" :count="[8, 10]" :disabledPage="[2]">
              <template #firstPage>
                <template v-if="true">
                  <DesktopSelectableEntityCard v-for="(item, index) in 3" :key="index" btnLabel="Читать полностью"/>
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
                      <UiButton v-if="role === 'customer'" to="/services" variant="quinary" size="around">Каталог услуг</UiButton>
                      <UiButton v-if="role === 'performer'" to="/orders" variant="quinary" size="around">Каталог заказов</UiButton>
                    </template>
                  </DesktopEmptyCard>
                </template>
              </template>
              <template #secondPage>
                <DesktopSelectableEntityCard v-for="(item, index) in 3" :key="index" btnLabel="Читать полностью"/>
              </template>
            </DesktopSelectableEntity>
          </template>
        </DesktopCard>
      </div>
      <DesktopEntityList :getEntity="getEntity" :role="role" :filterList="filterList"/>
  </div>
</template>

<script setup>
import { useUserStore } from '~/store/userStore';

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



const userStore = useUserStore();

const pubCard = computed(() => userStore.userPubCard);
const emailVerified = computed(() => userStore.userData.email_verified_at ? true : false);

function getLinkWithRole(link) {
  return `/${props.role}${link}`
}

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

}

.balance-card {
  flex: 1;
  font-family: 'fira-sans', sans-serif;
  font-size: 1rem;

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
    }
  }
}

</style>