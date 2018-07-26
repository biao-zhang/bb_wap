import http from './public'
const baseUrl = '/personally'

// demo
export const getAllList = (params) => {
    return http.fetchPost(`${baseUrl}/b2c_local/cart/allList`,params)
}

// 前端分页查询商品订单,列表和退款列表
export const goodsSelectList = (params) => {
  return http.fetchPost(`${baseUrl}/userGoodOrder/selectList`,params)
}

// 前端取消订单
export const goodsCancel = (params) => {
  return http.fetchPost(`${baseUrl}/userGoodOrder/addCancelApplicationAdmin`,params)
}

// 前端删除订单
export const goodsDelete = (params) => {
  return http.fetchPost(`${baseUrl}/userGoodOrder/deleteOrderById`,params)
}

// 前端确认收货
export const goodsConform= (params) => {
  return http.fetchPost(`${baseUrl}/userGoodOrder/rogConfirm`,params)
}

// 查看订单详情
export const getOrdersGoodDetails= (params) => {
  return http.fetchPost(`${baseUrl}/userGoodOrder/getOrdersGoodDetails`,params)
}

// 根据订单详情id获取订单详情对象
export const selectOrderDetailByItemId= (params) => {
  return http.fetchPost(`${baseUrl}/userGoodOrder/selectOrderDetailByItemId`,params)
}

// 商品评价
export const addEvaluate= (params) => {
  return http.fetchPost(`${baseUrl}/userGoodOrder/addEvaluate`,params)
}

// 商品追加评价
export const addChaseEvaluate= (params) => {
  return http.fetchPost(`${baseUrl}/userGoodOrder/addChaseEvaluate`,params)
}

// 售后-退款退货
export const addSellBackAdmin= (params) => {
  return http.fetchPost(`${baseUrl}/userGoodOrder/addSellBackAdmin`,params)
}

// 查看物流
export const checkLogistics= (params) => {
  return http.fetchPost(`${baseUrl}/userGoodOrder/checkLogistics`,params)
}

// 退款售后列表
export const selectByUserId= (params) => {
  return http.fetchPost(`${baseUrl}/userGoodOrder/selectByUserId`,params)
}

// 取消售后
export const cancelAfterSale= (params) => {
  return http.fetchPost(`${baseUrl}/userGoodOrder/cancelAfterSale`,params)
}

// 售后详情
export const selectRefundDetailById= (params) => {
  return http.fetchPost(`${baseUrl}/userGoodOrder/selectRefundDetailById`,params)
}

/*o2o*/

// 前端分页查询商品订单订单,列表和退款列表
export const o2oSelectList= (params) => {
  return http.fetchPost(`${baseUrl}/userO2OOrder/selectList`,params)
}

// 查看订单详情
export const o2oGoodDetails= (params) => {
  return http.fetchPost(`${baseUrl}/userO2OOrder/getOrdersGoodDetails`,params)
}

// 删除订单
export const deleteOrderById= (params) => {
  return http.fetchPost(`${baseUrl}/userO2OOrder/deleteOrderById`,params)
}

// 取消订单
export const o2oCancel= (params) => {
  return http.fetchPost(`${baseUrl}/userO2OOrder/cancelOrder`,params)
}

// 前端确认收货
export const rogConfirm= (params) => {
  return http.fetchPost(`${baseUrl}/userO2OOrder/rogConfirm`,params)
}

// 商品评价
export const o2oAddEvaluate= (params) => {
  return http.fetchPost(`${baseUrl}/userO2OOrder/addEvaluate`,params)
}

// 商品追加评价
export const o2oAddChaseEvaluate= (params) => {
  return http.fetchPost(`${baseUrl}/userO2OOrder/addChaseEvaluate`,params)
}

// o2o单个商品详情
export const o2oByItemId= (params) => {
  return http.fetchPost(`${baseUrl}/userO2OOrder/selectOrderDetailByItemId`,params)
}

//忘记密码(获取验证码)
export const getCode = (params) => {
  return http.fetchPost(`${baseUrl}/userRegister/sendCode`,params)
}

//忘记密码
export const forgetPassword = (params) => {
  return http.fetchPost(`${baseUrl}/userRegister/findPwd`,params)
}

//修改登录密码
export const changeLoginPassword  = (params) => {
  return http.fetchPost(`${baseUrl}/user/updatePwd`,params)
}

//获取用户当前积分
export const getCurIntegral = (params) => {
  return http.fetchPost(`${baseUrl}/user/selIntegral`,params)
}

//添加发票
export const addInvoceTemplate = (params) => {
  return http.fetchPost(`${baseUrl}/invoceTemplate/insertSelective`,params)
}

// 添加帮工收藏
export const userCollectHelper = (params) => {
  return http.fetchPost(`${baseUrl}/userCollectHelper/userCollectHelper`,params)
}

// 会员取消帮工收藏
export const removeCollectByHelperId = (params) => {
  return http.fetchPost(`${baseUrl}/userCollectHelper/removeCollectByHelperId`,params)
}

// 添加收货地址
export const insertSelective = (params) => {
  return http.fetchPost(`${baseUrl}/userAdress/insertSelective`,params)
}

//支付密码（获取当前手机号）
export const getPhone  = (params) => {
  return http.fetchPost(`${baseUrl}/user/selectPhoneByToken`,params)
}

//支付密码（获取验证码）
export const getAuthcode  = (params) => {
  return http.fetchPost(`${baseUrl}/userRegister/sendCode`,params)
}

//支付密码（设置支付密码）
export const setPaymentPsw  = (params) => {
  return http.fetchPost(`${baseUrl}/user/settingPay`,params)
}

//支付密码 （修改支付密码）
export const changePaymentPsw  = (params) => {
  return http.fetchPost(`${baseUrl}/user/updatePay`,params)
}

//支付密码 （忘记支付密码）
export const forgetPaymentPsw  = (params) => {
  return http.fetchPost(`${baseUrl}/userRegister/findPayPwdUpdate`,params)
}

////////////////////////////////////////////////////////////////////////////////////////////lmlmlmlmlmlmlmlmlmlmllmlmlmlmlmlmlmllmlmlmlmlmlmlml
// b2c 加入购物车
export const b2cAddToCart  = (params) => {
  return http.fetchPost(`${baseUrl}/b2c_local/cart/addCar`,params)
}
// o2o 加入购物车
export const o2oAddToCart  = (params) => {
  return http.fetchPost(`${baseUrl}/o2o/cart/addCar`,params)
}

// 收货地址列表
export const getAddressList = (params) => {
  return http.fetchPost(`${baseUrl}/userAdress/selectList`,params)
}

// 删除地址
export const deleteByPrimaryKey = (params) => {
  return http.fetchPost(`${baseUrl}/userAdress/deleteByPrimaryKey`,params)
}

// 根据id修改收货地址
export const updateAdress = (params) => {
  return http.fetchPost(`${baseUrl}/userAdress/updateByPrimaryKeySelective`,params)
}

// 根据addId查询收货地址
export const getAddress = (params) => {
  return http.fetchPost(`${baseUrl}/userAdress/selectByAddId`,params)
}

// 修改为默认地址
export const updateisdefault = (params) => {
  return http.fetchPost(`${baseUrl}/userAdress/updateisdefault`,params)
}

// b2c 商品立即购买结算
export const b2cGoodsNowBuy  = (params) => {
  return http.fetchPost(`${baseUrl}/b2c/order/goodsNowBuy`,params)
}
// o2o 获取购物车列表
export const getO2OCartList  = (params) => {
  return http.fetchPost(`${baseUrl}/o2o/cart/allList`,params)
}
// o2o 获取购物车列表
export const o2oChangeOrderState  = (params) => {
  return http.fetchPost(`${baseUrl}/o2o/cart/checkOrNo`,params)
}
// o2o 改变购物车中的商品数量
export const o2oChangeCartNumber  = (params) => {
  return http.fetchPost(`${baseUrl}/o2o/cart/numOperate`,params)
}
// o2o 删除购物车中的商品
export const o2oCartDetailGoods  = (params) => {
  return http.fetchPost(`${baseUrl}/o2o/cart/delCar`,params)
}
// 修改个人基本信息
export const setPersonalDatas  = (params) => {
  return http.fetchPost(`${baseUrl}/user/updateUsers`,params)
}
// 获取当前用户总积分
export const getCurAddress  = (params) => {
  return http.fetchPost(`${baseUrl}/userAdress/selectById`,params)
}
// 获取当前积分兑换比例
export const getIntegralRatio  = () => {
  return http.fetchPost(`${baseUrl}/helpCenter/platformDeduction`)
}
//---------------------------------------------------------------------------------lmllmlmlmlmlmlmlml----------end------------------------------------
// 分页查询积分明细
export const integralList = (params) => {
  return http.fetchPost(`${baseUrl}/integralLog/selectList`,params)
}

// 查询会员积分
export const selIntegral = (params) => {
  return http.fetchPost(`${baseUrl}/user/selIntegral`,params)
}

// 积分转余额
export const integralTransferBalance = (params) => {
  return http.fetchPost(`${baseUrl}/user/integralTransferBalance`,params)
}

// 分页查询余额明细
export const moneySelectList = (params) => {
  return http.fetchPost(`${baseUrl}/advanceLog/selectList`,params)
}

// 查询会员余额
export const selAdvance = (params) => {
  return http.fetchPost(`${baseUrl}/user/selAdvance`,params)
}

// 会员充值
export const createOrder = (params) => {
  return http.fetchPost(`${baseUrl}/userRecharge/createOrder`,params)
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////收藏
//收藏帮工（列表展示）
export const collectWork = (params) => {
  return http.fetchPost(`${baseUrl}/userCollectHelper/selectHelperByUserId`,params)
}

//删除收藏帮工（列表）
export const deleteWork = (params) => {
  return http.fetchPost(`${baseUrl}/userCollectHelper/removeCollectByHelperId`,params)
}
///////////////////个人中心
//获取用户信息(基本)
export const GetSelectBasicById = (params) => {
  return http.fetchPost(`${baseUrl}/user/selectBasicById`,params)
}
//实名认证
export const SetinsertSelective = (params) => {
  return http.fetchPost(`${baseUrl}/userAutonym/insertSelective`,params)
}

//获取用户信息(详细)
export const GetSelectBasicByIdDetail = (params) => {
  return http.fetchPost(`${baseUrl}/user/selectDetailedById`,params)
}

// B2c加入购物车
export const addCarB2c = (params) => {
  return http.fetchPost(`${baseUrl}/b2c_local/cart/addCar`,params)
}

// o2o加入购物车
export const addCarO2o = (params) => {
  return http.fetchPost(`${baseUrl}/o2o/cart/addCar`,params)
}

// qq绑定/登录
export const qqwaplogin = (params) => {
  return http.fetchGet(`${baseUrl}/thirdpartyLoginController/qqwaplogin`,params)
}

// wx绑定/登录
export const wxlogin = (params) => {
  return http.fetchGet(`${baseUrl}/thirdpartyLoginController/wxlogin`,params)
}

// wx公众号登录
export const wxloginJsp = (params) => {
  return http.fetchPost(`${baseUrl}/wxJspLoginContriller/wxlogin`,params)
}

// 微信QQ解绑用户信息 type 1 : qq , 2 : 微信
export const qqUnbundle = (params) => {
  return http.fetchPost(`${baseUrl}/thirdpartyLoginController/webUnbundle`,params)
}

// 根据 temp登录
export const tempLogin = (params) => {
  return http.fetchPost(`${baseUrl}/thirdpartyLoginController/Login`,params)
}

// 购物车商品件数
export const b2cCartNum = (params) => {
  return http.fetchPost(`${baseUrl}/b2c_local/cart/cartNum`,params)
}

// 购物车商品件数
export const o2oCartNum = (params) => {
  return http.fetchPost(`${baseUrl}/o2o/cart/cartNum`,params)
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////现金与在途奖励
// 现金与在途奖励
export const cashAward = (params) => {
  return http.fetchPost(`${baseUrl}/queue/moneyUnterwegs`,params)
}

// 在途奖励明细
export const awardParticulars = (params) => {
  return http.fetchPost(`${baseUrl}/queue/userInfo`,params)
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////通联的一系列接口
// 实名认证(获取验证码，获取流水号，获取申请时间)
export const nameAuthentication = (params) => {
  return http.fetchPost(`${baseUrl}/userAutonym/sendCode`,params)
}

//提交实名认证
export const submitNameAuthentication = (params) => {
  return http.fetchPost(`${baseUrl}/userAutonym/userBindBankCard`,params)
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////通联注册（获取验证码）
//获取验证码
export const gainVerificationCode = (params) => {
  return http.fetchPost(`${baseUrl}/userRegister/allinpaySendCode`,params)
}

//提交（注册）
export const submitRegister = (params) => {
  return http.fetchPost(`${baseUrl}/userRegister/allinpayaddUser`,params)
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////旧数据
// （发送验证码）
export const oldDataCode = (params) => {
  return http.fetchPost(`${baseUrl}/userRegister/createMemberAndBindUser`,params)
}
//(提交旧数据)
export const oldDataSubmit= (params) => {
  return http.fetchPost(`${baseUrl}/userRegister/bindPhoneAndBindUser`,params)
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////登录接口
//（登录接口）
export const lognEnter = (params) => {
  return http.fetchPost(`${baseUrl}/login/`,params)
}



















