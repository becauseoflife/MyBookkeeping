//app.js
App({
  /**
   * 全局变量
   */
  globalData: {
    userNetName: '',  // 用户的的昵称
    sessionId: '',    // 用户sessionId
    expiredTime: '',  // sessionId的保存时间
    typeArray: ['饮食', '购物', '交通', '娱乐', '学习', '话费', '旅游', '医疗', '水电'],   // 记账的种类
    typeImgArray: [
      '/image/type_food.png',
      '/image/type_shopping.png',
      '/image/type_traffic.png',
      '/image/type_entertainment.png',
      '/image/type_study.png',
      '/image/type_telephone Bill.png',
      '/image/type_travel.png',
      '/image/type_hospital.png',
      '/image/type_waterPower.png'
    ],                                          // 种类对应的图片的路由
    weekMaxCost: -1,    // 本周最大花费
    monthMaxCost: -1    // 本月最大花费
  },

  /**
 * 生命周期函数--监听页面加载
 */
  onLaunch: function (options) {
    // 在重新打开小程序的时候，我们把上一次存储的SessionId内容取出来，恢复到内存。
    var sessionId = wx.getStorageSync('SESSIONID')
    var expiredTime = wx.getStorageSync('EXPIREDTIME')
    var now = +new Date()
    if (now - expiredTime <= 1 * 24 * 60 * 60 * 1000) {
      this.globalData.sessionId = sessionId
      this.globalData.expiredTime = expiredTime
    }

    // 从缓存中读出限制消费的额度数据
    var getWeekMaxCost = wx.getStorageSync('weekMaxCost')
    console.log(getWeekMaxCost);
    if (getWeekMaxCost >= 0) {
      this.globalData.weekMaxCost = getWeekMaxCost
    }
    var getMonthMaxCost = wx.getStorageSync('monthMaxCost')
    if (getMonthMaxCost >= 0) {
      this.globalData.monthMaxCost = getMonthMaxCost
    }

  },

})