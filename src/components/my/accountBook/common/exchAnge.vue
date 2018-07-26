<template>
  <div class='exchAnge'>
    <p>说明：兑换比率1元=100积分</p>
    <div class="dizhi">
      <checker default-item-class="checkerDefault" selected-item-class="checkerSelected">
        <checker-item :value="item.jifen" @on-item-click="clickCheckerItem" v-for="(item,index) in datas" :key="index">{{item.jifen}}积分</checker-item>
      </checker>
    </div>
    <div class="btn" @click="exchBtn">立即兑换</div>
    <!--提示-->
    <toast v-model="showToast" :time="1000">兑换成功</toast>
    <!--end-->
  </div>
</template>
<script>
  /**
   * @props
   * @emit
   */
  import {Checker, CheckerItem, Toast } from 'vux'
  import { integralTransferBalance } from "@/api/personally"

  export default{
    components:{
      Checker,
      CheckerItem,
      Toast
    },
    data(){
      return{
        amount: '', // 单个积分，
        showToast: false,
      }
    },
    props: ['datas'],

    mounted(){

    },
    methods:{
      clickCheckerItem( itemValue ){

        this.amount = itemValue

      },
      exchBtn(){
        if(this.amount){

          this._integralTransferBalance()

        }else {}
      },

      _integralTransferBalance() {
        integralTransferBalance({
          amount: this.amount,
        })
          .then( res => {
            if(res.message === 'success'){
              this.showToast = true
              // 调用总积分
              this.$emit('amount')
            }
            console.log('积分转余额', res)
          })
      }
    },
  }
</script>
<style scoped>
  /*兑换*/
  .exchAnge{padding:0 0.3rem;}
  .exchAnge p{font-size:0.24rem;color: #666666;line-height:0.8rem;}

  .btn{width:100%;background:#f66e26;line-height:0.8rem;text-align:center;color:#fff;font-size:0.32rem;border-radius:0.05rem;margin-top:0.4rem;}
  .vux-checker-box{width:100%;display: flex;flex-wrap:wrap;justify-content: space-between;}
  .checkerDefault{font-size: 0.3rem;display:inline-block;width:2rem;height:1.2rem;line-height:1.2rem;margin-bottom:0.4rem;color:#333333;
    border:1px solid #cccccc;border-radius: 0.15rem;text-align: center;}
  .checkerSelected{color:#f86e0e;border:1px solid #f86e0e;}
</style>
