import { configure, defineRule } from "vee-validate";
import { localize, setLocale } from "@vee-validate/i18n";
import ru from "~/utils/vee-validate/ru.json";
import { required, min, max, numeric, integer, max_value, email, confirmed } from '@vee-validate/rules';

export default defineNuxtPlugin({
    name: 'vee-validate',
    async setup (nuxtApp) {
        defineRule('required', required);
        defineRule('min', min);
        defineRule('max', max);
        defineRule('max_value', max);
        defineRule('numeric', numeric);
        defineRule('integer', integer);
        defineRule('email', email);
        defineRule('confirmed', confirmed);
        defineRule('minSelected', (value: Array<any>, [ min ]: [min: number] ) => {
            if(value.length < min) {
                return 'Необходимо выбрать хотя бы ' + min + ' элемент';
            }
            return true
        });
        defineRule('url', (value: string ) => {
            if (!value) {
                return true; // Пропускать пустые значения
            }
            return /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/.test(value);
        });
        defineRule('atLeastOneFilled', (value: { countries: []; regions: []; cities: [] }) => {
            console.log(value);
            if (
              Array.isArray(value.countries) && value.countries.length > 0 ||
              Array.isArray(value.regions) && value.regions.length > 0 ||
              Array.isArray(value.cities) && value.cities.length > 0
            ) {
              return true;
            }
            return false;
          });

        setLocale('ru');

        configure({
            generateMessage: localize({ ru }),
            validateOnInput: true,
        });
    }
});