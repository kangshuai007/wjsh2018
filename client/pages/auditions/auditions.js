// pages/auditions/auditions.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        style: ['现场课堂', '名师网课'],
        index: 1,
        type: [{
            name: "成人",
            value: "成人",
        }, {
            name: "儿童",
            value: "儿童",
        }],
        class: [{
            name: "毛笔",
            value: "毛笔",
        }, {
            name: "硬笔",
            value: "硬笔",
        }, {
            name: "国画",
            value: "国画",
        }, {
            name: "美术",
            value: "美术",
        }],
    },
    bindPickerChange(e) {
        console.log('picker发送选择改变，携带值为', e.detail.value)
        this.setData({
            index: e.detail.value
        })
    },

    onChange(field, e) {
        const {
            value
        } = e.detail
        const data = this.data[field]
        const index = data.indexOf(value)
        const current = index === -1 ? [...data, value] : data.filter((n) => n !== value)

        this.setData({
            [field]: current,
        })

        console.log('checkbox发生change事件，携带value值为：', e.detail.value)
    },
    onChange1(e) {
        this.onChange('type', e)
    },
    onChange2(e) {
        this.onChange('kecheng', e)
    },
    // 提交信息
    formSubmit: function(e) {
        if (e.detail.value.name == "") {
            wx.showToast({
                title: '姓名不能为空!',
                icon: 'none',
                duration: 1500
            })
        } else if (e.detail.value.tel == "") {
            wx.showToast({
                title: '电话不能为空!',
                icon: 'none',
                duration: 1500
            })
        } else if (e.detail.value.type == "") {
            wx.showToast({
                title: '类别不能为空!',
                icon: 'none',
                duration: 1500
            })
        } else if (e.detail.value.kecheng == "") {
            wx.showToast({
                title: '课程不能为空!',
                icon: 'none',
                duration: 1500
            })
        } else {
            wx.request({
                //上线接口地址要是https测试可以使用http接口方式
                url: 'https://456747272.wjjy2018.com/sting/add',
                data: e.detail.value,
                method: 'post',
                header: {
                    // 'content-type': 'application/json'
                    'content-type': 'application/x-www-form-urlencoded'
                },
                success: function(res) {
                    console.log('form发生了submit事件，携带数据为：', e.detail.value);
                    if (res.data.code == 200) {
                        wx.showToast({
                            title: '恭喜您预约成功!',
                            duration: 1500
                        })
                        setTimeout(function () {
                            wx.reLaunch({
                                url: 'auditions'
                            })
                        }, 1500);
                    } else {
                        wx.showToast({
                            title: '预约失败，请重新预约一次。',
                            icon: 'none',
                            duration: 1500
                        })
                    }
                },

            })
        }
    },
    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
})