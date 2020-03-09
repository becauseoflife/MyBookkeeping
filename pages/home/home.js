// pages/home/home.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    todayCost: '0',
    monthCost: '0',
    yearCost:  '0',
    todayRecord: [],
  },

  //跳转到记账界面
  recordEspend:function(){
    wx.navigateTo({
      url: '../bookkeeping/bookkeeping',
    })
  },
  // 跳转到历史记录界面
  lookRecord:function(){
    wx.navigateTo({
      url: '../record/record',
    })
  },
  // 跳转到饼状图
  lookPieChart:function(){
    wx.navigateTo({
      url: '',
    })
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    // 获取首页的数据
    var that = this;
    wx.request({
      url: 'http://192.168.1.89:8080/userOperation/getHomePageData',
      method: 'GET',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'sessionId': app.globalData.sessionId
      },
      success: function (res) {
        console.log(res.data);
        var resData = res.data;
        // 设置界面的数据
        if (resData.status == 200) {
          that.setData({
            todayCost: resData.data.todayCost,
            monthCost: resData.data.monthCost,
            yearCost: resData.data.yearCost
          })
        }
        else if (resData.status == 500) {
          // 显示提示
          wx.showToast({
            title: resData.msg,
            icon: 'none',
            duration: 1000
          });
        }
      },
      fail: function (res) {
        console.log(res.data);
      }

    })
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