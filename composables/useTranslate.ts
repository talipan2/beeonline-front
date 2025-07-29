import { useTranslateStore } from "~/store/translateStore";

export const useTranslate = () => {
    const translateStore = useTranslateStore();

    /**
     * Переводит текст с помощью кастомного словаря
     * @param {string} text - текст для перевода
     * @returns {string} переведенный текст или исходный текст, если перевод не найден
     */
    const t = (text: string): string => {
        return translateStore.getCustomTranslate(text);
    };

    return {
        t,
    };
}; 
