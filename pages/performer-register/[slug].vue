<template>
  <NuxtLayout name="performer-register" title="Регистрация исполнителя" class="performer-register-layout">
    <template #leftSide>
      <CommonCheckListStep
      class="performer-register-layout__steps"
      :steps="stepsConfig"
      :current-step="currentStep"
      :completed-steps="completedSteps"
      />
    </template>
    <template #content>
      <h1 class="performer-register-layout__title">Регистрация исполнителя</h1>
      <component :is="stepsConfig[currentStep].component" v-model="data"/>
    </template>
    <template #rightSide>
      <CommonNotify text="текст уведомления" type="info" />
    </template>
  </NuxtLayout>
</template>

<script setup>
import step1 from '~/components/performerRegister/step1.vue'

const stepsConfig = [
  { id: 1, title: 'Карточка', route: '/step1', component: step1 },
  { id: 2, title: 'Актуальные услуги', route: '/step2' },
  { id: 3, title: 'О компании', route: '/step3' },
  { id: 4, title: 'Примеры работ', route: '/step4' },
  { id: 5, title: 'Фабрика и оборудование', route: '/step5' }
]

const route = useRoute();

const data = ref({
  logo: {
    url: 'https://i.pinimg.com/736x/59/54/f8/5954f8ba91c1c2a0ee09346a29c2c6e4.jpg'
  }
})


const currentStep = computed(() => stepsConfig.findIndex(step => route.path.includes(step.route))) // Текущий активный шаг
const completedSteps = ref([0, 1]) // Завершенные шаги

</script>

<style lang="scss">

.performer-register-layout {
  font-size: 1rem;

  &__steps {
    margin-top: 6.4em;
  }

  &__title {
    font-size: 3.2em;
    font-weight: 400;
    line-height: 0.75em;
    color: #000;
    margin-bottom: 1.15em;
  }
}

</style>