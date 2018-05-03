import axios from 'axios'
import qs from 'qs'

const instance = axios.create({
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Authorization': localStorage.getItem('jt') || ''
  }
})

instance.interceptors.request.use((config) => {
  config.headers['Authorization'] = localStorage.getItem('jt') || ''
  let data = config.data
  data && (config.data['query'] = data['query'].trim().replace(/\s/g, ''))
  console.log('config.data: ', config.data)
  config.data = qs.stringify(data)
  return config
}, function (error) {
  return Promise.reject(error)
})
instance.interceptors.response.use(function (response) {
  console.log(response.data)
  return response.data
}, function (error) {
  return Promise.reject(error)
})

export default instance
