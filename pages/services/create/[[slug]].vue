<template>
  <NuxtLayout name="create" >
    <template #left>
      <CommonCheckList 
        class="sticky" 
        title="Создание услуги" 
        adviceTitle="Для публикации услуги нужно заполнить достаточно информации об услуге" 
        :check-list="checkList" 
      />
    </template>
    <template #content>
      <component :is="currentComponent" :title="title" role="performer"/>
    </template>
    <template #right>
      <div class="h4">Предварительный просмотр услуги</div>
      <CreateEntityPreview :data="servicesData"/>
    </template>
  </NuxtLayout>
</template>

<script setup>
import Step1 from '~/components/createEntity/step1.vue';
import Step2 from '~/components/createEntity/step2.vue';
import Step3 from '~/components/createEntity/step3.vue';
import Step4 from '~/components/createEntity/step4.vue';

const router = useRouter();
const title = ref('');

const currentComponent = computed(() => {
  switch (router.currentRoute.value.params.slug) {
    case 'step1':
      title.value = 'Создание услуги';
      return Step1
    case 'step2':
      title.value = 'Подробное описание';
      return Step2
    case 'step3':
      title.value = 'Подробное описание';
      return Step3
    case 'step4':
      title.value = 'Подробное описание';
      return Step4
    default:
      title.value = 'Создание услуги';
      return Step1;
  }
})

const checkList = computed(() => [
  { label: 'Что нужно сделать', path: '/services/create/step1' },
  { label: 'Подробное описание', path: '/services/create/step2' },
  { label: 'География', path: '/services/create/step3' },
  { label: 'Проверка', path: '/services/create/step4' },
]);

const servicesData = computed(() => ({
  name: '',
  logo: '',
  data: [
    {id: 1, name: 'Категории', value: []},
    {id: 2, name: 'Место производства', value: []},
    {id: 3, name: 'Мин. партия', value: []},
    {id: 4, name: 'Наличие СТМ', value: null},
    {id: 5, name: 'Бесплатные тестовые образцы', value: null},
    {id: 6, name: 'Сырье', value: []},
    {id: 7, name: 'Описание', value: ''},
  ],
}))


</script>