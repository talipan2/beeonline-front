<template>
  <div class="staff staff-create">
    <p class="staff__description">Заполните данные о сотруднике. Его логином будет являться адрес электронной
      почты, на которую придет пароль для доступа в личный кабинет.
    </p>
    <Form @submit="createOrganizationEmployee">
      <StaffContent v-model="staffData"/>
      <div class="form-group staff__buttons">
        <div class="form-group-data">
          <UiButton type="submit" class="form-group-data__btn" variant="quinary" size="large">Создать</UiButton>
        </div>
        <div class="form-group-data">
          <UiButton to="/staff" class="form-group-data__btn" variant="senary" size="large">Вернуться к списку сотрудников</UiButton>
        </div>
      </div>
    </Form>
  </div>
</template>

<script setup>
import { useOrganizationStore } from '~/store/organizationStore';
import { useUserStore } from '~/store/userStore';


const organizationStore = useOrganizationStore();
const userStore = useUserStore();

const staffData = ref({
  name: '',
  email: '',
  phone: '',
  post: '',
  permissions: [],
  notifications: [],
});

const createOrganizationEmployee = () => {
  userStore.createNewUser({
    email: staffData.value.email,
    name: staffData.value.name,
    phone: staffData.value.phone,
    post: staffData.value.post,
    organization_id: userStore.userData.organization_id,
  }).then(res => {
    if(res.data) {
      userStore.changeUserData(res.data.id, {permissions: staffData.value.permissions});
      userStore.setNotification(res.data.id, staffData.value.notifications);
      toast.success('Сотрудник успешно создан');
      router.push({ path: '/staff' });
    }
  })
}

</script>

<style lang="scss">

.staff {

  &__buttons {
    padding-top: 2em;
    border-top: 1px solid var(--border-color-secondary);
  }
}

</style>