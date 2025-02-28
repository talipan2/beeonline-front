<template>
  <div class="stage-create">
    <p>Если вам отправили предложение заключить сделку, у вас есть 24 часа, чтобы подтвердить начало работы с безопасной
      сделкой. На всем протяжении работы с безопасной сделкой вас будет сопровождать персональный менеджер, вы можете
      написать ему через кнопку «Помощь менеджера».
    </p>
    <p>На подтверждение сделки у вас есть 24 часа!</p>
    <template v-if="active">
      <div class="stage-create__timer">
        <div class="stage-create__timer-counts">
          <p class="stage-create__timer-count">
            {{ timeRemaining.days }}
            <span>дня</span>
          </p>
          <p class="stage-create__timer-count">
            {{ timeRemaining.hours }}
            <span>часов</span>
          </p>
        </div>
      </div>
      <UiButton class="stage-create__btn" type="button" variant="quinary">Подтвердить</UiButton>
    </template>
    <p class="stage-create__confirm">Сделка подтверждена</p>
  </div>
</template>

<script setup>

const props = defineProps({
  active: {
    type: Boolean,
    default: false,
  },
})


const timeRemaining = computed(() => getTimeRemaining(confirmTill));

function getTimeRemaining(confirmTill) {
  if(!confirmTill) return {days: 0, hours: 0};
  const now = new Date();
  const target = new Date(confirmTill);
  const diff = target - now; // Разница в миллисекундах

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);

  return {
    days,
    hours
  };
}

const confirmTill = "2025-03-04T05:21:10.000000Z";

</script>

<style lang="scss">

.stage-create {
  font-size: 1.6em;
  margin-bottom: .0625em;

  &__timer {
    align-items: center;
    background-color: #f0f4fb;
    border: 1px solid #a29699;
    color: #000;
    display: flex;
    font-size: 1em;
    justify-content: center;
    line-height: 1.5;
    margin: 1em 0;
    padding: 2em;
    text-align: center;
  }

  &__timer-counts {
    display: flex;
    column-gap: .5em;
    align-items: center;
  }

  &__timer-count {
    font-size: 4em;
    font-weight: 900;

    span {
      font-size: .25em;
      font-weight: normal;
    }
  }

  &__btn {
    width: fit-content;
    font-size: 1.2rem;
    margin-bottom: 1em;
  }

  &__confirm {
    margin-bottom: 1em;
  }

  @include mobile {
    &__timer {
      font-size: 1.4rem;
    }
  }
}

</style>