// pages/webview/webview.js
Page({
  data: {
    url: ''
  },
  onLoad(options) {
    wx.showLoading()
    setTimeout(wx.hideLoading, 2000)
    this.setData({url: options.url})
  },
  onShareAppMessage(options) {
    return {
      title: 'Share a page.',
      path: options.webViewUrl
    }
  }
})
