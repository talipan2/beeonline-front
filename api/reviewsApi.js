import axios from "axios";

export default {
  // получение отзывов
  async getReviews(params = {}) {
    return axios.get(`organizations/reviews`, {params});
  },

  // получение отзывов по организации
  async getReviewsForUs(organization_id, params = {}) {
    return axios.get(`organizations/${organization_id}/reviews-about`, {params});
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
}