import axios from "axios";

axios.defaults.headers.common['Content-Type'] = 'application/json; charset=UTF-8'

export default {

  // создание организации
  async setOrganization(data) {
    return axios.post('organizations', {
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
    })
  },

  // создание карточки
  async setPubCards(data) {
    return axios.post('pubcards', {
      organization_id: data.id,
      name: data.name,
      type: data.type,
      url_site: data.siteUrl,
      description: data.description,
      status: data.status,
      cities: data.cities,
      regions: data.regions,
    })
  },

  // получение организации пользователя
  async getOrganization(id) {
    return axios.get(`organizations/${id}`, {
    })
  },

  // получение публичной карточки пользователя
  async getSelfPubCard() {
    return axios.get(`pubcards/${1}`)
  },

  async getPubCard(id) {
    return axios.get(`pubcards/${id}`)
  },

  // редактирование публичной карточки пользователя
  async editPubCard(data) {
    return axios.patch(`pubcards/${data.id}`, {
      name: data.name,
      url_site: data.url_site,
      description: data.description,
      url_tg: data.url_tg,
      url_vk: data.url_vk,
      url_yt: data.url_yt,
      cities: data.cities,
      regions: data.regions,
      videos: data.videos
    })
  },

  async getPubCards() {
    return axios.get(`pubcards`)
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
    return axios.post(`organizations/${id}/verification-files`, {files: data});
  },

  // удаление документа
  async deleteVerificationDocument(id) {
    return axios.patch(`verification-files/${id}`, data, {headers: {'Content-Type': 'multipart/form-data'}});
  },

  async setPubCardLogo(id, data) {
    const formData = new FormData();
    formData.append('logo', data);
    return axios.post(`pubcards/${id}/upload-logo`, formData, {headers: {'Content-Type': 'multipart/form-data'}})
  }
}