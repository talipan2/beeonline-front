<template>
  <div class="documentation">
    <CommonNotify v-if="!organizationVerified"
      title="Организация не прошла верификацию." 
      text="Пожалуйста, загрузите документы для прохождения верификации." 
      type="danger"
      :btnFunction="notifyAction"
      btnText="Добавить документы для верификации"
    />
    <div class="documentation__content">
      <h2 class="documentation__title">Файлы организации</h2>
      <div class="documentation__list" v-if="dataList.length">
        <CommonFileList :dataList="dataList" />
      </div>
      <p v-else class="documentation__text">Файлы не загружены</p>
      <UiButton v-if="!dataList.length" to="/documentation/custom/create" class="documentation__btn" variant="quinary" size="around">Загрузить</UiButton>
      <UiButton v-else to="/documentation/custom/create" class="documentation__btn" variant="quinary" size="around">Изменить</UiButton>
    </div>
  </div>
</template>

<script setup>
import { useUserStore } from '~/store/userStore';


const props = defineProps({
  dataList: {
    type: Array,
    default: [],
  }
})

const userStore = useUserStore();
const organizationVerified = computed(() => userStore.userOrganization.verified_at)

const router = useRouter();

const notifyAction = () => {
  router.push(`/${userStore.role}/documentation/custom/create`)
}

</script>

<style lang="scss">

.documentation {
  font-size: 1rem;

  @include mobile {
    margin-bottom: 10rem;
  }

  &__title {
    font-size: 2.8em;
    margin-bottom: .89em;

    @include mobile {
      font-size: 1.8rem;
    }
  }

  &__text {
    font-size: 1.6em;
    margin-bottom: 1.5em;
  }

  &__btn {
    width: fit-content;
    text-transform: uppercase;
    padding: 1em;

    @include mobile {
      font-size: 1.2rem;
    }
  }
}

</style>