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
            if (!e.length) {
              e = [[{remark: 0}]]
            }
            e[0].total = 0
            e.map(e1 => {
              e[0].total += e1.remark
            })
            e[0].avg = !e[0].total ? 0 : (e[0].total / evanum / e.length)
            totalmark += e[0].avg
            e[0].avg = e[0].avg.toFixed(5)
            return e
          })
          totalmark /= views.length
          totalmark = totalmark.toFixed(5)

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
