import axios from "axios";

export default {
  async getServices(params = {}) {
    return axios.get(`services`, {params})
  },

  async getService(id) {
    return axios.get(`services/${id}`)
  },

  async setService(data, form) {
    return useApi().post(`services`, data, form)
  },

  async editService(id, data, form) {
    const { 
      name, 
      description, 
      termsOfCooperation, 
      rawMaterials, 
      minLot, 
      availabilityStm, 
      freeTestSamples, 
      step, 
      cities,
      status,
      categories,
    } = data

    const params = {}
    if(name !== '') params.name = name
    if(description !== '') params.description = description
    if(termsOfCooperation !== '') params.conditions = termsOfCooperation
    if(rawMaterials && rawMaterials.length > 0) params.materials_own = rawMaterials.includes(1)
    if(rawMaterials && rawMaterials.length > 0) params.materials_tolling = rawMaterials.includes(0)
    if(availabilityStm !== '' && availabilityStm) params.is_stm = String(availabilityStm)
    if(freeTestSamples !== '' && freeTestSamples) params.free_samples = String(freeTestSamples)
    if(step !== '' || null) params.current_step = step
    if(cities && cities.length > 0 ) params.cities = cities
    if(status) params.status = status
    if(minLot && minLot.length > 0) params.batches = minLot
    if(categories && categories.length > 0) params.product_categories = categories
    return useApi().patch(`services/${id}`, params, form)
  },

  async uploadLogo(id, data) {
    return axios.post(`services/${id}/attach-logo`, {media_id: data})
  },

  async uploadGallery(id, data) {
    return axios.post(`services/${id}/attach-gallery`, {media_ids: data})
  },

  async uploadTzFiles(id, data) {
    return axios.post(`services/${id}/attach-tz-files`, {media_ids: data})
  },

  async updateServiceStep(id, currentStep) {
    return axios.patch(`services/${id}/update-step`, {current_step: currentStep})
  }

}