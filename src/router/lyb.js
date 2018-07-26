
const IndexFall  = () => import( '@/components/indexfall')


const RecommendedYou  = () => import( '@/components/shop/storedetails/recommendedYou' )     //为您推荐
const NewArrivals  = () => import( '@/components/shop/storedetails/newArrivals'  )            //新品
const PreferredGoods  = () => import( '@/components/shop/storedetails/preferredGoods' )       //优选商品

const PaymentMethod  = () => import( '@/components/shop/storedetails/paymentMethod' )         //支付方式
const EmptyCar  = () => import( '@/components/shop/storedetails/emptyCar' )                   //购物车空



const ShopGoodsDetail  = () => import( '@/components/shop/common/shopGoodsDetail' )         //商品详情
const ShopsDetail  = () => import( '@/components/shop/storedetails/shopsDetail' )            //终端店
const FreshSeckill  = () => import( '@/components/shop/storedetails/freshSeckill'  )          //秒杀详情页


const BluetoothAdsum  = () => import( '@/components/nearby/setbluetooth/bluetoothAdsum' )       //蓝牙红包

const IssueOrder  = () => import( '@/components/nearby/issue/issueOrder'   )     //发布语音
const PerfectVoice  = () => import( '@/components/nearby/issue/perfectVoice' )       //语音完善

const WorkIn  = () => import( '@/components/my/workcheck/workIn'  )      //帮工入住
const FacilitatorIn  = () => import( '@/components/my/workcheck/facilitatorIn' )       //服务商入驻

const FamiliarProblem  = () => import( '@/components/my/problem/familiarProblem' )       //常见问题
const AboutUs  = () => import( '@/components/my/problem/aboutUs' )       //关于我们
const ProtocolExplain  = () => import( '@/components/my/problem/protocolExplain')        //协议说明
const ActivityInform  = () => import( '@/components/my/problem/activityInform' )       //关于奈斯牛的活动通知
const NewsCentre  = () => import( '@/components/my/problem/newsCentre' )       //消息中心

const ServiceOne  = () => import( '@/components/my/touchservice/serviceOne')        //联系客服

const GradeClass  = () => import( '@/components/my/grade/gradeClass')        //等级

const CardBag  = () => import( '@/components/my/card/cardBag' )       //卡包

const LogIn  = () => import( '@/components/my/loginandregistration/logIn' )       //登录
const RegIster  = () => import( '@/components/my/loginandregistration/regIster')        //注册


const IntegralAccount  = () => import( '@/components/my/accountBook/integralAccount' )       //积分账户
const CashAccount  = () => import( '@/components/my/accountBook/cashAccount' )       //现金账户
const AwardRanking  = () => import( '@/components/my/accountBook/awardRanking' )       //奖励排名
const AwardExplain  = () => import( '@/components/my/accountBook/awardExplain' )       //奖励排名

const GivePacket  = () => import( '@/components/my/redpacketList/givePacket')        //发出的红包
const Teamwork  = () => import( '@/components/h5/teamwork')        //我要和作

const NewRegIster  = () => import( '@/components/my/loginandregistration/newRegIster')        //新注册
const NewPhoneVerification  = () => import( '@/components/my/loginandregistration/newPhoneVerification') // 新验证手机
const NewNameAuthentication  = () => import( '@/components/my/loginandregistration/newNameAuthentication') // 新实名认证
const router3 = {
  path: '/y',
  component: IndexFall,
  children: [
    {
      path: 'shopGoodsDetail',
      component: ShopGoodsDetail,
      meta: {
        title: '商品详情',
        description:'商品详情-描述'
      }
    },
    {
      path: 'recommendedYou',
      component: RecommendedYou
    },
    {
      path: 'newNameAuthentication',
      component: NewNameAuthentication
    },
    {
      path: 'newPhoneVerification',
      component: NewPhoneVerification
    },
    {
      path: 'newArrivals',
      component: NewArrivals
    },
    {
      path: 'paymentMethod',
      component: PaymentMethod
    },
    {
      path: 'shopsDetail',
      component: ShopsDetail
    },
    {
      path: 'emptyCar',
      component: EmptyCar
    },
    {
      path: 'freshSeckill',
      component: FreshSeckill
    },
    {
      path: 'preferredGoods',
      component: PreferredGoods
    },
    {
      path: 'bluetoothAdsum',
      component:BluetoothAdsum
    },
    {
      path: 'issueOrder',
      component:IssueOrder
    },
    {
      path: 'perfectVoice',
      component:PerfectVoice
    },
    {
      path: 'workIn',
      component:WorkIn
    },
    {
      path: 'familiarProblem',
      component:FamiliarProblem
    },
    {
      path: 'gradeClass',
      component:GradeClass
    },
    {
      path: 'facilitatorIn',
      component:FacilitatorIn
    },
    {
      path: 'aboutUs',
      component:AboutUs
    },
    {
      path: 'protocolExplain',
      component:ProtocolExplain
    },
    {
      path: 'activityInform',
      component:ActivityInform
    },
    {
      path: 'newsCentre',
      component:NewsCentre
    },
    {
      path: 'serviceOne',
      component:ServiceOne,
      meta:{auth:true},
    },
    {
      path: 'cardBag',
      component:CardBag
    },
    {
      path: 'logIn',
      component:LogIn
    },
    {
      path: 'regIster',
      component:RegIster
    },
    {
      path: 'newRegIster',
      component:NewRegIster
    },
    {
      path: 'integralAccount',
      component:IntegralAccount,
      meta:{auth:true}
    },
    {
      path: 'cashAccount',
      component:CashAccount,
      meta:{auth:true}
    },
    {
      path: 'awardRanking',
      component:AwardRanking,
      meta:{auth:true}
    },
    {
      path: 'awardExplain',
      component:AwardExplain,
      meta:{auth:true}
    },
    {
      path: 'givePacket',
      component:GivePacket,
      meta:{auth:true},
    },
    {
      path: 'teamwork',
        component:Teamwork,
      meta:{auth:true},
    },
  ],
}



export default router3;

