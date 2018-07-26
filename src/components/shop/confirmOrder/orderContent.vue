<template>
  <div>
    <div class="order_content">
      <div class="storeTitle">
        <img src="../img/shanghaic.png" />
        <span>{{datas.shopName}}</span>
      </div>
      <div class="storeDetails" v-for="(item,index) in datas.cartItems" :key="index">
        <div class="storeDetailsImg">
          <img :src="item.goodsImgMaster"/>
        </div>
        <div class="storeRight">
          <div v-if="item.goodsSpecs!=''">
            <div class="storeDetailsTitle re-twoLineOverFlow">{{item.goodsName}}</div>
            <div class="storeHC">规格：{{item.goodsSpecs}}</div>
          </div>
          <div class="storeMoneyTwo">
            <div class="storeMoney"><span>￥</span><span>{{item.goodsPrice}}</span></div>
            <div class="storeQua"><span>x</span><span>{{item.buyNum}}</span></div>
          </div>
        </div>
      </div>
      <div class="order_distribution">
        <div>配送方式</div>
        <div class="order_distribution_r">{{datas.expressMoney !== 0 ? ('运费' + datas.expressMoney + '元') : '快递包邮' }}</div>
      </div>
      <div class="order_other_coupon" @click="couponClick(datas.shopId)">
        <div>折扣红包</div>
        <div class="order_distribution_r">{{datas.discountRedPackets.length !== 0 ? couponLabel : '暂无可用折扣红包'}}<i class="iconfont icon-iconset0417"></i></div>
      </div>
    </div>
    <!--优惠券弹窗-->
    <div v-transfer-dom>
      <popup v-model="show14" position="bottom" height='9rem'>
        <div class="popup_title">折扣红包</div>
        <div style="position: relative;height: 8rem;" v-if="datas.discountRedPackets!=null">
          <div style="height: 6.8rem;overflow: scroll;background-color: white">
            <single-coupon
              v-if="datas.discountRedPackets.length>0&&show14"
              :cur-conpon="datas.discountRedPacket"
              :rece-single-conpon="datas.discountRedPackets"
              :shopId="shopId" :flag="couponLabelDefault"
              @changeCurRedPicket = 'changeCurRedPicket'
            > </single-coupon>
          </div>
          <span v-if="datas.discountRedPackets.length==0&&show14">暂无可用折扣红包</span>
          <div class="popupBtn" @click="popupCouponBtn">确认</div>
        </div>
      </popup>
    </div>
  </div>
</template>
<script>
  import { XHeader, TransferDom, Popup } from 'vux'
  import SingleCoupon from '../singleCoupon/singleCoupon'
  export default {
    directives: {TransferDom},
    data() {
      return {
        show14:false,
        shopId:'',
        temporaryRedsId:[],      //临时RedsId
        temporaryRedsName:'',      //临时红包名称
        couponLabelDefault:'选择折扣红包',   //所用的折扣红包名称
        couponLabel:'选择折扣红包',   //所用的折扣红包名称
      }
    },
    computed:{

    },
    components:{XHeader, TransferDom, Popup,SingleCoupon},
    props:{
      datas:{
        type:Object,
        default:()=>{
          return {}
        }
      }
    },
    mounted(){
      setTimeout(()=>{
        console.log(this.datas.discountRedPackets)
      },2000)
    },
    methods: {
      // 控制弹窗显隐
      couponClick(shopId) {
        console.log('使用优惠券',shopId);
        this.shopId=shopId;

        if (this.datas.discountRedPackets.length === 0) {
          this.$store.commit('setToastText', '暂无可用折扣红包')
          this.$store.commit('setToastType', 'warn')
        } else {
          this.show14 = true;
        }
      },
      //改变所使用的折扣红包时触发
      changeCurRedPicket(shopId,id,name){
        let redIds=this.$store.state.cartOrder.redIds;
        for(let i=0;i<redIds.length;i++){
          if(redIds[i].shopId===shopId){
            redIds.splice(i,1)
          }
        }
        redIds.push({shopId:shopId,redId:id})
        this.temporaryRedsId = redIds;
        this.temporaryRedsName = name;
        console.log(this.temporaryRedsId)
      },
      //确认使用折扣红包
      popupCouponBtn() {
        this.show14 = false;
        this.$emit('changeCoupon',this.temporaryRedsId)
        this.couponLabel = '优惠： ￥'+this.temporaryRedsName;
      },
    }
  }
</script>
<style scoped>
  /*订单详情*/
  .order_content {
    background-color: #ffffff;
    margin-bottom:0.2rem;
  }
  .storeTitle {
    padding: 0.20rem;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #eeeeee;
  }
  .storeTitle img  {
    width: 0.43rem;
    margin-right: 0.15rem;
  }
  .storeDetails {
    padding: 0.20rem;
    background-color: #ffffff;
    display: flex;
  }
  .storeDetailsImg {
    margin-right: 0.60rem;
  }
  .storeDetailsImg img {
    width: 2.41rem;
    height: 2.41rem;
  }
  .storeDetailsTitle {
    font-size: 0.30rem;
  }
  .storeHC {
    font-size: 0.24rem;
    color: #9a9a9a;
  }
  .storeMoney {
    font-size: 0.30rem;
    color: #f86e0e;
  }
  .storeQua {
    font-size: 0.24rem;
    color: #9a9a9a;
  }
  .storeRight {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width:5rem;
  }
  .storeMoneyTwo {
    display: flex;
    justify-content: space-between;
  }
  /*订单详情结束*/
  .popup_title {
    font-size: 0.30rem;
    height: 1.00rem;
    text-align: center;
    line-height: 1.00rem;
    background-color: #ffffff;
    border-bottom: 1px solid #ccc;
  }
  .popup_nav,.popup_name {
    padding: 0.25rem;
    border-bottom: 1px solid #eee;
    background-color: #fff;
    font-size: 0.30rem;
    display: flex;
  }
  .popup_nav_1,.popup_nav_2 {
    font-size: 0.30rem;
    margin-right: 0.30rem;
  }
  .popup_nav_two {
    display: flex;
  }
  .popup_nav_two_com {
    width: 1.20rem;
    height: 0.50rem;
    border: 1px solid #fd593d;
    border-radius: 0.05rem;
    text-align: center;
    line-height: 0.50rem;
    font-size: 0.24rem;
    color: #fd593d;
    margin-right: 0.30rem;
  }
  .popupBtn {
    height: 1.20rem;
    background-color: #f15352;
    text-align: center;
    line-height: 1.20rem;
    font-size: 0.32rem;
    color: #fff;
    position: absolute;
    width:100%;
    bottom:0;
  }




  .order_distribution {
    /*margin: 0.15rem 0;*/
    padding: 0.45rem 0.20rem;
    display: flex;
    justify-content: space-between;
    background-color: #ffffff;
    font-size: 0.30rem;
    border-top:1px solid #eee;
    border-bottom:1px solid #eee;
  }
  .order_distribution_r {
    color: #666666;
  }
  .order_distribution_r {
    color: #666666;
  }
  .order_other_coupon,.order_other_intergal,.order_other_invoice {
    padding: 0.45rem 0.20rem;
    display: flex;
    justify-content: space-between;
    background-color: #ffffff;
    font-size: 0.30rem;
  }
</style>
