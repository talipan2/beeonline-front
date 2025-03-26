<template>
  <UiModal class="bonus-info-modal modal" size="xs" v-model="settingStore.bonusInfoModal" title="" @confirm="() => confirm()" colClass="card">
    <template #content>
      <div class="card__container">
        <div class="card__content">
          <h2 class="card__title">
            Как получить уровень
          </h2>
          <div class="bonus-how">
            <UiImage src="/assets/images/bonus/empty.png" class="bonus-how__image" />
            <div class="card__subtitle">
              Чтобы достичь нового уровня, зарабатывайте бонусные рубли, выполняя задания.
            </div>
          </div>
        </div>
      </div>
    </template>
  </UiModal>
</template>

<script setup>
import { useSettingStore } from '~/store/settingStore';


const settingStore = useSettingStore();

const confirm = () => {
  settingStore.bonusInfoModal = false;
}

</script>

<style lang="scss">

.bonus-info-modal {
  .modal-content {
    margin-bottom: auto;
    box-shadow: none;
  }

  .card__container {
    display: flex;
    flex-direction: column;
    gap: 3rem;
    padding: 1.4em;
  }

  .modal-close {
    font-size: 1rem;
    right: 2em;
    top: 2em;
    border-radius: 100%;
    background-color: #f1f3f9;
    padding: .8em;
    svg {
      width: 2em;
      height: 2em;
    }

    &:hover {
      background-color: #d6dcee;}
  }

  @include tablet {
    .modal-content {
      width: 50%;
    }
  }

  @include mobile {
    .modal-content {
      width: 90%;
    }
  }
}

</style>
