<template>
  <div class="housekeepAddress">
    <div v-if="!double" class="line1" @click="changeAddressState">
      <span class="s1">{{labelText[0]}}</span><span class="s2">{{datas.input1.name[0]+datas.input1.name[1]+datas.input1.name[2]}}<img class="img1" src="../img/xiangxia.png"/></span>
    </div>
    <div v-if="double" class="line1" @click="changeAddressState">
      <span class="s1">{{labelText[0]}}</span><span class="s2">{{datas.input3.name[0]+datas.input3.name[1]+datas.input3.name[2]}}<img class="img1" src="../img/xiangxia.png"/></span>
    </div>
    <div class="hr"></div>
    <div class="line2">
      <span class="s1">详细地址</span><span class="s2">
      <input v-if="!double" type="text" v-model="datas.input2" class="input" placeholder="请输入街道门牌号~"/>
      <input v-if="double" type="text" v-model="datas.input4" class="input" placeholder="请输入街道门牌号~"/>
      <img class="img1" @click="changeRouter" src="../img/weizhi.png"/></span>
    </div>
    <!--<x-address title="所在地区：" v-model="rece_area"  :list="addressData" ></x-address>-->
    <self-address v-if="addressState" :value="selectVal" :state="addressState" @close="addressState=false" @change="getAddressVal"></self-address>
  </div>
</template>
<script>

  import { mapState } from 'vuex'
  import selfAddress from '@/vux/selfAddress'
  export default {
    data(){
      return{
        rece_area:[],
        addressState:false,
      }
    },
    components:{selfAddress},
    computed:{
      ...mapState('service',{
        datas (state) {
          return state[this.serviceType].housekeepAddress
        }
      }),
    },
    props:{
      serviceType:{
        type:String,
        default:''
      },
      labelText:{
        type:Array,
        default:()=>{
          return ['服务地址']
        }
      },
      selectVal:{
        type:Array,
        default:()=>{
          return ['420000','420100','420102']
        }
      },
      double:{      //司机帮有两个
        type:Boolean,
        default:false,
      }
    },
    mounted(){

    },
    methods:{
      changeInputVal(){

        // this.$emit("getAddress",[this.addr,this.inputVal])
      },
      changeRouter(){
        this.$emit('toMap')
        this.$router.push({path: '/x/serviceMap'})
      },
      getAddressVal(a,b){
        console.log(a,b)
        if(!this.double){
          this.datas.input1={value:a,name:b}
        }else{
          this.datas.input3={value:a,name:b}
        }
      },
      changeAddressState(){
        this.addressState=true;
      }
    }
  }
</script>
<style scoped>
  .housekeepAddress{height: 2.02rem;font-size: 0.3rem;color:#333;}

  .line1{height: 0.99rem;line-height:0.4rem;padding:0.3rem 0;box-sizing: border-box;}
  .line1 .s1{margin:0 0 0 0.17rem;}
  .line1 .s2{float: right;}
  .line1 .s2 .img1{width:0.28rem;padding:0 0.23rem 0 0.14rem;}

  .hr{width:6.5rem;margin-left: 0.56rem;height:1px;background-color: #efefef;}

  .line2{height: 1rem;line-height:0.4rem;padding:0.3rem 0;box-sizing: border-box;}
  .line2 .s1{margin:0 0 0 0.17rem;display: inline-block;}
  .line2 .s2{width:5.5rem;float: right;}
  .line2 .s2 .input{text-align: right;width:4.8rem;}
  .line2 .s2 .img1{width:0.28rem;padding:0 0.23rem 0 0.14rem;float: right}
</style>
