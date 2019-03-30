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
    code:'',
    address_flag:false,
    phone_flag:false,
    uploud_flag:false,
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
    uservalue:'',
    getopenid: '',
    phonelist: false,
    phonenum: '',
    isShowFirst: false,
    waitShow: false
  },

  /**
   * 生命周期函数--监听页面加载
   */

  // 呼叫收运车
  addyuyue: function(){
    wx.navigateTo({
      url: '../index/index',
    })
  },

  onShow: function (options) {
    // this.setData({
    //   navH: app.globalData.navHeight
    // })
    var that = this;
    const shop_name = wx.getStorageSync("shopname")
    const shop_address = wx.getStorageSync('shop_address');
    const shop_lat = wx.getStorageSync('shop_lat');
    const shop_lng = wx.getStorageSync('shop_lng');
    const phone = wx.getStorageSync('phone');
    const business_licence = wx.getStorageSync('business_licence');
    const agreement = wx.getStorageSync('agreement');
  
    wx.request({
      url: 'https://www.nx.tt/addon/collection/api/join',
      data:{
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
        console.log(res, '店铺信息1111')
        if (res.data.code == 0) {
          that.setData({
            phone: "待完善",
            address: "待完善",
            addressDetails: '',
            code: "待完善",
            shopname: "待完善",
            uservalue: '待完善',
            phonenum: '待完善',
            isShowSuceess: false,
            isShowFirst: true
          })
        }
        if (res.data.code == 1) {
          if (res.data.data.status == 0) {
            that.setData({
              phone: "待完善",
              address: "待完善",
              code: "待完善",
              addressDetails: '',
              shopname: "待完善",
              uservalue: '待完善',
              phonenum: '待完善',
              isShowSuceess: false,
              isShowFirst: true
            })
          }
          if (res.data.data.status == 3) {
            that.setData({
              phone: "",
              address: "",
              code: "",
              shopname: "",
              addressDetails: '',
              uservalue: '',
              isShowFail: true,
              isShowSuceess: false,
              reasonInfo: res.data.data.reason,
              successImg: '../../images/fail.png',
              getopenid: res.data.data.openid,
              phonenum: "",
              isShowFirst: false
            })
          }
          if (res.data.data.status == 2 && res.data.data.name == "") {
            that.setData({
              shopname: '待完善',
              isShowSuceess: false,
              isShowFirst: true,
            })
          }
          if (res.data.data.status == 2 && res.data.data.phone == "") {
            that.setData({
              phone: '待完善',
              isShowSuceess: false,
              isShowFirst: true,
            })
          }
          if (res.data.data.status == 2 && res.data.data.address == "" && res.data.data.lat == "" && res.data.data.lng == "") {
            that.setData({
              address: '待完善',
              addressDetail: '',
              isShowSuceess: false,
              isShowFirst: true,
            })
          }
          if (res.data.data.status == 2 && res.data.data.license == "" && res.data.data.agreement == "") {
            that.setData({
              code: '待完善',
              isShowSuceess: false,
              isShowFirst: true,
            })
          }
          if (res.data.data.status == 2 && res.data.data.name != "") {
            that.setData({
              shopname: '待审核',
              isShowSuceess: false,
              successImg: '../../images/fail.png',
              isShowFirst: true,
            })
          }
          if (res.data.data.status == 2 && res.data.data.phone != "") {
            that.setData({
              phone: "待审核",
              isShowFirst: true,
              isShowSuceess: false,
              successImg: '../../images/fail.png'
            })
          }
          if (res.data.data.status == 2 && res.data.data.address != "") {
            that.setData({
              address: "待审核",
              addressDetails: '',
              isShowSuceess: false,
              isShowFirst: true,
              successImg: '../../images/fail.png'
            })
          }
          if (res.data.data.status == 2 && res.data.data.agreement != "" && res.data.data.license != "" && res.data.data.address != "" && res.data.data.phone != "" && res.data.data.name != "") {
            console.log(888888)
            that.setData({
              code: "待审核",
              isShowSuceess: false,
              isShowFirst: false,
              waitShow: true,
              successImg: '../../images/fail.png'
            })
          }
          if (res.data.data.status == 2 && res.data.data.agreement != "" && res.data.data.license != "") {
            that.setData({
              getopenid: res.data.data.openid,
              phonenum: '待审核',
            })
          }
          if (res.data.data.status == 1) {
            that.setData({
              phone: res.data.data.phone,
              address: res.data.data.address,
              addressDetails: res.data.data.house_number,
              code: "已认证",
              shopname: res.data.data.name,
              uservalue: '已认证',
              phonenum: that.data.phonenum,
              isShowSuceess: true,
              getopenid: res.data.data.openid,
              isShowFirst: false,
              successImg: '../../images/success.png'
            })
          } 
          if (res.data.data.status == 1 && res.data.data.phone == ""){
            that.setData({
              phone: "待完善",
            })
            
          } 
          if (res.data.data.status == 1 && res.data.data.address == ""){
            that.setData({
              address: '待完善',
              addressDetails: '',
            })
          }
          if (res.data.data.status == 1 && res.data.data.agreement == "" && res.data.data.license == "") {
            that.setData({
              code: "待完善",
            })
          }
          if (res.data.data.status == 1 && res.data.data.name == "") {
            that.setData({
              shopname: "待完善",
            })
          }
          var phonenumber = wx.getStorageSync("phonenumbers")
          wx.request({
            url: 'https://www.nx.tt/addon/collection/api/shop',
            data: {
              uaid: globalData.uaid,
              mpid: globalData.mpid,
              udid: globalData.udid,
              openid: globalData.openid,
              phone: phonenumber
            },
            method: 'GET',
            success(resd) {
              if (resd.data.code == 1) {
                wx.setStorageSync("shopLat", res.data.data.lat)
                wx.setStorageSync("shopLng", res.data.data.lng)
                wx.setStorageSync("shopId", res.data.data.id)
                if (resd.data.data.openid == globalData.openid){
                  that.setData({
                    phonelist: false
                  })
                } 
                if (resd.data.data.openid != globalData.openid){
                  wx.navigateTo({
                    url: '../login/login',
                  })
                }
              } 
            }
          })
        }
      }
    })
  },

  // 员工
  user: function(){
    wx.navigateTo({
      url: '../user/user',
    })
  },

  // 店铺地址
  shopadd: function(){
    wx.navigateTo({
      url: '../shop_address/shop_address',
    })
  },

  // 商家电话
  phone: function(){
    if (this.data.phonelist == true){
      console.log(this.data.phonenum,'phonenumberber')
      wx.navigateTo({
        url: '../useradd/useradd?id=' + this.data.phonenum,
      })
    } else{
      wx.navigateTo({
        url: '../phone/phone',
      })
    }
  },

  // 上传执照
  photoUplaod: function(){
    wx.navigateTo({
      url: '../upload_photo/upload_photo',
    })
  },

  // 法人姓名
  shopname: function () {
    wx.navigateTo({
      url: '../shopname/shopname',
    })
  },

  // 未通过审核
  failmask: function(){
    this.setData({
      isShowFail: false,
      failIsShow: true
    })
  },

  // 关闭未通过审核原因
  failKnow: function(){
    this.setData({
      failIsShow: false, 
      isShowFail: true
      // isShowFail: true
    })
  },

  onLoad: function(){
    var that = this;
    var avatar = wx.getStorageSync("avatarUrl");
    var nickname = wx.getStorageSync("nickname")
    if (avatar == "" && nickname == "") {
      wx.navigateTo({
        url: '../authorize/authorize',
      })
    }

    var socketOpen = false
    //注册信息
    var data = {

    }
    var socketMsgQueue = JSON.stringify(data)
    //建立连接
    wx.connectSocket({
      url: "wss://www.nx.tt/wss",
    })
    wx.onSocketOpen(function (res) {
      console.log('WebSocket连接已打开！')
      socketOpen = true
      console.log('数据发送中' + socketMsgQueue)
      sendSocketMessage(socketMsgQueue)
    })
    function sendSocketMessage(msg) {
      if (socketOpen) {
        wx.sendSocketMessage({
          data: msg
        })
      } else {
        socketMsgQueue.push(msg)
      }
    }
    wx.onSocketError(function (res) {
      console.log('WebSocket连接打开失败，请检查！')
    })
    wx.onSocketMessage(function (res) {
      console.log('收到服务器内容：' + JSON.stringify(res))
      var resJson = JSON.parse(res.data);
      if (resJson.type == "init") {
        that.setData({
          clientIds: resJson.client_id
        })
        wx.setStorageSync("clientIds", resJson.client_id)
      }

    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
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