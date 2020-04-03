// pages/limitcost/limitcost.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    weekMaxCost: '0',     // 本周最大花费
    monthMaxCost: '0',    // 本月最大花费
    weekMaxCostInput: '', // 本周最大额度输入
    monthMaxCostInput: '' // 本月最大额度输入
  },
  limitSubmit: function(e){
    console.log(e.detail.value)
    var formData = e.detail.value
    var { weekMaxCost, monthMaxCost} = formData
    var that = this
    wx.request({
      url: 'http://192.168.1.89:8080/userOperation/saveLimitCost',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'sessionId': app.globalData.sessionId
      },
      data: {
        'weekMaxCost': weekMaxCost,
        'monthMaxCost': monthMaxCost
      },
      success: function(res){
        console.log(res.data)
        var resData = res.data
        if(resData.status == 200){
          // 显示成功提示
          wx.showToast({
            title: resData.msg,
            icon: 'success',
            duration: 1000
          });
          // 删除输入框中的内容
          that.setData({
            weekMaxCostInput: '',
            monthMaxCostInput: ''
          })
          // 设置显示数据
          that.setData({
            weekMaxCost: resData.data.weekMaxCost,
            monthMaxCost: resData.data.monthMaxCost
          })
          // 赋值给全局变量
          app.globalData.weekMaxCost = resData.weekMaxCost
          app.globalData.monthMaxCost = resData.monthMaxCost
          // 保存数据到本地缓存
          wx.setStorageSync('weekMaxCost', resData.data.weekMaxCost)
          wx.setStorageSync('monthMaxCost', resData.data.monthMaxCost)
        } 
        else if (resData.status == 500) {
          // 显示提示
          wx.showToast({
            title: resData.msg,
            icon: 'success',
            duration: 1000
          });
        }
      },
      fail: function(res){
        console.log(res);
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 从缓存中读出数据
    var weekMaxCost = wx.getStorageSync('weekMaxCost')
    console.log(weekMaxCost)
    if(weekMaxCost >= 0){
      this.setData({
        weekMaxCost: weekMaxCost
      })
      var monthMaxCost = wx.getStorageSync('monthMaxCost')
      console.log(monthMaxCost)
      if(monthMaxCost >= 0){
        this.setData({
          monthMaxCost: monthMaxCost
        })
      }
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