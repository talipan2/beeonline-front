import axios from "axios";

export default {
  async getOrders() {
    return axios.get(`orders`, {params: {organization_id: 2}})
  },

  async getOrganizationOrder(id) {
    return axios.get(`orders`, {params: {organization_id: id}})
  },

  async getOrder(id) {
    return axios.get(`orders/${id}`)
  },

  async setOrder(data) {
    return axios.post(`orders`, data)
  },

  async editOrder(id, data) {
    const { 
      name, 
      description, 
      termsOfCooperation, 
      rawMaterials, 
      price, 
      batch, 
      completionDate, 
      patterns, 
      cities,
      regions,
      isSafeDeal,
      status,
      categories,
      gallery,
    } = data
    const params = {}
    if(name !== '') params.name = name
    if(description !== '') params.description = description
    if(termsOfCooperation !== '') params.conditions = termsOfCooperation
    if(rawMaterials !== '') params.material = rawMaterials
    if(price !== '') params.price = price
    if(batch !== '') params.batch = batch
    if(patterns && patterns !== '') params.pattern = Number(patterns)
    if(completionDate !== '') params.deadline_at = completionDate
    if(cities && cities.length > 0) params.cities = cities
    if(regions && regions.length > 0) params.regions = regions
    if(isSafeDeal !== null) params.is_safedeal = isSafeDeal
    if(status) params.status = status
    if(categories && categories.length > 0) params.product_categories = categories
    if(gallery && gallery.length > 0) params.gallery = gallery
    return axios.patch(`orders/${id}`, params)
  },

  async uploadLogo(id, data) {
    return axios.post(`/orders/${id}/attach-logo`, {media_id: data})
  },

  async uploadGallery(id, data) {
    return axios.post(`/orders/${id}/attach-gallery`, {media_ids: [...data]})
  },

  async uploadTzFiles(id, data) {
    return axios.post(`/orders/${id}/attach-tz-files`, {media_ids: [...data]})
  },

  async updateOrderStep(id, currentStep) {
    return axios.patch(`orders/${id}/update-step`, {current_step: currentStep})
  }
}
