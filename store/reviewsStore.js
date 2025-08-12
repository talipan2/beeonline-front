import { defineStore } from 'pinia';
import Api from '~/api/reviewsApi';
import { useToast } from 'vue-toastification';

export const useReviewsStore = defineStore('reviews', {
	state: () => ({}),
	actions: {
		// получение отзывов
		async getReviews(organization_id, params) {
			try {
				const response = await Api.getReviews(organization_id, params);
				return response.data;
			} catch (error) {
				console.error(error);
			}
		},

		// получение отзывов организации
		async getReviewsForUs(organization_id, params = {}) {
			try {
				const response = await Api.getReviewsForUs(organization_id, params);
				return response.data;
			} catch (error) {
				console.error(error);
			}
		},

		async getReview(id) {
			try {
				const response = await Api.getReview(id);
				return response.data;
			} catch (error) {
				console.error(error);
			}
		},

		// создание отзыва
		async createReview(values, form) {
			return await Api.createReview(values, form);
		},

		async replyReview(value, form) {
			try {
				const response = await Api.replyReview(value, form);
				return response;
			} catch (error) {
				console.error(error);
			}
		},

		async addAdditionsReview(value, form) {
			try {
				const response = await Api.addAdditionsReview(value, form);
				return response;
			} catch (error) {
				console.error(error);
			}
		},

		async addReviewFiles(id, files) {
			try {
				const response = await Api.addReviewFiles(id, files);
				return response.data;
			} catch (error) {
				console.error(error);
			}
		},

		async getOrganizationReviews(orgId, params) {
			try {
				const response = await Api.getOrganizationReviews(orgId, params);
				return response.data;
			} catch (error) {
				console.error(error);
			}
		},

		// редактирование отзыва
		async editReview(id, values, form) {
			try {
				const response = await Api.editReview(id, values, form);
				return response;
			} catch (error) {
				console.error(error);
			}
		},

		// получение количества отклоненных отзывов
		async getCountRejectReviews(id) {
			try {
				const response = await Api.getCountRejectReviews(id);
				return response;
			} catch (error) {
				console.error(error);
			}
		},
	},
});
