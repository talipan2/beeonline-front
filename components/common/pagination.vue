<template>
  <div class="pagination">
    <div class="pagination__container">
      <UiButton
        type="button"
        class="pagination__btn pagination__btn_type_prev"
        variant="tertiary"
        size="around"
        @click="prevPage"
        :disabled="currentPage === 1"
      >
        <SvgoSlideArrow class="svg-l" />
      </UiButton>

      <span  v-for="page in showedPages" :key="page">
        <UiButton
          type="button"
          class="pagination__btn"
          variant="tertiary"
          size="around"
          @click="goToPage(page)"
          :class="{'pagination__btn_type_active': currentPage === page}"
          v-if="page !== '...'"
        >
          {{page}}
        </UiButton>
        <UiButton
          type="button"
          class="pagination__btn pagination__btn_type_points"
          variant="tertiary"
          size="around"
          v-else
          :disabled="true"
        >
          {{page}}
        </UiButton>
      </span>
      <UiButton
        type="button"
        class="pagination__btn pagination__btn_type_next"
        variant="tertiary"
        size="around"
        @click="nextPage"
      >
        <SvgoSlideArrow class="svg-l" />
      </UiButton>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

const data = Array.from({ length: 150 }, (_, i) => ({ id: i + 1 }));
const itemsPerPage = 5;
const currentPage = ref(1);
const maxVisiblePages = 10;
const totalPages = computed(() => Math.ceil(data.length / itemsPerPage));

const prevPage = () => {
  if (currentPage.value > 1) currentPage.value--;
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) currentPage.value++;
};

const goToPage = (page) => {
  currentPage.value = page;
};

const showedPages = computed(() => {
  const pages = [];
  const total = totalPages.value;

  // Если страниц <= 10, просто выводим их все
  if (total <= maxVisiblePages) {
    for (let i = 1; i <= total; i++) {
      pages.push(i);
    }
  } else {
    // Если текущая страница ближе к началу (меньше 8)
    if (currentPage.value < 8) {
      for (let i = 1; i <= 10; i++) {
        pages.push(i);
      }
      pages.push("...");
      pages.push(total - 1, total);
    } 
    // Если текущая страница ближе к концу (за 8 страниц до конца)
    else if (currentPage.value > total - 8) {
      pages.push(1, 2);
      pages.push("...");
      for (let i = total - 9; i <= total; i++) {
        pages.push(i);
      }
    } 
    // Если текущая страница находится между началом и концом
    else {
      // Начальные страницы
      pages.push(1, 2);
      pages.push("...");

      // Добавляем страницы вокруг текущей
      const startPage = Math.max(currentPage.value - 2, 3); // минимум 3
      const endPage = Math.min(currentPage.value + 2, total - 2); // максимум за 2 страницы до конца

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }

      pages.push("...");
      
      // Добавляем последние страницы
      pages.push(total - 1, total);
    }
  }

  return pages;
});
</script>

<style lang="scss">
.pagination {
  font-size: 1.6rem;
  margin-top: 4em;
  display: flex;
  justify-content: center;

  &__container {
    display: flex;
    align-items: center;
    column-gap: 0.3em;
  }

  &__btn {
    font-family: "fira-sans", sans-serif;
    width: 2.5em;
    height: 2.5em;
    font-size: 1em;
    border: none;
    padding: 0.625em;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.15);
    color: var(--text-color-primary);
    font-weight: 400;

    &_type_prev {
      svg {
        transform: rotate(180deg);
      }
    }

    &_type_active {
      background-color: var(--button-background-primary);
      color: var(--text-color-hover-secondary);
      cursor: default;
    }

    &:disabled {
      cursor: default;
      opacity: .65;

      &:hover {
        background-color: var(--button-background-quaternary);
        color: var(--text-color-primary);

        svg {
          fill: var(--text-color-primary);
        }
      }
    }

    &_type_points {
      &:disabled {
        opacity: 1;
      }
    }
  }
}
</style>
