<template>
  <div class="goumai">

    <div class="line2">
      <div class="lineCon top_ipt">
        <span class="s1">{{couponLineText[0]}}</span>
        <span style="float: right">
          <input v-model="inputValue" type="number" max="4" @change="jifenChange"/>
          <span>分</span>
        </span>
        <div class="top_tips">
          <span>可用积分{{userCurIntegral}}积分，{{jifenRatio}}积分=1RMB</span>
        </div>
        <!--<span class="s2"><span>{{datas.input1[0]}}</span><img class="img1" src="../img/next.png"/> </span>-->
      </div>
    </div>

  </div>
</template>
<script>
  import { mapState } from 'vuex'
  import { getCurIntegral,getIntegralRatio } from '@/api/personally'
  export default {
    data(){
      return{
        jifenRatio:0,//积分兑换比例
        userCurIntegral:0, //用户当前总积分
        inputValue:0,
      }
    },
    computed:{
      ...mapState('service',{
        datas (state) {
          return state[this.serviceType].integralLine
        }
      }),

    },
    props:{
      serviceType:{
        type:String,
        default:''
      },
      couponLineText:{
        type:Array,
        default:()=>{
          return ['积分抵扣','']
        }
      }
    },
    mounted(){
      //获取用户总积分
      getCurIntegral().then((res)=>{
        console.log(res,'用户当前总积分')
        if(res.message=='success'){
          this.userCurIntegral = res.data;
        }else{
          this.$store.commit('setToastText',res.message)
          this.$store.commit('setToastType','warn')
        }
      }).catch((err)=>{
        this.$store.commit('setToastText','服务器错误!')
        this.$store.commit('setToastType','warn')
      })
      //获取积分兑换比例
      getIntegralRatio().then((res)=>{
        console.log(res,'获取当前积分兑换比例')
        if(res.message=='success'){
          this.jifenRatio = res.data.platformDeduction;
        }else{
          this.$store.commit('setToastText',res.message)
          this.$store.commit('setToastType','warn')
        }
      }).catch((err)=>{
        this.$store.commit('setToastText','服务器错误!')
        this.$store.commit('setToastType','warn')
      })

      setTimeout(()=>{
        this.inputValue = this.datas.input1;
      },20)

    },
    methods:{
      jifenChange(){
        let val = parseInt(this.inputValue);
        if(val<0||this.inputValue==''){
          this.inputValue = 0
        }else if(val>this.userCurIntegral){
          this.inputValue = this.userCurIntegral
        }else{
          this.inputValue = val
        }
        this.$emit('changeIntegral',this.inputValue)
      },
    }
  }
</script>
<style scoped>
  .goumai{height:1.5rem;padding:0.3rem 0.17rem;box-sizing: border-box;}

  .line2{display: flex;}
  .line2 .lineCon{width:6.58rem;font-size: 0.3rem;line-height: 0.45rem;}
  .line2 .lineCon .s1{margin-right: 0.13rem;}
  .line2 .lineCon .s2{margin-right: -0.1rem;float: right}
  .line2 .lineCon .s2 .img1{width:0.15rem;}

  .top_ipt input {
    border: 1px solid #cccccc;
    width: 3.80rem;
    height: 0.50rem;
    border-radius: 3px;
  }
  .top_tips {
    padding: 0.20rem 0;
    font-size: 0.24rem;
    color: #b6b6b6;
    text-align: right;
  }
</style>
