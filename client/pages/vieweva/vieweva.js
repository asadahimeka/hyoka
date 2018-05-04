var app = getApp()
Page({
  data: {
    user: {},
    remarks: [],
    totalmark: '',
    itemMichi: '',
    michi: ''
  },
  onLoad() {
    wx
      .$api
      .getRemarks(app.gb.user.name)
      .then(res => {
        let view = res.data.viewremark
        let evanum = view[0][0].evas.length
        if (view.length) {
          let totalmark = 0
          let views = view.map(e => {
            e[0].total = 0
            e.map(e1 => {
              e[0].total += e1.remark
            })
            e[0].avg = e[0].total / evanum / e.length
            totalmark += e[0].avg
            return e
          })
          totalmark /= views.length

          this.setData({
            user: app.gb.user,
            remarks: views,
            totalmark
          })
        }
      })
  },
  onShow() {

  }
})
