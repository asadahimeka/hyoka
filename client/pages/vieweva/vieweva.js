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
        if (view.length) {
          let totalmark = 0
          let views = view.map(e => {
            e[0].total = 0
            e.map(e1 => {
              e[0].total += e1.remark
            })
            totalmark += e[0].total
            return e
          })

          let evanum = view[0][0].evas.length
          let michi = 5 * evanum * view[0].length
          totalmark /= views.length

          this.setData({
            user: app.gb.user,
            remarks: views,
            michi,
            totalmark
          })
        }
      })
  },
  onShow() {

  }
})
