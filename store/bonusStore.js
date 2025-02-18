import { defineStore } from "pinia";
import commonApi from '~/api/commonApi'

export const useBonusStore = defineStore("bonus", {
  state: () => ({
    
  }),
  actions: {
    async getBonuses(organizationId, { type } = {}) {
        if(!organizationId) return
      try {
        const response = await commonApi.getBonuses(organizationId, { type });
        if(response.data) {
          console.log(response)
          return response.data
        }
      } catch (error) {
        throw error;
      }
    },
    async getBonusesData(organizationId) {
        if(!organizationId) return
        try {
            const response = await commonApi.getBonusesData(organizationId);
            if(response.data) {
            return response.data
            }
        } catch (error) {
            throw error;
        }
    },
    
    async getBonusesTransactions(organizationId, { page } = {}) {
        if(!organizationId) return
        try {
            const response = await commonApi.getBonusesTransactions(organizationId, { page });
            if(response.data) {
            console.log(response)
            return response.data
            }
        } catch (error) {
            throw error;
        }
    },

    async getAchievements(organizationId, { page, limit, type, bonus } = {}) {
        if(!organizationId) return
        try {
            const response = await commonApi.getAchievements(organizationId, { page, limit, type, bonus });
            if(response.data) {
                return response.data
            }
        } catch (error) {
            throw error;
        }
    },
    
  },
});