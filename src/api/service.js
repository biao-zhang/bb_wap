import http from './public'
const baseUrl = '/service'

export const getAllList = (params) => {
  return http.fetchPost(`${baseUrl}/b2c_local/cart/allList`,params)
}
//预约订单 获取用户的所有预约服务订单
export const getAllYuYueOrder = (params) => {
  return http.fetchPost(`${baseUrl}/member/yuYue/order/getAllYuYueOrder`,params)
}

// 获取用户的所有帮帮服务订单(通过状态（普通/预约）)
export const getAllOrder = (params) => {
  return http.fetchPost(`${baseUrl}/member/order/getAllOrder`,params)
}

// 用户取消订单接口
export const serviceInsert = (params) => {
  return http.fetchPost(`${baseUrl}/api/orderRefund/insert`,params)
}

// 会员确认完成帮帮订单
export const serviceOk = (params) => {
  return http.fetchPost(`${baseUrl}/member/order/ok`,params)
}

// 帮工查看帮帮订单详情(所有分类的订单详情都可查)
export const serviceOrderDetail = (params) => {
  return http.fetchPost(`${baseUrl}/member/order/getOrderDetail`,params)
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////lmllmllmllml
//获取所有服务分类
export const serviceClassify = (params) => {
  return http.fetchPost(`${baseUrl}/serveCaty/searchTwoServeCaty`,params)
}
//计算扣点  (家政帮，维修帮)
export const koudian1 = (params) => {
  return http.fetchPost(`${baseUrl}/serveCatyPoints/searchScpByScId`,params)
}
//计算扣点  (找帮手)
export const koudian2 = (params) => {
  return http.fetchPost(`${baseUrl}/serveCatyPoints/searchFindHelper`,params)
}
//计算扣点  (司机帮，跑腿帮)
export const koudian3 = (params) => {
  return http.fetchPost(`${baseUrl}/serveCatyPoints/searchCatyPoints`,params)
}
//获取公益标题图片
export const getTitleImg = (params) => {
  return http.fetchPost(`${baseUrl}/welfareOrder/getWelfareTitleImg`,params)
}
//找帮手最低价
export const getHelperLowerPrice = (params) => {
  return http.fetchPost(`${baseUrl}/serveCatyPoints/getStartingPrice`,params)
}
////////////////////////////////////////////////////////////////////////////////////////////////////////lmlmlmlmlmllllllllllllllllm    end  ////////////////////////
// 服务模糊搜索
export const searchByCatyName = (params) => {
  return http.fetchPost(`${baseUrl}/serve/searchByCatyName`,params)
}

//////////////////////////////////////////////////////////////////////////////////////////////////////消息
//消息列表
export const informationList = (params) => {
  return http.fetchPost(`${baseUrl}/messageInfo/searchMessageById`,params)
}

//消息詳情
export const informationDetails = (params) => {
  return http.fetchPost(`${baseUrl}/messageInfo/searchMessageInfoById`,params)
}

////////////////////////////////////////////////////////////////////////////////////////////////////常見问题
// 常见问题列表
export const problemList = (params) => {
  return http.fetchPost(`${baseUrl}/helpCenter/findHelpCenter`,params)
}

//常见问题详情
export const problemDatails = (params) => {
  return http.fetchPost(`${baseUrl}/helpCenter/findHelpCenterById`,params)
}

//问题反馈
export const problemFeedback = (params) => {
  return http.fetchPost(`${baseUrl}/helpCenter/addFeedback`,params)
}

////////////////////////////////////////////////////////////////////////////////////////////////////服务首页的公益活动
//公益活动（首页三条）
export const threePublicActivity = (params) => {
  return http.fetchPost(`${baseUrl}/welfareOrder/queryHomePageWelfareList`,params)
}

//根据ID查询公益详情
export const publicParticulars = (params) => {
  return http.fetchPost(`${baseUrl}/welfareOrder/searchByNo`,params)
}

//根据公益报名详情
export const applyDetails = (params) => {
  return http.fetchPost(`${baseUrl}/welfareJoin/queryEnrollByWelfareId`,params)
}

//查看更多公益列表
export const seeMoreList = (params) => {
  return http.fetchPost(`${baseUrl}/welfareOrder/searchListByState`,params)
}

//帮助某条公益活动
export const applyJoin = (params) => {
  return http.fetchPost(`${baseUrl}/welfareJoin/insert`,params)
}

//个人中心页面（发布的公益列表）
export const releasedBenefit = (params) => {
  return http.fetchPost(`${baseUrl}/welfareOrder/queryIssueActivity`,params)
}

//个人中心页面（参与的公益列表）
export const participationBenefit = (params) => {
  return http.fetchPost(`${baseUrl}/welfareJoin/searchWelfareListByUser`,params)
}

//确认参与公益活动
export const affirmParticipation = (params) => {
  return http.fetchPost(`${baseUrl}/welfareJoin/updateParticipateIn`,params)
}

//取消发布的公益活动
export const cancelParticipation = (params) => {
  return http.fetchPost(`${baseUrl}/welfareOrder/updateCancel`,params)
}

// 添加好评
export const commentOrder = (params) => {
  return http.fetchPost(`${baseUrl}/member/order/commentOrder`,params)
}

/////////////////////////////////////////////////////////////////////////////////////////////////请他帮忙
// 请他帮忙
export const pleaseHelp = (params) => {
  return http.fetchPost(`${baseUrl}/member/yuYue/order/getLatestOrderByHelperId`,params)
}

//////////////////////////////////////////////////////////////////////////////////////////////// 服务首页轮播图
//服务首页轮播图
export const servicePicture = (params) => {
  return http.fetchPost(`${baseUrl}/api/appcarousel/getAppCarousel`,params)
}






























