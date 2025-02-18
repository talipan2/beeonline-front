<template>
  <div class="add-roles" v-if="checkEmptyRole">
    <template v-if="role === 'customer'">
      <h2 class="add-roles__title">Стать исполнителем</h2>
      <p class="add-roles__text">Вы зарегистрированы на портале как заказчик. Если вы также хотите размещать собственные услуги в каталоге, активируйте данную возможность ниже и сохраните изменения. 
        После этого в вашем личном кабинете появится возможность создавать услуги в каталоге для исполнителей от лица своей компании</p>
      <UiButton type="button" variant="tertiary" size="large" class="add-roles__btn" @click="handleCreateRole('performer')">Хочу размещать услуги от лица своей компании</UiButton>
    </template>
    <template v-if="role === 'performer'">
      <h2 class="add-roles__title">Стать заказчиком</h2>
      <p class="add-roles__text">Вы зарегистрированы на портале как исполнитель заказов. Если вы также хотите размещать собственные заказы в каталоге, 
        активируйте данную возможность ниже и сохраните изменения. 
        После этого в вашем личном кабинете появится возможность создавать заказы в каталоге для исполнителей от лица своей компании
      </p>
      <UiButton type="button" variant="tertiary" size="large" class="add-roles__btn" @click="handleCreateRole('customer')">Хочу размещать услуги от лица своей компании</UiButton>
    </template>
  </div>
</template>

<script setup>
import { useUserStore } from '~/store/userStore';


const props = defineProps({
  role: {
    type: String,
    default: '',
  }
})

const userStore = useUserStore();

function handleCreateRole(role) {
  userStore.setUserData({ role: role }, userData.value.id)
  .then(res => {
    userStore.role = role;
    localStorage.setItem('role', role);
    organizationStore.setPubCard({
      id: userStore.userData.organization_id,
      name: userStore.userData.public_cards[0].name,
      status: 1,
      type: role
    })
    userStore.checkAuth()
    router.push({ path: `/desktop` });
  });
}

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