// app.js
import api from './api/index'

App({
  onLaunch() {
    console.log('App Launch')
    wx.$api = api
    this.gb.isLogin = !!wx.getStorageSync('jt')
    if (this.gb.isLogin) {
      api.isLogin().then(res => {
        this.gb.role = res.data.me.role
      })
    }
  },
  onShow() {
    console.log('App Show')
    if (!this.gb.isLogin) {
      wx.redirectTo({
        url: './pages/login_stu/login_stu'
      })
    }
  },
  onHide() {
    console.log('App Hide')
  },
  onError(msg) {
    console.log('Error: ', msg)
  },
  gb: {
    isLogin: false,
    role: '',
    user: {}
  }
})
