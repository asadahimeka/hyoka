// index.js
var app = getApp()
Page({
  data: {
    username: '',
    isStu: '',
    isTeac: ''
  },
  onLoad(options) {
    wx.$api.me().then(res => {
      if (res.data.me) {
        this.setData({
          username: res.data.me.name
        })
        if (app.gb.role == 'stu') {
          wx.$api.stuNo(res.data.me.name).then(res => {
            app.gb.user = res.data.studentno
          })
        } else {
          wx.$api.teacNo(res.data.me.name).then(res => {
            app.gb.user = res.data.teacherno
          })
        }
      }
    })
    this.setData({
      isStu: app.gb.role == 'stu',
      isTeac: app.gb.role == 'teac'
    })
  },
  onShow() {
    if (!app.gb.isLogin) {
      wx.redirectTo({
        url: '../login_stu/login_stu'
      })
    }
  },
  onShareAppMessage() {
    return {
      title: 'Share',
      path: '/page/index/index'
    }
  }
})
