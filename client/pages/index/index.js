// index.js

Page({
  data: {
    username: 'Asdf'
  },
  onLoad(options) {
    wx.request({
      header:{
"Authorization":"JWT-eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVhZTdiNTJlN2NiZTRjMjM1Y2Y4NzZjNSIsImlhdCI6MTUyNTE5ODQ1MX0.q_KOlUMctKq8aWA6_t2oDsH0lympN-vgj0FpaAp1CJA"
      },
      url: 'http://localhost:5000/graphql',
      method:'post',
      data:{
        query:`{
  me{
    id
    name
  }
}`
      }
    })
  },
  onShow() {
    console.log(1111)
  },
  onShareAppMessage() {
    return {
      title: 'Share',
      path: '/page/index/index'
    }
  }
})
