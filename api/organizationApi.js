import axios from "axios";

axios.defaults.headers.common['Content-Type'] = 'application/json; charset=UTF-8'

export default {

  // создание организации
  async setOrganization(data) {
    return axios.post('organizations', {
      name: data.name,
      user_id: data.userId,
      phone: data.phone,
      email: data.email,
      org_form: 1,
      inn: data.inn,
      kpp: data.kpp,
      ogrn: data.ogrn,
      legal_address: data.legalAddress,
      url_site: data.urlSite,
      is_foreigner: data.selfEmployed,
      country_id: data.location,
      currency_id: data.currencyId,
    })
  },

  // создание карточки
  async setPubCards(data) {
    return axios.post('pubcards', {
      organization_id: data.id,
      name: data.name,
      type: data.type,
      description: data.description,
      status: data.status,
    })
  },

  // получение организации пользователя
  async getSelfOrganization() {
    return axios.get(`organizations/${1}`, {
    })
  },

  // получение публичной карточки пользователя
  async getSelfPubCard() {
    return axios.get(`pubcards/${1}`)
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
    })
  },

  // редактирование галерей публичной карточки пользователя
  async setGallery(formData) {
    return axios.patch(`pubcards/${11}`, {gallery: formData})
  }
}