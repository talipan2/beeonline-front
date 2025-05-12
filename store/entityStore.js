import { defineStore } from 'pinia';
import orderApi from '~/api/orderApi';
import serviceApi from '~/api/serviceApi';
import organizationApi from '~/api/organizationApi';
import commonApi from '~/api/commonApi';

export const useEntityStore = defineStore('entity', {
  state: () => ({
    order: {
      id: '',
      name: '',
      imageUrl: '',
      categories: [],
      placeOfProduction: [],
      placeOfProductionId: [],
      batch: '',
      price: '',
      rawMaterials: [],
      completionDate: '',
      description: '',
      termsOfCooperation: '',
      isSafeDeal: false,
      isAgreedOrderPlacement: false,
      logo: {
        id: null,
        url: null,
      },
      gallery: [],
      tzFiles: [],
      locations: {
        regions: [],
        cities: [],
        countries: [],
      },
      fillRating: 0,
    },
    fillingOrder: null,
    fillingService: null,
    isRedirectedToStep: true,
    service: {
      id: '',
      name: '',
      categories: [],
      locations: [
        {
          cities: [],
          regions: [],
        }
      ],
      minLot: [],
      availabilityStm: '',
      freeTestSamples: '',
      rawMaterials: [],
      freeStock: '',
      description: '',
      termsOfCooperation: '',
      logo: {
        id: null,
        url: null,
      },
      gallery: [],
      tzFiles: [],
      fillRating: 0,
    },
    organizationServices: [],
    organizationOrders: [],
    ordersList: [],
    servicesList: [],
    entityData: {
      categories: [],
      adjacentCategories: [],
      rawMaterials: [
        { id: 0, label: "Исполнителя" },
        { id: 1, label: "Заказчика" },
      ],
      patterns: [
        { id: 1, label: "Есть лекала" },
        { id: 0, label: "Нужен конструктор" },
      ],
      availabilityStm: [
        { id: 1, label: "Да" },
        { id: 0, label: "Нет" },
      ],
      freeTestSamples: [
        { id: 0, label: "По запросу" },
        { id: 1, label: "Да" },
        { id: 2, label: "Нет" },
      ],
      freeStock: [
        { id: 0, label: "Нет" },
        { id: 1, label: "Да" },
      ],
      minLot: [
        {id: 1, label: 'до 100'},
        {id: 2, label: 'от 100 до 500'},
        {id: 3, label: 'от 500 до 1 000'},
        {id: 4, label: '1 000 и выше'}
      ],
      serviceBatch: [],
      status: [
        {id: 1, label: 'Активный', value: 'active'},
        {id: 2, label: 'Черновик', value: 'draft'},
        {id: 3, label: 'В архиве', value: 'archived'},
        {id: 4, label: 'Заполнение', value: 'filling'},
        {id: 5, label: 'На модерации', value: 'under_moderation'},
        {id: 6, label: 'Отклонено', value: 'rejected'},
      ],
      deadline: [
        {id: 1, label: '1 неделя'},
        {id: 2, label: '1 месяц'},
        {id: 3, label: '1 год'},
      ]
    }
  }),
  getters: {
    // Универсальный геттер для получения массива label по массиву id или одиночному id
    getEntityLabelById: (state) => (type, ids, returnObject = false) => {
      const data = state.entityData[type]; // Берём массив по типу
      if (!data) return 'Тип данных не найден';

      if (Array.isArray(ids)) {
        // Если ids - это массив, возвращаем массив label
        return ids.map(id => {
          const entity = data.find(item => item.id == id);
          // return entity ? entity.label : `${type} с id ${id} не найдено`;
          if(returnObject) return entity ? entity : {};
          return entity ? entity.label || entity.name : null;
        });
      } else {
        // Если это одиночный id, возвращаем один label
        const entity = data.find(item => item.id == ids);
        // return entity ? entity.label : `${type} с id ${ids} не найден`;
        if(returnObject) return entity ? entity : {};
        return entity ? entity.label || entity.name : null;
      }
    },

    getEntityStatusByValue: (state) => (value) => {
      const data = state.entityData.status;
      const entity = data.find(item => item.value == value);
      return entity ? entity.label : null;
    }
  },
  actions: {
    async getAdjacentCategories() {
      try {
        const response = await commonApi.getAdjacentCategories();
        if(response.data) {
          this.entityData.adjacentCategories = response.data;
          return response.data
        }
      } catch (error) {
        throw error;
      }
    },
    async getCategories() {
      try {
        const response = await commonApi.getCategories();
        if(response.data) {
          this.entityData.categories = response.data;
          return response.data
        }
      } catch (error) {
        throw error;
      }
    },
    async getOrders(params) {
      try {
        const response = await orderApi.getOrders(params);
        if(response.data) {
          this.ordersList = response.data.data;
          return response.data
        }
      } catch (error) {
        throw error;
      }
    },

    async getOrder(id) {
      if(!id) return
      try {
        const response = await orderApi.getOrder(id);
        if(response.data) {
          return response.data
        }
      } catch (error) {
        throw error;
      }
    },

    async getServices(params) {
      try {
        const response = await serviceApi.getServices(params);
        if(response.data) {
          this.servicesList = response.data.data;
          return response.data
        }
      } catch (error) {
        throw error;
      }
    },

    async getService(id) {
      if(!id) return
      try {
        const response = await serviceApi.getService(id);
        if(response.data) {
          return response.data
        }
      } catch (error) {
        throw error;
      }
    },

    async prepareRaiseService(id) {
        return await useApi().get(`/services/${id}/raise`);
    },
    async raiseService(id) {
        return await useApi().post(`/services/${id}/raise`);
    },

    async getOrganizationServices(id) {
      if(!id) return
      try {
        const response = await organizationApi.getOrganization(id);
        if(response.data && response.data.data && response.data.data.services) {
          this.organizationServices = response.data.data.services;
          return response.data
        }
      } catch (error) {
        throw error;
      }
    },

    async getOrganizationOrders(id) {
      if(!id) return
      try {
        const response = await organizationApi.getOrganization(id);
        if(response.data && response.data.data && response.data.data.orders) {
          this.organizationOrders = response.data.data.orders;
          return response.data
        }
      } catch (error) {
        throw error;
      }
    },

    async addNewService(data, form) {
      try {
        const response = await serviceApi.setService({
          user_id: data.userId,
          organization_id: data.organizationId,
          name: data.name,
          product_categories: data.categories,
          current_step: data.step,
          status: data.status
        }, form);
        if(response && response.data && response.data.id) {
          this.service.id = response.data.id;
        }
        return response.data
      } catch (error) {
        throw error;
      }
    },

    async addNewOrder(data, form) {
      try {
        const response = await orderApi.setOrder({
          user_id: data.userId,
          organization_id: data.organizationId,
          name: data.name,
          product_categories: data.category,
          deadline_at: data.completionDate,
          status: data.status
        }, form);
        if(response && response.data && response.data.id) {
          this.order.id = response.data.id;
        }
        return response.data
      } catch (error) {
        throw error;
      }
    },

    async editService(id, data, form) {
      try {
        const response = await serviceApi.editService(this.service.id || id, data, form);
        if(response && response.data) {
          return response.data
        }
      } catch (error) {
        throw error;
      }
    },

    async editOrder(id, data) {
      try {
        const response = await orderApi.editOrder(this.order.id || id, data);
        if(response && response.data) {
          return response.data
        }
      } catch (error) {
        throw error;
      }
    },
    resetService() {
      this.service = {
        id: '',
        name: '',
        categories: [],
        locations: [],
        minLot: [],
        availabilityStm: '',
        freeTestSamples: '',
        rawMaterials: [],
        description: '',
        gallery: [],
        termsOfCooperation: '',
        logo: {
          id: null,
          url: null,
        },
        gallery: [],
        tzFiles: [],
      };
    },
    resetOrder() {
      this.order = {
        id: '',
        name: '',
        imageUrl: '',
        categories: [],
        placeOfProduction: [],
        placeOfProductionId: [],
        batch: '',
        patterns: '',
        price: '',
        rawMaterials: [],
        completionDate: '',
        description: '',
        termsOfCooperation: '',
        isSafeDeal: true,
        isAgreedOrderPlacement: true,
        logo: {
          id: null,
          url: null,
        },
        gallery: [],
        tzFiles: [],
        locations: {
          regions: [],
          cities: [],
          countries: [],
        },
      }
    },

    async uploadServiceLogo(id, data) {
      try {
        const response = await serviceApi.uploadLogo(id, data);
      } catch (error) {
        throw error;
      }
    },

    async uploadServiceGallery(id, data) {
      try {
        const response = await serviceApi.uploadGallery(id, data);
      } catch (error) {
        throw error;
      }
    },

    async uploadServiceFiles(id, data) {
      try {
        const response = await serviceApi.uploadTzFiles(id, data);
      } catch (error) {
        throw error;
      }
    },

    async uploadOrderGallery(id, data) {
      try {
        const response = await orderApi.uploadGallery(id, data);
      } catch (error) {
        throw error;
      }
    },

    async uploadOrderLogo(id, data) {
      try {
        const response = await orderApi.uploadLogo(id, data);
      } catch (error) {
        throw error;
      }
    },

    async uploadOrderFiles(id, data) {
      try {
        const response = await orderApi.uploadTzFiles(id, data);
      } catch (error) {
        throw error;
      }
    },

    async uploadTzFiles(id, data) {
      try {
        const response = await orderApi.uploadTzFiles(id, data);
        if(response.data) {
          console.log(response.data)
        }
      } catch (error) {
        throw error;
      }
    },

    async updateServiceStep(id, currentStep) {
      try {
        const response = await serviceApi.updateServiceStep(id, currentStep);
      } catch (error) {
        throw error;
      }
    },

    async updateOrderStep(id, currentStep) {
      try {
        const response = await orderApi.updateOrderStep(id, currentStep);
      } catch (error) {
        throw error;
      }
    },

    async search(params) {
      try {
        const response = await commonApi.search(params);
        if(response.data) {
          return response.data
        }
      } catch (error) {
        throw error;
      }
    },

    async getSelfOrders(organizationId, params) {
      try {
        const response = await orderApi.getSelfOrders(organizationId, params);
        if(response.data && response.data.orders && response.data.orders) {
          this.organizationOrders = response.data.orders;
          return response.data
        }
      } catch (error) {
        throw error;
      }
    },

    async getSelfServices(organizationId, params) {
      try {
        const response = await serviceApi.getSelfServices(organizationId, params);
        if(response.data && response.data.services && response.data.services) {
          this.organizationServices = response.data.services;
          return response.data
        }
      } catch (error) {
        throw error;
      }
    },

    async getPhoneNumber(orderId)
    {
        return await orderApi.getPhoneNumber(orderId);
    },

    async getServiceSlider(params) {
      try {
        const response = await serviceApi.getServiceSlider(params);
        if(response.data) {
          return response.data
        }
      } catch (error) {
        throw error;
      }
    },

    // НОВЫЕ ЗАПРОСЫ ДЛЯ УСЛУГ

    async editPerformerService(value, form) {
      try {
        const response = await serviceApi.editPerformerService(value, form);
        if(response) {
          return response
        }
      } catch (error) {
        throw error;
      }
    },

    async getBatches() {
      try {
        const response = await commonApi.getBatchSizes();
        if(response.data) {
          console.log(response)
          this.entityData.serviceBatch = response.data.map(item => ({id: item?.id, label: item?.name, value: item?.id}));
          return response.data
        }
      } catch (error) {
       throw error;
      }
    },

    async deleteService(id) {
      try {
        const response = await serviceApi.deleteService(id);
        if(response.data) {
          return response.data
        }
      } catch (error) {
       throw error;
      }
    }
  },
});
