// pages/index/index.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bgPic:null,
    picChoosed:false,
    user: true
  },
  onLoad(){
    var avater = wx.getStorageSync('avater');
    if (avater == '') {
      this.setData({
        bgPic: '/image/timg.jpg'
      })
      
    } else {
      this.setData({
        bgPic: avater,
        picChoosed:true
      })
    }
    var userinfo = wx.getStorageSync('userinfo');
    if (userinfo == '') {
      this.setData({
        user: true
      })

    } else {
      this.setData({
        user: false
      })
    }
  },
  getAvatar() {
    this.setData({
      bgPic: wx.getStorageSync("userinfo").avatarUrl
    })
    wx.showToast({
      title: '热门头像已更新~',
      icon: 'none'
    })
    wx.setStorageSync("avater", wx.getStorageSync("userinfo").avatarUrl)
  },
  nextPage(){
      wx.navigateTo({
        url: '../imageeditor/imageeditor',
      })
  },
  bindgetuserinfo: function(e){
    var userinfo = JSON.parse(e.detail.rawData);
    userinfo.avatarUrl = userinfo.avatarUrl.replace('132', '0');
    wx.setStorageSync("userinfo", userinfo)
    wx.setStorageSync("avater", userinfo.avatarUrl)
    this.setData({
      user:false,
      bgPic: userinfo.avatarUrl,
      picChoosed: true
    })
  },
  handleClick: function(){
    var that = this;
    wx.showActionSheet({
      itemList: ['拍照', '从手机相册选择'],
      success(res) {
        console.log(res.tapIndex)
        if(res.tapIndex == 0){
          var type = 'camera';
        }else if(res.tapIndex == 1){
          var type = "album"
        }
        wx.chooseImage({
          count: 1,
          sizeType: ["original"],
          sourceType: [type],
          success: (res) => {
            var tempFilePaths = res.tempFilePaths;
            that.setData({
              bgPic: res.tempFilePaths[0],
              picChoosed: true,
            });
            wx.setStorageSync('avater', res.tempFilePaths[0])
          }
        })
      },
      fail(res) {
        console.log(res.errMsg)
      }
    })
  },
  onShareAppMessage(res) {
    return {
      title: '天啦噜这顶帽子好好看',
      path: '/page/index/index',
      imageUrl: '/image/timg.jpg'
    }
  }
})