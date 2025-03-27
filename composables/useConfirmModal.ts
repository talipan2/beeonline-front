import { ref } from "vue";

interface DialogProps {
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: (() => void) | undefined;
  confirmText: string;
  cancelText: string;
}

export default function useConfirm() {
  const isOpen = ref<boolean>(false);
  const dialogProps = ref<DialogProps>({
    title: "",
    message: "",
    onConfirm: () => {},
    onCancel: undefined,
    confirmText: "",
    cancelText: "",
  });

  const confirm = (
    title: string,
    message: string,
    onConfirm: () => void,
    onCancel?: () => void,
    confirmText?: string,
    cancelText?: string
  ): void => {
    dialogProps.value = {
      title,
      message,
      onConfirm: () => {
        onConfirm();
        isOpen.value = false;
      },
      onCancel: onCancel
        ? () => {
            onCancel();
            isOpen.value = false;
          }
        : undefined,
      confirmText: confirmText || "Да",
      cancelText: cancelText || "Нет",
    };
    isOpen.value = true;
  };

  return {
    isOpen,
    dialogProps,
    confirm,
  };
}
