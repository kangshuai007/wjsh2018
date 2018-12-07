Page({
    data: {
        items: [{
                name: '乡镇',
                value: '乡镇'
            },
            {
                name: '县/县级市',
                value: '县/县级市'
            },
            {
                name: '地级市/区',
                value: '地级市/区'
            },
            {
                name: '省会城市',
                value: '省会城市'
            },
        ]
    },
    radioChange: function(e) {
        console.log('radio发生change事件，携带value值为：', e.detail.value)
    },
    formSubmit: function(e) {
        if (e.detail.value.city == "") {
            wx.showToast({
                title: '请选择所在城市的地区！',
                icon: 'none',
                duration: 1500
            })
        } else if (e.detail.value.name == "") {
            wx.showToast({
                title: '请填写您的姓名！',
                icon: 'none',
                duration: 1500
            })
        } else if (e.detail.value.tel == "") {
            wx.showToast({
                title: '请填写您的电话号！',
                icon: 'none',
                duration: 1500
            })
        } else {
            wx.request({
                //上线接口地址要是https测试可以使用http接口方式
                url: 'https://456747272.wjjy2018.com/join/add',
                data: e.detail.value,
                // data: { data: e.detail.value },
                // data: '{ "name": "cxh", "sex": "man" }',
                // data: {
                //     city: e.detail.value.city,
                //     name: e.detail.value.name,
                //     tel: e.detail.value.tel,
                // },
                method: 'post',
                header: {
                    // 'content-type': 'application/json'
                    'content-type': 'application/x-www-form-urlencoded'
                },
                success: function (res) {
                    console.log('form发生了submit事件，携带数据为：', e.detail.value);
                    if (res.data.code==200){
                        wx.showToast({
                            title: '加盟成功!',
                            duration: 1500
                        })
                        setTimeout(function () {
                            wx.navigateBack({
                                delta: -1
                            })
                        }, 1500)
                    }else{
                        wx.showToast({
                            title: '提交失败，请重新提交一次。',
                            icon: 'none',
                            duration: 1500
                        })
                    }
                },

            })
            
        }
    }


})