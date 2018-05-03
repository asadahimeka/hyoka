// pages/setpwd/setpwd.js
import md5 from '../../utils/spark-md5'
Page({
  data: {
    opwd: '',
    npwd: ''
  },
  opwdInput(e) {
    this.setData({
      opwd: e.detail.value
    })
  },
  npwdInput(e) {
    this.setData({
      npwd: e.detail.value
    })
  },
  submit() {
    let pwd1 = md5.hash(this.data.opwd)
    let pwd2 = md5.hash(this.data.npwd)
    wx.$api.chgPwd(pwd1, pwd2).then(res => {
      let {
        error
      } = res.data.ChangePassword
      if (error) {
        wx.showToast({
          title: error,
          icon: 'none'
        })
      } else {
        wx.showToast({
          title: '修改成功'
        })
        setTimeout(() => {
          wx.navigateBack()
        }, 500)
      }
    })
  }
})
