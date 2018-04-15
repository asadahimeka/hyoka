// index.js
// 获取应用实例
const app = getApp()
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  // 事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    wx.loading = function (s) {
      if (s === 'close') {
        if (wx.hideLoading) {
          wx.hideLoading()
        } else {
          wx.hideToast()
        }
      } else {
        if (wx.showLoading) {
          wx.showLoading({
            title: ''
          })
        } else {
          wx.showToast({
            title: '加载中',
            icon: 'loading',
            duration: 0
          })
        }
      }
    }
    // wx.showLoading()
    wx.loading()
    let p = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(123)
      }, 1000)
    })
    p.then(console.log)

    let url = 'http://localhost:3000/test?id=1'
    wx.request({
      url: url,
      // data: {},
      // header: {
      //   'Content-Type': 'application/json'
      // },
      method: 'GET',
      success: res => {
        // 只要成功接收到服务器返回，无论statusCode是多少，都会进入success回调。请开发者根据业务逻辑对返回值进行判断。
        console.log('Res:', res)
        var ret = res.data.data[0]
        this.setData({
          motto: ret.name
        })
        wx.hideLoading()
        wx.showToast({
          title: '成功',
          icon: 'success',
          duration: 3000,
          mask: true
        })
      },
      fail: err => {
        console.log('Error:', err)
        // wx.hideLoading();
        wx.loading('close')
        this.setData({
          motto: 'error'
        })
      }
    })

    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
