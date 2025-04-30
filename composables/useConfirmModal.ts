import { ref, type Component, h } from 'vue';
import confirmModal from '~/components/common/confirmModal.vue';

interface ConfirmOptions {
  title: string;
  message: string;
  onConfirm: () => void | Promise<void>;
  onCancel?: () => void;
  confirmText?: string;
  cancelText?: string;
  modalProps?: Record<string, any>;
}

export default function useConfirm(modalComponent?: Component) {
  const isOpen = ref(false);
  const options = ref<ConfirmOptions>({
    title: '',
    message: '',
    onConfirm: () => {},
    confirmText: 'Да',
    cancelText: 'Нет',
    modalProps: {}
  });

  // Используем переданный компонент или дефолтный
  const componentToRender = modalComponent || confirmModal;

  const ConfirmModal = () => h(componentToRender, {
    modelValue: isOpen.value,
    'onUpdate:modelValue': (val: boolean) => isOpen.value = val,
    title: options.value.title,
    message: options.value.message,
    confirmText: options.value.confirmText,
    cancelText: options.value.cancelText,
    onConfirm: () => {
      Promise.resolve(options.value.onConfirm()).finally(() => {
        isOpen.value = false;
      });
    },
    onCancel: options.value.onCancel 
      ? () => {
          options.value.onCancel?.();
          isOpen.value = false;
        }
      : undefined,
    ...options.value.modalProps
  });

  const confirm = (userOptions: ConfirmOptions) => {
    options.value = {
      confirmText: 'Да',
      cancelText: 'Нет',
      ...userOptions,
      modalProps: userOptions.modalProps || {}
    };
    isOpen.value = true;
  };

  return {
    confirm,
    ConfirmModal
  };
}