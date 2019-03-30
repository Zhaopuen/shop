// pages/user/user.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userList:[
      // {name: '张二狗',phone:"18026351254"},
      // { name: '李铁蛋', phone: "18026351254" }
    ],
    isShow: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var openid = wx.getStorageSync("openid")
    wx.request({
      url: 'https://www.nx.tt/addon/collection/api/user',
      data: {
        uaid: wx.getExtConfigSync().uaid,
        openid: openid,
        udid: wx.getExtConfigSync().udid,
        mpid: wx.getExtConfigSync().mpid,
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success: function (res) {
        console.log(res,'员工列表')
        if (res.data.code == 1) {
          that.setData({
            userList: res.data.data.data
          })
        }
        else if(res.data.code == 0) {
          that.setData({
            isShow: true
          })
        }
      }
    })
  },

  // 添加员工
  adduser: function(){
    wx.navigateTo({
      url: '../useradd/useradd',
    })
  },

  // 编辑职工
  // useraddDetail: function(e){
  //   wx.navigateTo({
  //     url: '../useradd/useradd',
  //   })
  // },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.setNavigationBarTitle({
      title: '职工管理',
    })
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