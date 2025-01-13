import axios from "axios";

export default {
  uploadFiles(id, data) {
    return axios.post(`users/${id}/files/upload`, data, {headers: {'Content-Type': 'multipart/form-data'}})
  }
}