// pages/record/record.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],         // 历史记录数组
    windowHeight: 450, // 滑动区域高度
    costColor: 'blue', // 花费多少显示的文字的颜色
    type: 'all',          // 查看的类型  收入：pay 支出：income 全部：all

    payBgdColor: '#EDEDED ',   // 选中支出 #f8e8e8 未选中 #EDEDED 
    payBorderColor: '#EDEDED',    // 选中 red 未选中 #EDEDED
    payTextColor: '#aaa',      // 选中 red 未选中 #aaa

    incomeBgdColor: '#EDEDED',    // 选中收入 #effcef 未选中 #EDEDED
    incomeBorderColor: '#EDEDED', // 选中 #1aad19 未选中 #EDEDED
    incomeTextColor: '#aaa',       // 选中 #1aad19 未选中 #aaa

    allBgdColor: '#e8eaf8',   // 选中全部 #e8eaf8 未选中 #EDEDED
    allBorderColor: 'blue',   // 选中 blue 未选中 #EDEDED
    allTextColor: 'blue'      // 选中 blue 未选中 #aaa

  },

  // 选中全部
  selectAll: function(e){
    //console.log(e.currentTarget.dataset.id)
    // 种类
    var type = e.currentTarget.dataset.id

    // 颜色的改变
    this.setData({
      payBgdColor: '#EDEDED ',   // 选中支出 #f8e8e8 未选中 #EDEDED 
      payBorderColor: '#EDEDED ',    // 选中 red 未选中 #EDEDED
      payTextColor: '#aaa',      // 选中 red 未选中 #aaa

      incomeBgdColor: '#EDEDED',    // 选中收入 #effcef 未选中 #EDEDED
      incomeBorderColor: '#EDEDED', // 选中 #1aad19 未选中 #EDEDED
      incomeTextColor: '#aaa',       // 选中 #1aad19 未选中 #aaa

      allBgdColor: '#e8eaf8',   // 选中全部 #e8eaf8 未选中 #EDEDED
      allBorderColor: 'blue',   // 选中 blue 未选中 #EDEDED
      allTextColor: 'blue',      // 选中 blue 未选中 #aaa

      costColor: 'blue'  // 花费多少显示的文字的颜色
    })

    // 本地如果有缓存列表，提前渲染
    this.getRecordStorage(type)

    // 向服务器获取数据
    this.getRecordRequest(type)
  },

  // 选择支出
  selectPay: function (e) {
    //console.log(e.currentTarget.dataset.id)
    // 种类
    var type = e.currentTarget.dataset.id

    // 颜色的改变
    this.setData({
      payBgdColor: '#f8e8e8',   // 选中支出 #f8e8e8 未选中 #EDEDED 
      payBorderColor: 'red',    // 选中 red 未选中 #EDEDED
      payTextColor: 'red',      // 选中 red 未选中 #aaa

      incomeBgdColor: '#EDEDED',    // 选中收入 #effcef 未选中 #EDEDED
      incomeBorderColor: '#EDEDED', // 选中 #1aad19 未选中 #EDEDED
      incomeTextColor: '#aaa',       // 选中 #1aad19 未选中 #aaa

      allBgdColor: '#EDEDED',   // 选中全部 #e8eaf8 未选中 #EDEDED
      allBorderColor: '#EDEDED',   // 选中 blue 未选中 #EDEDED
      allTextColor: '#aaa',      // 选中 blue 未选中 #aaa

      costColor: 'red',    // 花费多少显示的文字的颜色
    })

    // 本地如果有缓存列表，提前渲染
    this.getRecordStorage(type)

    // 向服务器获取数据
    this.getRecordRequest(type)
  },

  // 选择收入
  selectIncome: function (e) {
    //console.log(e.currentTarget.dataset.id)
    // 种类
    var type = e.currentTarget.dataset.id

    // 颜色的改变
    this.setData({
      payBgdColor: '#EDEDED',   // 选中支出 #f8e8e8 未选中 #EDEDED 
      payBorderColor: '#EDEDED',    // 选中 red 未选中 #EDEDED
      payTextColor: '#aaa',      // 选中 red 未选中 #aaa

      incomeBgdColor: '#effcef',    // 选中收入 #effcef 未选中 #EDEDED
      incomeBorderColor: '#1aad19', // 选中 #1aad19 未选中 #EDEDED
      incomeTextColor: '#1aad19',       // 选中 #1aad19 未选中 #aaa

      allBgdColor: '#EDEDED',   // 选中全部 #e8eaf8 未选中 #EDEDED
      allBorderColor: '#EDEDED',   // 选中 blue 未选中 #EDEDED
      allTextColor: '#aaa',      // 选中 blue 未选中 #aaa

      costColor: '#1aad19'  // 花费多少显示的文字的颜色
    })

    // 本地如果有缓存列表，提前渲染
    this.getRecordStorage(type)

    // 向服务器获取数据
    this.getRecordRequest(type)
  },

  /**
   * 特殊写法:比较数组date日期
   */
  compare: function (property) {
    return function (a, b) {
      var value1 = Date.parse(a[property]);
      var value2 = Date.parse(b[property]);
      return value2 - value1;
    }
  },

  // 获取历史数据
  getRecordRequest: function(type){
    var that = this
    // 向服务器获取数据
    wx.request({
      url: 'http://192.168.1.89:8080/userOperation/getRecord',
      method: 'GET',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'sessionId': app.globalData.sessionId
      },
      data: {
        'type': type
      },
      success: function (res) {
        console.log(res.data);
        var resData = res.data;
        if (resData.status == 200) {
          var resList = resData.data.sort(that.compare('date'))
          // 设置数据
          that.setData({
            list: resList,
          })
          // 保存到本地缓存
          wx.setStorageSync(type + 'List', resList)
        }
        else if (resData.status == 500) {
          // 显示提示
          wx.showModal({
            title: '网络错误',
            content: resData.msg,
            confirmText: '我知道了',
            showCancel: false
          })
        }
      },
      fail: function (res) {
        // 显示提示
        // 发生网络错误等情况触发
        wx.showModal({
          title: '网络错误',
          content: res.errMsg,
          confirmText: '我知道了',
          showCancel: false
        })

      }
    })
  },

  // 获取缓存中的数据
  getRecordStorage: function(type){
    var list = wx.getStorageSync(type + "List")
    if (list) {
      this.setData({
        list: list
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    // 设置滑动区域的高度
    try {
      var res = wx.getSystemInfoSync();
      var windowHeight = res.windowHeight;
      this.setData({
        windowHeight: windowHeight-69
      })
    } catch (e) {
      console.error('getSystemInfoSync failed!');
    }

    // 本地如果有缓存列表，提前渲染
    this.getRecordStorage(this.data.type)

    // 向服务器获取数据
    this.getRecordRequest(this.data.type)
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