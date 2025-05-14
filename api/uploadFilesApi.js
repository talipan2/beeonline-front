import axios from "axios";

export default {
  uploadFiles(id, data, config = {}) {
    console.log(config)
    return axios.post(`users/${id}/files/upload`, data, {headers: {'Content-Type': 'multipart/form-data'}, ...config},  )
  },

  changeFiles(id, data) {
    console.log(data, '12312312')
    return axios.post(`media/${id}`, data, {headers: {'Content-Type': 'multipart/form-data'}})
  }
}