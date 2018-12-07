var part_urls = {};
var videoPage;
var pageArr = new Array()
import qqVideo from "../../../../utils/qqVideo.js"
Page({
  /**
   * 页面的初始数据
   */
  data: {
      id:'',
      fufei:0,
      file_id:'q08079rzo07'
  },
//   bindtimeupdate: function (res) {//播放中函数，查看当前播放时间等
//     let that = this;
//     // console.log(res)//查看正在播放相关变量
//     // console.log("播放到第" + res.detail.currentTime + "秒")//查看正在播放时间，以秒为单位
//     console.log('视频播放数据', res.detail);
//     if (res.detail.currentTime > 60 && !that.data.fufei){
//         // that.VideoContext.pause();
//         this.videoPause();
//         wx.showModal({
//             title: '请付费',
//             content: '试看结束,请付费继续观看',
//             success(res) {
//                 if (res.confirm) {
//                     console.log('用户点击确定', that.data);
//                     that.data.fufei = 1;
//                     that.videoPlay();
//                 } else if (res.cancel) {
//                     console.log('用户点击取消')
//                     that.videoStop();
//                 }
//             }
//         })
//     }
//   },

    //播放
    videoPlay: function () {
        console.log("播放",this.videoContext);
        this.videoContext.play();
    },
    //暂停
    videoPause: function () {
        console.log("暂停",this.videoContext);
        this.videoContext.pause();
    },
    //停止
    videoStop: function () {
        console.log("停止",this.videoContext);
        this.videoContext.stop();
    },
  /**
   * 生命周期函数--监听页面加载
   */
    onLoad: function (options) {
        var that = this;
        console.log("视频列表页传过来的信息",options)
        if (options.vid != undefined) {
            that.setData({
                file_id: options.vid
            });
            if (options.id != undefined){
                that.setData({
                    id: options.id
                });     
            }else{
                wx.showToast({
                    title: '获取视频信息异常',
                    icon: 'none',
                })
            }
        } else {
            wx.showToast({
                title: '获取视频链接异常',
                icon:'none',


            })
        }

        // videoPage = 1;
        // pageArr = new Array();
        // part_urls = {};
        // const vid = options.vid;
        // // console.log(vid);
        // qqVideo.getVideoes(vid).then(function (response) {
        //     console.log('视频信息',response);
        //     for (var i = 1; i < response.length + 1; i++) {
        //         var indexStr = 'index' + (i)
        //         pageArr.push(i);
        //         part_urls[indexStr] = response[i - 1];
        //     }
        //     that.setData({
        //         videUrl: response[0],
        //     });
        // });
        that.getVideoDate(that.data.id);
    },

    // 因为视频超过10分钟之后，会分段，所以当视频为多段的时候，
    // 自动播放下一段视频
    playEnd: function () {
        if (videoPage > parseInt(pageArr.length)) {
            // part_urls = {};
            videoPage = 1;
            this.videoContext.exitFullScreen
        } else {
            videoPage++;
            var index = 'index' + videoPage;
            this.setData({
                videUrl: ''
            });
            this.setData({
                videUrl: part_urls[index]
            });
        }
    },
    getVideoDate(id) {
        var that = this;

        wx.showLoading({
            title: '加载中...'
        })
        if(id!=''){
            wx.request({
                //上线接口地址要是https测试可以使用http接口方式
                url: 'https://456747272.wjjy2018.com/video/showDetail',
                data: {
                    id
                },
                method: 'post',
                header: {
                    // 'content-type': 'application/json'
                    'content-type': 'application/x-www-form-urlencoded'
                },
                success: function (res) {
                    console.log("服务器返回的数据", res.data);
                    wx.hideLoading();
                    if (res.data.code == 200) {
                        if (res.data.classinfo != undefined || res.data.classset != undefined || res.data.cteacher != undefined) {
                            that.setData({
                                data: res.data
                            })
                        } else {
                            wx.showToast({
                                title: '没有获取到数据',//真棒您已经学习完所有课程了//只有这些了
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

        }
    },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
    onReady: function (res) {
        // 页面渲染完成
        // this.videoContext = wx.createVideoContext('myVideo');
    },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})