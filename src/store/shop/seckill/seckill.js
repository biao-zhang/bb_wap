
const axios = require('axios')
const qs = require('qs')

const seckill = {
  state: {
    // 根据类型查询秒杀商品列表
    seckillList: [],
    // 根据类型查询秒杀时间
    seckillListTime: [],
    // 根据分类Id查询banner图
    // bestGoodsBanner: [],
    // 根据分类Id查询优选商品
    bestGoods: []
  },
  mutations:{
    // 根据类型查询秒杀商品列表
    seckillList(state, payload) {
      state.seckillList = payload.data
      console.log('收到seckillList准备更改数据', payload)
    },
    // 根据类型查询秒杀时间
    seckillListTime(state, payload) {
      state.seckillListTime = payload.data
      console.log('收到seckillListTime准备更改数据', payload)
    },
    // 根据分类Id查询banner图
    // bestGoodsBanner(state, payload) {
    //   state.bestGoodsBanner = payload.data
    //   console.log('收到bestGoodsBanner准备更改数据', payload)
    // },
    // 根据分类Id查询优选商品
    bestGoods(state, payload) {
      state.bestGoods = payload.data
      console.log('收到bestGoods准备更改数据', payload)
    }
  },
  actions: {
    // 根据类型查询秒杀商品列表
    seckillList({ commit }, payload) {
      let selectListdata
      axios.post('shop/api/SeckillGoodsB2c/searchSeckillGoodsp', qs.stringify({
        type: '000591',
        pageNum: 1,
        pageSize: 5,
      }))
        .then((response) => {
          selectListdata = response.data
          commit('seckillList', selectListdata)

          console.log('后台seckillList数据', selectListdata)
          console.log('payload', payload)
        })
        .catch((error) => {
          console.log('错误信息', error)
        })
    },
    // 根据类型查询秒杀时间
    seckillListTime({ commit }, payload) {
      let adcode = localStorage.getItem('curCityAdcode')
      let selectListdata
      axios.post('shop/api/SeckillGoodsB2c/searchSeckillTime', qs.stringify({
        adcode:adcode
      }))
        .then((response) => {
          selectListdata = response.data
          commit('seckillListTime', selectListdata)

          console.log('秒杀时间', selectListdata)
          console.log('秒杀时间payload', payload)
        })
        .catch((error) => {
          console.log('错误信息', error)
        })
    },
    // 根据分类Id查询banner图
    // bestGoodsBanner({ commit }, payload) {
    //   console.log(payload)
    //   let adcode = localStorage.getItem('curCityAdcode')
    //   console.log(adcode)
    //   let selectListdata
    //   axios.get('shop/api/priority/searchEntity', qs.stringify({
    //     adcode:adcode,
    //     categoryId: payload.categoryId
    //   }))
    //     .then((response) => {
    //       selectListdata = response.data
    //       commit('bestGoodsBanner', selectListdata)
    //
    //       console.log('优选商品图片', selectListdata)
    //       // console.log('payload', payload)
    //     })
    //     .catch((error) => {
    //       console.log('错误信息', error)
    //     })
    // },
    // 根据分类Id查询优选商品
    bestGoods({ commit }, payload) {
      let selectListdata
      axios.post('/shop/api/priority/searchGoodsByCayId', qs.stringify({
        pageNum: 1,
        pageSize: 10,
        categoryId: payload.categoryId
      }))
        .then((response) => {
          selectListdata = response.data
          commit('bestGoods', selectListdata)

          console.log('优选商品列表', selectListdata)
          // console.log('payload', payload)
        })
        .catch((error) => {
          console.log('错误信息', error)
        })
    },
  }
}

module.exports = seckill;
