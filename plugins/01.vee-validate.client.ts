import { configure, defineRule } from 'vee-validate';
import { localize, setLocale } from '@vee-validate/i18n';
import ru from '~/utils/vee-validate/ru.json';
import * as AllRules from '@vee-validate/rules';

export default defineNuxtPlugin({
	name: 'vee-validate-custom',
	parallel: false,
	setup(nuxtApp) {
		// Регистрация всех стандартных правил
		Object.keys(AllRules).forEach(rule => {
			if (typeof AllRules[rule] === 'function') {
				defineRule(rule, AllRules[rule]);
			}
		});

		// Кастомные правила
		defineRule(
			'minSelected',
			(value: Array<any>, [min]: [min: number], context) => {
				if (value.length < min) {
					return (
						'В поле "' +
						context.field +
						'" необходимо выбрать хотя бы ' +
						min +
						' элемент'
					);
				}
				return true;
			}
		);
		defineRule('url', (value: string) => {
			if (!value) {
				return true; // Пропускать пустые значения
			}
			// return /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/.test(value);
			return true;
		});
		defineRule(
			'atLeastOneFilled',
			(value: { countries: []; regions: []; cities: [] }) => {
				if (
					(Array.isArray(value.countries) && value.countries.length > 0) ||
					(Array.isArray(value.regions) && value.regions.length > 0) ||
					(Array.isArray(value.cities) && value.cities.length > 0)
				) {
					return true;
				}
				return false;
			}
		);
		defineRule('required_image', (value: string, _: any, context: any) => {
			if (!value) {
				return 'В поле "' + context.field + '" необходимо выбрать изображение';
			}
			return true;
		});

		setLocale('ru');

		configure({
			generateMessage: localize({ ru }),
			validateOnInput: true,
		});
	}
});
