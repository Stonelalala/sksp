// pages/category/index.js
import { getUserInfo} from '../../api/user.js';
import { CACHE_USERINFO } from '../../config.js'
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    CustomBar:0,
    isGoIndex:true,
    iShidden:false,
    isAuto:false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      CustomBar:app.globalData.CustomBar
    });
  },
  /**
     * 授权回调
    */
  onLoadFun:function(e){
    this.getUserInfo();
  
  },
   /**
   * 获取个人用户信息
  */
  getUserInfo:function(){
    var that=this;
    getUserInfo().then(res=>{
      const generalContent="generalContent.promoterNum";
      // console.log(JSON.stringify(res.data))
      let userInfo  = wx.getStorageSync(CACHE_USERINFO);
      if(userInfo != ''){
        let user = JSON.parse(userInfo);
        user.is_promoter = res.data.is_promoter;
        wx.setStorageSync(CACHE_USERINFO, JSON.stringify(user));
      }
      that.setData({ 
        iShidden:true,
        userInfo: res.data, 
        loginType: res.data.login_type
      });
      //个人中心不强制绑定手机号，隐藏checkPhone
      //that.checkPhone();
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})