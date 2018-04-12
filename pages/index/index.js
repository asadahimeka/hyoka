// index.js
// 获取应用实例
const app = getApp()
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  // 事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    // wx.showToast({
    //   title: '加载中',
    //   icon: 'loading'
    // })

    let p = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(123)
      }, 1000)
    })
    p.then(console.log)

    // var url = 'http://v3.wufazhuce.com:8000/api/hp/idlist/0';
    // var url = 'http://app.youjihotel.cn/index.php?app=hotel&callback=JSON_CALLBACK&act=getProtocol';
    // var url = 'http://localhost:3000/test';
    /*
    wx.request({
      url: url,
      // data: {},
      // header: {
      //   'Content-Type': 'application/json'
      // },
      method: 'GET',
      success: res=>{
        console.log(res.data);
        // var ret = res.data;
        // var si = ret.indexOf('(');
        // var ei = ret.indexOf(')');
        // var wish = JSON.parse(ret.slice(si+1,ei));
        // console.log(wish);
        // this.setData({
        //   motto:wish.retval.data.article_id
        // })
        // wx.hideToast();
        // wx.showToast({
        //   title: '成功',
        //   icon: 'success',
        //   duration: 3000,
        //   mask: true
        // })
      }
    })
    */

    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
