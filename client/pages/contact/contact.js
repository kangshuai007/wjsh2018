// pages/contact/contact.js
Page({

    /**
     * 页面的初始数据
     */
    data: {

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {

    },
    makePhoneCall() {
        wx.makePhoneCall({
          phoneNumber: '15313753300',
            success() {
                console.log('成功拨打电话')
            }
        })
    }
})