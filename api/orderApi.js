import axios from "axios";

export default {
  async getOrders() {
    return axios.get(`orders`)
  },

  async getOrder(id) {
    return axios.get(`orders/${id}`)
  },

  async setOrder(data) {
    return axios.post(`orders`, data)
  },

  async editOrder(id, data) {
    const { name, description, termsOfCooperation, rawMaterials, price, batch, completionDate, patterns} = data
    const params = {}
    if(name !== '') params.name = name
    if(description !== '') params.description = description
    if(termsOfCooperation !== '') params.conditions = termsOfCooperation
    if(rawMaterials !== '') params.material = rawMaterials
    if(price !== '') params.price = price
    if(batch !== '') params.batch = batch
    if(patterns !== '') params.patterns = Boolean(patterns)
    if(completionDate !== '') params.deadline_at = completionDate
    return axios.patch(`orders/${id}`, params)
  },

  async uploadLogo(id, data) {
    const formData = new FormData();
    formData.append('logo', data);
    return axios.post(`/orders/${id}/upload-logo`, formData, {headers: {'Content-Type': 'multipart/form-data'}})
  }
}
