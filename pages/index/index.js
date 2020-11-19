// pages/index/index.js
import {getBenefit} from '../../api/api.js'
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    CustomBar:0,
    swiperList: [{
      id: 0,
      type: 'image',
      url: 'http://wechat.stonemei.com/f4b8f202009091636305603.jpg'
    }, {
      id: 1,
        type: 'image',
        url: 'http://wechat.stonemei.com/55597202009091640438869.jpg',
    }, {
      id: 2,
      type: 'image',
      url: 'http://wechat.stonemei.com/3cc9c202009091630313562.jpg'
    }],
    iconList: [{
      icon: 'similar',
      color: 'shit',
      badge: 120,
      name: '中式'
    }, {
      icon: 'paintfill',
      color: 'shit',
      badge: 1,
      name: '现代'
    }, {
      icon: 'choicenessfill',
      color: 'shit',
      badge: 0,
      name: '轻奢'
    }],
    gridCol:3,
    skin: false,
    benefit:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      CustomBar:app.globalData.CustomBar
    });
    let that = this;
    getBenefit().then(res => {
      that.setData({
        benefit:res.data.benefit
      });
    }).catch(err => {

    });
  },
  goodsDetail:function(e){
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/goods_details/index?id=' + id,
    });
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
  cardSwiper:function(){

  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})