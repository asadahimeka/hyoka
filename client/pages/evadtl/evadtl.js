var app = getApp()
Page({
  data: {
    course: {},
    evaindexs: [],
    marks: [1, 2, 3, 4, 5],
    evas: [],
    comment: ''
  },
  onLoad(options) {
    wx.$api.getEvaIndex().then(res => {
      this.setData({
        course: options,
        evaindexs: res.data.evas.edges
      })
    })
  },
  radioChange(e) {
    let item = e.detail.value.split(';')
    this.setData({
      [`evas[${item[0]}]`]: item[1]
    })
  },
  submit: function() {
    let evas = this.data.evas.join()
    console.log('evas: ', evas)
    if (!evas.length || /^,|,,/.test(evas)) {
      wx.showToast({
        title: '请完整填写',
        icon: 'none'
      })
      return
    }
    let remark = this.data.evas.reduce((a, b) => +a + (+b), 0)
    let data = {
      sno: app.gb.user.sno,
      cno: this.data.course.cno,
      comment: this.data.comment,
      remark,
      evas
    }
    console.log('data: ', data)
    wx.$api.addRemark(data).then(res => {
      if (res.data.RemarksAdd) {
        wx.$api.stuNo(app.gb.user.sno).then(res => {
          app.gb.user = res.data.studentno
        })
        wx.redirectTo({
          url: '../msg_suc/suc'
        })
      } else {
        wx.redirectTo({
          url: '../msg_fail/fail'
        })
      }
    })
  },
  onShow() {

  },
  onShareAppMessage() {

  }
})
