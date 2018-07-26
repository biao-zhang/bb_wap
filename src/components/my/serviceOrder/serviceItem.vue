<template>
  <div class='serviceItem'>
    <!--<router-link
      :to="{path:orderChildren.orderStatus === '已接单'? '/z/serviceOrderGet': '/z/serviceOrder',query:{id:orderChildren.id}}"
    >-->
      <div class="serviceItemList">
      <div class="serviceItemPic">
        <img :src="orderChildren.serviceProviderImg ? orderChildren.serviceProviderImg : require('../img/oxniceDefault.png')"/>
      </div>
      <div class="serviceItemInfo" @click="lookDetail">
        <div class="serviceItemN">
          <span style="font-weight: bold">{{ orderChildren.serviceProjectName }}</span>
          <div style="color: #f86e0e">
            <div v-if="orderChildren.orderState === 0">待支付</div>
            <div v-if="orderChildren.orderState === 1">待接单</div>
            <div v-if="orderChildren.orderState === 2">已接单</div>
            <div v-if="orderChildren.orderState === 3">服务中</div>
            <div v-if="orderChildren.orderState === 4">待评价</div>
            <div v-if="orderChildren.orderState === 5">已评价</div>
            <!--其他-->
            <div v-if="orderChildren.orderState === 6">已取消</div>
            <div v-if="orderChildren.orderState === 7">已退款</div>
            <div v-if="orderChildren.orderState === 10">退款中</div>
          </div>
        </div>
        <div style="margin: 0.10rem 0; color: #a2a1a1">
          <span>下单时间：</span>
          <span>{{createTime[0]}}-{{createTime[1]}}-{{createTime[2]}} {{createTime[3]}}:{{createTime[4]}}:{{createTime[5]}}</span>
        </div>
        <div style="color: #a2a1a1">
          <span>总价：</span>
          <span><span>￥</span>{{ orderChildren.amountPayable }}</span>
        </div>
      </div>
    </div>
    <div class="detailStatus">
      <div v-if="orderChildren.orderState === 0" >
        <div class="detailStatusItem" style="display: inline-block" @click="operate1">取消订单</div>
        <div class="detailStatusItem" style="display: inline-block" @click="operate2">去支付 </div>
      </div>
      <div v-if="orderChildren.orderState === 1" >
        <div class="detailStatusItem" style="display: inline-block" @click="operate1">取消订单</div>
        <!--<div class="detailStatusItem" style="display: inline-block" @click="operate2">去支付 </div>-->
      </div>
      <div v-if="orderChildren.orderState === 2" >
        <div class="detailStatusItem" style="display: inline-block" @click="operate1"> 取消订单</div>
        <!--<div class="detailStatusItem" style="display: inline-block" @click="operate2"> </div>-->
      </div>
      <div v-if="orderChildren.orderState === 3" >
        <div class="detailStatusItem" style="display: inline-block" @click="operate1">确认完成</div>
      </div>
      <div v-if="orderChildren.orderState === 4" >
        <div class="detailStatusItem" style="display: inline-block" @click="operate1">去评价</div>
      </div>
      <div v-if="orderChildren.orderState === 5" >
        <!--<div class="detailStatusItem" style="display: inline-block" @click="operate1">删除订单</div>-->
        <!--<div class="detailStatusItem" style="display: inline-block" @click="operate2"> </div>-->
      </div>

      <!--其他-->
     <!-- <div v-if="orderChildren.orderState === 6">已取消</div>
      <div v-if="orderChildren.orderState === 7">已退款</div>
      <div v-if="orderChildren.orderState === 10">退款中</div>-->
    </div>
    <!--dialog-->
    <div v-transfer-dom>
      <confirm
        v-model="show"
        :title="'操作提示'"
        @on-cancel="sureBtnCancel"
        @on-confirm="sureBtnSure"
      >
        <p style="text-align:center;">确定取消订单？</p>
      </confirm>
    </div>
    <!--end-->
  </div>
</template>
<script>
  /**
   * @props
   * @emit
   */
  import {time} from '@/untils/untils'
  import { XDialog, Confirm, TransferDomDirective as TransferDom  } from 'vux'
  import { serviceInsert, serviceOk } from "@/api/service"

  export default{
    components: {
      XDialog,
      Confirm,
    },
    directives: {
      TransferDom
    },
    data(){
      return{
        tableIndex: 999,

        show: false,
      }
    },
    computed: {
      createTime() {
        return time(this.orderChildren.createOrderTime)
      },
      // 订单id
      orderId() {
        return this.orderChildren.orderId
      }
    },
    props: ['orderChildren'],
    mounted(){

    },
    methods:{
      // 点击弹窗确定按钮
      sureBtnSure() {
        this.show = false
        let status = this.orderChildren.orderState
        if (status === 0 || status === 1 || status === 2) {
          // 取消订单
          this._serviceInsert()
        }

      },
      // 点击弹窗取消按钮
      sureBtnCancel() {
        this.show = false
      },
      lookDetail() {

        if(this.orderChildren.serviceTypeName === '跑腿帮') {

          this.$router.push({path: '/z/serviceOrderGet', query: {orderId: this.orderChildren.orderId}})

        } else {

          this.$router.push({path: '/z/serviceOrder', query: {orderId: this.orderChildren.orderId}})

        }

      },
      // 操作1
      operate1() {
        let status = this.orderChildren.orderState
        if (status === 0 || status === 1 || status === 2) {

          this.show = true

        }  else if (status === 3) {
          // 确认完成
          this._serviceOk()

        } else if (status === 4) {

          // 去评价
          this.$router.push({path:'/z/serviceEvaluate', query: {orderId: this.orderChildren.orderId}})

        }
      },
      // 操作2
      operate2() {
        let status = this.orderChildren.orderState
        if (status === 0) {

          // 去支付
          this.$router.push({path:'/y/paymentMethod', query: {orderId: this.orderChildren.orderId, settlementType: 4}})

        }
      },
      // 取消订单
      _serviceInsert() {
        serviceInsert({orderId: this.orderId}).then( res => {
          this.$emit('cancelOrder')
          console.log('service取消订单', res)
        })
      },

      // 确认完成
      _serviceOk() {
        serviceOk({orderId: this.orderId}).then( res => {

          if(res.result === 1) {

            if(res.message === 'success') {

              this.$emit('conformOrder')

            } else {

              this.$store.commit('setToastText', res.message)
              this.$store.commit('setToastType', 'warn')

            }

          } else {

            this.$store.commit('setToastText', '数据异常')
            this.$store.commit('setToastType', 'warn')

          }
          console.log('service确认收货', res)
        })
      },
    },
  }
</script>
<style scoped>
  .serviceItem {
    margin-top: 0.20rem;
  }
  .serviceItemList {
    padding: 0.30rem 0.25rem;
    background-color: #fffaf7;
    font-size: 0.30rem;
    display: flex;
  }
  .serviceItemN {
    display: flex;
    justify-content: space-between;
    width: 5.36rem;
  }
  .serviceItemPic img {
    width: 1.34rem;
    margin-right: 0.30rem;
    border-radius: 50%;
  }
  .detailStatus {
    padding: 0.20rem;
    display: flex;
    justify-content: flex-end;
    background-color: #ffffff;
    border-top: 1px solid #eee;
  }
  .detailStatusItem {
    border: 1px solid #cccccc;
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

  .xdialog >>> .weui-dialog {
    display: block;
    top: 30%;
  }

</style>
