// pages/savemoney/savemoney.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showWishMoney: '0'
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
            showWishMoney: wishMoney
          })
          // 显示
          wx.showToast({
            title: resData.msg,
            icon: 'success',
            duration: 1000
          })
        }else if(resData == 500){
          wx.showToast({
            title: resData.msg,
          })
        }
      },
      fail: function(res){
        console.log(res.data)
      }
    })

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 读出心愿存钱
    var wishMoney = wx.getStorageSync('wishMoney');
    if(wishMoney){
      this.setData({
        showWishMoney: wishMoney
      })
    }else{
      this.setData({
        showWishMoney: '错误'
      })
    }
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