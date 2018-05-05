// pages/userinfo/userinfo.js
var app = getApp()
Page({
  data: {
    bgClass: 'bgimg',
    isBlur: 0,
    isBlack: 0,
    user: {},
    role: '',
    exiting: false
  },
  onLoad(options) {
    let isBlur = wx.getStorageSync('isBlur') || 0
    let isBlack = wx.getStorageSync('isBlack') || 0
    this.setData({
      isBlur: +isBlur,
      isBlack: +isBlack,
      bgClass: +isBlur ? 'bgimg blur' : 'bgimg',
      textColor: +isBlack ? '#000' : '#fff',
      role: app.gb.role == 'stu' ? '学生' : '教师'
    })
    if (app.gb.user.name) {
      this.setData({
        user: app.gb.user
      })
    } else {
      wx.$api.me().then(res => {
        if (app.gb.role == 'stu') {
          wx.$api.stuNo(res.data.me.name).then(res => {
            this.setData({
              user: res.data.studentno
            })
            app.gb.user = res.data.studentno
          })
        } else {
          wx.$api.teacNo(res.data.me.name).then(res => {
            this.setData({
              user: res.data.teacherno
            })
            app.gb.user = res.data.studentno
          })
        }
      })
    }
  },
  onShow() {

  },
  exit() {
    wx.showModal({
      title: '提示',
      content: '确定要退出吗?',
      success: res => {
        if (res.confirm) {
          this.setData({
            exiting: true
          })
          wx.removeStorageSync('jt')
          app.gb.isLogin = false
          wx.showToast({
            title: '退出成功',
            icon: 'none'
          })
          setTimeout(() => {
            wx.redirectTo({
              url: '../login_stu/login_stu'
            })
          }, 500)
        }
      }
    })
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
