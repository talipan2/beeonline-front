import axios from "axios";

export default {
  async getLocations() {
    return axios.get(`locations`)
  },

  async getCategories() {
    return axios.get(`product-categories`)
  },
}