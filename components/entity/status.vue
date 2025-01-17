<template>
  <div class="entity-status">
    <h3 class="entity-status__title">{{ cardStatusText.title }} <span class="entity-status__status">{{ cardStatusText.status }}</span></h3>
    <p class="entity-status__text">{{ cardStatusText.text }}</p>
  </div>
</template>

<script setup>

const props = defineProps({
  status: {
    type: String,
    default: '',
  },
  type: {
    type: String,
    default: '',
    validator: value => ['order', 'service'].includes(value),
  }
})

const cardStatusText = computed(() => {
  const key = `${props.status}-${props.type}`;

  const statusMap = {
    'active-order': {
      title: 'Текущий статус заказа:',
      status: 'Активный',
      text: ''
    },
    'active-service': {
      title: 'Текущий статус услуги:',
      status: 'Активный',
      text: ''
    },
    'under_moderation-order': {
      title: 'Текущий статус заказа:',
      status: 'На модерации',
      text: 'После модерации заказа он будет опубликован.'
    },
    'under_moderation-service': {
      title: 'Текущий статус услуги:',
      status: 'На модерации',
      text: 'После модерации услуга будет опубликована.'
    },
    'filling-order': {
      title: 'Текущий статус заказа:',
      status: 'Заполнение',
      text: 'Ваш заказ не размещен.'
    },
    'filling-service': {
      title: 'Текущий статус услуги:',
      status: 'Заполнение',
      text: 'Ваша услуга не размещена.'
    }
  };

  return statusMap[key] || {
    title: 'Неизвестный статус',
    status: 'Ошибка',
    text: 'Статус не найден. Пожалуйста, свяжитесь с поддержкой.'
  };
});

</script>

<style lang="scss">

.entity-status {
  font-size: 1rem;
  padding: 2em 2em 4em;
  box-shadow: var(--box-shadow-primary);

  &__title {
    font-size: 2.4em;
    margin-bottom: .8em;
    span {
      color: var(--text-color-ternary);
    }
  }

  &__text {
    font-size: 1.6em;
  }
}

</style>