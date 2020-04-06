//app.js
App({
  /**
   * 全局变量
   */
  globalData: {
    userNetName: '',  // 用户的的昵称
    sessionId: '',    // 用户sessionId
    expiredTime: '',  // sessionId的保存时间
    payTypeArray: ['饮食', '购物', '交通', '娱乐', '学习', '话费', '旅游', '医疗', '水电'],   // 记账的种类
    incomeTypeArray: ['生意', '退款', '工资', '奖金', '其他', '红包', '转账'],
    payTypeImgArray: [
      '/image/pay/type_food.png',
      '/image/pay/type_shopping.png',
      '/image/pay/type_traffic.png',
      '/image/pay/type_entertainment.png',
      '/image/pay/type_study.png',
      '/image/pay/type_telephone Bill.png',
      '/image/pay/type_travel.png',
      '/image/pay/type_hospital.png',
      '/image/pay/type_waterPower.png'
    ],                                          // 种类对应的图片的路由
    incomeTypeImgArray: [
      '/image/income/business.png',
      '/image/income/refund.png',
      '/image/income/salary.png',
      '/image/income/bonus.png',
      '/image/income/other.png',
      '/image/income/red_paper.png',
      '/image/income/transfer.png',
    ],
    weekMaxCost: -1,    // 本周最大花费
    monthMaxCost: -1,    // 本月最大花费
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
    if (getWeekMaxCost) {
      this.globalData.weekMaxCost = getWeekMaxCost
    }
    var getMonthMaxCost = wx.getStorageSync('monthMaxCost')
    if (getMonthMaxCost) {
      this.globalData.monthMaxCost = getMonthMaxCost
    }


  },

})