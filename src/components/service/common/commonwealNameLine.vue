<template>
  <div class="housekeepAddress">
    <div class="line1">
      <img class="img1_1" src="../img/name.png"/><span class="s1">发起人</span><span class="s2"><input type="text" v-model="datas.input1"  placeholder="发起人姓名" class="input1"/></span>
    </div>
    <div class="hr"></div>
    <div class="line2">
      <img class="img1_1" src="../img/phone.png"/>
      <span class="s1">联系电话</span>
      <span class="s2">
        <!--<img class="img1" src="../img/contacts.png"/>-->
        <input v-model="datas.input2" type="text" class="input" placeholder="联系方式"/>
      </span>
    </div>
  </div>
</template>
<script>
  import { mapState } from 'vuex'
  export default {
    data(){
      return{
        name:'',
        phone:'',
      }
    },
    computed:{
      ...mapState('service',{
        datas (state) {
          return state[this.serviceType].commonwealNameLine
        }
      }),
    },
    props:{
      serviceType:{
        type:String,
        default:''
      },
    },
    mounted(){

    },
    methods:{
      changeName(){
//        this.$emit('getNameLine',[this.name,this.phone])
      },
      changePhone(){
//        this.$emit('getNameLine',[this.name,this.phone])
      }
    }
  }
</script>
<style scoped>
  .housekeepAddress{height: 2.02rem;font-size: 0.3rem;color:#333;}

  .line1{height: 1rem;line-height:0.4rem;padding:0.3rem 0;box-sizing: border-box;}
  .line1 .img1_1{width:0.26rem;vertical-align: middle;margin:0 0.28rem 0 0.2rem;}
  .line1 .s1{margin:0 0 0 0;}
  .line1 .s2{float: right;margin-right: 0.23rem;}
  .line1 .s2 .input1{text-align: right}

  .hr{width:6.5rem;margin-left: 0.56rem;height:1px;background-color: #efefef;}

  .line2{height: 1rem;line-height:0.4rem;padding:0.3rem 0;box-sizing: border-box;}
  .line2 .img1_1{width:0.26rem;vertical-align: middle;margin:0 0.28rem 0 0.2rem;}
  .line2 .s1{margin:0 0 0 0;display: inline-block;}
  .line2 .s2{float: right; margin-right: 0.23rem;}
  .line2 .s2 .input{float: right;text-align: right}
  .line2 .s2 .img1{width:0.28rem;padding:0 0.23rem 0 0.14rem;float: right}
</style>
