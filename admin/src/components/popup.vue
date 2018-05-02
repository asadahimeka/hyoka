<template>
  <mu-popup position="top" :overlay="false" :popupClass="'popup-top-'+(options.type||'default')" :open="options.open">
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
  setTimeout(() => {
    store.commit('POPUP', {
      open: false
    })
  }, opt.delay || 1000)
}
export default {
  name: 'Popup',
  props: ['options']
}
</script>

<style>
.popup-top-default,
.popup-top-warn,
.popup-top-suc {
  width: 100%;
  opacity: 0.9;
  height: 48px;
  line-height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 375px;
  font-weight: bold;
}
.popup-top-warn {
  background: #ef5350 !important;
  color: #fff !important;
}
.popup-top-suc {
  background: #009966 !important;
  color: #fff !important;
}
</style>