// pages/home/home.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    todayCost: '0.00',     // 今日总支出
    monthCost: '0.00',     // 本月总支出
    yearCost:  '0.00',     // 本年总支出 
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
      url: '../charts/charts',
    })
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this

    // 从服务器获取消费额度
    wx.request({
      url: 'http://192.168.1.89:8080/userOperation/getLimitCost',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'sessionId': app.globalData.sessionId
      },
      success: function (res) {
        console.log(res.data)
        var resData = res.data
        if (resData.status == 200) {
          // 设置显示数据如果大于等于0则显示
          if (resData.data.weekMaxCost >= 0) {
            that.setData({
              weekMaxCost: resData.data.weekMaxCost,
            })
          }
          if (resData.data.monthMaxCost >= 0) {
            that.setData({
              monthMaxCost: resData.data.monthMaxCost,
            })
          }
          // 赋值给全局变量
          app.globalData.weekMaxCost = resData.data.weekMaxCost
          app.globalData.monthMaxCost = resData.data.monthMaxCost
          // 保存数据到本地缓存
          wx.setStorageSync('weekMaxCost', resData.data.weekMaxCost)
          wx.setStorageSync('monthMaxCost', resData.data.monthMaxCost)
        }
        else if (resData.status == 500) {
          wx.showModal({
            title: '服务器错误',
            content: resData.msg,
            confirmText: '我知道了',
            showCancel: false
          })
        }
      },
      fail: function (res) {
        wx.showModal({
          title: '服务器错误',
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
    var that = this

    // 获取首页的数据
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
          // 保存到缓存中
          // wx.setStorageSync('todayCost', resData.data.todayCost)
          // wx.setStorageSync('monthCost', resData.data.monthCost)
          // wx.setStorageSync('yearCost', resData.data.yearCost)
        }
        else if (resData.status == 500) {
          // 显示提示
          wx.showModal({
            title: '服务器错误',
            content: resData.msg,
            confirmText: '我知道了',
            showCancel: false
          })
        }
      },
      fail: function (res) {
        wx.showModal({
          title: '服务器错误',
          content: resData.msg,
          confirmText: '我知道了',
          showCancel: false
        })
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