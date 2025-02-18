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
import { useSettingStore } from '~/store/settingStore';
import { useUserStore } from '~/store/userStore';

useHead({
  title: 'Создание услуги',
  meta: [
    {
      name: 'description',
      content: '',
    },
  ],
});

const router = useRouter();
const organizationStore = useOrganizationStore();
const settingStore = useSettingStore();
const userStore = useUserStore();
const entityStore = useEntityStore();
const locationStore = useLocationStore();

const service = ref(entityStore.service)
const title = ref('');
const validSteps = ['step1', 'step2', 'step3', 'step4'];

// onBeforeMount(() => {
//   if (!validSteps.includes(router.currentRoute.value.params.slug)) {
//     router.replace({ name: 'services-create-slug', params: { slug: 'step1' } });
//   }
// })


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
  logo: service.value.gallery && service.value.gallery.length ? service.value.gallery[0].url : '',
  countryId: data.value.locations && data.value.locations.length ? data.value.locations[0].countryId : null,
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
  logo: service.value.gallery && service.value.gallery.length ? service.value.gallery[0] : {id: null, url: ''},
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
      return ((values, form) => {
        if(!service.value.id) {
          entityStore.addNewService(
            {
              userId: userStore.userData.id,
              organizationId: userStore.userData.organization_id, 
              name: service.value.name,
              categories: service.value.categories,
              status: 'filling',
            }, form
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
            categories: service.value.categories,
          }, form).then(() => router.push('/services/create/step2'))
          .catch(error =>  console.log(error));
        }
      });
    case 'step2':
      return ((values, form) =>{
          entityStore.editService(service.value.id, {
            description: service.value.description,
            rawMaterials: service.value.rawMaterials,
            availabilityStm: service.value.availabilityStm,
            freeTestSamples: service.value.freeTestSamples,
            minLot: service.value.minLot,
            termsOfCooperation: service.value.termsOfCooperation,
          }, form).then(() => {
            entityStore.updateServiceStep(service.value.id, 2)
            entityStore.fillingService.currentStep = 2
            router.push('/services/create/step3')
          })
          .catch(error => console.log(error));

          // if(service.value.logo && service.value.logo.id) {
          //   entityStore.uploadServiceLogo(service.value.id, service.value.logo.id)
          // }

          if(service.value.gallery && service.value.gallery.length) {
            const galleryIds = service.value.gallery.map(item => item.id)
            entityStore.uploadServiceGallery(service.value.id, galleryIds)
          }

          if(service.value.tzFiles && service.value.tzFiles.length) {
            const tzFilesIds = service.value.tzFiles.map(item => item.id)
            entityStore.uploadServiceFiles(service.value.id, tzFilesIds)
          }
        });
    case 'step3':
      return ((values, form) => {
        if(service.value.locations && service.value.locations.cities) {
          entityStore.editService(service.value.id, {
            cities: service.value.locations.cities
          }, form).then(() => {
            entityStore.updateServiceStep(service.value.id, 3)
            router.push('/services/create/step4')
          })
          .catch(error => console.log(error));
        }
      });
    case 'step4':
      return ((values, form) => {
        entityStore.editService(service.value.id, {
          status: 'active'
        }, form).then(() => {
          entityStore.fillingService = null
          router.push(`/performer/services/show/${service.value.id}`)
          settingStore.createEntityFinalModal = true
        })
        .catch(error => console.log(error));
        entityStore.resetService()
      });
  }
})

const handleSubmit = (values, form) => {
  currentHandleSubmit.value(values, form);
  entityStore.isRedirectedToStep = false
}

// функция для редиректа на текущий шаг
const handleRedirect = () => {
  if (!entityStore.isRedirectedToStep) return;

  const currentStep = entityStore.fillingService?.currentStep || 0;

  switch (currentStep) {
    case 0:
      router.push('/services/create/step1');
      break;
    case 1:
      router.push('/services/create/step2');
      break;
    case 2:
      router.push('/services/create/step3');
      break;
    case 3:
      router.push('/services/create/step4');
      break;
  }

  entityStore.isRedirectedToStep = false;
};

onBeforeMount(async () => {
  // Если данных о текущей услуге нет, загружаем их
  if (!entityStore.fillingService && !entityStore.fillingService?.id) {
    await entityStore.getOrganizationServices(userStore.userData.organization_id).then((res) => {
      if (res?.data?.services && Array.isArray(res.data.services)) {
        const serviceInProgress = res.data.services.find((item) => item.status === 'filling');
        if (serviceInProgress) {
          entityStore.fillingService = {
            id: serviceInProgress.id,
            name: serviceInProgress.name,
            categories: serviceInProgress.product_categories.map((item) => item.id),
            gallery: serviceInProgress.gallery || [],
            logo: serviceInProgress.gallery?.length
              ? serviceInProgress.gallery[0]
              : { url: null, id: null },
            description: serviceInProgress.description,
            rawMaterials: [
              serviceInProgress.materials_own ? 1 : '',
              serviceInProgress.materials_tolling ? 0 : '',
            ].filter(item => item !== ''),
            locations: {
              cities: serviceInProgress.cities && Array.isArray(serviceInProgress.cities) ? serviceInProgress.cities.map(item => item.id) : [],
              regions: serviceInProgress.regions && Array.isArray(serviceInProgress.regions) ? serviceInProgress.regions.map(item => item.id) : [],
            },
            availabilityStm: serviceInProgress.is_stm !== null ? Number(serviceInProgress.is_stm) : null,
            freeTestSamples: serviceInProgress.free_samples !== null ? Number(serviceInProgress.free_samples) : null,
            minLot: serviceInProgress.batches && Array.isArray(serviceInProgress.batches) ? serviceInProgress.batches.map(item => item.id) : [],
            termsOfCooperation: serviceInProgress.conditions,
            currentStep: serviceInProgress.current_step,
            tzFiles: serviceInProgress.tz_files || [],
          };
          console.log('запись с апи')
          service.value = entityStore.fillingService;
        }
      }
    });
  }

  if (entityStore.fillingService && entityStore.fillingService.id) {
    service.value = entityStore.fillingService;
  }

  handleRedirect();
});

</script>