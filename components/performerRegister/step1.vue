<template>
  <CommonLayoutInfoCard title="Карточка компании" class="new-service-card-layout">
    <template #action>
      <UiButton type="button" class="new-service-card-layout__edit-btn" variant="default" :without-padding="true"
        @click="editPubCardModal = true" v-if="isPreview">
        <SvgoPencil class="svg-l" />
        Редактировать
      </UiButton>
    </template>

    <template v-if="!isPreview">
      <PerformerRegisterPubCardForm v-model="data" />
    </template>
    <template v-else>
      <div class="new-service-card-layout__pubcard">
        <div class="new-service-card-layout__logo-preview">
          <UiImage :src="formattedData.logo || defaultImage" :alt="modelValue.name" :external="true" />
        </div>
        <div class="new-service-card-layout__pubcard-content">
          <h3>{{ formattedData.name }}</h3>
          <CommonLocationsList class="new-service-card-layout__pubcard-locations" :locations-list="formattedData.locations" />
          <div class="new-service-card-layout__pubcard-site">
              <SvgoPlanet class="svg-m" />
              <a v-if="formattedData.site_url" class="link" :href="formattedData.site_url" target="_blank">{{formattedData.site_url}}</a>
              <p v-else>-</p>
          </div>
        </div>
      </div>
      <div class="form-group form-group_type_secondary">
        <div class="form-group form-group__value">
          <div class="form-group-data">
            <label class="form-group__title">
              Сырье
            </label>
            <div class="form-value">{{ formattedData.materials }}</div>
          </div>
          <div class="form-group-data">
            <label class="form-group__title">
              Образцы
            </label>
            <div class="form-value">{{ '-' }}</div>
          </div>
        </div>
      </div>
      <div class="form-group form-group_type_secondary">
        <div class="form-group form-group__value">
          <div class="form-group-data">
            <label class="form-group__title">
              Наличие СТМ
            </label>
            <div class="form-value">{{ '-' }}</div>
          </div>
          <div class="form-group-data">
            <label class="form-group__title">
              Свободный склад
            </label>
            <div class="form-value">{{ '-' }}</div>
          </div>
        </div>
      </div>
      <div class="form-group form-group_type_secondary">
        <div class="form-group-data">
          <label class="form-group__title">
            Описание
          </label>
          <div class="form-value">
            {{ formattedData.description || "-" }}
          </div>
        </div>
      </div>
      <ModalsRoundBorder :is-open="editPubCardModal" title="Редактирование карточки" @close="editPubCardModal = false" size="lg"
        class="pubcard-edit-modal">
        <UiForm :submit="handleUpdatePubCard()">
          <PerformerRegisterPubCardForm v-model="data" />
          <div class="pubcard-edit-modal__buttons">
            <UiButton class="pubcard-edit-modal__button" type="button" variant="tertiary" size="large">Отмена</UiButton>
            <UiButton class="pubcard-edit-modal__button" type="submit" variant="quinary" size="large">Сохранить
              изменения</UiButton>
          </div>
        </UiForm>
      </ModalsRoundBorder>
    </template>
  </CommonLayoutInfoCard>
</template>

<script setup>
import defaultImage from "~/assets/images/nophoto_pc.png";

const props = defineProps({
  modelValue: {
    type: Object,
    default: () => ({})
  },
  isPreview: {
    type: Boolean,
    default: false
  },
  formattedData: {
    type: Object,
    default: () => ({})
  },

})

const data = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit('update:modelValue', value)
  }
})

const editPubCardModal = ref(false);


const handleUpdatePubCard = () => {
  
}

</script>

<style lang="scss">

.new-service-card-layout{

  .load-image-secondary {
    margin-bottom: 3.2em;
  }

  .tooltip__wrapper {
    width: 20px;
    height: 20px;
    font-size: 1rem;
  }

  &__container {
    max-width: 70%;
  }

  &__location {
    width: 100%;
    .location__btn {
      max-width: 30%;
      color: var(--text-color-ternary);

      @include mobile {
        max-width: 70%;
      }
    }
  }

  &__logo-preview {
    flex: 0 0 30%;
    border: 1px dashed #e1e3f1;
    background-color: #f9f9f9;
    max-width: 32%;
    aspect-ratio: 1 / .7;
    position: relative;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 8px;
    margin-bottom: 2em;
  }

  &__pubcard {
    display: flex;
    column-gap: 3em;

    &-content {
      display: flex;
      flex-direction: column;
      gap: 1.6em;

      h3 {
        font-size: 3.2em;
      }
    }

    &-locations {
      font-size: 1.6em;
      font-weight: 400;

      .flag {
        font-size: 1.75em;
        width: 1em;
        height: 1em;
      }
    }

    &-site {
      display: flex;
      align-items: center;
      gap: .5em;
      font-size: 1.6em;
      font-weight: 300;
      font-family: 'fira-sans', sans-serif;

      svg {
        width: 1.75em;
        height: 1.75em;
      }
    }

    @include mobile {
      h3 {
        font-size: 1.8em;
      }

      &-locations {
        font-size: 1.4em;

        .flag {
          font-size: 1.42em;
          width: 1em;
          height: 1em;
        }
      }

      &-site {
        font-size: 1.4em;

        svg {
          width: 1.42em;
          height: 1.42em;
        }
      }
    }
  }



  &__edit-btn {
    color: var(--text-color-ternary);
    column-gap: .5em;
    line-height: 1em;

    svg {
      width: 2rem;
      height: 2rem;
    }

    @include hover {
      color: var(--text-color-gray);

      svg {
        path {
          fill: var(--text-color-gray);
        }
      }
    }
  }

  @include mobile {
    &__logo-preview {
      max-width: 40%;
      aspect-ratio: 1;
    }
  }
}

.pubcard-edit-modal {
  &__buttons {
    display: flex;
    column-gap: 1em;
    justify-content: flex-end;
  }
  &__button {
    font-size: 1.2em;
    text-transform: uppercase;
  }

  @include mobile {
    &__buttons {
      flex-direction: column;
      gap: 1em;
      box-shadow: 0 -2px 12px 0 rgba(0, 0, 0, 0.02);
      border-top: 1px solid #eff0f5;
      margin-inline: -3em;
      margin-bottom: -2.4em;
      padding: 1.6em;
    }
  }
}

</style>