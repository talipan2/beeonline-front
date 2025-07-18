import { defineStore } from 'pinia';
import Api from '@/api/announcementsApi';
import { useUserStore } from '@/store/userStore';

export const useAnnouncementStore = defineStore('announcementStore', {
	state: () => ({}),
	actions: {
		async getAnnouncements(params = {}) {
			return await Api.getAnnouncements(params);
		},
		async getAnnouncement(id) {
			return await Api.getAnnouncement(id);
		},
		async createAnnouncement(data, form) {
			return await Api.createAnnouncement(data, form).then((res) => {
				console.log(res);
				if (res && res.access_token && !localStorage.getItem('token')) {
					localStorage.setItem('token', res.access_token);
					useUserStore().checkAuth();
				}
			});
		},
		async updateAnnouncement(id, data, form) {
			return await Api.updateAnnouncement(id, data, form);
		},
		async updateAnnouncementShowContacts(id) {
			return await Api.updateAnnouncementShowContacts(id);
		},

		async announcementPrepare(id) {
			return await Api.announcementPrepare(id);
		},
		async announcementPublish(id) {
			return await Api.announcementPublish(id);
		},
	},
});
