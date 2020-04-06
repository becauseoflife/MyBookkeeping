// pages/user/user.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userNetName: ''
  },

  // 退出登录
  outLogin:function(){
    // 消除sessionId
    app.globalData.sessionId = ''
    wx.setStorageSync('SESSIONID', '')
    // 回到登录界面
    wx.reLaunch({
      url: '../login/login',
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // var netName = wx.getStorageSync('USER_NET_NAME');
    // console.log(netName)
    // this.setData({
    //   userNetName: netName
    // })
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
    var netName = wx.getStorageSync('USER_NET_NAME');
    console.log(netName)
    this.setData({
      userNetName: netName
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