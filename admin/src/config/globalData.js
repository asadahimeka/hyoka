import { showDialog } from '../components/dialog'
import { showPopup } from '../components/popup'

export default {
  install(Vue, options) {
    Object.defineProperties(Vue.prototype, {
      '$dialog': {
        value: showDialog
      },
      '$popup': {
        value: showPopup
      }
    })
  }
}
