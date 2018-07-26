<template>
  <div class="housekeepName">
    <div class="line1" @click="changeTypeState">
      <img class="img1_1" src="../img/type.png"/><div class="tit1">服务类型</div><span class="s1" @click="changeVal">{{datas.input1.name}}<img class="img1_2" src="../img/xiangxia.png"/> </span>
    </div>
    <div class="hr"></div>
    <div class="line4">
      <img class="img4_1" src="../img/brand.png"/><input type="text" v-model="datas.input2" @change="changeVal" class="tit4" placeholder="请输入品牌型号"/>
    </div>
    <div class="hr"></div>
    <div class="line2">
      <img class="img2_1" src="../img/name.png"/><input type="text" v-model="datas.input3" @change="changeVal" class="tit2" placeholder="请输入联系人"/><!--<img class="img2_2" src="../img/contacts.png"/>-->
    </div>
    <div class="line3">
      <img class="img3_1" src="../img/phone.png"/><input type="text" v-model="datas.input4" @change="changeVal" class="tit3" placeholder="请输入联系电话"/>
    </div>
    <self-address v-if="typeState" :state="typeState" :list="typeList" @close="typeState=false" @change="getAddressVal"></self-address>
  </div>
</template>
<script>
  import { mapState } from 'vuex'
  import selfAddress from '@/vux/selfAddress'
  export default {
    data(){
      return{
        typeState:false,
//        typeList:serviceDatas_name_value_parent_json,
      }
    },
    components:{selfAddress},
    computed:{
      ...mapState('service',{
        datas (state) {
          return state[this.serviceType].serviceType
        }
      })
    },
    props:{
      serviceType:{
        type:String,
        default:''
      },
      typeList:{
        type:Array,
        default:()=>{
          return []
        }
      }
    },
    methods:{
      changeVal(){
//        this.$emit('nameLineData',[this.line1,this.line2,this.line3,this.line4])
      },
      getAddressVal(a,b){
        this.datas.input1={value:a[0],name:b[0]}
        this.$emit('changeType')
      },
      changeTypeState(){
        this.typeState=true;
      }
    }
  }
</script>
<style scoped>
  .housekeepName{height: 4rem;font-size: 0.3rem;color:#333;}

  .line1{width:100%;height: 1rem;padding:0.3rem 0;line-height: 0.4rem;box-sizing: border-box;}
  .line1 .img1_1{width:0.26rem;vertical-align: middle;margin:0 0.28rem 0 0.2rem;}
  .line1 .tit1{display: inline-block;}
  .line1 .s1{float: right;}
  .line1 .s1 .img1_2{width:0.28rem;padding:0 0.23rem 0 0.14rem;}

  .hr{width:6rem;height:1px;margin:0 auto;background-color: #ededed;}

  .line2{width:100%;height: 0.99rem;padding:0.3rem 0;line-height: 0.4rem;box-sizing: border-box;}
  .line2 .img2_1{width:0.26rem;vertical-align: middle;margin:0 0.28rem 0 0.2rem;}
  .line2 .tit2{display: inline-block;font-size: 0.3rem;color:#515151;}
  .line2 .img2_2{width:0.28rem;padding:0 0.23rem 0 0.14rem;float: right;}

  .line3{width:100%;height: 1rem;padding:0.3rem 0;line-height: 0.4rem;box-sizing: border-box;}
  .line3 .img3_1{width:0.26rem;vertical-align: middle;margin:0 0.28rem 0 0.2rem;}
  .line3 .tit3{display: inline-block;font-size: 0.3rem;color:#515151;}

  .line4{width:100%;height: 0.99rem;padding:0.3rem 0;line-height: 0.4rem;box-sizing: border-box;}
  .line4 .img4_1{width:0.26rem;vertical-align: middle;margin:0 0.28rem 0 0.2rem;}
  .line4 .tit4{display: inline-block;font-size: 0.3rem;color:#515151;}
</style>
