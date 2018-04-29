<template>
  <mu-popup position="top" :overlay="false" :popupClass="'popup-top-'+(options.type||'default')" :open="popup">
    {{options.msg}}
  </mu-popup>
</template>

<script>
import store from '../store'
export const showPopup = (opt) => {
  let str = opt
  if (typeof str == 'string') {
    opt = {}
    opt.msg = str
  }
  store.commit('POPUP', {
    open: true,
    ...opt
  })
}
export default {
  name: 'Popup',
  props: ['options'],
  data() {
    return {
      popup: false
    }
  },
  watch: {
    options(val) {
      if (val) {
        this.popup = val.open
        setTimeout(() => {
          this.popup = false
        }, val.delay || 1500)
      }
    }
  }
}
</script>

<style>
.popup-top-default {
  width: 100%;
  opacity: 0.8;
  height: 48px;
  line-height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 375px;
}
.popup-top-warn {
  width: 100%;
  opacity: 0.8;
  height: 48px;
  line-height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 375px;
  background: #ef5350 !important;
  color: #fff !important;
}
</style>