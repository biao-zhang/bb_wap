<template>
  <div class='orderDetails'>
    <div class="top">
      <x-header :left-options="{backText: ''}">{{ topMessage }}</x-header>
    </div>
    <div class="orderDetailsList">
      <div class="orderDetailsListStatus">待发货</div>
      <div class="orderDetailsListNum">
        <div class="orderNum">
          <span>订单号：&nbsp&nbsp&nbsp</span>
          <span>1234567891011</span>
        </div>
        <div class="orderTime">
          <span>下单时间：</span>
          <span>2018.2.26</span>
        </div>
        <div class="receInfo">
          <span>收货信息：</span>
          <div>
            <div>张鱼鱼    13900000000 </div>
            <div style="margin-top: 0.10rem">北京市东城区建国大门内大街25号</div>
          </div>
        </div>
      </div>
      <div class="orderDetailsListC">
        <!--<order-item :order-children="item1"  @dialog="orderItemDialog"> </order-item>-->
      </div>
      <div class="orderDetailsListSum">
        <div class="orderDetailsListSumTop">
          <div>
            <span>商品总价</span>
            <span><span>￥</span><span>178600</span></span>
          </div>
          <div style="margin: 0.10rem 0">
            <span>运费（快递）</span>
            <span><span>￥</span><span>0</span></span>
          </div>
          <div>
            <span>店铺优惠</span>
            <span><span>￥</span><span>0</span></span>
          </div>
          <div>
            <span style="margin: 0.10rem 0">积分抵扣</span>
            <span><span>￥</span><span>0</span></span>
          </div>
          <div>
            <span>总价</span>
            <span><span>￥</span><span>178600</span></span>
          </div>
        </div>
        <div class="orderDetailsListSumFoot">
          <div>
            <span style="margin-right: 0.10rem">实付款：</span>
            <span style="color: #f86e0e"><span>￥</span><span>178600</span></span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  /**
   * @props
   * @emit
   */
  import { XHeader } from 'vux'
  import OrderItem from '../myOrder/orderItem.vue'
  export default{
    components: {
      XHeader,
      OrderItem
    },
    data(){
      return{
        topMessage: '订单详情',
        item1:  {
          id: 0,
          orderName: '上海仓',
          orderStatus: '待付款',
          storeDetailsTitle: '2017布艺沙发新品草绿色新品草绿色',
          storeHC: '尺寸：W210XD91-XH8-X-101cm...',
          storeMoney: 179999,
          storeQua: 1,
          freight: '0.00',   // 运费
          detailStatusArr: ['删除订单', '查看物流', '追加评价'],
        },
      }
    },
    props:{

    },
    mounted(){

    },
    methods:{
      _getOrdersGoodDetails() {
        getOrdersGoodDetails({
          orderId: this.orderId
        })
          .then( res => {

            console.log('b2c商品列表', res)

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
    margin-bottom: 0.20rem;
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
</style>
