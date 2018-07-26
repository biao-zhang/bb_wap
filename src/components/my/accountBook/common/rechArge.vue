<template>
  <div class='rechArge'>
    <div class="rechargeContent">
      <div class="rechargeNum">
        <span class="recharge_num">充值账号</span>
        <span class="recharge_content">{{ phone }}</span>
      </div>
      <div class="rechargeMoney">
        <div>充值金额</div>
        <div style="font-size: 0.40rem">
          <span>￥</span>
          <input type="number" v-model="num"/>
        </div>
        <div class="rechargeLine"></div>
        <div class="rechargeTip">当前余额为<span style="color: #f86e0e">{{ account }}</span>元</div>
      </div>
      <div class="btn" @click="argeBtn">去支付</div>
    </div>
  </div>
</template>
<script>
  /**
   * @props
   * @emit
   */
  import { getPhone, createOrder } from "@/api/personally"

  export default{
    data(){
      return{
        num:'',
        phone: '',
        orderId: '',
      }
    },
    props: ['account'],
    mounted(){
      this._getPhone()
    },
    methods:{
      argeBtn(){
        if( this.num ){

          this._createOrder()

        }
      },
      // 获取电话号码
      _getPhone() {
        getPhone().then( res => {

          this.phone = res.data.phone

          this.phone = this.phone.substr(0, 3) + '****' + this.phone.substr(7, 11);

          console.log('电话号码', res)

        })
      },
      // 会员充值
      _createOrder() {
        createOrder({
          money: this.num
        })
          .then( res => {

            this.orderId = res.data
            this.$router.push({path: '/y/paymentMethod', query: {orderId: this.orderId}})
            console.log('会员充值', res)

          })
      },
    },
  }
</script>
<style scoped>
  .rechargeContent {
    padding: 0.2rem 0.30rem;
    font-size: 0.30rem;
  }
  .rechargeNum {
    padding: 0.30rem 0.20rem;
    background-color: #fff4ed;
  }
  .recharge_num {
    margin-right: 1.05rem;
  }
  .recharge_content {
    color: #f86e0e;
  }
  .rechargeMoney {
    padding: 0.35rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 2.30rem;
    background-color: #fff;
  }
  .rechargeLine {
    border: 0.5px solid #ccc;
  }
  .rechargeTip {
    color: #a9a9a9;
    font-size: 0.26rem;
  }
  .btn{width:100%;background:#f66e26;line-height:0.8rem;text-align:center;color:#fff;font-size:0.32rem;border-radius:0.05rem;margin-top:1.2rem;}
</style>
