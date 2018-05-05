import md5 from '../../utils/spark-md5'
var app = getApp()
Page({
  data: {
    username: '',
    pwd: '',
    wc: Math.random() > 0.5,
    loading: false
  },
  onLoad(options) {

  },
  onShow() {

  },
  onUnload(options) {

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
  login() {
    if (!this.data.username || !this.data.pwd) {
      wx.showToast({ title: '请输入用户名和密码', icon: 'none' })
      return
    }
    this.setData({ loading: true })
    let pwd = md5.hash(this.data.pwd)
    wx.$api.login(this.data.username, pwd).then(res => {
      if (res.data.Login.error) {
        wx.showToast({ title: '登录失败,请重新登录', icon: 'none' })
        this.setData({ loading: false })
        return
      }
      wx.showToast({ title: '登录成功' })
      wx.setStorageSync('jt', res.data.Login.token)
      app.gb.isLogin = true
      app.gb.role = res.data.Login.role
      wx.redirectTo({ url: '../index/index' })
    }).catch(err => {
      console.error(err)
      this.setData({ loading: false })
    })
  },
  selRole() {
    wx.showActionSheet({
      itemList: ['管理员'],
      itemColor: '#101010',
      success(res) {
        if (res.tapIndex === 0) {
          wx.navigateTo({
            url: '../webview/webview?url=http://localhost:5000'
          })
        }
      }
    })
  }
})
