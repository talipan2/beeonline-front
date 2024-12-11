<template>
  <div class="tutorial">
    <UiButton
      type="button"
      class="tutorial__btn"
      variant="tertiary"
      size="around"
      @click="startTutorial"
      >?</UiButton
    >
    <div class="tutorial__overlay" v-if="isOverlayVisible"></div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useTippy } from "vue-tippy";
import CommonTutorialLayout from "@/components/common/tutorial/layout.vue";
import { useSettingStore } from "~/store/settingStore";

const props = defineProps({
  data: {
    type: Array,
    default: () => [],
  },
});

const settingStore = useSettingStore();
const locationModal = computed(() => settingStore.chooseLocationModal);

let tippyInstance = null;
const currentTip = ref(0); // Хранит текущий индекс подсказки
const tutorialLength = computed(() => props.data.length);
const isOverlayVisible = ref(false);
const currentHighlightedRef = ref(null);

const lockScroll = () => {
  document.body.style.overflow = "hidden"; // Блокируем прокрутку
};

const unlockScroll = () => {
  document.body.style.overflow = ""; // Восстанавливаем прокрутку
};

// Функция для прокрутки страницы так, чтобы элемент был по центру экрана
const scrollToCenter = (element) => {
  const rect = element.getBoundingClientRect(); // Получаем размеры и положение элемента
  const windowHeight = window.innerHeight; // Высота окна
  const elementCenter = rect.top + window.scrollY + rect.height / 2; // Центр элемента
  const scrollTo = elementCenter - windowHeight / 1.5 ; // Вычисляем, на сколько прокрутить

  window.scrollTo({
    top: scrollTo,
    behavior: "smooth",
  });
};

// Функция для показа подсказки
const showTip = (index) => {
  currentHighlightedRef.value = props.data[index].component;

  if (tippyInstance) {
    tippyInstance.destroy(); // Удаляет текущий экземпляр
    tippyInstance = null;
  }

  if (!tippyInstance) {
    isOverlayVisible.value = true;
    // Инициализируем Tippy 
    tippyInstance = useTippy(props.data[index].component, {
      content: h(CommonTutorialLayout, { content: props.data[index].content, nextTick: showNextTip }),
      trigger: "manual",
      placement: "right",
      hideOnClick: false,
      interactive: true,
      duration: 500,
      zIndex: 200,
      popperOptions: {
        modifiers: [
          {
            name: 'flip',
            options: {
              fallbackPlacements: ['top', 'bottom'],
            },
          },
        ],
      },
      onClickOutside(instance) {
        showNextTip();
      },
      onShow(instance) {
        if(index === 0) {
          lockScroll();
        }
        scrollToCenter(currentHighlightedRef.value);
        instance.popper.classList.add("tutorial-tippy");
        if (currentHighlightedRef.value) {
          currentHighlightedRef.value.classList.add("highlighted-element");
        }
      },
      onHide(instance) {
        if(props.data.length - 1 === index) {
          unlockScroll();
        }
        isOverlayVisible.value = false;
        if (currentHighlightedRef.value) {
          currentHighlightedRef.value.classList.remove("highlighted-element");
        }
      },
    });
  }

  setTimeout(() => {
    tippyInstance.show();
  }, 200);
};

// Функция для запуска обучения
const startTutorial = () => {
  if (tutorialLength.value > 0) {
    currentTip.value = 0; // Сбрасываем текущий индекс
    showTip(currentTip.value); // Показываем первую подсказку
    isOverlayVisible.value = true;
    settingStore.catalogTutorialStatus = true;
  }
};

// Функция для показа следующей подсказки
const showNextTip = () => {
  if(locationModal.value) return
  if (currentTip.value < tutorialLength.value - 1) {
    tippyInstance.hide(); // Скрываем текущую подсказку
    currentTip.value++; // Переходим к следующему индексу
    showTip(currentTip.value); // Показываем следующую подсказку
  } else {
    // Если это последняя подсказка
    isOverlayVisible.value = false;
    tippyInstance.hide();
  }
};
</script>

<style lang="scss">
.tutorial-tippy {
  .tippy-arrow {
    color: #fff;
    z-index: 3;
  }

  .tippy-box[data-placement^=right] > .tippy-arrow::after {
    left: -8px;
    border-width: 8px 8px 8px 0px;
    border-right-color: var(--button-background-primary);
    transform-origin: center right;
    z-index: -1;
  }

  .tippy-box[data-placement^=right] > .tippy-arrow::before {
    left: -6px;
  }

  .tippy-box[data-placement^="right"] > .tippy-arrow {
    left: 1px;
  }

  .tippy-box[data-placement^="top"] > .tippy-arrow:before {
    bottom: -10px;
    border-width: 15px 7.5px 0;
    border-top-color: initial; 
  }
}

.tutorial {
  &__btn {
    font-size: 1.4rem;
    padding: 0.21em 0 0;
    width: 2em;
    height: 2em;
  }
}

.tutorial__overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 101;
}
</style>
