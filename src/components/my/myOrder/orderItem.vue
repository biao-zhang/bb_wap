<template>
  <div>
    <div class="order_content" >
      <div class="storeTitle">
        <div style="display: flex; align-items: center">
          <img src="../../shop/img/shanghaic.png" />
          <span>{{ orderChildren.storeName }}</span>
        </div>
        <div class="buyStatus">
          <div v-if="orderChildren.status === 1">已完成</div>
          <div v-if="orderChildren.status === 2">待付款</div>
          <div v-if="orderChildren.status === 3">待发货</div>
          <div v-if="orderChildren.status === 4">待收货</div>
          <div v-if="orderChildren.status === 5">待评价</div>
          <div v-if="orderChildren.status === 6">已关闭</div>
        </div>
      </div>
      <div class="storeDetails" v-for="(item,index) in orderDetail" :key="'od' + index" @click="lookDetail">
        <div class="storeDetailsImg">
          <!--../../shop/img/storePicture.png-->
          <img :src="item ? item.goodsImgMaster : require('../../shop/img/storePicture.png')"/>
        </div>
        <div>
          <div class="storeRight">
            <div>
              <div class="storeDetailsTitle re-twoLineOverFlow" style="">{{ item.goodsName }} </div>
              <!--<div class="storeHC">{{ orderChildren.storeHC }}</div>-->
            </div>
            <div v-if="item.goodsSpecs" style="color: #999999; margin-top: 0.40rem">
              <span>规格：{{ item.goodsSpecs }}</span>
            </div>
            <div class="storeMoneyTwo" style="margin-top: 0.40rem">
              <div class="storeMoney"><span>￥</span><span>{{ item.goodsPrice }}</span></div>
              <div class="storeQua"><span>x</span><span>{{ item.saleNum }}</span></div>
            </div>
          </div>
        </div>
      </div>
      <div class="detailsInfo">
        <div style="margin-right: 0.30rem">共<span>{{ orderChildren.goodsNum }} </span>件商品</div>
        <div style="margin-right: 0.10rem">
          <span>共计：</span>
          <span class="storeMoney">￥</span>
          <span class="storeMoney" style="margin-right: 0.10rem">{{ orderChildren.needPayMoney }}</span>
          <span>(含运费：￥{{ orderChildren.shippingAmount }})</span>
        </div>
      </div>
      <div class="detailStatus">
        <div v-if="orderChildren.status === 1">
          <div class="detailStatusItem" style="display: inline-block" @click="operate1">删除订单</div>
          <div class="detailStatusItem" style="display: inline-block" @click="operate2">查看物流 </div>
                    <div class="nice_niu">奈斯牛邀请您：分享商品链接，参与排队奖励活动</div>
        </div>
        <div v-if="orderChildren.status === 2">
          <div class="detailStatusItem" style="display: inline-block" @click="operate1">取消订单</div>
          <div class="detailStatusItem" style="display: inline-block" @click="operate2">去支付 </div>
        </div>
        <div v-if="orderChildren.status === 3">
          <!--<div class="detailStatusItem" style="display: inline-block" @click="operate1"> </div>
          <div class="detailStatusItem" style="display: inline-block" @click="operate2"> </div>-->
        </div>
        <div v-if="orderChildren.status === 4">
          <div class="detailStatusItem" style="display: inline-block" @click="operate1">确认收货</div>
          <div class="detailStatusItem" style="display: inline-block" @click="operate2">查看物流 </div>
        </div>
        <div v-if="orderChildren.status === 5" style="text-align:right;">
          <div class="detailStatusItem" style="display: inline-block ;float: right;" @click="operate1">删除订单</div>
          <!--<div class="detailStatusItem" style="display: inline-block" @click="operate2">查看物流 </div>-->
          <div class="nice_niu">奈斯牛邀请您：分享商品链接，参与排队奖励活动</div>
        </div>
        <div v-if="orderChildren.status === 6">
          <div class="detailStatusItem" style="display: inline-block ;float: right;" @click="operate1">删除订单</div>
          <!--<div class="detailStatusItem" style="display: inline-block" @click="operate2"> </div>-->
 <div class="nice_niu">奈斯牛邀请您：分享商品链接，参与排队奖励活动</div>
        </div>
      </div>
    </div>
    <!--dialog-->
    <!--<div class="xdialog">
      <x-dialog v-model="showDialogStyle" :dialog-style="{'background-color': 'transparent'}">
        <div class="dialogBox">
          <div class="sureTitel">确定{{ operate === 'delete' ? '删除' : '取消'}}订单？</div>
          <div class="sureBtn">
            <div
              class="sureBtnCancel"
              style="border-right: 1px solid #eee"
              @click="sureBtnCancel"
            >取消</div>
            <div class="sureBtnSure"
                 @click="sureBtnSure"
            >确定</div>
          </div>
        </div>
      </x-dialog>
    </div>-->
    <div v-transfer-dom>
      <confirm
        v-model="show"
        :title="'操作提示'"
        @on-cancel="sureBtnCancel"
        @on-confirm="sureBtnSure"
      >
        <p style="text-align:center;">确定{{ operate === 'delete' ? '删除' : '取消'}}订单？</p>
      </confirm>
    </div>
    <!--end-->
  </div>
</template>
<script>
  import { XDialog, Confirm, TransferDomDirective as TransferDom } from 'vux'
  import { goodsCancel, goodsDelete, goodsConform, checkLogistics } from "@/api/personally"
  // import Ellipsis from 'ellipsis-plus'
  export default {
    components: {
      XDialog,
      // Ellipsis
      Confirm,
    },
    directives: {
      TransferDom
    },
    data() {
      return {
        /*showDialogStyle: false,*/
        operate: '',

        show: false,
      }
    },
    computed: {
      // 每个订单下的详情列表
      orderDetail() {
        return this.orderChildren.orderDetail
      },
      // 订单id
      orderId() {
        return this.orderChildren.orderId
      }
    },
    props: ['orderChildren'],

    mounted() {

    },
    methods: {
      // 点击弹窗确定按钮
      sureBtnSure() {
        /*this.showDialogStyle = false*/
        this.show = false
        let status = this.orderChildren.status
        if (status === 1 || status === 5 || status === 6) {
           // 删除订单
           this._goodsDelete()

        } else if (status === 2) {
           // 取消订单
           this._goodsCancel()

        }

      },
      // 点击弹窗取消按钮
      sureBtnCancel() {
        /*this.showDialogStyle = false*/
        this.show = false
      },
      lookDetail() {
        this.$router.push({path: '/z/orderDetails', query: {orderId: this.orderChildren.orderId}})
      },
      // 操作1
      operate1() {
        let status = this.orderChildren.status
        if (status === 1 || status === 5 || status === 6) {

          /*this.showDialogStyle = true*/
          this.show = true
          this.operate = 'delete'

        } else if (status === 2) {

          /*this.showDialogStyle = true*/
          this.show = true
          this.operate = 'cancel'

        } else if (status === 4) {
          // 确认收货
          this._goodsConform()

        }
      },
      // 操作2
      operate2() {
        let status = this.orderChildren.status
        if (status === 1 || status === 4 || status === 5) {

          // 查看物流

          this.$router.push({
            path:'/x/logistic',
            query: {
              orderId: this.orderChildren.orderId,
              settlementType: 1,
              logiName: this.orderChildren.logiName,
              shipNo: this.orderChildren.shipNo
            }})

        } else if (status === 2) {

          // 去支付
          this.$router.push({path:'/y/paymentMethod', query: {orderId: this.orderChildren.orderId, settlementType: 1}})

        }
      },
      // 取消订单
      _goodsCancel() {
        goodsCancel({orderId: this.orderId}).then( res => {
          this.$emit('cancelOrder')
          console.log('b2c取消订单', res)
        })
      },
      // 删除订单
      _goodsDelete() {
        goodsDelete({orderId: this.orderId}).then( res => {
          this.$emit('cancelOrder')
          console.log('b2c删除订单', res)
        })
      },
      // 确认收货
      _goodsConform() {
        goodsConform({orderId: this.orderId}).then( res => {
          this.$emit('cancelOrder')
          console.log('b2c确认收货', res)
        })
      },

    }
  }
</script>
<style scoped>
  .order_content {
    background-color: #ffffff;
    margin-bottom: 0.10rem;
  }
  .storeTitle {
    padding: 0.20rem;
    display: flex;
    border-bottom: 1px solid #eeeeee;
    justify-content: space-between;
  }
  .storeTitle img  {
    width: 0.43rem;
    margin-right: 0.15rem;
  }
  .buyStatus {
    color: #f86e0e;
    font-size: 0.26rem;
  }
  .storeDetails {
    padding: 0.20rem;
    background-color: #fffaf7;
    display: flex;
  }
  .storeDetailsImg {
    margin-right: 0.60rem;
  }
  .storeDetailsImg img {
    width: 2.41rem;
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
    width: 4.00rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .storeMoneyTwo {
    display: flex;
    width: 3.92rem;
    justify-content: space-between;
    padding: 0.20rem 0;
  }
  .detailsInfo {
    padding: 0.20rem;
    /*border-bottom: 1px solid #eee;*/
    display: flex;
    justify-content: flex-end;
    font-size: 0.24rem;
    color: #666;
  }
  .detailsInfo div {
    display: flex;
    align-items: center;
  }
  .detailStatus {
    padding: 0.20rem;
    display: flex;
    justify-content: flex-end;
  }
  .detailStatusItem {
    border: 2px solid #cccccc;
    border-radius: 20px;
    padding: 0.18rem;
    margin-left: 0.25rem;
    font-size: 0.26rem;
  }
  .detailsBG {
    color: #fd816f;
    border-color: #fd593d;
  }

  .dialogBox {
    border-radius: 0.20rem;
    font-size: 0.34rem;
    background-color: #fff;
  }
  .sureTitel {
    padding: 0.80rem 0;
    text-align: center;
  }
  .sureBtn {
    display: flex;
    justify-content: space-between;
    border-top: 1px solid #eee;
  }
  .sureBtnCancel,.sureBtnSure {
    padding: 0.35rem 0;
    text-align: center;
    width: 3.25rem;
  }
  .sureBtnSure {
    color: #fff;
    background-color: #f15352;
  }

  /*.xdialog >>> .weui-dialog {
    display: block;
    top: 30%;
  }*/
  .nice_niu{float: right; color:#d0d0d0;font-size:0.2rem;line-height:0.6rem;display:inline-block; margin-top: 5px;}
</style>
