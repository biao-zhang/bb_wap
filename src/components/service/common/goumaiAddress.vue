<template>
  <div class="goumai" :class="{hei:datas.input1!=true}">
    <div class="line1">
      <span class="goumaiTit">购买地址</span>
      <span class="type1" :class="{orange:datas.input1}" @click="datas.input1=true">随意购</span>
      <span class="type2" :class="{orange:!datas.input1}" @click="toMap">指定买</span>
    </div>
    <div class="dizhi" v-if="datas.input1!=true">{{datas.input2}}</div>
    <div class="hr" v-if="datas.input1!=true"></div>
    <div class="line2">
      <div class="lineCon">
        <span class="s1">服务发票</span>
        <span class="s2" :class="{orange:(datas.input3==''||datas.input3==0)}" @click="datas.input3=0">否</span>
        <span class="s3" :class="{orange:datas.input3==1}" @click="datas.input3=1">是</span>
      </div>
    </div>
  </div>
</template>
<script>
  import { mapState } from 'vuex'
  export default {
    data(){
      return{
//        typeIndex:true,   // 有 购买方式
//        invoiceIndex:true,   // 有 无 发票
//
//        inputVal:"郑州",
      }
    },
    computed:{
      ...mapState('service',{
        datas (state) {
          return state[this.serviceType].goumaiGoodsAddress
        }
      }),
    },
    props:{
      serviceType:{
        type:String,
        default:''
      }
    },
    methods:{
      changeTypeIndex(a){    //购买方式
//        this.typeIndex=a;
//        if(a) this.inputVal = '';
//        this.$emit('buyType',[this.inputVal,this.typeIndex,this.invoiceIndex]);
      },
      changeInvoiceIndex(a){    //是否 有发票
//        this.invoiceIndex=a;
//        this.$emit('buyType',[this.inputVal,this.typeIndex,this.invoiceIndex]);
      },
      toMap(){
        this.datas.input1=false;
        this.$emit("changeRunToMap")
        this.$router.push({path:'/x/serviceMap'})
      },
    }
  }
</script>
<style scoped>
  .orange{color:#f86e0e;}

  .goumai{height: 2rem;}
  .goumai.hei{height: 2.85rem;}

  .line1{font-size: 0.3rem;color:#333;line-height: 0.45rem;padding-top: 0.3rem;display: flex;margin-bottom:0.2rem;}
  .line1 .goumaiTit{margin:0 0.14rem 0 0.17rem;display: inline-block;}
  .line1 textarea{border:0;line-height: 0.38rem;font-size: 0.3rem;color:#515151;width:5.08rem;height: 0.76rem;overflow:hidden; resize:none;outline: none;padding:0;}
  .line1 .type1{margin-left: 0.73rem;}
  .line1 .type2{margin-left: 2.62rem;}

  .dizhi{line-height: 0.45rem;height:0.9rem;font-size: 0.3rem;color:#999;margin-left:1rem;}

  .hr{width:6rem;margin:0 0 0 0.56rem;height:1px;background-color: #ededed;}

  .line2{display: flex;margin-top: 0.4rem;}
  .line2 .lineCon{width:6.58rem;font-size: 0.3rem;line-height: 0.45rem;}
  .line2 .lineCon .s1{padding-left: 0.17rem;}
  .line2 .lineCon .s2{margin-left:1.14rem;}
  .line2 .lineCon .s3{margin-left: 2.91rem;}
</style>
