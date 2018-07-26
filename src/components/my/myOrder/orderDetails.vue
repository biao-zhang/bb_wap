<template>
  <div class='orderDetails'>
    <div class="top">
      <x-header :left-options="{backText: ''}">{{ topMessage }}</x-header>
    </div>
    <div class="orderDetailsList">
      <div class="orderDetailsListStatus">
        <div v-if="singleOrder.status === 1">已完成</div>
        <div v-if="singleOrder.status === 2">待付款</div>
        <div v-if="singleOrder.status === 3">待发货</div>
        <div v-if="singleOrder.status === 4">待收货</div>
        <div v-if="singleOrder.status === 5">待评价</div>
        <div v-if="singleOrder.status === 6">已关闭</div>
      </div>
      <div class="orderDetailsListNum" style="font-size: 0.25rem">
        <div class="orderNum">
          <span>订单号：&nbsp&nbsp&nbsp</span>
          <span>{{ singleOrder.sn }}</span>
        </div>
        <div class="orderTime">
          <span>下单时间：</span>
          <span>{{createTime[0]}}.{{createTime[1]}}.{{createTime[2]}} {{createTime[3]}}:{{createTime[4]}}:{{createTime[5]}}</span>
        </div>
        <div class="orderTime">
          <span>配送方式：</span>
          <span>{{ singleOrder.shippingAmount > 0 ? ('运费 ￥'+ singleOrder.shippingAmount + '元') : '快递免邮'}}</span>
        </div>
        <div class="receInfo">
          <span>收货信息：</span>
          <div>
            <div>{{ singleOrder.shipName }}   {{ singleOrder.shipMobile }} </div>
            <div style="margin-top: 0.10rem">{{ singleOrder.shipAddr }}</div>
          </div>
        </div>
      </div>
      <div class="orderDetailsListC">
        <div style="display: flex; align-items: center; padding: 0.20rem 0.10rem; background-color: #ffffff; justify-content: space-between">
          <div>
            <img style="width: 0.40rem; margin: 0 0.10rem" src="../../shop/img/shanghaic.png" />
            <span>{{ singleOrder.storeName }}</span>
          </div>
          <div style="color: #f86e0e" @click="kefu">联系卖家</div>
        </div>
        <order-item-children
          v-if="singleOrderDetail"
          v-for="(item, index) in singleOrderDetail"
          :datas="item"
          :key="'c' + index"
        > </order-item-children>
      </div>
      <div class="orderDetailsListSum">
        <div class="orderDetailsListSumTop">
          <div>
            <span>商品总价</span>
            <span><span>￥</span><span>{{ singleOrder.goodsAmount }}</span></span>
          </div>
          <div style="margin: 0.10rem 0">
            <span>运费（快递）</span>
            <span><span>￥</span><span>{{ singleOrder.shippingAmount }}</span></span>
          </div>
          <div>
            <span>店铺优惠</span>
            <span><span>￥</span><span>{{ singleOrder.discount }}</span></span>
          </div>
          <div>
            <span style="margin: 0.10rem 0">积分抵扣</span>
            <span><span>￥</span><span>{{ singleOrder.pointDiscount }}</span></span>
          </div>
          <div>
            <span>总价</span>
            <span><span>￥</span><span>{{ singleOrder.needPayMoney }}</span></span>
          </div>
        </div>
        <div class="orderDetailsListSumFoot">
          <div>
            <span style="margin-right: 0.10rem">实付款：</span>
            <span style="color: #f86e0e"><span>￥</span><span>{{ singleOrder.needPayMoney }}</span></span>
          </div>
        </div>
      </div>
    </div>
    <!--客服弹窗-->
    <div v-transfer-dom class="popup_zong1">
      <popup v-model="show_kefu" position="bottom" >
        <!--客服-->
        <div class="kefu">
          <div class="kefu_top">
            <div>
              <div>
                <img src="../img/qq.png" alt="">
              </div>
              <p class="lei">QQ客服</p>
              <p>联系客服</p>
            </div>
            <div>
              <div>
                <img src="../img/qq2.png" alt="">
              </div>
              <p class="lei">微信客服</p>
              <p >15523458902</p>
            </div>
            <div>
              <div>
                <img src="../img/qq3.png" alt="">
              </div>
              <p class="lei">电话客服</p>
              <p ><a style="color:#fff" :href="'tel:'+'400-113-7166'">400-113-7166</a></p>
            </div>
          </div>
        </div>
        <!--底部-->
        <div class="kefu_quxiao" @click="close_kefu">取消</div>
      </popup>
    </div>
  </div>
</template>
<script>
  /**
   * @props
   * @emit
   */
  import { XHeader, TransferDom, Popup } from 'vux'
  import orderItemChildren from './orderItemChildren'
  import { getOrdersGoodDetails } from "@/api/personally"
  import {time} from '@/untils/untils'

  export default{
    directives: {
      TransferDom
    },
    components: {
      XHeader,
      orderItemChildren,
      Popup
    },
    data(){
      return{
        topMessage: '订单详情',
        orderId: '',
        singleOrder: {},

        show_kefu: false,
      }
    },
    computed: {
      singleOrderDetail() {
        return this.singleOrder.orderDetail
      },
      // 下单时间
      createTime() {
        return time(this.singleOrder.createTime)
      }
    },
    props:{

    },
    mounted(){
      this.orderId = this.$route.query.orderId

      this._getOrdersGoodDetails()
    },
    methods:{
     /* contact() {
        this.$store.commit('setToastText', '联系卖家')
        this.$store.commit('setToastType', 'success')
      },*/
      kefu() {
        this.show_kefu = true;
        console.log("客服");
      },
      close_kefu() {
        this.show_kefu = false;
        console.log("客服取消");
      },
      // 订单详情
      _getOrdersGoodDetails() {
        getOrdersGoodDetails({
          orderId: this.orderId
        })
          .then( res => {

            this.singleOrder = res.data

            console.log('b2c订单详情', res)

          })
      }
    },
  }
</script>
<style scoped>
  .vux-header { background-color: #ffffff;}
  .top >>> .vux-header-title {color: #000;}
  .top >>> .vux-header-left .left-arrow:before {border-color:#000;}

  .top {
    width: 100%;
    position: fixed;
    left: 0;
    top: 0;
  }
  .orderDetails {
    padding-top: 0.90rem;
  }
  .orderDetailsList {
    font-size: 0.30rem;
  }
  .orderDetailsListStatus {
    padding: 0.40rem 0.30rem;
    color: #f86e0e;
    background-color: #fffaf7;
    margin-top: 0.20rem;
  }
  .orderDetailsListNum {
    padding: 0.30rem;
    background-color: #ffffff;
    margin: 0.20rem 0;
  }
  .orderNum > span,.orderTime > span,.receInfo > span {
    margin-right: 0.20rem;
  }
  .orderTime {
    margin: 0.30rem 0;
  }
  .receInfo {
    display: flex;
  }
  .orderDetailsListC {
    padding-bottom: 0.20rem;
  }
  .orderDetailsListSum {
    background-color: #ffffff;
  }
  .orderDetailsListSumTop {
    padding: 0.25rem 0.30rem;
  }
  .orderDetailsListSumTop div {
    display: flex;
    justify-content: space-between;
  }
  .orderDetailsListSumFoot {
    display: flex;
    justify-content: flex-end;
    padding: 0.35rem;
    border-top: 1px solid #ccc;
  }

  /*客服弹窗*/
  .kefu_quxiao {
    line-height: 1rem;
    background: #fff;
    text-align: center;
    font-size: 0.3rem;
    color: #333333;
  }
  .kefu {
    padding: 0.7rem 0.2rem 0.9rem;
  }
  .kefu_top {
    display: flex;
    justify-content: space-between;
  }
  .kefu_top > div {
    width: 2rem;
    display: flex;
    flex-direction: column;
    border-right: 1px solid #fff;
    padding-right: 0.24rem;
  }
  .kefu_top > div:last-child {
    border: none;
    padding: 0;
  }
  .kefu_top div div {
    width: 0.9rem;
    height: 0.9rem;
    align-self: center;
  }
  .kefu_top img {
    width: 100%;
    height: 100%;
  }
  .kefu_top div p {
    text-align: center;
  }
  .lei {
    line-height: 0.8rem;
    font-size: 0.3rem;
    color: #333333;
  }
  .kefu_top div p:last-child {
    color: #ffffff;
    font-size: 0.24rem;
    line-height: 0.5rem;
    background: -webkit-linear-gradient(left, #f86e0e, #f45f32, #f15451);
    border-radius: 0.1rem;
  }
  .inputBox img2 {
    width: 0.42rem;
    height: 0.42rem;
  }
</style>
