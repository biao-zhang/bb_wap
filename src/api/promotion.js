import http from './public'
const baseUrl = '/promotion'

export const getAllList = (params) => {
  return http.fetchPost(`${baseUrl}/b2c_local/cart/allList`,params)
}

// 获取我的折扣红包（可用）
export const findAllYesDiscount = (params) => {
  return http.fetchPost(`${baseUrl}/discountRedPacket/findAllYesDiscount`,params)
}

// 获取我的折扣红包（不可用）
export const findAllNoDiscount = (params) => {
  return http.fetchPost(`${baseUrl}/discountRedPacket/findAllNoDiscount`,params)
}

// 获取B2C所有的线上折扣红包
export const findAllDiscount = (params) => {
  return http.fetchPost(`${baseUrl}/discountRedPacket/findAllDiscount`,params)
}

// 用户领取线上折扣红包
export const getDiscount = (params) => {
  return http.fetchPost(`${baseUrl}/discountRedPacket/getDiscount`,params)
}

// 详情页面 获取店铺所有红包
export const getFindDiscountByShopId = (params) =>{
  return http.fetchPost(`${baseUrl}/discountRedPacket/findDiscountByShopId`,params)
}

//-------------------------------------------     lmlmlmlmlmlmlmlmlmlmlmlmlmlm---------------------------------------
//发红包
export const setRed = (params) =>{
  return http.fetchPost(`${baseUrl}/redPacket/giveRed`,params)
}
/// 获取已发红包列表
export const getMyRedSended = (params) =>{
  return http.fetchPost(`${baseUrl}/redPacket/myGiveOutCash`,params)
}
//获取红包详情
export const getRedDetail = (params) =>{
  return http.fetchPost(`${baseUrl}/redPacket/findCashDetail`,params)
}
//获取正在发放的红包
export const getRedIng = (params) =>{
  return http.fetchPost(`${baseUrl}/redPacket/findMyCash`,params)
}
//---------------------------------------------lmllmlmlmlmlmlm ---------end ---------------------------
