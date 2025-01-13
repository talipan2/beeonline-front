<template>
  <div class="pub-card">
      <component :is="currentComponent" blockTitle="" :title="title" description="" v-model="data" :submitFunc="handleSubmit">
        <div class="form-group">
          <div class="form-group-data">
            <UiButton type="button" class="form-group-data__btn" variant="senary" size="large" v-if="currentStep !== 1"
              @click="prevStep">Назад</UiButton>
          </div>
          <div class="form-group-data">
            <UiButton v-if="currentStep < 5" type="submit" class="form-group-data__btn" variant="quinary" size="large"
              >Далее
              <SvgoBtnArrow class="svg-lx" />
            </UiButton>
            <UiButton v-if="currentStep >= 5" type="submit" class="form-group-data__btn"
              variant="quinary" size="large">Отправить на проверку
              <SvgoBtnArrow class="svg-lx" />
            </UiButton>
          </div>
        </div>
      </component>
  </div>
</template>

<script setup>
import { useOrganizationStore } from '~/store/organizationStore';
import Step1 from '~/components/register/step2.vue';
import Step2 from '~/components/register/step3.vue';
import Gallery from '~/components/common/gallery.vue';
import trademarksAndExhibition from '~/components/common/trademarksAndExhibition.vue';
import addSocials from '~/components/common/addSocials.vue';
import { useUserStore } from '~/store/userStore';

const router = useRouter();
const organizationStore = useOrganizationStore();
const userStore = useUserStore();
const currentStep = ref(1);
const title = ref('');

const data = ref({
  id: null,
  companyName: '',
  description: '',
  companyLogo: null,
  cities: null,
  regions: null,
  gallery: [],
  urlSite: null,
  urlTg: null,
  urlVk: null,
  urlYt: null,
  videos: [],
})

const currentComponent = computed(() => {
  switch (currentStep.value) {
    case 1:
      title.value = 'Основные данные компании';
      return Step1
    case 2:
      title.value = 'Города фактического производства (по-умолчанию)*';
      return Step2
    case 3:
      return Gallery
    case 4:
    if (userStore.role === 'customer') {
        return addSocials;
    }
     return trademarksAndExhibition
    case 5: 
     return addSocials
    default:
      return Step1;
  }
})

const nextStep = () => {
  if (currentStep.value < 5) {
    if (currentStep.value === 3 && userStore.role === 'customer') {
      currentStep.value += 2;
    } else {
      currentStep.value++;
    }
  }
}

const prevStep = () => {
  if (currentStep.value > 1) {
    if (currentStep.value === 5 && userStore.role === 'customer') {
      currentStep.value -= 2;
    } else {
      currentStep.value--;
    }
  }
}


async function handleSubmit() {

  if (currentStep.value < 5) {
    if (currentStep.value === 3 && userStore.role === 'customer') {
      currentStep.value += 2;
    } else {
      currentStep.value++;
    }
  } else {
    organizationStore.editPubCards({
      id: data.value.id,
      name: data.value.companyName,
      description: data.value.description,
      cities: data.value.locations.cities,
      regions: data.value.locations.regions,
      url_site: data.value.siteUrl,
      url_tg: data.value.urlTg,
      url_vk:data.value.urlVk,
      url_yt: data.value.urlYt,
      videos: data.value.videos
    });
    if(data.value.companyLogo && data.value.companyLogo.data) {
      organizationStore.setPubCardLogo(data.value.id, data.value.companyLogo.data)
    }
    router.push(`/${userStore.role}/desktop`);
  }
}

const handleUpdateData = (data) => {
  data.value = data
}

onMounted(() => {
  organizationStore.getPubCard(router.currentRoute.value.params.id)
    .then(res => {
      if (res) {
        data.value.id = res.id;
        data.value.companyName = res.name;
        data.value.description = res.description;
        data.value.siteUrl = res.url_site;
        data.value.urlTg = res.url_tg;
        data.value.urlVk = res.url_vk;
        data.value.urlYt = res.url_yt;
        data.value.companyLogo = res.logo;
        data.value.locations = { regions: res.regions.map(region => region.id), cities: res.cities.map(city => city.id) };
        data.value.gallery = res.gallery;
        data.value.videos = res.videos;
      }
    })
    .catch(err => console.log(err))
})

</script>

<style lang="scss">

.pub-card {
  max-width: 60%;

  &__title {
    margin-block: 1.25em .78em;
  }
  
  &__main {
    display: flex;
    column-gap: 3em;
  }

  &__image {
    flex: 0 0 22%;
  }

  &__main-data {
    flex: 1 1 75%;
  }

  &__description-input {
    input {
      height: 15em;
    }
  }

  &__location {
    max-width: 69%;
  }

  &__block-title {
    font-size: 2.3em;
    margin-block: 1.25em .83em;
  }

  &__location-description {
    font-size: 1.3em;
    line-height: 1.46em;
    margin-bottom: 1.53em;
  }

  &__gallery-link-add {
    display: flex;
    column-gap: 1em;
    max-width: 48%;
    align-items: center;
  }

  &__gallery-description {
    font-size: 1.6em;
    line-height: 1.5em;
    margin-bottom: 1.5em;
  }

  &__gallery-link {
    flex: 1 1 100%;
  }

  &__gallery-label {
    color: var(--text-color-secondary);
    font-size: 1.3em;
    line-height: 2em;

  }
}

.tada {
  color: var(--text-color-success);
}

@include mobile {
  .pub-card {
    max-width: 100%;
  }
}

</style>