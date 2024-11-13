<template>
  <div class="deal-stages-container" ref="tippyParentContainer">
    <div class="deal-stages" ref="dealStagesContainer">
      <div class="deal-stages__items" ref="dealStagesContent">
        <template v-for="(stage, index) in stages" :key="index">
          <div class="deal-stages__item" :class="{ active: stage.active }">
            <div class="deal-stages__arrow"></div>
            <tippy
              :content="stage.description"
              :interactive="true"
              :appendTo="tippyParentContainer"
              placement="bottom-start"
              :arrow="false"
              ref="tippyInstances"
            >
              <div
                class="deal-stages__step"
              >
                <i></i>
                <span>{{ stage.title }}</span>
              </div>
            </tippy>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup>
import ScrollBooster from "scrollbooster";

const props = defineProps({});

const tippyParentContainer = ref(null);
const tippyInstances = ref([]);
const dealStagesContainer = ref(null);
const dealStagesContent = ref(null);

const stages = [
  {
    code: "communication",
    title: "Общение в чате",
    description:
      "Стороны используют встроенный чат для обсуждения деталей сделки, уточнения вопросов и разрешения возможных недоразумений, что помогает поддерживать прозрачность и согласованность на всех этапах.",
  },
  {
    code: "creation",
    title: "Начало работы",
    description:
      "Заказчик или исполнитель инициируют сделку, определяя основные условия и параметры.",
  },
  {
    code: "ts_agree",
    title: "Техническое задание",
    description:
      "Стороны  утверждают техническое задание (ТЗ), чтобы четко определить ожидания и подписывают юридически обязывающие документы.",
  },
  {
    code: "requisites",
    title: "Подтверждение реквизитов",
    description:
      "Стороны обмениваются и подтверждают банковские и контактные реквизиты для обеспечения корректности дальнейших операций.",
  },
  {
    code: "moderation",
    title: "Проверка менеджером",
    description:
      "Специалист проверяет все детали сделки на соответствие установленным требованиям и подтверждает готовность к следующему этапу.",
  },
  {
    code: "invoice",
    title: "Резервирование средств",
    description:
      "Заказчик переводит средства на защищенный счет сервиса, обеспечивая финансовую безопасность до завершения сделки.",
  },
  {
    code: "production",
    title: "Производство",
    description:
      "Исполнитель начинает выполнение заказа в соответствии с согласованными условиями и ТЗ.",
  },
  {
    code: "delivery",
    title: "Доставка",
    description:
      "Готовая продукция или услуга доставляется заказчику в указанные сроки и место.",
  },
  {
    code: "quality",
    title: "Проверка заказа",
    description:
      "Заказчик оценивает полученный товар или услугу на соответствие оговоренным стандартам и количеству.",
  },
  {
    code: "payment",
    title: "Оплата исполнителю",
    description:
      "После успешной проверки средства перечисляются исполнителю, завершая финансовую часть сделки.",
  },
];

const hideTooltips = () => {
  tippyInstances.value.forEach((instance) => {
    instance.hide();
  });
};

onMounted(() => {
  new ScrollBooster({
    viewport: dealStagesContainer.value,
    content: dealStagesContent.value,
    direction: "horizontal",
    scrollMode: "native",
    pointerMode: "mouse",
  });

  dealStagesContainer.value.addEventListener("touchmove", () => {
    hideTooltips();
  });
});


</script>

<style lang="scss">
.deal-stages {
  position: relative;
  width: 100%;
  overflow-x: auto;
  counter-reset: deal-stages;
  font-size: 1rem;
  padding-bottom: 2.4em;
  margin-bottom: 2em;
  display: block;

  &_open {
    display: block;
  }

  &__items {
    display: flex;
    flex-wrap: nowrap;
    justify-content: flex-start;
    align-items: center;
    gap: 2.8em;
  }

  &__arrow {
    display: flex;
    align-items: center;
    width: 6.4em;
    flex: 0 0 auto;
    position: relative;
    color: #8e8ea9;

    &::before {
      content: "";
      display: block;
      width: 100%;
      height: 2px;
      background-image: linear-gradient(
        to right,
        currentColor 50%,
        rgba(255, 255, 255, 0) 0%
      );
      background-position: 83% top;
      background-size: 8px 2px;
      background-repeat: repeat-x;
      flex: 0 0 100%;
    }

    &::after {
      content: "";
      position: absolute;
      right: 0;
      width: 1em;
      height: 1em;
      border-top: 2px solid currentColor;
      border-right: 2px solid currentColor;
      transform: rotate(45deg);
    }
  }

  &__item {
    display: flex;
    align-items: center;
    gap: 2.8em;

    &:first-child {
      .deal-stages__arrow {
        display: none;
      }
    }

    &.active {
      .deal-stages {
        &__arrow {
          color: var(--text-color-ternary);
        }

        &__step {
          i {
            background-color: var(--text-color-ternary);

            &::before {
              color: #fff;
            }
          }
        }
      }
    }
  }

  &__step {
    display: flex;
    align-items: center;
    gap: 1.2em;
    cursor: default;

    i {
      font-style: normal;
      width: 3.2em;
      height: 3.2em;
      flex: 0 0 auto;
      border-radius: 3.2em;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #eaeaef;

      &::before {
        content: counter(deal-stages);
        display: block;
        font-size: 1.4em;
        color: #000;
        font-weight: 500;
      }
    }

    span {
      flex: 0 0 auto;
      display: block;
      white-space: nowrap;
      font-size: 1.4em;
      color: #000;
      font-weight: 600;
    }

    &::after {
      content: "";
      counter-increment: deal-stages;
      position: absolute;
      z-index: -1;
      pointer-events: none;
    }

    &:hover {
      span {
        color: var(--text-color-ternary);
      }
    }
  }
}

.deal-stages-container {
  .tippy-content {
    font-size: 12px;
    line-height: 1.6;
    background: #fff;
    color: #8e8ea9;
    padding: 2em;
    max-width: 31em;
    z-index: 9999;
    pointer-events: none;
    box-shadow: 0 2em 4em -1em rgba(0, 0, 0, 0.08);
  }
}

.deal-stages-popper {

}
</style>
