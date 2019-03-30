// pages/upload_photo/upload_photo.js
const app = getApp();
import { $init, $digest } from '../../utils/common.util';
const globalData = app.globalData;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    images: '', 
    imgShou:'',
    uploadjia: true,
    uploadImg: false,
    uploadjiashou: true,
    uploadImgshou: false,
    btnvalue: '提交'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    // that.setData({
    //   navH: app.globalData.navHeight
    // })
    
    wx.request({
      url: globalData.api_url+'join',
      data: {
        uaid: globalData.uaid,
        openid: globalData.openid,
        udid: globalData.udid,
        mpid: globalData.mpid
      },
      method: 'GET',
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success(res) {
        if (res.data.code == 1) {
          if (res.data.data.status == 0) {
            that.setData({
              images: '',
              imgShou: ''
            })
          } else if (res.data.data.status == 2 && res.data.data.license != "" && res.data.data.agreement != "") {
            that.setData({
              uploadjia: false,
              uploadjiashou: false,
              images: res.data.data.license,
              imgShou: res.data.data.agreement
            })
          } else if (res.data.data.status == 1) {
            that.setData({
              uploadjia: false,
              uploadjiashou: false,
              images: res.data.data.license,
              imgShou: res.data.data.agreement,
              btnvalue: '再次提交'
            })
          } else if (res.data.data.status == 3) {
            that.setData({
              uploadjia: false,
              uploadjiashou: false,
              images: res.data.data.license,
              imgShou: res.data.data.agreement,
              btnvalue: '再次提交'
            })
          }
        }
      }
    })
  },

 

  // 上传图片
  uploadImg(e) {
    var that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],  //可选择原图或压缩后的图片
      sourceType: ['album', 'camera'], //可选择性开放访问相册、相机
      success: res => {
        console.log(res,'hhhhhh')
        var tempFilePaths = res.tempFilePaths;
        for (var i = 0; i < tempFilePaths.length; i++) {
          wx.uploadFile({
            url: globalData.host +'/files/api/upload',
            filePath: tempFilePaths[i],
            method: 'POST',
            header: {
              'content-type': 'application/x-www-form-urlencoded' // 默认值
            },
            name: 'file',
            formData: {
              'user': 'test'
            },
            success: function (res) {
              console.log(res,'22222')
              var data = res.data;
              res = JSON.parse(res.data);
              var imgarr = res.success[0].url;
              if(that.data.imgarr !== ""){
                that.setData({
                  uploadjia:false
                })
              }
              // imgarr.push(res.data.name);
              that.setData({
                images: imgarr
              })
            }
          })
        }
        $digest(this)
      }
    })
  },

  // 营业执照放大图片
  handleImagePreview(e) {
    var that = this;
    var imagesInfo = [];
    imagesInfo.push(that.data.images)
    wx.previewImage({
      current: that.data.images[0],  //当前预览的图片
      urls: imagesInfo
    })
  },

  // 收运协议放大图片
  handleImagePreviewShou(e) {
    var that = this;
    var imagesInfos = [];
    imagesInfos.push(that.data.imgShou)
    wx.previewImage({
      current: that.data.imgShou[0],  //当前预览的图片
      urls: imagesInfos
    })
  },

  uploadImgShou(e) {
    var that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],  //可选择原图或压缩后的图片
      sourceType: ['album', 'camera'], //可选择性开放访问相册、相机
      success: res => {
        var tempFilePaths = res.tempFilePaths;
        for (var i = 0; i < tempFilePaths.length; i++) {
          wx.uploadFile({
            url: globalData.host + '/files/api/upload',
            filePath: tempFilePaths[i],
            method: 'POST',
            header: {
              'content-type': 'application/x-www-form-urlencoded' // 默认值
            },
            name: 'file',
            formData: {
              'user': 'test'
            },
            success: function (res) {
              console.log(res,'res222222')
              var data = res.data;
              res = JSON.parse(res.data);
              var imgarr = res.success[0].url;
              if (that.data.imgarr !== "") {
                that.setData({
                  uploadjiashou: false
                })
              }
              // imgarr.push(res.data.name);
              that.setData({
                imgShou: imgarr
              })
            }
          })
        }
        $digest(this)
      }
    })
  },
  handleImagePreviews(e) {
    const idx = e.target.dataset.idx
    const imgShou = this.data.imgShou
    wx.previewImage({
      current: imgShou[idx],  //当前预览的图片
      urls: imgShou,  //所有要预览的图片
    })
  },

  // 点击提交
  photoBtn(){
    var that = this;
    that.setData({
      images: that.data.images,
      imgShou: that.data.imgShou
    })
    if (that.data.images == "" && that.data.imgShou == ""){
      wx.showToast({
        title: '请上传图片',
        icon: 'none',
        duration: 1000
      })
    } else {
      wx.request({
        url: globalData.api_url+'join',
        data: {
          uaid: globalData.uaid,
          license: that.data.images,
          agreement: that.data.imgShou,
          openid: globalData.openid,
          udid: globalData.udid,
          mpid: globalData.mpid,
          act: "form"
        },
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded' // 默认值
        },
        success(res) {
          if (res.data.code == 1) {
            wx.setStorageSync('business_licence', that.data.images);
            wx.setStorageSync('agreement', that.data.imgShou);
            wx.navigateBack({
              delta: 1
            })
          }
        }
      })
    }
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