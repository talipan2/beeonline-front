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
      <component :is="currentComponent" :title="title" role="performer" :formatData="data" :data="service" :handleSubmit="handleSubmit"/>
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
import { useEntityStore } from '~/store/entityStore';
import { useLocationStore } from '~/store/locationStore';
import { useOrganizationStore } from '~/store/organizationStore';
import { useUserStore } from '~/store/userStore';

const router = useRouter();
const organizationStore = useOrganizationStore();
const userStore = useUserStore();
const entityStore = useEntityStore();
const locationStore = useLocationStore();

const service = ref(entityStore.service)
const title = ref('');
const validSteps = ['step1', 'step2', 'step3', 'step4'];

onBeforeMount(() => {
  if (!validSteps.includes(router.currentRoute.value.params.slug)) {
    router.replace({ name: 'services-create-slug', params: { slug: 'step1' } });
  }
})


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
  }
})

const checkList = [
  { label: 'Что нужно сделать', value: '/services/create/step1' },
  { label: 'Подробное описание', value: '/services/create/step2' },
  { label: 'География', value: '/services/create/step3' },
  { label: 'Проверка', value: '/services/create/step4' },
];

const servicesData = computed(() => ({
  name: data.value.name,
  logo: data.value.logo,
  locationsData: data.value.locations,
  data: [
    {id: 1, name: 'Категории', value: data.value.categories},
    {id: 2, name: 'Место производства', value: data.value.locations.map(item => item.name)},
    {id: 3, name: 'Мин. партия', value: data.value.minLot},
    {id: 4, name: 'Наличие СТМ', value: data.value.availabilityStm},
    {id: 5, name: 'Бесплатные тестовые образцы', value: data.value.freeTestSamples},
    {id: 6, name: 'Сырье', value: data.value.rawMaterials},
    {id: 7, name: 'Описание', value: data.value.description},
  ],
}))

const data = computed(() => ({
  name: service.value.name,
  logo: service.value.logo,
  categories: entityStore.getEntityLabelById('categories', service.value.categories),
  locations: locationStore.getLocationsByIds([], service.value.locations?.regions, service.value.locations?.cities),
  availabilityStm: entityStore.getEntityLabelById('availabilityStm', service.value.availabilityStm),
  freeTestSamples: entityStore.getEntityLabelById('freeTestSamples', service.value.freeTestSamples),
  minLot: entityStore.getEntityLabelById('minLot', service.value.minLot),
  rawMaterials: entityStore.getEntityLabelById('rawMaterials', service.value.rawMaterials),
  description: service.value.description,
  termsOfCooperation: service.value.termsOfCooperation
}))

const currentHandleSubmit = computed(() => {
  switch (router.currentRoute.value.params.slug) {
    case 'step1':
      return (() => {
        if(!service.value.id) {
          entityStore.addNewService(
            {
              userId: userStore.userData.id,
              organizationId: userStore.userData.organization_id, 
              name: service.value.name, 
              category: service.categories,
              status: 'filling',
            }
          ).then((res) => {
            if(res && res.id) {
              entityStore.updateServiceStep(res.id, 1)
              router.push('/services/create/step2')
            }
          })
          .catch(error => console.log(error));
        } else {
          entityStore.editService(service.value.id, {
            name: service.value.name,
            category: service.value.categories,
          }).then(() => router.push('/services/create/step2'))
          .catch(error =>  console.log(error));
        }
      });
    case 'step2':
      return (() =>{
          entityStore.editService(service.value.id, {
            description: service.value.description,
            rawMaterials: service.value.rawMaterials,
            availabilityStm: service.value.availabilityStm,
            freeTestSamples: service.value.freeTestSamples,
            minLot: service.value.minLot,
            termsOfCooperation: service.value.termsOfCooperation,
            step: 2
          }).then(() => {
            entityStore.updateServiceStep(service.value.id, 2)
            router.push('/services/create/step3')
          })
          .catch(error => console.log(error));

          entityStore.updateServiceStep(service.value.id, 2);
        });
    case 'step3':
      return (() => {
        if(service.value.locations && service.value.locations.cities) {
          entityStore.editService(service.value.id, {
            cities: service.value.locations.cities
          }).then(() => {
            entityStore.updateServiceStep(service.value.id, 3)
            router.push('/services/create/step4')
          })
          .catch(error => console.log(error));
        }
      });
    case 'step4':
      return (() => {
        entityStore.editService(service.value.id, {
          status: 'active'
        }).then(() => {
          entityStore.fillingService = null
          router.push('/performer/services')
        })
        .catch(error => console.log(error));
        entityStore.resetService()
      });
  }
})

const handleSubmit = () => {
  currentHandleSubmit.value();
}

onBeforeMount(() => {
  if(!entityStore.fillingService && !entityStore.fillingService?.id) {
    entityStore.getOrganizationServices(userStore.userData.organization_id)
    .then((res) => {
      if(res && res.data && res.data.services && Array.isArray(res.data.services)) {
        res.data.services.find(item => {
          if(item.status === 'filling') {
            entityStore.fillingService = {
              id: item.id,
              name: item.name,
              categories: [],
              gallery: item.gallery || [],
              logo: item.gallery || [],
              description: item.description,
              rawMaterials: [item.materials_own ? 5 : '', item.materials_tolling ? 6 : ''].filter(Boolean) || [],
              locations: {
                cities: item.cities || [],
                regions: item.regions || []
              },
              availabilityStm: item.is_stm,
              freeTestSamples: item.free_samples,
              minLot: item.minLot || [],
              termsOfCooperation: item.conditions,
              currentStep: item.current_step,
            }
            service.value = {...entityStore.fillingService}
          }
        })
      }
    })
  } else {
    service.value = {...entityStore.fillingService}
  }
})

onMounted(() => {
  if(!entityStore.isRedirectedToStep) return
  if(entityStore.fillingService && entityStore.fillingService.currentStep && entityStore.fillingService.currentStep === 1) {
    router.push('/services/create/step2')
    entityStore.isRedirectedToStep = false;
  }
  if(entityStore.fillingService && entityStore.fillingService.currentStep && entityStore.fillingService.currentStep === 2) {
    router.push('/services/create/step3')
    entityStore.isRedirectedToStep = false;
  }
  if(entityStore.fillingService && entityStore.fillingService.currentStep && entityStore.fillingService.currentStep === 3) {
    router.push('/services/create/step4')
    entityStore.isRedirectedToStep = false;
  }
})

</script>