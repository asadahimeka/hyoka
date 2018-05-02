import store from '../store'
import { showDialog } from '../components/dialog'
import { showPopup } from '../components/popup'

const loading = (flag) => {
  store.commit('LOADING', !flag)
}

export default {
  install(Vue, options) {
    Object.defineProperties(Vue.prototype, {
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
