import axios from 'axios'
import qs from 'qs'

axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded'
// axios.defaults.baseURL = ''
axios.interceptors.request.use((config) => {
  config.data = qs.stringify(config.data)
  return config
}, function (error) {
  return Promise.reject(error)
})
axios.interceptors.response.use(function (response) {
  console.log(response)
  return response
}, function (error) {
  return Promise.reject(error)
})

export default axios
