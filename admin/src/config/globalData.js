import store from '../store'
import { showDialog } from '../components/dialog'
import { showPopup } from '../components/popup'
import api from '../api'
import http from '../api/http'

const loading = (flag) => {
  store.commit('LOADING', !flag)
}

export default {
  install(Vue, options) {
    Object.defineProperties(Vue.prototype, {
      'PWD_REG': {
        value: /^[\w]{5,20}$/
      },
      '$api': {
        value: api
      },
      '$http': {
        value: http
      },
      '$dialog': {
        value: showDialog
      },
      '$popup': {
        value: showPopup
      },
      '$loading': {
        value: loading
      }
    })
  }
}
