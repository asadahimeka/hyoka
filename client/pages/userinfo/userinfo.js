// pages/userinfo/userinfo.js
Page({
  data: {
    bgClass: 'bgimg',
    isBlur: 0,
    isBlack: 0
  },
  onLoad(options) {
    let isBlur = wx.getStorageSync('isBlur') || 0
    let isBlack = wx.getStorageSync('isBlack') || 0
    this.setData({
      isBlur: +isBlur,
      isBlack: +isBlack,
      bgClass: +isBlur ? 'bgimg blur' : 'bgimg',
      textColor: +isBlack ? '#000' : '#fff'
    })
  },
  onShow() {

  },
  switch1Change(e) {
    if (e.detail.value) {
      this.setData({
        bgClass: 'bgimg blur'
      })
      wx.setStorageSync('isBlur', '1')
    } else {
      this.setData({
        bgClass: 'bgimg'
      })
      wx.setStorageSync('isBlur', '0')
    }
  },
  switch2Change(e) {
    if (e.detail.value) {
      this.setData({
        textColor: '#000'
      })
      wx.setStorageSync('isBlack', '1')
    } else {
      this.setData({
        textColor: '#fff'
      })
      wx.setStorageSync('isBlack', '0')
    }
  },
  onShareAppMessage() {

  }
})
