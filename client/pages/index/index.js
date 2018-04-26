// index.js

Page({
  data: {

  },
  onLoad(options) {
    wx.navigateTo({
      url: '../login_stu/login_stu'
    })
  },
  onShow() {
    console.log(1111)
  },
  onShareAppMessage() {
    return {
      title: 'Share',
      path: '/page/index/index'
    }
  }
})
