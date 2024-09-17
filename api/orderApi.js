import axios from "axios";

export default {
  async getOrders() {
    return axios.get(`orders`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
  },

  async getOrder(id) {
    return axios.get(`orders/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
  },

  async setOrder(data) {
    return axios.post(`orders`, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
  },

  async editOrder(id, data) {
    const { name, description, termsOfCooperation, rawMaterials, price, batch, completionDate, patterns} = data
    const params = {}
    if(name !== '') params.name = name
    if(description !== '') params.description = description
    if(termsOfCooperation !== '') params.conditions = termsOfCooperation
    if(rawMaterials !== '') params.material = Boolean(rawMaterials)
    if(price !== '') params.price = price
    if(batch !== '') params.batch = batch
    if(patterns !== '') params.patterns = Boolean(patterns)
    if(completionDate !== '') params.deadline_at = completionDate
    return axios.patch(`orders/${id}`, params, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      }
    })
  },
}