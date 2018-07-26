
const axios = require('axios')
const qs = require('qs')

const shopGoodsList = {
  namespaced: true,
  state: {
    pageNum: '',
    pageSize: '',
    categoryId: '',
    goodsName: '',
    brandId: '',
    goodsCatId: '',
    sortType: '',
    adcode: '410103',
    // 查询B2C商品列表(非新品)
    shopGoodsList: [],
    // 查询B2C商品列表(新品)
    shopGoodsNewList: [],
    // 查询新品列表页面banner图
    shopBanner: []
  },
  mutations:{
    setPageNum(state, payload) {
      state.pageNum = payload
    },
    setPageSize(state, payload) {
      state.pageSize = payload
    },
    setgoodsName(state, payload) {
      state.goodsName = payload
    },
    setbrandId(state, payload) {
      state.brandId = payload
    },
    setgoodsCatId(state, payload) {
      state.goodsCatId = payload
    },
    setsortType(state, payload) {
      state.sortType = payload
    },
   /* setAdcode(state, payload) {
      state.adcode = payload
    },*/
    // 查询B2C商品列表(移动端)
    shopGoodsList(state, payload) {
      state.shopGoodsList = payload.data
    },
    // 查询B2C商品列表(新品)
    shopGoodsNewList(state, payload) {
      state.shopGoodsNewList = payload.data
    },
    // 查询新品列表页面banner图
    shopBanner(state, payload) {
      state.shopBanner = payload.data
    },
  },
  actions: {
    // 查询B2C商品列表(移动端)
    shopGoodsList({ commit, state }, payload) {
      console.log('哈哈',state)
      let adcode = localStorage.getItem('curCityAdcode')
      let selectListdata
      axios.post('/shop/api/goodsB2C/searchB2CGoodsList', qs.stringify({
        adcode: adcode,
        pageNum: state.pageNum,
        pageSize: state.pageSize,
        goodsName: state.goodsName,   // 商品名称
        brandId: state.brandId,       // 品牌ID
        goodsCatId: state.goodsCatId,  // 分类ID
        sortType: state.sortType,      // 排序类型（1是按创建时间倒叙排列；2是按商品价格正序排列；3是按商品价格倒叙排列，4是按商品销量正序排列；5是按商品销量倒叙排列）
        isNew: '',                      // 是否新品推荐：0代表否，1代表是, 不填代表所有
      }))
        .then((response) => {
          selectListdata = response.data
          commit('shopGoodsList', selectListdata)

          console.log('非新品商品列表', selectListdata)

        })
        .catch((error) => {
          console.log('错误信息', error)
        })
    },
    // 查询B2C商品列表(新品)
    shopGoodsNewList({ commit, state }, payload) {
      let adcode = localStorage.getItem('curCityAdcode')
      let selectListdata
      axios.post('/shop/api/goodsB2C/searchB2CGoodsList', qs.stringify({
        adcode: adcode,
        pageNum: state.pageNum,
        pageSize: state.pageSize,
        goodsName: state.goodsName,   // 商品名称
        brandId: state.brandId,       // 品牌ID
        goodsCatId: state.categoryId,  // 分类ID
        sortType: state.sortType,      // 排序类型（1是按创建时间倒叙排列；2是按商品价格正序排列；3是按商品价格倒叙排列，4是按商品销量正序排列；5是按商品销量倒叙排列）
        isNew: 1,                      // 是否新品推荐：0代表否，1代表是
      }))
        .then((response) => {
          selectListdata = response.data
          commit('shopGoodsNewList', selectListdata)

          console.log('新品商品列表', selectListdata)

        })
        .catch((error) => {
          console.log('错误信息', error)
        })
    },
    // 查询新品列表页面banner图
    shopBanner({ commit, state }, payload) {
      let adcode = localStorage.getItem('curCityAdcode')
      let selectListdata
      axios.post('/shop/api/goodsB2C/searchB2cBs', qs.stringify({
        zdType: 0, // 终端类型：0代表移动端,1代表pc端
        adcode: adcode,
      }))
        .then((response) => {
          selectListdata = response.data
          commit('shopBanner', selectListdata)

          console.log('后台数据1', selectListdata)
          console.log('payload', payload)
        })
        .catch((error) => {
          console.log('错误信息', error)
        })
    }
  }
}

module.exports = shopGoodsList;
