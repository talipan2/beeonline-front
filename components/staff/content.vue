<template>
  <div class="staff-content">
    <div class="form-group">
      <div class="form-group-data">
        <label class="form-group__title">
          Ф.И.О
          <UiInput
            name="name"
            type="text"
            placeholder=""
            class="form-group__value"
            v-model="modelValue.name"
            :rules="{ required: true, min: 2 }"
            label="Ф.И.О"
          />
        </label>
      </div>
      <div class="form-group-data">
        <label class="form-group__title">
          Должность
          <UiInput
            name="post"
            type="text"
            placeholder=""
            class="form-group__value"
            v-model="modelValue.post"
          />
        </label>
      </div>
      <div class="form-group-data">
        <label class="form-group__title">
          E-mail
          <UiInput
            name="email"
            type="email"
            placeholder="____@____"
            class="form-group__value"
            v-model="modelValue.email"
            :rules="{ required: true, email: true }"
            label="E-mail"
          />
        </label>
      </div>
      <div class="form-group-data">
        <label class="form-group__title">
          Телефон
          <UiInput
            name="phone"
            type="tel"
            class="form-group__value staff__phone"
            v-model="modelValue.phone"
            :phonePlus="true"
            placeholder="+"
            :rules="{ required: true }"
          />
        </label>
      </div>
    </div>
    <h2 class="staff__title">Права пользователя</h2>
    <UiCheckboxGroup
      :options="userPermissions"
      :is-drop-down="false"
      v-model="modelValue.permissions"
      name="permissions"
    />
    <h2 class="staff__title">Уведомления пользователя</h2>
    <UiCheckboxGroup
      :options="userNotifications"
      :is-drop-down="false"
      v-model="notificationsModel"
      name="notifications"
    />
  </div>
</template>

<script setup>
import { useOrganizationStore } from '~/store/organizationStore';


const props = defineProps({
  modelValue: {
    type: Object,
    required: true,
    default: () => ({}),
  },
});

const organizationStore = useOrganizationStore();

const userPermissions = ref([]);
const emit = defineEmits(['update:modelValue']);

const userNotifications = [
  { id: 1, value: {'Новые отзывы или ответы': ['cabinet']}, label: "Уведомления о отзывах" },
  { id: 2, value: {'Новые заказы': ['cabinet']}, label: "Уведомления о заказах" },
  { id: 3, value: {'Новые сообщения в чате': ['cabinet']}, label: "Уведомления о новом сообщении" },
  { id: 4, value: {'Системные уведомления': ['cabinet']}, label: "Системные уведомления" },
  { id: 5, value: {'Новости': ['cabinet']}, label: "Новостные уведомления" },
];


// Отдельный computed для преобразования значений
const notificationsModel = computed({
  get() {
    // Преобразуем объект notifications в массив id для checkbox group
    if (!props.modelValue.notifications || typeof props.modelValue.notifications !== 'object') {
      return [];
    }
    
    return userNotifications
      .filter(item => {
        const notificationKey = Object.keys(item.value)[0];
        return Array.isArray(props.modelValue.notifications[notificationKey]);
      })
      .map(item => item.id);
  },
  set(ids) {
    // Создаем новый объект уведомлений
    const newNotifications = {};
    
    // Проходим по всем возможным уведомлениям
    userNotifications.forEach(item => {
      const notificationKey = Object.keys(item.value)[0];
      
      // Если id есть в выбранных, добавляем массив, иначе не добавляем вообще
      if (ids.includes(item.id)) {
        newNotifications[notificationKey] = item.value[notificationKey];
      }
    });
    
    emit('update:modelValue', {
      ...props.modelValue,
      notifications: newNotifications
    });
  }
});

onMounted(() => {
  organizationStore.getEmployeePermissions().then(res => {
    console.log(res)
    if(res && res.permissions) {
      userPermissions.value = res.permissions.map(item => ({...item, label: item.title}));
    }
  })
});

</script>

<style lang="scss">
.staff-content {
  .checkbox-group {
    justify-content: space-between;

    .checkbox {
      flex: 0 1 48%;
    }
  }

  .staff__phone {
    span{
      order: -1;
      line-height: 1em;
    }
  }
}

@include mobile {
  .staff {
    &__title {
      margin-top: 1em;
      font-size: 1.8rem;
    }
  }
}

@include small-mobile {
  .staff-content {
    .checkbox-group {
      .checkbox {
        flex: 0 1 100%;
      }
    }
  }
}
</style>
