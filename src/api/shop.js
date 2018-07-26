import http from './public'
const baseUrl = '/shop'

//------------niujunyang--------------
// 详情页面 详情内容
export const getSearchGdById = (params) => {
  return http.fetchPost(`${baseUrl}/api/goods/searchGdById`,params)
}

// 详情页面  整合信息
export const getSearchGdInfoById = (params) => {
    return http.fetchPost(`${baseUrl}/api/goods/searchGdInfoById`, params)
  }

// 评价页面 根据商品ID查询全部评价
export const getSearchEvaluateByGoodsId = (params) =>{
  return http.fetchPost(`${baseUrl}/api/goodsEvaluate/searchEvaluateByGoodsId`,params)
}
// 详情页面 获取productId
export const getSearchGpdById = (params) =>{
  return http.fetchPost(`${baseUrl}/api/goods/searchGpdById`,params)
}

//详情页 客服
export const getQueryShopSettingById = (params) =>{
  return http.fetchPost(`${baseUrl}/shopSettingController/queryShopSettingById`,params)
}


export const getAllList = (params) => {
  return http.fetchPost(`${baseUrl}/b2c_local/cart/allList`,params)
}


// 终端端的商品
export const getOneshop = (params) => {
  return http.fetchPost(`${baseUrl}/api/goodsO2O/searchO2OInfo`,params)
}

// 终端端商品的分类
export const getTwoshop = (params) => {
  return http.fetchPost(`${baseUrl}/api/goodsO2O/searchO2OGoodsList`,params)
}

//-------------------------------lmllmlmlmlmlmlmlmlmlml-------------------------
//购物车商品移入收藏 /api/goodsCollection/moveIntoCollection
export const moveIntoCollection = (params) => {
  return http.fetchPost(`${baseUrl}/api/goodsCollection/moveIntoCollection`,params)
}

// 查询秒杀时间
export const searchSeckillTime = (params) => {
  return http.fetchPost(`${baseUrl}/api/SeckillGoodsB2c/searchSeckillTime`,params)
}

// 根据时间id查询秒杀商品列表
export const searchSeckillGoodsp = (params) => {
  return http.fetchPost(`${baseUrl}/api/SeckillGoodsB2c/searchSeckillGoodsp`,params)
}

// 查询生鲜时间
export const searchFreshTimes = (params) => {
  return http.fetchPost(`${baseUrl}/api/SeckillGoodsB2c/searchFreshTimes`,params)
}

// 根据时间id查询生鲜商品列表
export const searchFreshGoodsp = (params) => {
  return http.fetchPost(`${baseUrl}/api/SeckillGoodsB2c/searchFreshGoodsp`,params)
}

// 根据商品名称模糊查询
export const searchGnList = (params) => {
  return http.fetchPost(`${baseUrl}/api/goods/searchGnList`,params)
}

// 查询B2C商品列表(移动端)
export const searchB2CGoodsList = (params) => {
  return http.fetchPost(`${baseUrl}/api/goodsB2C/searchB2CGoodsList`,params)
}

// 根据商品ID和规格值ID查询单品详情
export const searchGpdById = (params) => {
  return http.fetchPost(`${baseUrl}/api/goods/searchGpdById`,params)
}

///////////////////////////////////////////////////////////////////////////////////////////收藏商品
//收藏商品（列表）
export const collectCommodity = (params) => {
  return http.fetchPost(`${baseUrl}/api/goodsCollection/searchCollectionApp`,params)
}

//删除收藏商品
export const deleteCommodity = (params) => {
  return http.fetchPost(`${baseUrl}/api/goodsCollection/deleteGoodsCollection`,params)
}

// 添加收藏或取消
export const addGoodsCollection = (params) => {
  return http.fetchPost(`${baseUrl}/api/goodsCollection/addGoodsCollection`,params)
}

// 判断该商品是否收藏
export const searchGoodsIsNotCollection = (params) => {
  return http.fetchPost(`${baseUrl}/api/goodsCollection/searchGoodsIsNotCollection`,params)
}

// 根据评价级别统计次数
export const countEvaluateByLevel = (params) => {
  return http.fetchPost(`${baseUrl}/api/goodsEvaluate/countEvaluateByLevel`,params)
}

//关于我们
export const aboutUs = (params) => {
  return http.fetchPost(`${baseUrl}/helpCenter/getHelpCenter`,params)
}

// 根据分类Id查询优选商品
export const searchGoodsByCayId = (params) => {
  return http.fetchPost(`${baseUrl}/api/priority/searchGoodsByCayId`,params)
}

//等级
export const gradeData = (params) => {
  return http.fetchPost(`${baseUrl}/helpCenter/getHelpCenter`,params)
}

///////////////////////////////////////////////////////////////////////////判断是否是存在运营中心
export const searchRegion = (params) => {
  return http.fetchPost(`${baseUrl}/api/region/searchRegionAPI`,params)
}

////////////////////////////////////////////////////////////////////////////////////////////普通商店
export const shopStore = (params) => {
  return http.fetchPost(`${baseUrl}/api/goodsB2C/searchB2CShopGoods`,params)
}

// 查运营中心客服
export const queryCustomer = (params) => {
  return http.fetchPost(`${baseUrl}/customerSetController/queryCustomer`,params)
}





























