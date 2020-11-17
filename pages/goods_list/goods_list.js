import { getProductslist, getProductHot, selectList } from '../../api/store.js';
import {SplitArray} from '../../utils/util.js'
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    productList:[],
    parameter: {
      'navbar': '1',
      'return': '1',
      'title': '商品列表',
      'color': true,
      'class': '0'
    },
    navH: "",
    is_switch:true,
    where: {
      sid: 0,
      keyword: '',
      priceOrder: '',
      salesOrder: '',
      news: 0,
      page: 1,
      limit: 10,
      cid: 0,
      filter:'',
      floorPrice: '',
      highestPrice: '',
      floorLength: '',
      highestLength: '',
      floorWidths: '',
      highestWidths: '',
      arr: [],
      arrNum: []
    },
    price:0,
    stock:0,
    nows:false,
    loadend:false,
    loading:false,
    loadTitle:'加载更多',
    userInfo:{},
    displays:'none',//筛选盒子显隐性
    // floorPrice:'',
    // highestPrice:'',
    // floorLength:'',
    // highestLength: '',
    // floorWidths: '',
    // highestWidths:'',
    selectList:[],
    filterArr:[],
    scrollHeight: wx.getSystemInfoSync().windowHeight-110,
    is_promoter:0,
    isShowPrice:false,
  },
  onLoadFun: function (e) {
    this.setData({
      userInfo: e.detail
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({ 
      ['where.sid']: options.sid || 0, 
      title: options.title || '', 
      ['where.keyword']: options.searchValue || '', 
      navH: app.globalData.navHeight
    });
    this.getSelectList();
    this.get_product_list();
    this.get_host_product();
  },

  
   /**
   * 商品详情跳转
   */
  goDetail: function (e) {
    let item = e.currentTarget.dataset.items;
   if (item.activity && item.activity.type === "1") {
     wx.navigateTo({
      url: `/pages/activity/goods_seckill_details/index?id=${item.activity.id}&time=${item.activity.time}&status=1`
     });
   } else if (item.activity && item.activity.type === "2") {
     wx.navigateTo({ url:  `/pages/activity/goods_bargain_details/index?id=${item.activity.id}&bargain=${this.data.userInfo.uid}`});
   } else if (item.activity && item.activity.type === "3") {
     wx.navigateTo({
       url: `/pages/activity/goods_combination_details/index?id=${item.activity.id}`
     });
   } else {
     console.log(item.id)
     wx.navigateTo({ url: `/pages/goods_details/index?id=${item.id}` });
   }
   },
  Changswitch:function(){
     var that = this;
     that.setData({
       is_switch: !this.data.is_switch
     })
  },
  searchSubmit: function (e) {
    var that = this;
    this.setData({ ['where.keyword']: e.detail.value, loadend: false, ['where.page']: 1 })
    this.get_product_list(true);
  },
  /**
  * 获取我的推荐
  */
  get_host_product: function () {
    var that = this;
    getProductHot().then(res=>{
      that.setData({ host_product: res.data });
    });
  },
  //点击事件处理
  set_where: function (e) {
    var dataset = e.target.dataset;
    switch (dataset.type) {
      case '1':
        return wx.navigateBack({
          delta: 1,
        })
        break;
      case '2':
        if (this.data.price == 0)
          this.data.price = 1;
        else if (this.data.price == 1)
          this.data.price = 2;
        else if (this.data.price == 2)
          this.data.price = 0;
        this.setData({ price: this.data.price, stock: 0 });
        break;
      case '3':
        if (this.data.stock == 0)
          this.data.stock = 1;
        else if (this.data.stock == 1)
          this.data.stock = 2;
        else if (this.data.stock == 2)
          this.data.stock = 0;
        this.setData({ stock: this.data.stock, price: 0 });
        break;
      case '4':
        this.setData({ nows: !this.data.nows });
        break;
    }
    this.setData({ loadend: false, ['where.page']: 1 });
    this.get_product_list(true);
  },
  //设置where条件
  setWhere: function () {
     //设置filter条件
    let filter='';
    let arr=[];
    let selectList = this.data.selectList.map(value=>{
     let len=arr.length; arr[len]=[]
      value.filterChildren.map(item => { if (item.checked) arr[len].push(item.id);})
      arr[len].length == 0 ? arr.pop():arr; });
      arr.map((value,index)=>{ filter += value.join(',')+';'})
       filter=filter.substr(0,filter.length-1);
    this.data.where.filter=filter;

    if (this.data.price == 0)
      this.data.where.priceOrder = '';
    else if (this.data.price == 1)
      this.data.where.priceOrder = 'desc';
    else if (this.data.price == 2)
      this.data.where.priceOrder = 'asc';
    if (this.data.stock == 0)
      this.data.where.salesOrder = '';
    else if (this.data.stock == 1)
      this.data.where.salesOrder = 'desc';
    else if (this.data.stock == 2)
      this.data.where.salesOrder = 'asc';
    this.data.where.news = this.data.nows ? 1 : 0;
    this.setData({ where: this.data.where });
  },
  //查找产品
  get_product_list: function (isPage) {
    let that = this;
    this.setWhere();
    console.log(that.data.where);
    if (that.data.loadend) return;
    if (that.data.loading) return;
    if (isPage === true) that.setData({ productList: [] });
    that.setData({ loading: true, loadTitle: '' });
    getProductslist(that.data.where).then(res=>{
      let list = res.data;
      let productList = SplitArray(list, that.data.productList);
      let loadend = list.length < that.data.where.limit;
      that.setData({
        loadend: loadend,
        loading: false,
        loadTitle: loadend ? '已全部加载' : '加载更多',
        productList: productList,
        ['where.page']: that.data.where.page + 1,
      });
    }).catch(err=>{
      debugger;
      that.setData({ loading: false, loadTitle: '加载更多' });
    });
  },



//获取筛选列表
getSelectList(){
  let that=this;
  // console.log('获取筛选');
  selectList().then(res=>{
    console.log(res)
    if(res.status==200){
      let selectList = res.data.map(value => { value.filterChildren = value.filterChildren.map(item => { item.checked = false; return item }); return value; })
      console.log(selectList);
       
      that.setData({
        selectList: selectList
      })
    }
  }).catch(err => {
    wx.showToast({
      title: '网络异常',
    })
  });
},


  selectValue:function(e){
    let index=e.currentTarget.dataset.index;
    let subIndex=e.currentTarget.dataset.subindex;
    let checked = this.data.selectList[index].filterChildren[subIndex].checked;
    // console.log(index+':'+subIndex)
    let selectList = 'selectList[' + index + '].filterChildren[' + subIndex+'].checked'
       this.setData({
         [selectList]:!checked
       })
    // let filterArr = this.data.filterArr;
    //  id=parseInt(id)
    // if (filterArr.indexOf(id) < 0) {
    //   filterArr.push(id);
    // }
    // else {
    //   filterArr = filterArr.filter(value => value != id)
    // } 
 
    // this.setData({
    //   filterArr: filterArr
    // })

  },
  selectStatus:function(){
    let value=this.data.displays=='none'?'block':'none';
    this.setData({
      displays:value
    })

  },
  inputValue:function(e){
    let type=e.currentTarget.dataset.type;
    let value=e.detail.value;
    let where ='where.'+type
    // console.log(type)
    // console.log(value)
    this.setData({
      [where]:value
    })
  },
  selectButton:function(e){
    let type=e.currentTarget.dataset.type;
    if (type =='reset'){

      this.setData({
        filterArr:[],
        'where.floorPrice': '',
        'where.highestPrice': '',
        'where.floorLength': '',
        'where.highestLength': '',
        'where.floorWidths': '',
        'where.highestWidths': ''
      })
      this.selectInit();
    }
    if (type =='confirm'){
      this.setData({loadend: false, ['where.page']: 1 })
      this.get_product_list(true);
      this.selectStatus();

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

    //判断用户是否登录了
    let userInfo = wx.getStorageSync('USERINFO');
    if(userInfo != ''){
      let user = JSON.parse(userInfo);
      if(user.is_promoter == 1){
        this.setData({
          is_promoter:1
        });
      }else{
        this.setData({
          is_promoter:0
        });
      }
    }
    let user = wx.getStorageSync('USERINFO');
    if(user){
      user = JSON.parse(user);
      if(user.show_price == 1 && user.level > 0 ){
          this.setData({
            isShowPrice:true,
          });
      }
    }
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
    this.setData({['where.page']:1,loadend:false,productList:[]});
    this.get_product_list();
    wx.stopPullDownRefresh();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.get_product_list();
  },
})