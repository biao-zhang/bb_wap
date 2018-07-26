const IndexFall = () => import( '@/components/indexfall')
const Result = () => import( '@/components/service/common/result')
const AllAddress = () => import( '@/components/service/receiveGoodsAddress/alladdress')
const AllDetails = () => import( '@/components/service/details/allDetails')
const AllDetails1 = () => import( '@/components/service/details/allDetails1')
const SelectArea = () => import( '@/components/service/common/selectArea')
const Coupon = () => import( '@/components/service/common/coupon')
const Search = () => import( '@/components/service/common/search')
const AddNewAddress = () => import( '@/components/my/common/addNew')
const EditorNew = () => import( '@/components/my/common/editorNew')
const PublishComment = () => import( '@/components/shop/common/publishComment')
const GetCoupons = () => import( '@/components/shop/common/getCoupons')
const CommentResult = () => import( '@/components/shop/common/commentResult')
const ConfirmOrder = () => import( '@/components/shop/confirmOrder/confirmOrder')
const ConfirmOrder1 = () => import( '@/components/shop/confirmOrder/o2o/confirmOrder')
const ReceiveAddressIndex = () => import( '@/components/service/receiveGoodsAddress/receiveAddressIndex')
const AddComment = () => import( '@/components/shop/common/addComment')
const MyOrderIndex = () => import( '@/components/my/myOrder/myOrderIndex')
const NothingOrder = () => import( '@/components/my/myOrder/nothingOrder')
const PaymentResult = () => import( '@/components/my/allResult/paymentResult')
const CardBinding = () => import( '@/components/my/cardBinding/cardBinding')
const account = () => import( '@/components/my/account/account')
const Recharge = () => import( '@/components/my/recharge/recharge')
const Payment = () => import( '@/components/my/recharge/payment')
const GiveBonus = () => import( '@/components/my/bonus/giveBonus')
const BonusDetails = () => import( '@/components/my/bonus/bonusDetails')
const TickProblem = () => import( '@/components/my/problem/tickProblem')
const ComplainProblem = () => import( '@/components/my/problem/complainProblem')
const FindPwd = () => import( '@/components/my/password/findPwd')
const ShareBonusList = () => import( '@/components/my/conpons/shareBonusList')
const LowPriceBonus = () => import( '@/components/my/conpons/lowPriceBonus')
const SignupDetails = () => import( '@/components/my/conpons/signupDetails')
const ServiceOrder = () => import( '@/components/my/serviceOrder/serviceOrder')
const ServiceEvaluate = () => import( '@/components/my/serviceOrder/serviceEvaluate')
const ServiceOrderList = () => import( '@/components/my/serviceOrder/serviceOrderList')
const HelpInformation = () => import( '@/components/my/serviceOrder/helpInformation')
const OrderDetails = () => import( '@/components/my/myOrder/orderDetails')
const TerminalOrder = () => import( '@/components/my/terminalOrder/terminalOrder')
const ServiceOrderGet = () => import( '@/components/my/serviceOrder/serviceOrderGet')
const TerminalOrderDetails = () => import( '@/components/my/terminalOrder/terminalOrderDetails')
const TerPublishComment = () => import( '@/components/my/terminalOrder/terPublishComment')
const adressCombine = () => import( '@/components/service/receiveGoodsAddress/adressCombine')
const websocket = () => import( '@/components/websocketMap')
const h5Pay = () => import( '@/components/h5Pay') //
const loginBind = () => import( '@/components/my/loginandregistration/loginBind')
const reglsterBind = () => import( '@/components/my/loginandregistration/reglsterBind')
const newRegIsterBind = () => import( '@/components/my/loginandregistration/newRegIsterBind')
const allinPayMethod = () => import( '@/components/shop/storedetails/allinPayMethod')

import selfAddress from '@/vux/selfAddress'

//路由在本地可能不区分大小写，但是在服务器不行
const router2 = {
  path: '/z/',
  component: IndexFall,
  children: [
    // 评价结果页
    {
      path: 'result',
      component: Result,
      meta:{auth:true} ,
    },
    // 所有收获地址页
    {
      path: 'alladdress',
      component: AllAddress,
      meta:{auth:true}
    },
    //报名详情页
    {
      path: 'allDetails',
      component: AllDetails
    },
    {
      path: 'allDetails1',
      component: AllDetails1
    },
    // 选择地区页
    {
      path: 'selectArea',
      component: SelectArea
    },
    // 优惠券页
    {
      path: 'coupon',
      component: Coupon
    },
    // 搜索页
    {
      path: 'search',
      component: Search
    },
    // 新增收货地址页
    {
      path: 'addnewaddress',
      component: AddNewAddress
    },
    // 编辑收货地址页
    {
      path: 'editornew',
      component: EditorNew
    },
    // 发表评论页
    {
      path: 'publishcomment',
      component: PublishComment,
      meta:{auth:true}
    },
    // 获得优惠券页
    {
      path: 'getcoupons',
      component: GetCoupons,
      meta:{auth:true}

    },
    // 评论结果页
    {
      path: 'commentResult',
      component: CommentResult
    },
    // 确认订单页
    {
      path: 'confirmOrder',
      component: ConfirmOrder,
      meta:{auth:true}
    },
    // 确认订单页
    {
      path: 'confirmOrder1',
      component: ConfirmOrder1,
      meta:{auth:true}
    },
    // 收货地址首页
    {
      path: 'receiveaddressindex',
      component: ReceiveAddressIndex,
      meta:{auth:true}
    },
    // 追加评论页
    {
      path: 'addcomment',
      component: AddComment
    },
    // 我的订单页
    {
      path: 'myorderindex',
      component: MyOrderIndex,
      meta:{auth:true}
    },
    // 我的订单首页
    {
      path: 'nothingorder',
      component: NothingOrder,
      meta:{auth:true}
    },

    // 付款结果页(包含多个页面)
    {
      path: 'paymentResult',
      component: PaymentResult,
      meta:{auth:true}
    },
    //卡绑定页(包含多个页面)
    {
      path: 'cardBinding',
      component: CardBinding,
      meta:{auth:true}
    },
    //账户页(包含多个页面)
    {
      path: 'account',
      component: account,
      meta:{auth:true}
    },
    //充值页
    {
      path: 'recharge',
      component: Recharge,
      meta:{auth:true}
    },
    //付款页
    {
      path: 'payment',
      component: Payment,
      meta:{auth:true}
    },
    //发红包页
    {
      path: 'giveBonus',
      component: GiveBonus,
      meta:{auth:true}
    },
    //红包详情页
    {
      path: 'bonusDetails',
      component: BonusDetails
    },
    //反馈问题页
    {
      path: 'tickProblem',
      component: TickProblem,
      meta:{auth:true}
    },
    //投诉页
    {
      path: 'complainProblem',
      component: ComplainProblem,
      meta:{auth:true}
    },
    //找回密码页
    {
      path: 'findPwd',
      component: FindPwd,
      // meta:{auth:true}
    },
    //分享折扣红包页
    {
      path: 'shareBonusList',
      component: ShareBonusList
    },
    //折扣红包页
    {
      path: 'lowPriceBonus',
      component: LowPriceBonus,
      meta:{auth:true} ,
    },
    //报名详情页
    {
      path: 'signupDetails',
      component: SignupDetails
    },
    //服务订单页
    {
      path: 'serviceOrder',
      component: ServiceOrder
    },
    //服务评价页
    {
      path: 'serviceEvaluate',
      component: ServiceEvaluate
    },
    //服务订单页（取送）
    {
      path: 'serviceOrderGet',
      component: ServiceOrderGet
    },
    //服务订单列表页
    {
      path: 'serviceOrderList',
      component: ServiceOrderList,
      meta:{auth:true}
    },
    //服务订单列表帮工信息页
    {
      path: 'helpInformation',
      component: HelpInformation
    },
    //商品订单详情页
    {
      path: 'orderDetails',
      component: OrderDetails
    },
    //终端店订单页
    {
      path: 'terminalOrder',
      component: TerminalOrder,
      meta:{auth:true},
    },
    //终端店订单详情页
    {
      path: 'terminalOrderDetails',
      component: TerminalOrderDetails
    },
    //终端店订单评价(追评)
    {
      path: 'terPublishComment',
      component: TerPublishComment
    },
    //websocket地图页
    {
      path: 'websocket',
      component: websocket
    },
    // 收货地址整合页
    {
      path: 'adressCombine',
      component: adressCombine
    },
    // 登录绑定页
    {
      path: 'loginBind',
      component: loginBind
    },
    // 注册绑定页
    {
      path: 'reglsterBind',
      component: reglsterBind
    },
    // (通联)注册绑定页
    {
      path: 'newRegIsterBind',
      component: newRegIsterBind
    },
    // (通联)支付,发送验证码
    {
      path: 'allinPayMethod',
      component: allinPayMethod
    },

    //h5Pay
    {
      path: 'h5Pay',
      component: h5Pay
    }
  ]
}



export default router2;

