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
    btnvalue: "提交",
    username: '',
    isShowDelete: false,
    optionPhone: '',
    phoneIsShow: false,
    username1: '',
    userphone1: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options, 'options')
    this.setData({
      navH: app.globalData.navHeight,
      optionPhone: options.id
    })
    var that = this;
    var openid = wx.getStorageSync("openid");
    console.log(openid, '员工的openidss')
    wx.request({
      url: 'https://www.nx.tt/addon/collection/api/user',
      data: {
        uaid: wx.getExtConfigSync().uaid,
        phone: options.id,
        openid: openid,
        mpid: wx.getExtConfigSync().mpid,
        act: "form",
        udid: wx.getExtConfigSync().udid
      },
      method: 'GET',
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success: function (res) {
        console.log(res, '编辑员工列表')
        if (res.data.code == 1) {
          that.setData({
            username: res.data.data.name,
            phone: res.data.data.phone,
            username1: res.data.data.name,
            userphone1: res.data.data.phone,
            isShowDelete: true
          })
        }
        else if (res.data.code == 0) {
          that.setData({
            isShowDelete: false
          })
        }
      }
    })
    if (that.data.phone != "" && that.data.username != "") {
      that.setData({
        isShowDelete: true
      })
    }
    // var openid = wx.getStorageSync("openid")
    // wx.request({
    //   url: 'https://www.nx.tt/addon/collection/api/join',
    //   data: {
    //     uaid: 2,
    //     openid: openid,
    //     mpid: wx.getExtConfigSync().mpid
    //     // ucid: 1
    //   },
    //   method: 'GET',
    //   header: {
    //     'content-type': 'application/x-www-form-urlencoded' // 默认值
    //   },
    //   success(res) {
    //     if (res.data.code == 1) {
    //       if (res.data.data.status == 0) {
    //         that.setData({
    //           phone: '',
    //         })
    //       } else if (res.data.data.status == 2) {
    //         that.setData({
    //           phone: res.data.data.phone,
    //         })
    //       } else if (res.data.data.status == 1) {
    //         that.setData({
    //           phone: res.data.data.phone,
    //           btnvalue: '再次提交'
    //         })
    //       }
    //     }
    //   }
    // })
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
  getnameValue: function (e) {
    this.setData({
      username: e.detail.value
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
        url: globalData.serverurl + '/send_sms.html',
        data: {
          phone: this.data.phone,
          uaid: wx.getExtConfigSync().uaid,
          udid: wx.getExtConfigSync().udid,

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
    var openid = wx.getStorageSync("openid");
    var that = this;
    if (that.data.phone == "") {
      wx.showToast({
        title: '手机号不能为空',
        icon: 'none',
        duration: 1000
      })
      return false;
    } else if (!myreg.test(that.data.phone)) {
      wx.showToast({
        title: '请输入正确的手机号',
        icon: 'none',
        duration: 1000
      })
      return false;
    } else if (that.data.code == "") {
      wx.showToast({
        title: '请输入验证码',
        icon: 'none',
        duration: 1000
      })
    } else if (that.data.username == "") {
      wx.showToast({
        title: '请输入职工名称',
        icon: 'none',
        duration: 1000
      })
    }
    else if (that.data.code != that.data.codeInput) {
      wx.showToast({
        title: '请输入正确的验证码',
        icon: 'none',
        duration: 1000
      })
      return false;
    } else {
      wx.request({
        url: 'https://www.nx.tt/addon/collection/api/user',
        data: {
          uaid: wx.getExtConfigSync().uaid,
          phone: that.data.optionPhone,
          act: 'form',
          openid: openid,
          name: that.data.username || that.data.username1,
          new_phone: that.data.phone || that.data.userphone1,
          udid: wx.getExtConfigSync().udid,
          mpid: wx.getExtConfigSync().mpid
          // ucid: 1
        },
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded' // 默认值
        },
        success(res) {
          if (res.data.code == 1) {
            wx.setStorageSync('phone', that.data.phone);
            wx.navigateTo({
              url: '../phoneperson/phoneperson',
            })
          } else if (res.data.code == 0 && res.data.msg == "员工已存在，请务重复录入。") {
            that.setData({
              phoneIsShow: true
            })
          } else if (res.data.code == 0) {
            wx.showToast({
              title: '编辑失败',
              icon: 'none'
            })
          }
        }
      })
    }
  
        
  },

  // 删除员工
  deleteuser: function () {
    var that = this;
    var openid = wx.getStorageSync("openid")
    wx.showModal({
      title: '您确定要删除这个员工吗？',
      content: '',
      success: function (res) {
        console.log(res)
        if (res.confirm) {
          wx.request({
            url: 'https://www.nx.tt/addon/collection/api/user',
            data: {
              uaid: wx.getExtConfigSync().uaid,
              phone: that.data.optionPhone,
              act: 'delete',
              openid: openid,
              mpid: wx.getExtConfigSync().mpid,
              udid: wx.getExtConfigSync().udid
            },
            header: {
              'content-type': 'application/x-www-form-urlencoded' // 默认值
            },
            success(res) {
              if (res.data.code == 1) {
                wx.showToast({
                  title: '删除成功',
                  icon: 'none'
                })
                wx.navigateTo({
                  url: '../phoneperson/phoneperson',
                })
              } else if (res.data.code == 0) {
                wx.showToast({
                  title: '删除失败',
                  icon: 'none'
                })
              }
            }
          })
        } else {
          console.log('弹框后点取消')
        }
      }
    })

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