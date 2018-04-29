<template>
  <div>
    <mu-raised-button label="上面弹出" @click="open('top')" />
    <mu-popup position="top" :overlay="false" popupClass="demo-popup-top" :open="topPopup">
      更新成功
    </mu-popup>
  </div>
</template>

<script>
export default {
  data() {
    return {
      topPopup: false
    }
  },
  methods: {
    open(position) {
      this[position + 'Popup'] = true
    },
    close(position) {
      this[position + 'Popup'] = false
    }
  },
  watch: {
    topPopup(val) {
      if (val) {
        setTimeout(() => {
          this.topPopup = false
        }, 2000)
      }
    }
  }
}
</script>

<style lang="css">
.demo-popup-top {
  background: #ef5350;
  color: #fff;
  width: 100%;
  opacity: 0.8;
  height: 48px;
  line-height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 375px;
}
</style>