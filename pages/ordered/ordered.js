//in_thecall.js
var app = getApp();
const globalData = app.globalData;
Page({
  data: {
    // 倒计时
    countDownDay: 0,
    countDownHour: 0,
    countDownMinute: '',
    countDownSecond: '',
    // 桶 数量
    barrel: 1,
    // 呼叫中
    call_text: '呼叫中',
    point: '···',
    callFlag: true,
    //重新呼叫
    callUrl: '',
    call_repeat: false,
    order_id: '',
    timer: '',//定时器名字
    countDownNum: '',
    driverphone: ''
  },
  onLoad: function (options) {
    this.setData({
      barrel: wx.getStorageSync("tongnum"),
      driverphone: wx.getStorageSync("driverPhone")
    });
  },


  // 取消呼叫
  cancelCall: function () {
    wx.navigateTo({
      url: '../index/index',
    })
  },

  // 司机位置
  driverLocation: function () {
    wx.navigateTo({
      url: '../map_orders/map_orders',
    })
    
  },


})