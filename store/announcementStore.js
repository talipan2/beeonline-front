import { defineStore } from 'pinia';
import Api from '@/api/announcementsApi';
import { useUserStore } from '@/store/userStore';
import { useEntityStore } from '@/store/entityStore';

export const useAnnouncementStore = defineStore('announcementStore', {
	state: () => ({}),
	actions: {
		async getAnnouncements(params = {}) {
			try {
				const response = await Api.getAnnouncements(params);
				if (response) {
					return response;
				}
			} catch (error) {
				throw error;
			}
		},
		async getAnnouncement(id) {
			try {
				const response = await Api.getAnnouncement(id);
				if (response) {
					return response;
				}
			} catch (error) {
				throw error;
			}
		},
		async createAnnouncement(data, form) {
			try {
				const response = await Api.createAnnouncement(data, form);
				if (response) {
					if (response && response.access_token && response.user) {
						localStorage.setItem('token', response.access_token);
						useUserStore().setDataForUser(response.user);
					}
					return response;
				}
			} catch (error) {
				throw error;
			}
		},
		async updateAnnouncement(id, data, form) {
			try {
				const response = await Api.updateAnnouncement(id, data, form);
				if (response) {
					return response;
				}
			} catch (error) {
				throw error;
			}
		},
		async updateAnnouncementShowContacts(id) {
			try {
				const response = await Api.updateAnnouncementShowContacts(id);
				if (response) {
					return response;
				}
			} catch (error) {
				throw error;
			}
		},

		async announcementPrepare(id) {
			try {
				const response = await Api.announcementPrepare(id);
				if (response) {
					return response;
				}
			} catch (error) {
				throw error;
			}
		},
		async announcementPublish(id) {
			try {
				const response = await Api.announcementPublish(id);
				if (response) {
					return response;
				}
			} catch (error) {
				throw error;
			}
		},
		async getAnnouncementsUserList(id, params = {}) {
			try {
				const response = await Api.getAnnouncementsUserList(id, params);
				if (response) {
					return response;
				}
			} catch (error) {
				throw error;
			}
		},

		async getAnnouncementsCategories() {
			try {
				const response = await Api.getAnnouncementsCategories();
				if (response) {
					useEntityStore().entityData.announcementCategories = response?.data;
					return response;
				}
			} catch (error) {
				throw error;
			}
		},
		async getAnnouncementBanners() {
			try {
				const response = await Api.getAnnouncementBanners();
				if (response) {
					return response;
				}
			} catch (error) {
				throw error;
			}
		},

		async activateAnnouncement(id) {
			try {
				const response = await Api.activateAnnouncement(id);
				if (response) {
					return response;
				}
			} catch (error) {
				throw error;
			}
		},

		async deactivateAnnouncement(id) {
			try {
				const response = await Api.deactivateAnnouncement(id);
				if (response) {
					return response;
				}
			} catch (error) {
				throw error;
			}
		},

		async getAnnouncementUser(userId, announcementId) {
			try {
				const response = await Api.getAnnouncementUser(userId, announcementId);
				if (response) {
					return response;
				}
			} catch (error) {
				throw error;
			}
		},
	},
});
