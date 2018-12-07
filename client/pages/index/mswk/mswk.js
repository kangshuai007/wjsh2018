// pages/index/mswk/mswk.js
Page({

    data: {
        request_flag:0,
        current: 1,
        tabs: [{
                key: 1, //不要修改
                title: '硬笔书法',
                page: 1,
                content: []
            },
            {
                key: 2, //不要修改
                title: '软笔书法',
                page: 1,
                content: []
            },
            {
                key: 3, //不要修改
                title: '国画',
                page: 1,
                content: []
            },
            {
                key: 4, //不要修改
                title: '美术',
                page: 1,
                content: []
            },
            {
                key: 5, //不要修改
                title: '点评指导',
                page: 1,
                content: []
            },
        ],
    },


    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        var i = 1;
        for (i; i <= 5; i++) {
            this.getVideoDate(i, 1);
        }
    },

    //获取视频列表数据
    getVideoDate(type, page) {
        var that = this;

        wx.showLoading({
            title: '加载中...'
        })

        wx.request({
            //上线接口地址要是https测试可以使用http接口方式
            url: 'https://456747272.wjjy2018.com/video/showvideo',
            data: {
                type,
                page,
            },
            method: 'post',
            header: {
                // 'content-type': 'application/json'
                'content-type': 'application/x-www-form-urlencoded'
            },
            success: function(res) {
                console.log("服务器返回的数据",res.data);
                wx.hideLoading();                
                if (res.data.code == 200) {
                    if (res.data.content[0]!=undefined){
                        that.data.tabs[res.data.type - 1].page++;
                        // that.data.tabs[res.data.type - 1].content = res.data.content;
                        that.data.tabs[res.data.type - 1].content = that.data.tabs[res.data.type - 1].content.concat(res.data.content);
                        // that.data.tabs[res.data.type - 1].content = that.data.tabs[res.data.type - 1].content.concat(res.data.content);
                        that.setData({
                            tabs: that.data.tabs,
                        })
                    } else {
                        wx.showToast({
                            title: '暂时没有更多数据了!',//真棒您已经学习完所有课程了//只有这些了
                            icon: 'none',
                            duration: 1500,
                        })
                    }
                } else {
                    wx.showToast({
                        title: '请检查您的网络!',
                        icon: 'none',
                        duration: 1500
                    })
                }
                that.data.request_flag = 0;
            },

        })
    },

    //下拉刷新事件
    onPullDownRefresh: function() {
        // "enablePullDownRefresh":true,
        console.log("触发下拉事件!");
    },

    //上拉触底事件
    onReachBottom: function() {
        // "onReachBottomDistance":50,  
        console.log("触发触底事件!");
        // this.data.tabs[]
    },
    lower(e) {
        console.log("触发触底事件!",e)
        const key = e.currentTarget.dataset.key;
        const page = e.currentTarget.dataset.page;
        if (!this.data.request_flag){  //判断请求完毕
            this.data.request_flag = 1;
            this.getVideoDate(key,page);
            
            setTimeout(function (){ //延时3s
            },3000);
        }

    },

    //监听滚动了一定距离 
    onPageScroll: function(res) {
        console.log(res.scrollTop)
    },
    //点击tabbar
    onTabsChange(e) {
        console.log('onTabsChange', e)
        const {
            key
        } = e.detail
        // const index = this.data.tabs.map((n) => n.key).indexOf(key)
        const index = e.detail.key - 1;


        this.setData({
            key,
            index,
        })
    },
    // 滑动
    onSwiperChange(e) {
        console.log('onSwiperChange', e)
        const {
            current: index,
            source
        } = e.detail
        const {
            key
        } = this.data.tabs[index]

        if (!!source) {
            this.setData({
                key,
                index,
            })
        }
    },
    onShareAppMessage() {
        return {
            title: '名师网课',
            path: 'page/mswk/mswk'
        }
    },
    goVideo(e) {
        console.log("vid",e.currentTarget.dataset);
        var id = e.currentTarget.dataset.id;
        var videoId = e.currentTarget.dataset.vid;
        wx.navigateTo({
            url: 'videoinfo/videoinfo?vid=' + videoId+'&id='+id,
        })
    }
})