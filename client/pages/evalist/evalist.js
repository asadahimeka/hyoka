
var app = getApp()
Page({
  data: {
    courses: [],
    loading: true,
    all: false
  },
  onLoad(options) {
    wx.$api.kuso2(app.gb.user.kurasu, app.gb.user.sno).then(res => {
      let courses = res.data.kuso
      if (courses.length) {
        this.setData({ courses })
      }
      if (res.data.studentno) {
        app.gb.user.hadEva = res.data.studentno.hadEva
      }
    }).then(res => {
      let num = 0
      let courses = this.data.courses.map(e => {
        if (~app.gb.user.hadEva.indexOf(e.cno)) {
          e.isEva = true
        } else {
          e.isEva = false
          num++
        }
        return e
      })
      this.setData({
        courses,
        all: num == 0,
        loading: false
      })
    })
  },
  onShow() {
    let num = 0
    let courses = this.data.courses.map(e => {
      if (~app.gb.user.hadEva.indexOf(e.cno)) {
        e.isEva = true
      } else {
        e.isEva = false
        num++
      }
      return e
    })
    this.setData({
      courses,
      all: num == 0
    })
  },
  onShareAppMessage: function () {

  }
})
