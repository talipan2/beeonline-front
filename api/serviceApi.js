import axios from "axios";

export default {
  async getServices() {
    return axios.get(`services`)
  },

  async getService(id) {
    return axios.get(`services/${id}`)
  },

  async setService(data) {
    return axios.post(`services`, data)
  },

  async editService(id, data) {
    const { name, description, termsOfCooperation, rawMaterials, minLot, availabilityStm, freeTestSamples} = data
    const params = {}
    if(name !== '') params.name = name
    if(description !== '') params.description = description
    if(termsOfCooperation !== '') params.conditions = termsOfCooperation
    if(rawMaterials && rawMaterials.length > 0) params.materials_own = rawMaterials.includes(1)
    if(rawMaterials && rawMaterials.length > 0) params.materials_tolling = rawMaterials.includes(0)
    if(availabilityStm !== '') params.is_stm = Boolean(availabilityStm)
    if(freeTestSamples !== '') params.free_samples = freeTestSamples
    return axios.patch(`services/${id}`, params)
  },

  async uploadLogo(id, data) {
    return axios.post(`services/${id}/upload-logo`, {data})
  }

}