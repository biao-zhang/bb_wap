const axios = require('axios')
const qs = require('qs')

const goodsDetail = {
  namespaced: true,
  state: {
    show_one: false,

    // shopId:'',
    // goodsId:'',          //商品id
    curGoodsId: '', // 商品id
    curSvIds: [],  // 规格id
    curShopId: '', // 店铺id
    curProductId: '', // 单品id
    curNum: 1,  // 数量
    curActivityId: '', // 活动ID(秒杀与生鲜商品商品购买时，活动ID必传)
    curActivityType: '', // 活动类别(秒杀与生鲜商品商品购买时，买活动类别必传) 活动类别：1.秒杀，2生鲜
    goodsType: '',     //类型*/
    // 活动商品详情数据
    curProduct: {},
    GoodsDetailDatas: {},
    // 折扣红包数据
    DiscountDatas: {},
    // 根据商品ID查询B2C商品详情内容
    goodsDetailContent: {},
    // 根据商品ID查询全部评价
    goodsComment: [],
    // 根据商品id统计次数
    goodsCommentCount: {},
    //商店商品列表
    ShopListData: {}
  },
  getters: {

  },
  mutations: {
    setShowOne(state, payload) {
      state.show_one = payload;
    },
    setGoodsId(state, data) {
      state.curGoodsId = data;
    },
    setCurSvIds(state, data) {
      state.curSvIds[data[0]] = data[1];
    },
    clearCurSvIds(state, data) {
      state.curSvIds = [];
    },
    getShopId(state, data) {
      state.curShopId = data;
    },
    setCurProductId(state, data) {
      state.curProductId = data;
    },
    clearProduct(state,data)
    {
      state.curProduct = {};
    },
    getProduct(state, data) {
      state.curProduct = data;
    },
    setCurNum(state, data) {
      state.curNum = data;
    },
    setCurActivityId(state, data) {
      state.curActivityId = data;
    },
    setGoodsType(state, data) {
      state.goodsType = data;
    },

    //获取折扣红包数据
    Discounts(state, data) {
      state.DiscountDatas = data;
    },
    // 活动商品详情（具体内容非富文本）
    GoodsDetailData(state, data) {
     /* state.GoodsDetailDatas = data.data;

      state.curShopId = data.data.goodsShopVO.shopId
      state.curActivityId = data.data.activityId
      state.curActivityType = data.data.gtVal*/
    },
    // 根据商品ID查询B2C商品详情内容
    goodsDetailContent(state, payload) {
      state.goodsDetailContent = payload.data
    },
    // 根据商品ID查询全部评价
    goodsComment(state, payload) {
      state.goodsComment = payload.data
    },
    // 根据商品id统计次数
    goodsCommentCount(state, payload) {
      state.goodsCommentCount = payload.data
    },
    //根据商店Id获取商品列表
    getShopList(state, data) {
      state.ShopListData = data
    },
  },
  actions: {
    // 活动商品详情（具体内容非富文本）
    getGoodsDetailDatas({ state, commit, dispatch }, params) {

      axios.post('/shop/api/goods/searchGdInfoById', qs.stringify(
        {
          goodsId: state.curGoodsId, // '37123523743437'state.curGoodsId
          goodsType: 1
        }))
        .then((response) => {

          commit('GoodsDetailData', response.data)

          /*dispatch('getDiscount', response.data.data.goodsShopVO.shopId)*/
        })
        .catch((error) => {
          console.log("cartOrderDatasError1", error)
        })
    },
    //详情优惠券
    getDiscount({ state, commit }, params) {

      console.log('获取的店铺ID', params)
      
      axios.post('/promotion/discountRedPacket/findDiscountByShopId', qs.stringify(
        {
          shop_id: params,  // params
          shop_type: '1'    // 1.b2c，2.o2o
        }))
        .then((response) => {

          commit('Discounts', response.data.data)

          console.log('折扣红包后台数据', response.data)
        })
        .catch((error) => {
          console.log("cartOrderDatasError2", error)
        })
    },
    // 根据商品ID查询B2C商品详情内容（富文本）
    goodsDetailContent({ state, commit }, payload) {

      let selectListdata
      axios.post('/shop/api/goods/searchGdById', qs.stringify({
        goodsId: state.curGoodsId,    // 商品ID '37123523743437'
        goodsType: 1,  // 商品类型：1代表B2C本地商品，2代表合作终端商品，3代表B2C本地活动商品
      }))
        .then((response) => {
          selectListdata = response.data
          commit('goodsDetailContent', selectListdata)
        })
        .catch((error) => {
          console.log('错误信息', error)
        })
    },
    // 根据商品ID查询全部评价
    goodsComment({ state, commit }, payload) {

      let selectListdata
      axios.post('/shop/api/goodsEvaluate/searchEvaluateByGoodsId', qs.stringify({
        pageNum: 1,
        pageSize: 10,
        goodsId: state.curGoodsId,    // 商品ID '37123523743437'
        evaluateLevel: payload.evaluateLevel // 评价级别(1,好；2.中；3.差)
      }))
        .then((response) => {
          selectListdata = response.data
          commit('goodsComment', selectListdata)
        })
        .catch((error) => {
          console.log('错误信息', error)
        })
    },
    // 根据商品id统计次数
    goodsCommentCount({ commit }, payload) {
      let selectListdata
      axios.post('/shop/api/goodsEvaluate/countEvaluateByLevel', qs.stringify({
        goodsId: payload.curGoodsId,    // 商品ID'37123523743437'
      }))
        .then((response) => {
          selectListdata = response.data
          commit('goodsCommentCount', selectListdata)
        })
        .catch((error) => {
          console.log('错误信息', error)
        })
    },
    //获取单品id
    getProductId({ commit }, params) {
      // console.log(params,'获取单品ID')
      axios.post('/shop/api/goodsB2C/searchGpdById', qs.stringify({
        goodsId: params.goodsId,
        svIds: params.svIds,
      }))
        .then((response) => {
          commit('setCurProductId', response.data.data.productId)
        })
        .catch((error) => {
          console.log('getProductId', error)
        })
    },
    //获取单品信息
    getProduct({ commit }, params) {
      // console.log(params,'获取单品')
      return axios.post('/shop/api/goods/searchGpdById', qs.stringify({
        goodsId: params.goodsId,
        svIds: params.svIds,
        goodsType:params.goodsType,
      }))
        .then((response) => {
          commit('getProduct', response.data.data)
        })
        .catch((error) => {
          console.log('getProductId', error)
        })
    },
    //根据店铺ID查询店铺商品列表
    getShopList({ commit }, params) {
      axios.post('/shop/api/goodsB2C/searchB2CShopGoods', qs.stringify({
        pageNum: 1,
        pageSize: 10,
        shopId: params.shopId,
      }))
        .then((response) => {
          commit('getShopList', response.data.data)
        })
        .catch((error) => {
          console.log('getShopList', error)
        })
    },
  }
}

module.exports = goodsDetail;
