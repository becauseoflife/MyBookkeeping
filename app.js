//app.js
App({
  /**
   * 全局变量
   */
  globalData: {
    sessionId: '',    // 用户sessionId
    expiredTime: '',  // sessionId的保存时间
    typeArray: ['饮食', '购物', '交通', '娱乐', '学习']   // 记账的种类
  },

  /**
 * 生命周期函数--监听页面加载
 */
  onLoad: function (options) {
    // 在重新打开小程序的时候，我们把上一次存储的SessionId内容取出来，恢复到内存。
    var sessionId = wx.getStorageSync('SESSIONID')
    var expiredTime = wx.getStorageSync('EXPIREDTIME')
    var now = +new Date()

    if (now - expiredTime <= 1 * 24 * 60 * 60 * 1000) {
      this.globalData.sessionId = sessionId
      this.globalData.expiredTime = expiredTime
    }
  },

})