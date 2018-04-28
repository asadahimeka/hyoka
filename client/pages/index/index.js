// index.js

Page({
  data: {
    username: 'Asdf'
  },
  onLoad(options) {
    // wx.navigateTo({
    //   url: '../vieweva/vieweva'
    // })
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
