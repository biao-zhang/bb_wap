<template>
  <div class="housekeepName">
    <div class="line1">
      <img class="img1_1" src="../img/type.png"/><!--<div class="tit1">服务类型</div><span class="s1"><input type="text" class="input1"/></span>--><input type="text" @change="changeData" class="tit1" v-model="datas.input1" placeholder="请输入服务名称"/>
    </div>
    <div class="hr"></div>
    <div class="line2">
      <img class="img2_1" src="../img/name.png"/><input class="tit2" v-model="datas.input2" type="text" @change="changeData" placeholder="发起人"/>
    </div>
    <div class="line3">
      <img class="img3_1" src="../img/phone.png"/><input type="text" v-model="datas.input3" class="tit3" @change="changeData" placeholder="手机号"/>
    </div>
  </div>
</template>
<script>
  import { mapState } from 'vuex'
  export default {
    data(){
      return{

      }
    },
    computed:{
      ...mapState('service',{
        datas (state) {
          return state[this.serviceType].serviceType
        }
      }),
    },
    mounted(){

    },
    props:{
      serviceType:{
        type:String,
        default:''
      }
    },
    methods:{
      changeData(){
//        this.$store.commit('service/setAllState',[this.serviceType,'serviceType',this.allInput])
//        this.$emit('nameData',[this.line1,this.line2,this.line3])
      }
    }
  }
</script>
<style scoped>
  .housekeepName{height: 3rem;font-size: 0.3rem;color:#333;}

  .line1{width:100%;height: 1rem;padding:0.3rem 0;line-height: 0.4rem;box-sizing: border-box;}
  .line1 .img1_1{width:0.26rem;vertical-align: middle;margin:0 0.28rem 0 0.2rem;}
  .line1 .tit1{display: inline-block;font-size: 0.3rem;color:#333;width:6rem;}
  .line1 .s1{float: right;margin-right: 0.23rem;}
  .line1 .s1 .input1{text-align: right}

  .hr{width:6rem;height: 1px;margin:0 auto;background-color: #ededed;}

  .line2{width:100%;height: 0.99rem;padding:0.3rem 0;line-height: 0.4rem;box-sizing: border-box;}
  .line2 .img2_1{width:0.26rem;vertical-align: middle;margin:0 0.28rem 0 0.2rem;}
  .line2 .tit2{display: inline-block; font-size: 0.3rem;color:#333;}
  .line2 .img2_2{width:0.28rem;padding:0 0.23rem 0 0.14rem;float: right;}

  .line3{width:100%;height: 1rem;padding:0.3rem 0;line-height: 0.4rem;box-sizing: border-box;}
  .line3 .img3_1{width:0.26rem;vertical-align: middle;margin:0 0.28rem 0 0.2rem;}
  .line3 .tit3{display: inline-block;font-size: 0.3rem;color:#333;}
</style>
