<template>
  <div class="details-badge" :style="{ gridColumn: gridColumn }">
    <div class="details-badge__container" :class="{ 'details-badge__container_single': !Array.isArray(specs) }">
      <div v-for="(spec, index) in normalizedSpecs" :key="index" class="details-badge__item">
        <p class="details-badge__name">{{ spec.name }}</p>
        <template v-if="moreBtn">
          <p class="details-badge__value">
            {{ spec.value && spec.value.length > 0 ? spec.value[0] : '-' }}
            <ModalsMoreCities
              class="details-badge__more-props"
              :list="spec.value"
              v-if="spec.value && spec.value.length > 1"
              :title="spec.name"
            />
          </p>
        </template>
        <template v-else>
          <p class="details-badge__value" :class="{ 'details-badge__value_type_hidden': lineLimit }">
            <a
              v-if="isUrl(spec.value)"
              :href="ensureHttps(spec.value)"
              target="_blank"
              rel="noopener noreferrer"
              class="details-badge__link"
            >
              {{ spec.value }}
            </a>
            <template v-else>{{ spec.value || '-' }}</template>
          </p>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ensureHttps } from '~/utils/ensureHttps'

function isUrl(value) {
  if (!value || typeof value !== 'string') return false
  return /^(https?:\/\/|www\.)/i.test(value.trim())
}

const props = defineProps({
  specs: {
    type: [Array, Object],
    required: true
  },
  lineLimit: {
    type: Boolean,
    default: true
  },
  moreBtn: {
    type: Boolean,
    default: false
  },
  gridColumn: {
    type: String,
    default: ''
  },
})

const normalizedSpecs = computed(() =>
  Array.isArray(props.specs) ? props.specs : [props.specs]
)
</script>


<style lang="scss">

.details-badge {
  font-size: 1rem;
  padding: 1.2em 2em;
  background-color: var(--bg-secondary-color);
  border-radius: 8px;


  &__container {
    display: flex;
    column-gap: 5em;

    &_single {
      .details-badge__item {
        max-width: 100%;
      }
    }

    @include mobile {
      flex-direction: column;
      row-gap: .5em;
    }
  }

  &__item {
    display: flex;
    flex-direction: column;
    row-gap: .5em;
    max-width: 34.7em;
    width: 100%;
  }

  &__name {
    font-size: 1.8em;
    line-height: 1.3em;
    color: var(--text-color-gray);
    font-weight: 400;
  }

  &__value {
    font-size: 2em;
    font-weight: 600;
    line-height: 1.2em;
    color: var(--text-color-monodecimal);


    a {
      color: var(--primary-color, #1a73e8);
      text-decoration: none;
      word-break: break-all;

      &:hover {
        text-decoration: underline;
      }
    }

    &_type_hidden {
      display: -webkit-box !important;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
      overflow-wrap: anywhere;

      @include mobile {
        overflow: visible;
        text-overflow: unset;
        -webkit-line-clamp: unset;
        -webkit-box-orient: unset;
        display: block;
      }
    }
  }
}

</style>
