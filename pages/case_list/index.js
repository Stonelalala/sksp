// pages/case_list/index.js
import {getArticleCategoryList, getArticleList } from '../../api/api.js'
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    CustomBar:0,
    picker:[
      {
        id:4,
        name:'背景墙'
      },
      {
        id:5,
        name:'台面'
      },
      {
        id:6,
        name:'楼梯'
      }
    ],
    index:0,
    cid:0,
    page:1,
    limit:10,
    article_list:[],
    isOver:false,
    keyword:''
  },
  PickerChange(e) {
    this.setData({
      index: e.detail.value,
      cid:this.data.picker[e.detail.value].id,
      article_list:[],
      isOver:false,
      page:1,
    });
    this.getArticleList();
  },
  search:function(){
    this.setData({
      article_list:[],
      isOver:false,
      page:1,
    });
    this.getArticleList();
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(options.id && options.id > 0){
      this.setData({
        cid:options.id,
      })
    }
    this.setData({
      CustomBar:app.globalData.CustomBar
    });
    this.getArticleCategoryList();
    this.getArticleList();

  },
  /**
   * 获取文章分类
   */
  getArticleCategoryList:function(){
    let that = this;
    getArticleCategoryList().then(res => {
      res.data[0].title = '全部';
      let i = 0;
      for(; i < res.data.length; i++){
        if(res.data[i].id == that.data.cid){
          break;
        }
      }
      that.setData({
        picker:res.data,
        index:i
      });
    }).catch(err => {

    })
  },
  /**
   * 获取文章列表
   */
  getArticleList:function(){
    let that = this;
    getArticleList(this.data.cid,{page:this.data.page,limit:this.data.limit,keyword:this.data.keyword}).then(res => {
      let article_list = that.data.article_list;
      if(res.data.length < 1){
        that.setData({
          isOver:true,
          page:that.data.page - 1
        });
        return
      }
      article_list = article_list.concat(res.data);
      that.setData({
        article_list:article_list
      });
    }).catch(err => {

    })
  },
  detail:function(e){
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/case_detail/index?id=' + id,
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
    this.setData({
      page:this.data.page + 1
    });
    this.getArticleList();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})