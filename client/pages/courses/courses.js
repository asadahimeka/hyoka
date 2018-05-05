// pages/courses/courses.js
var app = getApp()
Page({
  data: {
    courses: []

  },
  onLoad: function (options) {
    wx.$api.kuso2(app.gb.user.kurasu, app.gb.user.sno).then(res => {
      let courses = res.data.kuso
      if (res.data.studentno) {
        app.gb.user.hadEva = res.data.studentno.hadEva
      }
      if (courses.length) {
        this.setData({
          courses
        })
      }
    }).then(res => {
      let courses = this.data.courses.map(e => {
        e.isEva = ~app.gb.user.hadEva.indexOf(e.cno)
        return e
      })
      this.setData({
        courses
      })
    })
  },
  onShow() {

  },
  onShareAppMessage: function () {

  }
})
