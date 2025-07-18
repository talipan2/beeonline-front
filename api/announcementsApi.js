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
		return useApi().patch(`announcements/${id}`, data, form);
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
};
