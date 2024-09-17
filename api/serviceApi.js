import axios from "axios";

export default {
  async getServices() {
    return axios.get(`services`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
  },

  async getService(id) {
    return axios.get(`services/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
  },

  async setService(data) {
    return axios.post(`services`, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
  },

  async editService(id, data) {
    const { name, description, termsOfCooperation, rawMaterials, minLot, availabilityStm, freeTestSamples} = data
    const params = {}
    if(name !== '') params.name = name
    if(description !== '') params.description = description
    if(termsOfCooperation !== '') params.conditions = termsOfCooperation
    if(rawMaterials && rawMaterials.length > 0) params.materials_own = rawMaterials.includes(5)
    if(rawMaterials && rawMaterials.length > 0) params.materials_tolling = rawMaterials.includes(6)
    if(availabilityStm !== '') params.is_stm = Boolean(availabilityStm)
    if(freeTestSamples !== '') params.free_samples = freeTestSamples
    return axios.patch(`services/${id}`, params, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      }
    })
  },

}