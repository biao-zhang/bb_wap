const axios = require('axios')
const qs = require('qs')

const shop = {
  namespaced: true,
  state: {
    moduleA:"A",
    judgeData:{},  //判断
    IndexData:{},   //首页数据
    DistrictList:{}, //地区列表

  },
  mutations:{
    // 判断
    judgeDatas(state, data) {
      state.judgeData = data
    },
    // 首页
    IndexDatas(state, data) {
      state.IndexData = data
    },
    // 地区列表
    DistrictLists(state, data) {
      state.DistrictList = data
    },
  },
  actions:{
    // 判断定位的adcode是否有服务
    getJudge({state,commit,dispatch},params){
      console.log('获取d',params)
      axios.post('/shop/api/region/searchRegionAPI',qs.stringify({
        adcode:110000
      }))
        .then((response)=>{
          commit('judgeDatas', response.data.data)
          console.log('判断', response.data.data)
        })
        .catch((error)=>{
          console.log("cartOrderDatasError1",error)
        })
    },

    //获取首页数据
    getIndexDatas({state,commit,dispatch},params){
      console.log('666',params)
      axios.post('/shop/api/SeckillGoodsB2c/searchAppHomePage',qs.stringify({
        adcode:params.adcode,
        shopType:2
        }))
        .then((response)=>{
          commit('IndexDatas', response.data.data)
          console.log('首页数据', response.data.data)
        })
        .catch((error)=>{
          console.log("cartOrderDatasError1",error)
        })
    },
    // 获取开通的地区列表
    getDistrictList({state,commit,dispatch},params){
      axios.post('/shop/api/region/searchKTRegionAPI',qs.stringify({

      }))
        .then((response)=>{
          commit('DistrictLists', response.data.data)
          console.log('地理列表', response.data.data)
        })
        .catch((error)=>{
          console.log("cartOrderDatasError1",error)
        })
    },
  }
}

module.exports = shop;
