<template>
  <div class="add-roles" v-if="checkEmptyRole">
    <template v-if="role === 'customer'">
      <h2 class="add-roles__title">Стать производителем</h2>
      <p class="add-roles__text">Вы зарегистрированы на портале как заказчик. Если вы также хотите размещать собственные услуги в каталоге, активируйте данную возможность ниже и сохраните изменения. 
        После этого в вашем личном кабинете появится возможность создавать услуги в каталоге для производителей от лица своей компании</p>
      <UiButton type="button" variant="tertiary" size="large" class="add-roles__btn" @click="handleCreateRole('performer')">Хочу размещать услуги от лица своей компании</UiButton>
    </template>
    <template v-if="role === 'performer'">
      <h2 class="add-roles__title">Стать заказчиком</h2>
      <p class="add-roles__text">Вы зарегистрированы на портале как производитель заказов. Если вы также хотите размещать собственные заказы в каталоге, 
        активируйте данную возможность ниже и сохраните изменения. 
        После этого в вашем личном кабинете появится возможность создавать заказы в каталоге для производителей от лица своей компании
      </p>
      <UiButton type="button" variant="tertiary" size="large" class="add-roles__btn" @click="handleCreateRole('customer')">Хочу размещать услуги от лица своей компании</UiButton>
    </template>
  </div>
</template>

<script setup>
import { useOrganizationStore } from '~/store/organizationStore';
import { useUserStore } from '~/store/userStore';
import { useToast } from 'vue-toastification';


const props = defineProps({
  role: {
    type: String,
    default: '',
  }
})
const toast = useToast();

const userStore = useUserStore();
const organizationStore = useOrganizationStore();
const router = useRouter();

function handleCreateRole(role) {
  if(!userStore.userData?.id) return
  userStore.setUserData({ role: role }, userStore.userData.id)
  .then(res => {
    organizationStore.setPubCard({
      id: userStore.userData.organization_id,
      name: userStore.userData.public_cards[0].name,
      status: 1,
      type: role
    }).then(res => {
      userStore.role = role;
      localStorage.setItem('role', role);
      userStore.checkAuth()
      router.push({ path: `/desktop` });
      toast.success('Вы успешно стали ' + formatLangRole.value);
    })
  });
}

const formatLangRole = computed(() => {
  switch (userStore.role) {
    case 'customer':
      return 'заказчиком'
    case 'performer': 
      return 'производителем'
    default:
      return ''
  }
})

const checkEmptyRole = computed(() => {
  switch (userStore.role) {
    case 'customer':
      if(userStore.userData.roles && !userStore.userData.roles.includes('performer')) return true
      break;
    case 'performer': 
      if(userStore.userData.roles && !userStore.userData.roles.includes('customer')) return true
      break;
    default:
      return false
  }
  
})

</script>