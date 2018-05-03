Page({
  data: {
    username: '',
    pwd: ''
  },
  onLoad(options) {

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
      itemList: ['学生', '管理员'],
      itemColor: '#101010',
      success(res) {
        if (!res.cancel) {
          if (res.tapIndex === 0) {
            wx.navigateTo({
              url: '../login_stu/login_stu'
            })
          } else if (res.tapIndex === 1) {
            wx.navigateTo({
              url: '../webview/webview?url=http://localhost:8080'
            })
          }
        }
      }
    })
  }
})
