<template>
  <div class="checklist">
    <div class="checklist__header">
      <div class="checklist__header-left">
        <div class="checklist__head">
          <div class="checklist__title">{{ title }}</div>
          <div class="checklist__status">низкое</div>
        </div>
        <div class="checklist__progress" :class="progressClass">
          <div v-for="(step, index) in progressSteps" :key="index" 
          :class="[
          'checklist__progress-step', { active: index < progressLevel },
          ]"
          ></div>
        </div>
      </div>
    </div>
    <CommonAdvice class="checklist__advice">
      <p class="advice__text">{{ adviceTitle }}</p>
    </CommonAdvice>
    <div class="checklist__collapse" v-if="valueCheck">
      <ul class="checklist__steps">
        <div class="divider" v-if="type === 'checkValue'"></div>
        <!-- checkValue -->
        <template v-if="type === 'checkValue'">
          <li  v-for="(step, index) in checkList" :key="index" :class="[
            'checklist__step',
            'checklist__chapter',
            {
              'checklist__step_current': step.value == 'chapter-current',
              'checklist__step_passed': step.value !== null || step.value !== '',
            }
          ]">
            {{ step.label }}
            <ul class="checklist__substeps" >
              <li v-for="(subStep, index) in step.checkList" :key="index" :class="[
                'checklist__step',
                'checklist__substep',
                {
                  'checklist__step_passed': subStep.value !== null || subStep.value !== '',
                  'checklist__step_crossed': subStep.value == null || subStep.value == '',
                }]"
              >
                {{ subStep.label }}
              </li>
            </ul> 
          </li>
        </template>
        <!-- checkStage -->
        <template v-if="type === 'checkStage'">
          <li  v-for="(step, index) in checkList" :key="index" :class="[
            'checklist__step',
            {
              'checklist__step_current': step.value === currentStep,
              'checklist__step_passed': isStepPassed(step.value),
            }
          ]">
            {{ step.label }}
          </li>
        </template>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { useOrganizationStore } from '~/store/organizationStore';

const props = defineProps({
  title: {
    type: String,
    default: '',
  },
  adviceTitle: {
    type: String,
    default: '',
    required: true,
  },
  checkList: {
    type: Array,
    default: () => [],
    required: true,
  },
  valueCheck: {
    type: Boolean,
    default: false,
  },
  type: {
    type: String,
    default: 'checkValue',
    validator: value => ['checkValue', 'checkStage'].includes(value),
  },
})

const route = useRoute();
const router = useRouter();
const organizationStore = useOrganizationStore();

const steps = computed(() => props.checkList);

const progressLevel = computed(() => {
  if (nullPercentage.value <= 10) return '5';
  if (nullPercentage.value <= 20) return '4';
  if (nullPercentage.value <= 30) return '3';
  if (nullPercentage.value <= 60) return '2';
  if (nullPercentage.value <= 99) return '1';

  return '';
});



const progressSteps = [1, 2, 3, 4, 5]; 

const progressClass = computed(() => {
  if (nullPercentage.value <= 20) return 'checklist_100';
  if (nullPercentage.value <= 30) return 'checklist_80';
  if (nullPercentage.value <= 60) return 'checklist_50';
  return '';
});
const currentStep = ref(null);

onMounted(() => {
  if(process.client) {
    currentStep.value = router.currentRoute.value.path;
  }
})

const isStepPassed = (stepPath) => {
  return steps.value.findIndex(step => step.value === stepPath) < steps.value.findIndex(step => step.value === route.path);
};


const nullPercentage = computed(() => {
  const registerOrg = organizationStore.registerOrg;
  const totalFields = Object.keys(registerOrg).length;
  const nullCount = Object.values(registerOrg).filter(value => value === null || value === '' || (Array.isArray(value) && value.length === 0)).length;
  return parseInt((nullCount / totalFields) * 100);
});

</script>

<style lang="scss">

.checklist {
    height: fit-content;
}

.checklist__header {
  display: flex;
}

.checklist__header-left {
    flex: 1 1 auto;
}

.checklist__header-right {
    display: flex;
    flex: 0 1 auto;
    margin-bottom: 5px;
    margin-left: 2em;
}

.checklist__toggle {
    margin-top: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 3em;
    height: 3em;
    color: #6937a5;
    background-color: #FFF;
    border: 1px solid #6937a5;
    text-decoration: none;
    border-radius: 3em;
}

.checklist__toggle:hover {
    color: #6937a5;
    text-decoration: none;
}

.checklist__toggle i {
    transform: rotate(-90deg);
    transition: transform .2s ease-in-out;
}

.checklist__toggle.active i {
    transform: rotate(90deg);
}

.checklist__head {
    display: flex;
    align-items: center;
}

.checklist__title {
    font-size: 1.6em;
    margin-right: .5em;
}

.checklist__status {
    font-size: 1.2em;
    color: #EF3520;
    margin-left: auto;
}

.checklist_50 .checklist__status {
    color: #FBBC05;
}

.checklist_80 .checklist__status {
    color: #BCBF2F;
}

.checklist_100 .checklist__status {
    color: #6DBF2F;
}


.checklist__progress {
    display: flex;
    margin: 1em -.3em 2em;
}

.checklist__progress > div {
    flex-basis: 0;
    flex-grow: 1;
    max-width: 100%;
    padding: 0 .3em;
}

.checklist__progress > div:before {
    content: "";
    display: block;
    background-color: #D9D9D9;
    height: .8em;
}

.checklist__progress > div.active:before {
    background-color: #EF3520;
}

.checklist_50 > div.active:before {
    background-color: #FBBC05;
}

.checklist_80 > div.active:before {
    background-color: #BCBF2F;
}

.checklist_100 > div.active:before {
    background-color: #6DBF2F;
}

.checklist__advice {
  font-size: 1em;
}

.checklist__steps {
    font-size: 1.6em;
    list-style: none;
    padding: 0 0 1px;
    margin: 0;
    margin-top: 1.875em;
    font-weight: 400;
}

.checklist__substeps {
  margin-left: -1.875em;
  color: var(--text-color-primary);

  &:first-child {
    margin-top: .75em;
  }
}

.checklist__step {
    padding-left: 1.875em;
    position: relative;
    margin-bottom: .75em;
    line-height: 1em;
}

.checklist__step_title {
    font-weight: 500;
}

.checklist__step:before {
    content: "";
    position: absolute;
    font-size: 1.25em;
    top: -.1em;
    left: 0;
    width: 1em; height: 1em;
    background: no-repeat center/contain;
}

.checklist__step_passed:before {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' fill='none'%3E%3Cpath d='M16 5.334l-7.119 8L4 8.593' stroke='%236dbf2f' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
}

.checklist__step_current:before {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' fill='%23d52b1e'%3E%3Ccircle cx='5' cy='10' r='1'/%3E%3Ccircle cx='15' cy='10' r='1'/%3E%3Ccircle cx='10' cy='10' r='1'/%3E%3C/svg%3E");
}

.checklist__step_crossed:before {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' fill='none'%3E%3Cpath d='M5 5L15 15M5 15L15 5' stroke='%23de5434' stroke-width='2' stroke-linecap='round'/%3E%3C/svg%3E%0A");
}

.checklist__chapter {
  padding-bottom: 1rem;
  color: var(--primary-color);

  &:not(:last-child) {
    border-bottom: 1px solid #D9D9D9;
  }
}

@media (min-width: 768px) {
    .checklist__header-right {
        display: none;
    }
}

@media (max-width: 767px) {
    .checklist__collapse {
        display: none;
    }
}
</style>