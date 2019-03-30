// pages/shopname/shopname.js
const app = getApp();
const cfg = app.globalData;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shopname: '',
    btnvalue: '提交',
    avatarUrl: "",//用户头像
    nickName: "",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var openid = wx.getStorageSync("openid")
    wx.request({
      url: 'https://www.nx.tt/addon/collection/api/join',
      data: {
        uaid: cfg.uaid,
        openid: cfg.openid,
        udid: cfg.udid,
        mpid: cfg.mpid
      },
      method: 'GET',
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success(res) {
        if (res.data.code == 1) {
          if (res.data.data.status == 0) {
            that.setData({
              shopname: '',
            })
          } else if (res.data.data.status == 2) {
            that.setData({
              shopname: res.data.data.name,
            })
          } else if (res.data.data.status == 1) {
            that.setData({
              shopname: res.data.data.name,
              btnvalue: '再次提交'
            })
          }
          else if (res.data.data.status == 3) {
            that.setData({
              shopname: res.data.data.name,
              btnvalue: '再次提交'
            })
          }
        }
      }
    })
  },

  getNameValue: function (e) {
    this.setData({
      shopname: e.detail.value
    })
  },
  namesave: function(){
    var that = this;
    var openid = wx.getStorageSync("openid");
    var avatar = wx.getStorageSync("avatarUrl");
    var nickname = wx.getStorageSync("nickname")
    if (that.data.shopname == ""){
      wx.showToast({
        title: '店铺名称不能为空',
        icon: 'none',
        duration: 1000
      })
    } else {
      wx.request({
        url: 'https://www.nx.tt/addon/collection/api/join',
        data: {
          uaid: cfg.uaid,
          name: that.data.shopname,
          openid: openid,
          mpid: cfg.mpid,
          avatar: avatar,
          udid: cfg.udid,
          owner: nickname,
          act: "form"
        },
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded' // 默认值
        },
        success:function(res) {
          if(res.data.code == 1){
            wx.navigateTo({
              url: '../data_information/data_information',
            })
            wx.setStorageSync("shopname", that.data.shopname);
          } 
          else {
            
          }
        }
      })
    }
    // if (this.data.shopname != ""){
    //   wx.navigateTo({
    //     url: '../data_information/data_information',
    //   })
    // }
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