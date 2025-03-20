import axios from "axios";

axios.defaults.headers.common['Content-Type'] = 'application/json; charset=UTF-8'

export default {

  // создание организации
  async setOrganization(data, form) {
    return useApi().post('organizations', {
      name: data.name,
      user_id: data.userId,
      org_form: data.organizationForm,
      inn: data.inn,
      kpp: data.kpp,
      ogrn: data.ogrn,
      legal_address: data.legalAddress,
      url_site: data.urlSite,
      is_foreigner: data.selfEmployed,
      country_id: data.countryId,
      currency_id: data.currencyId,
      is_foreigner: data.countryId === 1 ? 0 : 1
    }, form)
  },

  async editOrganization(data, form) {
    return useApi().patch(`organizations/${data.id}`, {
      name: data.name,
      org_form: data.organizationForm,
      inn: data.inn,
      kpp: data.kpp,
      ogrn: data.ogrn,
      legal_address: data.legalAddress,
      url_site: data.urlSite,
      is_foreigner: data.selfEmployed,
      country_id: data.countryId,
      is_foreigner: data.countryId === 1 ? 0 : 1
    }, form)
  },

  // создание карточки
  async setPubCards(data, form) {
    return useApi().post('pubcards', {
      organization_id: data.id,
      name: data.name,
      type: data.type,
      url_site: data.siteUrl,
      description: data.description,
      status: data.status,
      cities: data.cities,
      regions: data.regions,
    }, form)
  },

  // получение организации пользователя
  async getOrganization(id) {
    return axios.get(`organizations/${id}`, {
    })
  },

  // редактирование публичной карточки пользователя
  async editPubCard(data, form) {
    return useApi().patch(`pubcards/${data.id}`, {
      name: data.name,
      url_site: data.url_site,
      description: data.description,
      url_tg: data.url_tg,
      url_vk: data.url_vk,
      url_yt: data.url_yt,
      cities: data.cities,
      regions: data.regions,
      videos: data.videos,
    }, form)
  },

  async getPubCards(params = {}) {
    return axios.get(`pubcards`, {params})
  },

  async getPubCard(id) {
    return axios.get(`pubcards/${id}`)
  },

  // редактирование галерей публичной карточки пользователя
  async setGallery(formData) {
    return axios.patch(`pubcards/${11}`, {gallery: formData})
  },

  // получение организации по ИНН
  async searchInn(inn) {
    return axios.post(`organizations/search-by-inn`, {inn})
  },

  // получение документов
  async getVerificationDocuments(id) {
    return axios.get(`organizations/${id}/verification-files`);
  },

  // загрузка документов
  async setVerificationDocuments(id, data) {
    const formatData = data.map((item) => {
      return {media_id: item.id, status: 'pending'}
    });
    return axios.post(`organizations/${id}/verification-files`, {files: formatData});
  },

  // удаление документа
  async deleteVerificationDocument(id) {
    return axios.patch(`verification-files/${id}`, data, {headers: {'Content-Type': 'multipart/form-data'}});
  },

  async setPubCardLogo(id, imageId) {
    return axios.post(`pubcards/${id}/attach-logo`, {media_id: imageId})
  },

  async setPubCardGallery(id, data) {
    return axios.post(`pubcards/${id}/attach-gallery`, {media_ids: data})
  },

  async getPubCardStats(id) {
    return axios.get(`pubcards/${id}/stats`)
  },
}