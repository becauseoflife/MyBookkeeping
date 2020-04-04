// pages/changeuserinfo/changeuserinfo.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    netName: '',      // 昵称
    telephone: ''     // 电话号码
  },

  changeInfoSubmit: function(e){
    console.log(e.detail.value)
    var that = this
    var formData = e.detail.value
    var {netName, telephone} = formData

    // 发送到服务器进行修改
    wx.request({
      url: 'http://192.168.1.89:8080/userOperation/resetUserInfo',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'sessionId': app.globalData.sessionId
      },
      data: {
        'netName': netName,
        'telephone': telephone
      },
      success: function(res){
        console.log(res.data)
        var resData = res.data
        if(resData.status == 200){
          // 显示修改成功
          wx.showToast({
            title: resData.msg,
            icon: 'success',
            duration: 1000
          })

          // 设置新网名
          if(netName != ""){
            app.globalData.userNetName = netName
            wx.setStorageSync('USER_NET_NAME', netName);
          }
          // 清空输入框
          that.setData({
            netName: '',
            telephone: ''
          })
        }
        else if(resData.status == 500){
          wx.showModal({
            title: '服务器错误',
            content: resData.msg,
            confirmText: '我知道了',
            showCancel: false
          })
        }
      },
      fail: function(res){
        wx.showModal({
          title: '操作失败',
          content: res.data.msg,
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