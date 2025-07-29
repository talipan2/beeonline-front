import { defineStore } from "pinia";
import SvgoRuIcon from "~/assets/svg/ru-icon.svg";
import SvgoEnIcon from "~/assets/svg/en-icon.svg";
import SvgoDeIcon from "~/assets/svg/de-icon.svg";
import SvgoItIcon from "~/assets/svg/it-icon.svg";
import translations from "~/utils/translations/index.json";

export const useTranslateStore = defineStore("translateStore", {
    state: () => ({
        langDefault: "ru",
        lang: "ru",
        options: [
            { label: "RU", value: "ru", img: markRaw(SvgoRuIcon) },
            { label: "EN", value: "en", img: markRaw(SvgoEnIcon) },
            { label: "DE", value: "de", img: markRaw(SvgoDeIcon) },
            { label: "IT", value: "it", img: markRaw(SvgoItIcon) },
        ],
        googleTranslateInitStarted: false,
        googleTranslateInitEnded: false,
    }),
    actions: {
        setLang(lang) {
            this.lang = lang;

            if (this.lang === this.langDefault) {
                this.clearTranslateCookies();
                location.reload();
            } else {
                this.clearTranslateCookies();
                this.setTranslateCookie(this.lang);
                location.reload();
            }
        },

        getSelectedOption() {
            let option = this.options.find((option) => option.value === this.lang);
            if (!option) option = this.options[0];
            return option;
        },

        clearTranslateCookies() {
            const cookieValue = `/${this.langDefault}/${this.lang}`;
            const domain = location.hostname.split(".").slice(1).join(".");
            document.cookie =
                `googtrans=${cookieValue}; max-age=-1; path=/;`;
            document.cookie =
                `googtrans=${cookieValue}; max-age=-1; path=/; domain=` +
                location.hostname;
            document.cookie =
                `googtrans=${cookieValue}; max-age=-1; path=/; domain=` +
                domain;
            document.cookie =
                `googtrans2=${cookieValue}; max-age=-1; path=/; domain=` +
                location.hostname;
        },
        setTranslateCookie(lang) {
            const cookieValue = `/${this.langDefault}/${lang}`;
            const domain = location.hostname.split(".").slice(1).join(".");
            document.cookie = `googtrans=${cookieValue}; path=/;`;
            document.cookie = `googtrans=${cookieValue}; path=/; domain=${location.hostname};`;
            document.cookie = `googtrans=${cookieValue}; path=/; domain=${domain};`;
            document.cookie = `googtrans2=${cookieValue}; path=/; domain=${location.hostname};`;
        },

        /**
         * Переводит текст с помощью словаря, если перевод не найден, возвращает исходный текст
         * @param {string} text - текст для перевода
         * @returns {string} переведенный текст или исходный текст, если перевод не найден
         */
        getCustomTranslate(text) {
            // Если текущий язык - default, возвращаем исходный текст
            if (this.lang === this.langDefault) {
                return text;
            }
            
            // Проверяем наличие перевода для текущего языка
            if (translations[this.lang]) {
                let foundTranslation = null;
                
                // Сначала ищем точное совпадение
                if (translations[this.lang][text]) {
                    foundTranslation = translations[this.lang][text];
                } else {
                    // Если точного совпадения нет, ищем без учета регистра
                    const lowerText = text.toLowerCase();
                    for (const key in translations[this.lang]) {
                        if (key.toLowerCase() === lowerText) {
                            foundTranslation = translations[this.lang][key];
                            break;
                        }
                    }
                }
                
                // Если нашли перевод, применяем правила регистра
                if (foundTranslation) {
                    return this.applyCase(text, foundTranslation);
                }
            }
            
            // Если перевод не найден, возвращаем исходный текст
            return text;
        },

        /**
         * Применяет правила регистра к переведенному тексту
         * @param {string} originalText - исходный текст
         * @param {string} translatedText - переведенный текст
         * @returns {string} переведенный текст с учетом регистра
         */
        applyCase(originalText, translatedText) {
            if (!originalText || !translatedText) return translatedText;
            
            // Если весь исходный текст в верхнем регистре
            if (originalText === originalText.toUpperCase()) {
                return translatedText.toUpperCase();
            }
            
            // Если первая буква исходного текста заглавная
            if (originalText[0] === originalText[0].toUpperCase()) {
                return translatedText.charAt(0).toUpperCase() + translatedText.slice(1).toLowerCase();
            }
            
            // Если исходный текст в нижнем регистре
            return translatedText.toLowerCase();
        },


        initGoogleTranslate(forse = false) {
            const cookie = this.getCookie("googtrans2");
            if (cookie) {
                this.lang = cookie.split("/").pop();
            }

            if (this.lang === this.langDefault) {
                if (!forse) {
                    return;
                } else {
                    this.lang = this.langDefault;
                    this.langDefault = 'auto';
                    this.setTranslateCookie(this.lang);
                    this.langDefault = this.lang;
                }
            }

            if (!this.googleTranslateInitStarted && !this.googleTranslateInitEnded) {
                const script = document.createElement("script");
                window.googleTranslateCallback = () => {
                    new google.translate.TranslateElement({
                        pageLanguage: 'auto',
                        includedLanguages: "ru,en,de,it",
                    });
                    this.googleTranslateInitStarted = false;
                    this.googleTranslateInitEnded = true;
                };
                script.src =
                    "https://translate.google.com/translate_a/element.js?cb=googleTranslateCallback";
                script.async = true;
                document.head.appendChild(script);
                this.googleTranslateInitStarted = true;
            }
        },

        getCookie(name) {
            const value = `; ${document.cookie}`;
            const parts = value.split(`; ${name}=`);
            if (parts.length === 2) return parts.pop().split(";").shift();
        },
    },
});
