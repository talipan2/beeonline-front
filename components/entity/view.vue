<template>
  <section class="view-entity">
    <EntityStatus class="view-entity__status" v-if="data.status" :status="data.status" :type="type" :rejectReason="data.rejectReason"/>
    <div class="view-entity__container">
      <h3 class="view-entity__title">{{ data.name }}</h3>
      <div class="view-entity__props">
        <template v-for="prop in data.props" :key="prop">
          <div class="view-entity__prop" v-if="prop.value">
            <p class="view-entity__prop-name">{{ prop.label }}:</p>
            <p class="view-entity__prop-value" v-if="!Array.isArray(prop.value)">{{ prop.value || 'Не указано' }}</p>
            <p class="view-entity__prop-value" v-else>
              <template v-for="(value, index) in prop.value" :key="index">
                <span>{{ value }}</span>
                <span class="inline-divider" v-if="index !== prop.value.length - 1"> / </span>
              </template>
            </p>
          </div>
        </template>
      </div>
      <div class="form-group view-entity__btn-wrapper">
        <div class="view-entity__btn">
          <UiButton :to="`/performer/services/edit/${data.id}`" variant="senary" size="large" v-if="role === 'performer'">Изменить</UiButton>
          <UiButton :to="`/customer/orders/edit/${data.id}`" variant="senary" size="large" v-if="role === 'customer'">Изменить</UiButton>
        </div>
        <div class="view-entity__view">
          <SvgoViews class="svg-l" fill="#6937a5"/>
          <p class="view-entity__view-value">0</p>
        </div>
      </div>
    </div>
    <div class="view-entity__container" v-if="data.description">
      <h3 class="view-entity__title">Описание</h3>
      <p class="view-entity__prop-value">{{ data.description || 'Не указано' }}</p>
    </div>
    <div class="view-entity__container" v-if="data.conditions">
      <h3 class="view-entity__title">Условия сотрудничества</h3>
      <p class="view-entity__prop-value">{{ data.conditions || 'Не указано' }}</p>
    </div>
    <div class="view-entity__container" v-if="data.gallery &&data.gallery.length > 0">
      <h3 class="view-entity__title">Галерея</h3>
      <CommonGalleryShow :images="data.gallery" />
    </div>
    <div class="view-entity__container" v-if="data.tzFiles && data.tzFiles.length > 0">
      <h3 class="view-entity__title">Технические требования</h3>
      <CommonFileList class="view-entity__files" :data-list="formatDocumentsArray" divider top-divider/>
    </div>
  </section>
</template>

<script setup>

const props = defineProps({
  data: {
    type: Object,
    default: {},
    required: true,
  },
  role: {
    type: String,
    default: '',
    required: true,
  },
  type: {
    type: String,
    default: '',
    validator: value => ['order', 'service'].includes(value),
  }
})

const formatDocumentsArray = computed(() => {
  if(!props.data.tzFiles || props.data.tzFiles.length === 0) return [];
  return props.data.tzFiles.map(item => {
    return {
      name: item.split('/').pop(),
      url: item,
      type: item.split('.').pop()
    }
  })
})

</script>

<style lang="scss">

.view-entity {
  max-width: 90%;
  &__container {
    margin-bottom: 5rem;
  }

  &__status {
    margin-bottom: 2em;
  }

  &__title {
    font-size: 2.4rem;
    margin-bottom: .83em;

    @include mobile {
      font-size: 1.6rem;
    }
  }

  &__props {
    margin-bottom: 2rem;
    display: flex;
    flex-direction: column;
  }

  &__prop {
    font-size: 1.6rem;
    display: inline-block;
    column-gap: 0.625em;
    margin-bottom: 0.625em;
  }

  &__prop-name {
    display: inline;
  }

  &__prop-value {
    display: inline;
    font-size: 1.6rem;
    margin-left: .5em;
  }

  &__btn {
    font-size: 1.2rem;
    text-transform: uppercase;
  }

  &__view {
    display: flex;
    align-items: center;
    font-size: 1.6rem;
  }

  &__files {
    .file__icon {
      flex: auto;
    }
  }

  @include tablet {
    max-width: 100%;
  }

  @include mobile {
    &__btn-wrapper {
      flex-direction: row;
    }

    &__prop-name {
      font-size: 1.4rem;
    }

    &__prop-value {
      font-size: 1.4rem;
    }

    &__btn {
      width: 40%;
    }
  }
}

</style>