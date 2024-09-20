import { defineStore } from 'pinia';
import orderApi from '~/api/orderApi';
import serviceApi from '~/api/serviceApi';

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
      patterns: '',
      price: '',
      rawMaterials: [],
      completionDate: '',
      description: '',
      termsOfCooperation: '',
    },
    service: {
      id: '',
      name: '',
      imageUrl: '',
      categories: [],
      placeOfProduction: [],
      placeOfProductionId: [],
      minLot: [],
      availabilityStm: '',
      freeTestSamples: '',
      rawMaterials: [],
      description: '',
    },
    ordersList: [],
    servicesList: [],
    entityData: {
      categories: [
        { id: 1, label: "Вязаный трикотаж" },
        { id: 2, label: "Верхняя одежда" },
        { id: 3, label: "Детская одежда" },
        { id: 4, label: "Женская одежда" },
        { id: 5, label: "Головные уборы" },
        { id: 6, label: "Мужская одежда" },
        { id: 7, label: "Кроеный трикотаж" },
        { id: 8, label: "Термобелье" },
        { id: 9, label: "Носочно-чулочная продукция" },
        { id: 10, label: "Униформа и спецодежда" },
        { id: 11, label: "Сумки и аксессуары" },
        { id: 12, label: "Ткани, фурнитура, материалы" },
        { id: 13, label: "Верхний трикотаж" },
        { id: 14, label: "СИЗ" },
        { id: 15, label: "Большие размеры" },
        { id: 16, label: "Джинсовая одежда" },
        { id: 17, label: "Домашняя одежда и текстиль" },
        { id: 18, label: "Изделия из меха и кожи" },
        { id: 19, label: "Купальники" },
        { id: 20, label: "Медицинская одежда" },
        { id: 21, label: "Нижнее белье" },
        { id: 22, label: "Спортивная одежда" },
        { id: 23, label: "Школьная форма" },
        { id: 24, label: "Печать на ткани" },
        { id: 25, label: "Вышивка на ткани" },
        { id: 26, label: "Вязаные аксессуары" },
        { id: 27, label: "Разработка лекал" },
      ],
      rawMaterials: [
        { id: 5, label: "Собственное" },
        { id: 6, label: "Давальческое" },
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
      minLot: [
        {id: 1, label: 'до 100'}, 
        {id: 2, label: 'от 100 до 500'}, 
        {id: 3, label: 'от 500 до 1 000'}, 
        {id: 4, label: '1 000 и выше'}
      ]
    }
  }),
  getters: {
    // Универсальный геттер для получения массива label по массиву id или одиночному id
    getEntityLabelById: (state) => (type, ids) => {
      const data = state.entityData[type]; // Берём массив по типу
      if (!data) return 'Тип данных не найден';

      if (Array.isArray(ids)) {
        // Если ids - это массив, возвращаем массив label
        return ids.map(id => {
          const entity = data.find(item => item.id == id);
          return entity ? entity.label : `${type} с id ${id} не найдено`;
        });
      } else {
        // Если это одиночный id, возвращаем один label
        const entity = data.find(item => item.id == ids);
        return entity ? entity.label : `${type} с id ${ids} не найден`;
      }
    }
  },
  actions: {
    async getOrders() {
      try {
        const response = await orderApi.getOrders();
        if(response.data) {
          this.ordersList = response.data.data;
        }
      } catch (error) {
        throw error;
      }
    },

    async getOrder(id) {
      try {
        const response = await orderApi.getOrder(id);
        if(response.data) {
          return response.data
        }
      } catch (error) {
        throw error;
      }
    },

    async getServices() {
      try {
        const response = await serviceApi.getServices();
        if(response.data) {
          this.servicesList = response.data.data;
        }
      } catch (error) {
        throw error;
      }
    },

    async getService(id) {
      try {
        const response = await serviceApi.getService(id);
        if(response.data) {
          return response.data
        }
      } catch (error) {
        throw error;
      }
    },

    async addNewService(data) {
      try {
        const response = await serviceApi.setService({
          user_id: data.userId,
          organization_id: data.organizationId,
          name: data.name,
          description: 'test',
        });

        if(response.data && response.data.data.id) {
          this.service.id = response.data.data.id;
        }
      } catch (error) {
        throw error;
      }
    },

    async addNewOrder(data) {
      try {
        const response = await orderApi.setOrder({
          user_id: data.userId,
          organization_id: data.organizationId,
          name: data.name,
        });
        if(response.data && response.data.data.id) {
          this.order.id = response.data.data.id;
        }
      } catch (error) {
        throw error;
      }
    },

    async editService(id, data) {
      try {
        const response = await serviceApi.editService(this.service.id || id, data);
      } catch (error) {
        throw error;
      }
    },

    async editOrder(id, data) {
      try {
        const response = await orderApi.editOrder(this.order.id || id, data);
      } catch (error) {
        throw error;
      }
    }
  }
});