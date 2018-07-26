<template>
  <div>
    <div class="order_other">
      <div class="order_other_intergal">
        <div>积分抵扣</div>
        <div class="order_distribution_r">
          <input class="integral_kill" type="text" v-model="integral" @change="changeIntegral"/>
          <span>分</span>
          <div class="integral_tips">可用积分{{curIntegral}}积分，{{ratio}}积分=1元</div>
        </div>
      </div>
      <div class="order_other_invoice" @click="order_other_invoice">
        <div>开具发票</div>
        <div class="order_distribution_r"><span>{{invoiceLabel}}</span><i class="iconfont icon-iconset0417"></i></div>
      </div>
    </div>

  </div>
</template>
<script>
  import { getCurIntegral } from '@/api/personally'
  export default {
    data() {
      return {
        integral:null,
        show14: true,
        show13: true,
        curIntegral:0,    //当前用户的总积分
      }
    },
    mounted(){
      //获取用户当前的积分数量
      getCurIntegral({}).then(res => {
        if (res.result) {
          this.curIntegral = res.data;
          console.log(res.data)
        } else {

        }
      }).catch((err)=>{
//        alert('获取用户积分失败')
        this.$store.state.toastText='获取用户积分失败'
        this.$store.state.toastType='text'
      });
    },
    props:{
      invoiceLabel:{
        type:String,
        default:'暂不需要'
      },
      ratio:{
        type:Number,
        default:0
      }
    },
    methods: {
      couponClick() {
        console.log('使用优惠券');
        this.$emit('couponClickChild', this.show14)
      },
      order_other_invoice() {
        console.log('使用发票');
        this.$emit('order_other_invoice_child', this.show13)
      },
//      积分改变
      changeIntegral(){
        this.integral=(this.integral==null?0:parseInt(this.integral))
        if(this.integral>this.curIntegral){    //格式化用户输入的积分
//          alert('积分不足')
          this.$store.state.toastText='积分不足'
          this.$store.state.toastType='text'
          this.integral = this.curIntegral
        }else if(this.integral<0){
          this.integral=0
        }else{

        }
        this.$emit('pullIntegral', parseInt(this.integral))
      }
    }
  }
</script>
<style scoped>
  .order_distribution {
    margin: 0.15rem 0;
    padding: 0.45rem 0.20rem;
    display: flex;
    justify-content: space-between;
    background-color: #ffffff;
    font-size: 0.30rem;
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
  .order_other_intergal {
    border-bottom: 1px solid #eeeeee;
    border-top: 1px solid #eeeeee;
  }
  .integral_kill {
    border: 1px solid #dcdcdc;
    height: 0.50rem;
    padding-left:5px;
    box-sizing: border-box;
  }
  .integral_tips {
    font-size: 0.24rem;
    color: #9a9a9a;
    margin-top: 0.20rem;
  }

</style>
