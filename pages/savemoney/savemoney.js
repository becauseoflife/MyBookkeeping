// pages/savemoney/savemoney.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showWishMoney: '0',   // 心愿存钱展示
    input: ''       // 输入框的值
  },

  saveMoneySubmit: function(e){
    var that = this;
    var wishMoney = e.detail.value.wishMoney;
    console.log(wishMoney);

    wx.request({
      url: 'http://192.168.1.89:8080/userOperation/saveWishMoney',
      method: 'GET',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'sessionId': app.globalData.sessionId
      },
      data: {
        'wishMoney': wishMoney
      },
      success: function(res){
        console.log(res.data)
        var resData = res.data;
        // 保存成功 显示
        if(resData.status == 200){
          // 保存到缓存中
          wx.setStorageSync('wishMoney', wishMoney);
          that.setData({
            showWishMoney: wishMoney,
            input: ''
          })
          // 显示
          wx.showToast({
            title: resData.msg,
            icon: 'success',
            duration: 1000
          })
        }else if(resData == 500){
          wx.showModal({
            title: '服务器错误',
            content: resData.msg,
            confirmText: '我知道了',
            showCancel: false
          })
        }
      },
      fail: function(res){
        console.log(res.data)
        wx.showModal({
          title: '网络错误',
          content: resData.msg,
          confirmText: '我知道了',
          showCancel: false
        })
      }
    })

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    // 读出心愿存钱
    var wishMoney = wx.getStorageSync('wishMoney');
    if(wishMoney){
      this.setData({
        showWishMoney: wishMoney
      })
    }

    // 从服务器中获取心愿存钱数
    wx.request({
      url: 'http://192.168.1.89:8080/userOperation/getWishMoney',
      method: 'GET',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'sessionId': app.globalData.sessionId
      },
      success: function(res){
        console.log(res)
        var resData = res.data
        if(resData.status == 200){
          // 判断是否被设置
          if(resData.data >= 0){
            // 显示
            that.setData({
              showWishMoney: resData.data
            })
            // 保存到缓存中
            wx.setStorageSync('wishMoney', wishMoney);
          }else{
            that.setData({
              showWishMoney: '--'
            })
          }
        }
        // 服务器错误
        if(resData.status == 500){
          wx.showModal({
            title: '错误',
            content: resData.msg,
            confirmText: '我知道了',
            showCancel: false
          })
        }
      },
      fail: function(res){
        wx.showModal({
          title: '错误',
          content: resData.msg,
          confirmText: '我知道了',
          showCancel: false
        })
      }
    })
  },
  

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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