Page({
  data: {
    username: '',
    pwd: ''
  },
  onLoad(options) {

  },
  onShow() {
    console.log(2222)
  },
  unameInput(e) {
    this.setData({
      username: e.detail.value
    })
  },
  pwdInput(e) {
    this.setData({
      pwd: e.detail.value
    })
  },
  selRole() {
    wx.showActionSheet({
      itemList: ['教师', '管理员'],
      itemColor: '#101010',
      success(res) {
        if (res.tapIndex === 0) {
          wx.navigateTo({
            url: '../login_tch/login_tch'
          })
        } else if (res.tapIndex === 1) {
          wx.navigateTo({
            url: '../webview/webview?url=https://www.baidu.com'
          })
        }
      }
    })
  }
})
