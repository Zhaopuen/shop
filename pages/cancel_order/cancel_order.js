// pages/cancel_order/cancel_order.js
//in_thecall.js
var app = getApp();
const globalData = app.globalData;

Page({

  /**
   * 页面的初始数据
   */
  data: {
      order_id:'',
      datetime:'',
      status:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var order_id = options.order_id;
    var that = this;
    wx.request({
      url: globalData.serverurl + '/order_data.html',
      data: {
        order_id: order_id,
        uaid: wx.getExtConfigSync().uaid,
        ucid: wx.getExtConfigSync().udid
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success(res) {
        if (res.data.code == '200') {
          var order_status = '';
         that.setData({
           datetime:res.data.data.last_time,
           status:res.data.data.status,
           order_id:order_id
         })
        } else {
          wx.showModal({
            title: '提示',
            content: res.data.msg,
            showCancel: false
          })
        }
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