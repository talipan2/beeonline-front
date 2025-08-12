import axios from 'axios';

export default {
	// получение отзывов
	async getReviews(organization_id, params = {}) {
		return axios.get(`organization/${organization_id}/reviews`, { params });
	},

	// получение отзывов по организации
	async getReviewsForUs(organization_id, params = {}) {
		return axios.get(`organization/${organization_id}/reviews/about`, {
			params,
		});
	},

	// получение отзыва
	async getReview(id) {
		return axios.get(`reviews/${id}`);
	},

	// создание отзыва
	async createReview(value, form) {
		return useApi().post(`reviews`, value, form);
	},

	// ответ на отзыв
	async replyReview(value, form) {
		return useApi().post(`reviews/${value.id}/reply`, value, form);
	},

	// дополнение отзыва
	async addAdditionsReview(value, form) {
		return useApi().post(
			`reviews/${value.id}/additions`,
			{ user_id: value.user_id, text: value.text },
			form
		);
	},

	async addReviewFiles(id, files) {
		return axios.post(`reviews/${id}/files`, files);
	},

	async getOrganizationReviews(id, params = {}) {
		return axios.get(`/reviews/organization/${id}/all`, { params });
	},

	async editReview(id, value, form) {
		return useApi().patch(`reviews/${id}`, value, form);
	},

	async getCountRejectReviews(id) {
		return useApi().get(`organization/${id}/reviews/rejected-count`);
	},
};
