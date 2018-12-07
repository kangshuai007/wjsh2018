//index.js
//获取应用实例
const app = getApp()

Page({
    data: {

        //切换授权头像的变量
        authorized: false,
        userInfo: null,

        // userInfo: {},
        // hasUserInfo: false,
        canIUse: wx.canIUse('button.open-type.getUserInfo'),
        background: ['demo-text-1', 'demo-text-2', 'demo-text-3'],
        indicatorDots: true,
        vertical: false,
        autoplay: true,
        interval: 5000,
        duration: 500
    },

    onShareAppMessage() {
        return {
            title: '吾匠书法',
            path: 'pages/index/index'
        }
    },

    //事件处理函数
    bindViewTap: function() {
        wx.navigateTo({
            url: '../logs/logs'
        })
    },
    onLoad: function() {
        // console.log("login:", app.globalData)
        // if (app.globalData.userInfo) {
        //     this.setData({
        //         userInfo: app.globalData.userInfo,
        //         hasUserInfo: true
        //     })
        // } else if (this.data.canIUse) {
        //     // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
        //     // 所以此处加入 callback 以防止这种情况
        //     app.userInfoReadyCallback = res => {
        //         this.setData({
        //             userInfo: res.userInfo,
        //             hasUserInfo: true
        //         })
        //     }
        // } else {
        //     // 在没有 open-type=getUserInfo 版本的兼容处理
        //     wx.getUserInfo({
        //         success: res => {
        //             app.globalData.userInfo = res.userInfo
        //             this.setData({
        //                 userInfo: res.userInfo,
        //                 hasUserInfo: true
        //             })
        //         }
        //     })
        // }

        let that = this;
        // wx.login({
        //     success: function (e) {
        //         app.globalData.code = e.code;
        //         a.showLoginViewIfNeed();
        //     },
        //     fail: function (e) {
        //         s.toast("网络请求失败");
        //     }
        // });
        // wx.getUserInfo();
        // wx.openDocument({
        //     filePath: '',
        //     fileType: '',
        //     success: '',
        //     fail: '',
        //     complete: '',
        // })

        this.userAuthorized();
    },
    getUserInfo: function(e) {
        console.log(e)
        app.globalData.userInfo = e.detail.userInfo
        this.setData({
            userInfo: e.detail.userInfo,
            hasUserInfo: true
        })
    },

    //判断用户是否已经授权过
    userAuthorized() {
        wx.getSetting({
            success: data => {
                //用户授权过
                if (data.authSetting['scope.userInfo']) {
                    wx.getUserInfo({
                        success: data => {
                            this.setData({
                                authorized: true,//代表已经授权
                                userInfo: data.userInfo

                            })
                        }
                    })
                } else {
                    console.log('err')
                }

            }
        })
    },

    onGetUserInfo(event) {
        const userInfo = event.detail.userInfo
        if (userInfo) {//如果有值的话
            this.setData({
                userInfo: userInfo,
                authorized: true
            })
        }

    },
    

})