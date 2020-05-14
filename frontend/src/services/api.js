import axios from 'axios'

const api = axios.create({
  baseURL: 'https://alex-api-to-do.herokuapp.com/'
})

export default api
