<template>
  <TariffsCardLayout class="plan-summary">
    <div class="plan-summary__header">
      <h3 class="plan-summary__header-text">
        Тариф:
        <span class="plan-summary__text plan-summary__text_type_selection" v-if="tariffsStore.balanceLoaded">
          {{ tariffsStore.tariffName ?? 'Не подключён' }}
        </span>
        <CommonSpinner v-else />
      </h3>
      <p class="plan-summary__text">
        Срок подписки:
        <template v-if="tariffsStore.balanceLoaded">
          <span class="plan-summary__text plan-summary__text_type_selection">
            <template v-if="tariffsStore.tariffExpiredAt">до {{ formatDate(tariffsStore.tariffExpiredAt, "DD.MM.YYYY") }}</template>
            <template v-else>неограничен</template>
          </span>
          <span class="plan-summary__text plan-summary__text_type_status">
            {{ "(Активен)" }}
          </span>
        </template>
        <CommonSpinner v-else />
      </p>
    </div>
    <template v-if="tariffsStore.balanceLoaded">
      <ul class="plan-summary__list" v-if="availableUserFeatures.length">
        <template v-for="item in availableUserFeatures" :key="item.id">
          <li class="plan-summary__text">
            {{ item.title }}:
            <span class="plan-summary__text plan-summary__text_type_selection">{{ item.value }}</span>
          </li>
        </template>
      </ul>
      <ul class="plan-summary__list plan-summary__list_type_features" v-if="tariffsStore.tariffFeatures.length">
        <li
          v-for="(feature, index) in tariffsStore.tariffFeatures"
          :key="index"
          class="plan-summary__text plan-summary__feature"
        >
          {{ feature }}
        </li>
      </ul>
    </template>
    <CommonSpinner v-else/>
  </TariffsCardLayout>
</template>

<script setup>
import { useTariffsStore } from '~/store/tariffsStore';

const tariffsStore = useTariffsStore();

const availableUserFeatures = computed(() => {
	if (!tariffsStore.balanceLoaded) return [];
	return tariffsStore.services
		?.filter(service => service.code === 'chats')
		.map(service => {
			const feature = tariffsStore.availableUserFeatures.find(f => f.id === service.id);
			return {
				title: service.name,
				value: feature?.quantity ?? 0,
			};
		});
});

// const availableUserFeatures = [
//   { id: 1, title: "Доступно проверок контрагента:", value: "10" },
//   { id: 2, title: "Доступно поднятие карточки исполнителя в топ:", value: "10" },
//   { id: 3, title: "Рассылка коммерческого сообщения на почту пользователям, с предоставлением отчета:", value: "10" },
//   { id: 4, title: "Верхний баннер в каталогах:", value: "10" },
//   { id: 5, title: "Боковой верхний в каталогах:", value: "10" },
//   { id: 6, title: "Боковой нижний в каталогах:", value: "10" },
// ];

</script>

<style lang="scss">

.plan-summary {
  font-size: 1rem;

  p {
	margin-bottom: 0;
  }

  &__header {
    display: flex;
	flex-wrap: wrap;
    column-gap: 1em;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1em;
  }

  &__header-text{
    font-size: 2.4em;
    font-weight: 400;
    line-height: 1.2em;
  }

  &__text {
    font-size: 1.6em;
    font-weight: 400;
    line-height: 1.2em;

    &_type_selection {
      font-size: 1em;
      color: var(--text-color-ternary);
    }

    &_type_status {
      margin-left: .5em;
      font-size: 1em;
      color: var(--text-color-tertiary);
    }
  }

  &__list {
    max-width: 70%;
    font-size: 1em;
    display: flex;
    flex-direction: column;
    row-gap: .8em;

    &_type_features {
      margin-top: 1.2em;
      list-style: disc;
      padding-left: 2em;
    }
  }

  &__feature {
    line-height: 1.4em;
  }

  @include small-tablet {
    &__list {
      max-width: 100%;
    }
  }

  @include mobile {
    &__header {
      flex-wrap: wrap;
    }
  }
}

</style>
