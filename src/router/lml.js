const IndexFall  = () => import( '@/components/indexfall')
const AllCommonweal  = () => import( '@/components/service/allCommonweal')
const CommonwealDetail  = () => import( '@/components/service/details/commonwealDetail')
const ServiceMap  = () => import( '@/components/common/serviceMap')

const LinkAge  = () => import( '@/components/common/linkAge' )   //   级联
const nearbyIndex  = () => import( '@/components/nearby/nearbyIndex' )   //   级联

const Classify  = () => import( '@/components/shop/shopList/classify')
const ShopGoodsList  = () => import( '@/components/shop/shopList/shopGoodsList')
const Seckill  = () => import( '@/components/shop/seckill/seckill')
const StoreIndex  = () => import( '@/components/shop/store/storeIndex')
const StoreGoodsClassify  = () => import( '@/components/nearby/store/storeGoodsClassify')
const SearchGoods  = () => import( '@/components/shop/search/searchGoods')
const Refund  = () => import( '@/components/shop/refund/refund')
const RefundList  = () => import( '@/components/shop/refund/refundList')
const ApplyRefund  = () => import( '@/components/shop/refund/applyRefund')
const Logistic  = () => import( '@/components/shop/logistic/logistic')
const ShoppingCart  = () => import( '@/components/shop/shoppingcart/shoppingCart')
const CartShop  = () => import( '@/components/shop/shoppingcart/cartShop')

//附近
const CashAccount  = () => import( '@/components/nearby/redPacket/cashAccount')
const BlueToothPacket  = () => import( '@/components/nearby/redPacket/blueToothPacket')
const TaskPacket  = () => import( '@/components/nearby/redPacket/taskPacket')
const Shine  = () => import( '@/components/nearby/common/shine')

const Nuxt  = () => import( '@/../pages/index')
//个人中心
const MyCommonweal  = () => import( '@/components/my/myCAndCAndO/myCommonweal')
const MyCollect  = () => import( '@/components/my/myCAndCAndO/myCollect')
const MySetting  = () => import( '@/components/my/setting/setting')
const MyBindAccount  = () => import( '@/components/my/setting/bindAccount')
const RealName  = () => import( '@/components/my/setting/realName')
const PersonalData  = () => import( '@/components/my/setting/personalData')
const ChangePwd  = () => import( '@/components/my/setting/changePwd')
const BoundPrepaidCard  = () => import( '@/components/my/setting/boundPrepaidCard')
const ReservationOrder  = () => import( '@/components/my/reservationOrder/reservationOrder')
const GetSms  = () => import( '@/components/my/setting/getSms')
const ForgetPaymentPaw  = () => import( '@/components/my/setting/forgetPaymentPaw')
const router1 = {
  path: '/x',
  component: IndexFall,
  children: [
    {
      path: 'nearbyIndex',       //分页
      component: nearbyIndex
    },
    {
      path: 'allCommonweal',       //工艺活动列表
      component: AllCommonweal
    },
    {
      path: 'commonwealDetail',    //公益详情
      component: CommonwealDetail,
      // meta:{auth:true}
    },
    {
      path: 'serviceMap',          //服务地址选择
      component: ServiceMap
    },
    {
      path: 'classify',            //二级分类
      component: Classify
    },
    //////////////////////////////////////
    {
      path: 'shopGoodsList',      //商品列表（男装)
      component: ShopGoodsList
    },
    {
      path: 'seckill',             //秒杀
      name:'seckillPageTitle',
      component: Seckill
    },
    {
      path: 'storeIndex',           //店铺首页
      component: StoreIndex
    },
    {
      path: 'storeGoodsClassify',           //店铺首页分类
      component: StoreGoodsClassify
    },
    {
      path: 'searchGoods',           //搜索商品
      component: SearchGoods
    },
    {
      path: 'refund',                 //退款详情
      component: Refund
    },
    {
      path: 'refundList',            //退款列表
      component: RefundList,
      meta:{auth:true}
    },
    {
      path: 'applyRefund',           //申请退款
      component: ApplyRefund
    },
    {
      path: 'logistic',               //物流详情
      component: Logistic
    },
    {
      path: 'shoppingCart',           //购物车
      component: ShoppingCart
    },
    {
      path: 'cartShop',           //终端店购物车
      component: CartShop
    },
    //////////附近
    {
      path:'cashAccount',              //现金账户
      component:CashAccount
    },
    {
      path:'blueToothPacket',           //蓝牙红包
      component:BlueToothPacket
    },
    {
      path:'taskPacket',               //任务红包
      component:TaskPacket
    },
    {
      path:'shine',                   //光芒
      component:Shine
    },
    {
      path:'linkAge',                   //三级联动
      component:LinkAge
    },
    // {
    //   path:'nuxt',                      //nuxt
    //   component:Nuxt
    // },
    //个人中心
    {
      path:'myCommonweal',                   //我参加的公益活动列表
      component:MyCommonweal,
      meta:{auth:true}
    },
    {
      path:'myCollect',                   //我的收藏(帮工\商品)
      component:MyCollect,
      meta:{auth:true}
    },
    {
      path:'mySetting',                   //我的设置
      component:MySetting,
      meta:{auth:true} ,
    },
    {
      path:'myBindAccount',                   //快捷账号绑定
      component:MyBindAccount
    },
    {
      path:'realName',                     //实名注册
      component:RealName
    },
    {
      path:'personalData',                     //个人信息
      component:PersonalData
    },
    {
      path:'changePwd',                     //修改密码、修改支付密码，密码，忘记密码
      component:ChangePwd,
      // meta:{auth:true}
    },
    {
      path:'getSms',                     //修改支付密码,设置支付密码（获取短信）
      component:GetSms,
      meta:{auth:true}
    },
    {
      path:'forgetPaymentPaw',                     //忘记支付密码（获取短信）
      component:ForgetPaymentPaw,
      meta:{auth:true}
    },
    {
      path:'boundPrepaidCard',                     //绑定预付卡
      component:BoundPrepaidCard
    },
    {
      path:'reservationOrder',                     //预约订单
      component:ReservationOrder,
      meta:{auth:true}
    },
  ]
}



export default router1;

