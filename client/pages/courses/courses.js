// pages/courses/courses.js
var app = getApp()
Page({
  data: {
    courses: []

  },
  onLoad: function (options) {
    wx.$api.kuso(app.gb.user.kurasu).then(res => {
      let courses = res.data.kuso
      if (courses.length) {
        this.setData({
          courses
        })
      }
    }).then(res => {
      wx.$api.stuNo(app.gb.user.sno).then(res => {
        if (res.data.studentno) {
          app.gb.user.hadEva = res.data.studentno.hadEva
        }
      })
    }).then(res => {
      let courses = this.data.courses.map(e => {
        if (~app.gb.user.hadEva.indexOf(e.cno)) {
          e.isEva = true
        } else {
          e.isEva = false
        }
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
