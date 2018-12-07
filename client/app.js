//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        console.log("huancun_login:",res);
        // if (!!userInfo) {
        //     console.log("缓存的用户信息:", userInfo)
        //     // that.setData({
        //     //     userInfo,
        //     // });
        //     console.log("用户信息:", that.data.userInfo)
        //     that.globalData.userInfo = userInfo
        // } else {
        //     // that.setData({
        //     //     userInfo:res,
        //     // });
        //     console.log("登录基本信息", res)
        //     that.globalData.userInfo = res;
        //     // console.log(that.globalData.userInfo);
        // }
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
          console.log("授权状态:",res);
        if (res.authSetting['scope.userInfo']) {
        //   已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框

          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        
        }else{
            wx.authorize({
                scope: 'scope.userInfo',
                success(res) {
                    // 用户已经同意小程序使用用户信息，后续调用 接口不会弹窗询问
                    console.log("发起授权",res)
                }
            })
        }
      }
    })
  },
  globalData: {
    userInfo: null
  }
})