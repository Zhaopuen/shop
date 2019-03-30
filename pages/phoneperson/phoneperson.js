// pages/data_information/data_information.js
const app = getApp();
const globalData = app.globalData;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: '',    //商户名
    nameperson: '',   //法人姓名
    telephone: '',   //手机号
    photo: '',    //证件上传,
    code: '',
    address_flag: false,
    phone_flag: false,
    uploud_flag: false,
    shopname: '',
    phone: '',
    address: '',
    addressDetails: '',
    isShowSuceess: false,
    isShowbtn: false,
    successImg: '',
    isShowFail: false,
    failIsShow: false,
    reasonInfo: '',
    uservalue: '',
    getopenid: '',
    phonelist: false,
    phonenum: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  addyuyue: function () {
    wx.navigateTo({
      url: '../index/index',
    })
  },
  onShow: function (options) {
    this.setData({
      navH: app.globalData.navHeight
    })
    var that = this;
    const shop_name = wx.getStorageSync("shopname")
    const shop_address = wx.getStorageSync('shop_address');
    const shop_lat = wx.getStorageSync('shop_lat');
    const shop_lng = wx.getStorageSync('shop_lng');
    const phone = wx.getStorageSync('phone');
    const business_licence = wx.getStorageSync('business_licence');
    const agreement = wx.getStorageSync('agreement');
    var openid = wx.getStorageSync("openid")

    wx.request({
      url: globalData.api_url+'join',
      data: {
        uaid: wx.getExtConfigSync().uaid,
        openid: openid,
        mpid: wx.getExtConfigSync().mpid,
        udid: wx.getExtConfigSync().udid
        // ucid: 1
      },
      method: 'GET',
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success(res) {
        var phonenumber = wx.getStorageSync("phonenumbers")
        if (res.data.code == 1) {
          if (res.data.data.status == 3) {
            that.setData({
              isShowFail: true,
              isShowSuceess: false,
              reasonInfo: res.data.data.reason,
              successImg: '../../images/fail.png',
              phonenum: "",
            })
          }
          
          if (res.data.data.status == 2) {
            that.setData({
              phonenum: '待审核',
              shopname: '待审核',
              isShowSuceess: false
            })
          }
          if (res.data.data.status == 1) {
            that.setData({
              phonenum: phonenumber,
              isShowSuceess: true,
              shopname: res.data.data.name,
              successImg: '../../images/success.png'
            })
          }
          
          wx.request({
            url: 'https://www.nx.tt/addon/collection/api/shop',
            data: {
              uaid: wx.getExtConfigSync().uaid,
              mpid: wx.getExtConfigSync().mpid,
              udid: wx.getExtConfigSync().udid,
              openid: openid,
              // openid: 'o_z4g5aUAPQtLApG_j9mST_wTjTI',
              phone: phonenumber
            },
            method: 'GET',
            success(resd) {
              console.log(resd, '验证身份的res111')
              if (resd.data.code == 1) {
                if (resd.data.data.openid == openid) {
                  console.log(333333)
                  that.setData({
                    phonelist: false
                  })
                }
                if (resd.data.data.openid != openid) {
                  that.setData({
                    phonelist: true,
                    phonenum: phonenumber,
                    isShowSuceess: true,
                    successImg: '../../images/success.png'
                  })
                  if (that.data.phonenum == "") {
                    wx.navigateTo({
                      url: '../login/login',
                    })
                  }
                }
              }
              else if (openid == "") {
                wx.navigateTo({
                  url: '../authorize/authorize',
                })
              }

            }
          })

        }
      }
    })
  },



  phone: function () {
    // wx.getStorageSync("phonenumbers")
    var phone = wx.getStorageSync("phonenumbers")
    wx.navigateTo({
      url: '../userphone/userphone?id=' + phone,
    })
  },


  // 未通过审核
  failmask: function () {
    this.setData({
      isShowFail: false,
      failIsShow: true
    })
  },
  // 关闭未通过审核原因
  failKnow: function () {
    this.setData({
      failIsShow: false
    })
  },

  onReady: function () {

  },

  // 商户名的值
  getNameValue: function (e) {
    this.setData({
      name: e.detail.value
    })
  },
  // 法人姓名
  getPersonName: function (e) {
    this.setData({
      nameperson: e.detail.value
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