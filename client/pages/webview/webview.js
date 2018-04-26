// pages/webview/webview.js
Page({
  data: {
    url: ''
  },
  onLoad(options) {
    wx.showLoading()
    setTimeout(wx.hideLoading, 2000)
    let url = options.url
    this.setData({url})
  },
  onShareAppMessage(options) {
    return {
      title: 'Share a page.',
      path: options.webViewUrl
    }
  }
})
