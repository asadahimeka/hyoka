// app.js

App({
  onLaunch() {
    console.log('App Launch')
  },
  onShow() {
    console.log('App Show')
  },
  onHide() {
    console.log('App Hide')
  },
  onError(msg) {
    console.log('Error: ', msg)
  },
  globalData: {
    hasLogin: false
  }
})
