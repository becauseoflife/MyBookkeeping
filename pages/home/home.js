// pages/home/home.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    todayAllShow: '0.00',     // 今日总支出|总收入 显示
    monthAllShow: '0.00',     // 本月总支出|总收入 显示
    yearAllShow: '0.00',      // 本年总支出|总收入 显示

    todayAllStr: '总支出',   // 总支出（默认） ， 总收入
    monthAllStr: '总支出', 
    yearAllStr: '总支出',  

    payBgdColor: '#f8e8e8',   // 选中支出 #f8e8e8 未选中 #EDEDED 
    payBorderColor: 'red',    // 选中 red 未选中 #EDEDED
    payTextColor: 'red',      // 选中 red 未选中 #aaa

    incomeBgdColor: '#EDEDED',    // 选中收入 #effcef 未选中 #EDEDED
    incomeBorderColor: '#EDEDED', // 选中 #1aad19 未选中 #EDEDED
    incomeTextColor: '#aaa',       // 选中 #1aad19 未选中 #aaa
  },

  // 选择支出
  selectPay: function (e) {
    // 改变文字 
    this.setData({
      todayAllStr: '总支出',   // 总支出（默认） ， 总收入
      monthAllStr: '总支出',
      yearAllStr: '总支出',  
    })
    // 从缓存中读取总支出
    var todayCost = wx.getStorageSync('todayCost')
    var monthCost = wx.getStorageSync('monthCost')
    var yearCost = wx.getStorageSync('yearCost')
    this.setData({
      todayAllShow: todayCost,
      monthAllShow: monthCost,
      yearAllShow: yearCost
    })
    // 颜色的改变
    this.setData({
      payBgdColor: '#f8e8e8',   // 选中支出 #f8e8e8 未选中 #EDEDED 
      payBorderColor: 'red',    // 选中 red 未选中 #EDEDED
      payTextColor: 'red',      // 选中 red 未选中 #aaa
    })
    this.setData({
      incomeBgdColor: '#EDEDED',    // 选中收入 #effcef 未选中 #EDEDED
      incomeBorderColor: '#EDEDED', // 选中 #1aad19 未选中 #EDEDED
      incomeTextColor: '#aaa'       // 选中 #1aad19 未选中 #aaa
    })
  },

  // 选择收入
  selectIncome: function (e) {
    // 改变文字 
    this.setData({
      todayAllStr: '总收入',   // 总支出（默认） ， 总收入
      monthAllStr: '总收入',
      yearAllStr: '总收入',
    })
    // 从缓存中读取总支出
    var todayIncome = wx.getStorageSync('todayIncome')
    var monthIncome = wx.getStorageSync('monthIncome')
    var yearIncome = wx.getStorageSync('yearIncome')
    this.setData({
      todayAllShow: todayIncome,
      monthAllShow: monthIncome,
      yearAllShow: yearIncome
    })
    // 颜色的改变
    this.setData({
      payBgdColor: '#EDEDED',   // 选中支出 #f8e8e8 未选中 #EDEDED 
      payBorderColor: '#EDEDED',    // 选中 red 未选中 #EDEDED
      payTextColor: '#aaa',      // 选中 red 未选中 #aaa
    })
    this.setData({
      incomeBgdColor: '#effcef',    // 选中收入 #effcef 未选中 #EDEDED
      incomeBorderColor: '#1aad19', // 选中 #1aad19 未选中 #EDEDED
      incomeTextColor: '#1aad19'       // 选中 #1aad19 未选中 #aaa
    })
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
          content: res.errMsg,
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
            todayAllShow: resData.data.todayCost,
            monthAllShow: resData.data.monthCost,
            yearAllShow: resData.data.yearCost
          })
          // 保存总支出到缓存中
          wx.setStorageSync('todayCost', resData.data.todayCost)
          wx.setStorageSync('monthCost', resData.data.monthCost)
          wx.setStorageSync('yearCost', resData.data.yearCost)
          // 保存总收入到缓存中
          wx.setStorageSync('todayIncome', resData.data.todayIncome)
          wx.setStorageSync('monthIncome', resData.data.monthIncome)
          wx.setStorageSync('yearIncome', resData.data.yearIncome)
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
          content: res.errMsg,
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