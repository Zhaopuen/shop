// pages/phone/phone.js
const app = getApp();
const globalData = app.globalData;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: '',//姓名
    phone: '',//手机号
    code: '',//验证码
    iscode: '',//用于存放验证码接口里获取到的code
    codename: '获取验证码',
    codeInput: '',
    btnvalue: "提交"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      navH: app.globalData.navHeight
    })
    var that = this;
    wx.request({
      url: 'https://www.nx.tt/addon/collection/api/join',
      data: {
        uaid: globalData.uaid,
        openid: globalData.openid,
        mpid: globalData.mpid,
        udid: globalData.udid
      },
      method: 'GET',
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success(res) {
        if (res.data.code == 1) {
          if (res.data.data.status == 0) {
            that.setData({
              phone: '',
            })
          } else if (res.data.data.status == 2) {
            that.setData({
              phone: res.data.data.phone,
            })
          } else if (res.data.data.status == 1) {
            that.setData({
              phone: res.data.data.phone,
              btnvalue: '再次提交'
            })
          } else if (res.data.data.status == 3) {
            that.setData({
              phone: res.data.data.phone,
              btnvalue: '再次提交'
            })
          }
        }
      }
    })
  },

  onShow: function () {
    console.log(5555555)
    // var area_id = (wx.getStorageSync('area_id'));
    // console.log(area_id, 'idididid')
  },

  //获取input输入框的值
  getNameValue: function (e) {
    this.setData({
      name: e.detail.value
    })
  },
  getPhoneValue: function (e) {
    this.setData({
      phone: e.detail.value
    })
  },
  getCodeValue: function (e) {
    this.setData({
      code: e.detail.value
    })
  },
  getCode: function () {

    var area_id = (wx.getStorageSync('area_id'));
    
    var a = this.data.phone;
    var _this = this;
    var myreg = /^(14[0-9]|13[0-9]|15[0-9]|17[0-9]|18[0-9])\d{8}$$/;
    if (this.data.phone == "") {
      wx.showToast({
        title: '手机号不能为空',
        icon: 'none',
        duration: 1000
      })
      return false;
    } else if (!myreg.test(this.data.phone)) {
      wx.showToast({
        title: '请输入正确的手机号',
        icon: 'none',
        duration: 1000
      })
      return false;
    } else {
      var num = 61;
      wx.request({
        url: globalData.api_url + 'send_sms',
        data: {
          phone: this.data.phone,
          uaid: globalData.uaid,
          udid: globalData.udid
        },
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded' // 默认值
        },
        success(res) {
          _this.setData({
            codeInput: res.data.sms_send_code
          })
          console.log(_this.data.code, '发送验证码')
        }
      })
      var timer = setInterval(function () {
        num--;
        if (num <= 0) {
          clearInterval(timer);
          _this.setData({
            codename: '重新发送',
            disabled: false
          })
        } else {
          _this.setData({
            codename: num + "s"
          })
        }
      }, 1000)
      // wx.request({
      //   data: {},
      //   'url': 接口地址,
      //   success(res) {
      //     console.log(res.data.data)
      //     _this.setData({
      //       iscode: res.data.data
      //     })

      //   }
      // })

    }
  },

  // 保存验证输入的验证码是否和返回的验证码一致
  save: function () {
    var myreg = /^(14[0-9]|13[0-9]|15[0-9]|17[0-9]|18[0-9])\d{8}$$/;
    var openid = wx.getStorageSync("openid")
    if (this.data.phone == "") {
      wx.showToast({
        title: '手机号不能为空',
        icon: 'none',
        duration: 1000
      })
      return false;
    } else if (!myreg.test(this.data.phone)) {
      wx.showToast({
        title: '请输入正确的手机号',
        icon: 'none',
        duration: 1000
      })
      return false;
    } else if (this.data.code != this.data.codeInput) {
      wx.showToast({
        title: '请输入正确的验证码',
        icon: 'none',
        duration: 1000
      })
      return false;
    } else if (this.data.phone !== "" && this.data.code !== "") {
      var that = this;
      wx.request({
        url: 'https://www.nx.tt/addon/collection/api/join',
        data: {
          uaid: globalData.uaid,
          phone: that.data.phone,
          act: 'form',
          openid: globalData.openid,
          udid: globalData.udid,
          mpid: globalData.mpid
        },
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded' // 默认值
        },
        success(res) {
          if (res.data.code == 1) {
            wx.setStorageSync('phone', that.data.phone);
            wx.navigateTo({
              url: '../data_information/data_information',
            })
          }
        }
      })
    }
    

  },

  //获取验证码
  getVerificationCode() {
    this.getCode();
    var _this = this
    _this.setData({
      disabled: true
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