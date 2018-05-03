
var app = getApp()
Page({
  data: {
    courses: [],
    loading: true,
    all: false
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
      console.log(this.data.all)
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
