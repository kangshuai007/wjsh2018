// pages/index/xckt/xckt.js
Page({
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
      return {
          title: '现场课堂',
          path: 'page/xckt/xckt'
      }
  },

    // 跳转页面
  tabDetails: function () {
        wx.navigateTo({
            url: 'auditions/auditions',
        })
    }
})