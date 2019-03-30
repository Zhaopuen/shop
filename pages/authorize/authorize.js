// pages/authorize/authorize.js
var app = getApp();
const globalData = app.globalData;
var get_address = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  bindGetUserInfo(e) {
    console.log(e.detail.userInfo)
  },
  
  getUserInfo: function (e) {
    wx.getSetting({
      success(res) {
        if (res.authSetting['scope.userInfo']) {
          
          wx.getUserInfo({
            success(res) {
              console.log(res,'infossdd')
              wx.setStorageSync("avatarUrl", res.userInfo.avatarUrl);
              wx.setStorageSync("nickname", res.userInfo.nickName);
              wx.redirectTo({
                url: '../data_information/data_information',
              })
            }
          })
        }
      }
    })
  },

  get_location:function(e)
  {
    wx.getUserInfo({
      success(res) {
        console.log(res,'ppppp')
        const userInfo = res.userInfo
        const nickName = userInfo.nickName
        const avatarUrl = userInfo.avatarUrl
        const gender = userInfo.gender // 性别 0：未知、1：男、2：女
        const province = userInfo.province
        const city = userInfo.city
        const country = userInfo.country
      }
    })
    wx.authorize({
      scope: 'scope.userLocation',
      success(res) {
        get_address.get_address();
        var area_id = (wx.getStorageSync('area_id'));
        if(!area_id)
        {
          wx.showLoading({
            title: '加载中',
            mask: true
          })
          setTimeout(function () {
            wx.hideLoading();
            area_id = (wx.getStorageSync('area_id'));
            wx.redirectTo({
              url: '../data_information/data_information',
            })
          }, 2000)
        }else{
          wx.redirectTo({
            url: '../data_information/data_information',
          })
        }
      }
    })

    wx.login({
      //获取code
      success: function (res) {
        // code = res.code //返回code
        console.log(res,'denglu')
        wx.setStorageSync("code", res.code)
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