<template>
  <div>
    <div class="order_content">
      <div class="storeTitle">
        <div style="display: flex; align-items: center">
          <img src="../../shop/img/shanghaic.png" />
          <span>{{ orderChildren.storeName }}</span>
        </div>
        <div class="buyStatus">
          <div v-if="orderChildren.status === 0">其他状态</div>
          <div v-if="orderChildren.status === 1">已完成</div>
          <div v-if="orderChildren.status === 2">待付款</div>
          <div v-if="orderChildren.status === 3">待消费</div>
          <div v-if="orderChildren.status === 5">待评价</div>
          <div v-if="orderChildren.status === 6">已关闭</div>
        </div>
      </div>
      <div class="storeDetails" v-for="(item,index) in orderDetail" :key="'od' + index" @click="lookDetail">
        <div class="storeDetailsImg">
          <img :src="item ? item.goodsImgMaster : require('../../shop/img/storePicture.png')"/>
        </div>
        <div>
          <div class="storeRight">
            <div>
              <div class="storeDetailsTitle re-twoLineOverFlow">{{ item.goodsName }}</div>
            </div>
            <div style="color: #999999; margin: 0.40rem 0">
              <span>规格：{{ item.goodsSpecs }}</span>
            </div>
            <div class="storeMoneyTwo">
              <div class="storeMoney"><span>￥</span><span>{{ item.goodsPrice }}</span></div>
              <div class="storeQua"><span>x</span><span>{{ item.saleNum }}</span></div>
            </div>
          </div>
        </div>
      </div>
      <div class="detailsInfo">
        <div style="margin-right: 0.30rem">共<span>{{ orderChildren.goodsNum }}</span>件商品</div>
        <div style="margin-right: 0.10rem">
          <span>共计：</span>
          <span class="storeMoney">￥</span>
          <span class="storeMoney">{{ orderChildren.goodsAmount }}</span>
        </div>
      </div>
      <div class="detailStatus">
        <div v-if="orderChildren.status === 0" >
          <div class="detailStatusItem" style="display: inline-block" @click="operate1"> </div>
        </div>
        <div v-if="orderChildren.status === 1" >
          <div class="detailStatusItem" style="display: inline-block;float: right;" @click="operate1">删除订单</div>
          <div class="nice_niu">奈斯牛邀请您：分享商品链接，参与排队奖励活动</div>
        </div>
        <div v-if="orderChildren.status === 2" >
          <div class="detailStatusItem" style="display: inline-block" @click="operate1">取消订单</div>
          <div class="detailStatusItem" style="display: inline-block" @click="operate2">去支付 </div>
        </div>
        <div v-if="orderChildren.status === 3" >
          <div class="detailStatusItem" style="display: inline-block" @click="operate1"> 确认收货 </div>
        </div>
        <div v-if="orderChildren.status === 5" >
          <div class="detailStatusItem" style="display: inline-block;float: right;" @click="operate1">删除订单</div>
           <div class="nice_niu">奈斯牛邀请您：分享商品链接，参与排队奖励活动</div>
        </div>
        <div v-if="orderChildren.status === 6" >
          <div class="detailStatusItem" style="display: inline-block;float: right;" @click="operate1">删除订单</div>
           <div class="nice_niu">奈斯牛邀请您：分享商品链接，参与排队奖励活动</div>
        </div>
      </div>
    </div>
    <!--dialog-->
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
  import { deleteOrderById, o2oCancel, rogConfirm } from "@/api/personally"
  import { XDialog, Confirm, TransferDomDirective as TransferDom } from 'vux'

  export default {
    components: {
      XDialog,
      Confirm,
    },
    directives: {
      TransferDom
    },
    data() {
      return {
        isActive: false,
        tableIndex: 999,

        show: false,
        operate: '',
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
        this.show = false
        let status = this.orderChildren.status
        if (status === 1 || status === 5 || status === 6) {
          // 删除订单
          this._deleteOrderById()

        } else if (status === 2) {
          // 取消订单
          this._o2oCancel()

        }

      },
      // 点击弹窗取消按钮
      sureBtnCancel() {
        this.show = false
      },
      // 查看详情
      lookDetail() {
        this.$router.push({path: '/z/terminalOrderDetails', query: {orderId: this.orderId}})
      },
      // 操作1
      operate1() {
        let status = this.orderChildren.status
        if (status === 1 || status === 5 || status === 6) {

          this.show = true
          this.operate = 'delete'

        } else if (status === 2) {

          this.show = true
          this.operate = 'cancel'

        } else if (status === 3) {
          // 确认收货
          this._rogConfirm()

        }
      },
      // 操作2
      operate2() {
        let status = this.orderChildren.status
        if (status === 2) {

          // 去支付
          this.$router.push({path:'/y/paymentMethod', query: {orderId: this.orderChildren.orderId, settlementType: 3}})

        }
      },
      // 取消订单
      _o2oCancel() {
        o2oCancel({orderId: this.orderId}).then( res => {
          this.$emit('cancelOrder')
          console.log('o2o取消订单', res)
        })
      },
      // 删除订单
      _deleteOrderById() {
        deleteOrderById({orderId: this.orderId}).then( res => {
          this.$emit('deleteOrder')
          console.log('o2o删除订单', res)
        })
      },
      // 确认收货
      _rogConfirm() {
        rogConfirm({orderId: this.orderId}).then( res => {

          if(res.message === 'success') {

            this.$emit('conformOrder')

          } else {

            this.$store.commit('setToastText', res.message)
            this.$store.commit('setToastType', 'warn')

          }
          console.log('o2o确认收货', res)
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
    height: 2.00rem;
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
  }
  .storeMoneyTwo {
    width: 3.92rem;
    display: flex;
    justify-content: space-between;
  }
  .detailsInfo {
    padding: 0.20rem;
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
   .nice_niu{float: right; color:#d0d0d0;font-size:0.2rem;line-height:0.6rem;display:inline-block; margin-top: 5px;}
</style>
