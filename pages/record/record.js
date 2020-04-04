// pages/record/record.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],         // 历史记录数组
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

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var list = wx.getStorageSync("list")
    if (list) { // 本地如果有缓存列表，提前渲染
      that.setData({
        list: list
      })
    }
    // 向服务器获取数据
    wx.request({
      url: 'http://192.168.1.89:8080/userOperation/getRecord',
      method: 'GET',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'sessionId': app.globalData.sessionId
      },
      success: function(res){
        console.log(res.data);
        var resData = res.data;
        if(resData.status == 200){
          var resList = resData.data.sort(that.compare('date'))
          // 设置数据
          that.setData({
            list: resList,
          })
          // 保存到本地缓存
          wx.setStorageSync('list', resList)
        }
        else if(resData.status == 500){
          // 显示提示
          wx.showModal({
            title: '网络错误',
            content: resData.msg,
            confirmText: '我知道了',
            showCancel: false
          })
        }
      },
      fail: function(res){
        // 显示提示
        // 发生网络错误等情况触发
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