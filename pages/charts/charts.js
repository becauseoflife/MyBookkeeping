// pages/charts/charts.js
var wxCharts = require('../../utils/wxcharts.js');
var app = getApp();
var pieChart = null;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    series: [],
  },
  // 饼状图模块点击事件，显示该部分的类别
  touchHandler: function (e) {
    var index = pieChart.getCurrentDataIndex(e);
    var typeName = this.data.series[index].name;
    //console.log(this.data.series);
    //console.log(this.data.series[index].name);
    wx.showToast({
      title: typeName,
      icon: 'none',
      duration: 1000
    })
  }, 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var windowWidth = 320;
    try {
      var res = wx.getSystemInfoSync();
      windowWidth = res.windowWidth;
    } catch (e) {
      console.error('getSystemInfoSync failed!');
    }
    // 获取数据
    wx.request({
      url: 'http://192.168.1.89:8080/userOperation/getPieChartsData',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'sessionId': app.globalData.sessionId
      },
      data: {
        'typeArray': app.globalData.typeArray
      },
      success: function(res){
        console.log(res.data);
        var resData = res.data;
        if(resData.status == 200){
          if(resData.data.length != 0){
            // 创建饼状图
            pieChart = new wxCharts({
              animation: true,
              canvasId: 'pieCanvas',
              type: 'pie',
              series: resData.data,
              width: windowWidth,
              height: 300,
              dataLabel: true,  //是否在图表上直接显示数据
            });
            // 设置数据
            that.setData({
              series: resData.data
            })
          }
        }else if(resData.status == 500){
          wx.showToast({
            title: resData.msg,
          })
        }
      },
      fail: function(res){
        console.log('请检查网络')
        console.log(res.data);
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