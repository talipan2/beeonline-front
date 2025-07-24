export default {
	async getAnnouncements(params = {}) {
		return useApi().get(`announcements`, params);
	},
	async getAnnouncement(id) {
		return useApi().get(`announcements/${id}`);
	},
	async createAnnouncement(data, form) {
		console.log(data, form);
		return useApi().post(`announcements`, data, form);
	},
	async updateAnnouncement(id, data, form) {
		return useApi().post(`announcements/${id}`, data, form);
	},
	async updateAnnouncementShowContacts(id) {
		return useApi().post(`announcements/${id}/increment-contacts`);
	},

	async announcementPrepare(id) {
		return useApi().get(`announcements/${id}/prepare`);
	},

	async announcementPublish(id) {
		return useApi().post(`announcements/${id}/pay_publish`);
	},

	async getAnnouncementsUserList(id, params = {}) {
		return useApi().get(`users/${id}/announcements`, params);
	},

	async getAnnouncementsCategories() {
		return useApi().get(`announcement/categories`);
	},

	async getAnnouncementBanners() {
		return useApi().get(`announcementsbanners`);
	},

	async activateAnnouncement(id) {
		return useApi().patch(`/announcements/${id}/activate`);
	},

	async deactivateAnnouncement(id) {
		return useApi().patch(`announcements/${id}/deactivate`);
	},

	async getAnnouncementUser(userId, announcementId) {
		return useApi().get(`users/${userId}/announcements/${announcementId}`);
	},
};
