<template>
  <div class="goumai">
    <div class="line1">
      <span class="goumaiTit">{{labelText[0]}}</span>
    </div>
    <div class="dizhi">
      <checker default-item-class="checkerDefault" v-model="datas.input1" selected-item-class="checkerSelected">
        <checker-item value="0" @on-item-click="clickCheckerItem">{{datas.labelText[0]}}</checker-item>
        <checker-item value="5" @on-item-click="clickCheckerItem">{{datas.labelText[1]}}</checker-item>
        <checker-item value="10" @on-item-click="clickCheckerItem">{{datas.labelText[2]}}</checker-item>
        <checker-item value="-1" @on-item-click="clickCheckerItem">{{datas.labelText[3]}}</checker-item>
      </checker>
    </div>
    <div class="hr"></div>
    <div class="line2" @click="line2Click">
      <div class="lineCon">
        <!--<span class="s1">{{labelText[1]}}</span>-->
        <div style="padding-left: 0.20rem">
          <div class="top_ipt">
            <span>积分抵扣：</span>
            <input v-model="datas.input2" style="font-size: 0.3rem;" type="number" @change="jifenChange"/>
            <span>分</span>
          </div>
          <div class="top_tips">
            <span>可用积分{{userCurIntegral}}积分，{{jifenRatio}}积分=1RMB</span>
          </div>
        </div>
      </div>
    </div>
    <self-confirm v-if="confirmState" :state="confirmState" :number="number" :title="title" @confirm="confirm" @cancel="cancel"></self-confirm>
  </div>
</template>
<script>
  import {Checker,CheckerItem} from 'vux'
  import { mapState } from 'vuex'
  import selfConfirm from '@/vux/selfConfirm'
  import { getCurIntegral,getIntegralRatio } from '@/api/personally'
  export default {
    data(){
      return{
        jifenRatio:0,//积分兑换比例
        userCurIntegral:0, //用户当前总积分
        confirmState:false,    //通过赋值改变(this.confirmState=true)
        title:'帮帮加速',
      }
    },
    computed:{
      ...mapState('service',{
        datas (state) {
          return state[this.serviceType].quicken
        }
      }),
      number(){
        if(this.datas.labelText[3]!='自定义'){
          return parseInt(this.datas.labelText[3].substring(0,this.datas.labelText[3].length-1))
        }else{
          return 15;
        }
      }
    },
    props:{
      serviceType:{
        type:String,
        default:''
      },
      labelText:{
        type:Array,
        default:()=>{
          return ['帮帮加速','积分抵扣']
        }
      }
    },
    components:{Checker,CheckerItem,selfConfirm},
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

    },
    methods:{
      clickCheckerItem(itemValue,itemDisabled){
        if(itemValue==-1){   //显示自定义弹窗
          this.confirmState=true
        }else{
          if(itemValue===this.datas.input1){
            this.datas.input1=0;
            this.$emit('changeQuicken')
          }else{
            this.datas.input1 = itemValue;
            this.$emit('changeQuicken')
          }
        }
      },
      line2Click() {

      },
      confirm(a){
        this.confirmState=false;
        if(a!=''&&a!=0){
          this.$set(this.datas.labelText,3,a+'元')
          this.datas.input1=a;
        }else{
          this.$set(this.datas.labelText,3,'自定义')
          this.datas.input1=0;
        }
        this.$emit('changeQuicken')
      },
      cancel(){
        this.confirmState=false
      },
      jifenChange(){
        if(this.datas.input2<0||this.datas.input2==''){
          this.datas.input2=0;
        }else if(this.datas.input2>this.userCurIntegral){
          this.datas.input2 = this.userCurIntegral;
        }else{

        }
        this.datas.input2=parseInt(this.datas.input2)
        this.$emit('changeIntegral')
      }
    }
  }
</script>
<style scoped>
  .checkerDefault{font-size: 0.3rem;display:inline-block;width:1.6rem;color:#ccc;border:1px solid #ccc;line-height: 0.76rem;border-radius: 0.05rem;text-align: center;}
  .checkerSelected{color:#f86e0e;border:1px solid #f86e0e;}


  .vux-checker-box{width:100%;display: flex;justify-content: space-around}

  .goumai{height: 4.0rem;}
  .line1{font-size: 0.3rem;color:#333;line-height: 0.45rem;padding-top: 0.19rem;display: flex;}
  .line1 .goumaiTit{margin:0 0.14rem 0 0.17rem;display: inline-block;}
  .line1 textarea{border:0;line-height: 0.38rem;font-size: 0.3rem;color:#515151;width:5.08rem;height: 0.76rem;overflow:hidden; resize:none;outline: none;padding:0;}
  .line1 .type1{margin-left: 0.73rem;}
  .line1 .type2{margin-left: 2.62rem;}

  .dizhi{margin-top:0.3rem;}

  .hr{width:6rem;margin:0.48rem 0 0 0.56rem;height: 1.5px;background-color: #ededed;}

  .line2{display: flex;margin-top: 0.25rem;}
  .line2 .lineCon{width:6.9rem;font-size: 0.3rem;line-height: 0.45rem;}
  .line2 .lineCon .s1{padding-left: 0.17rem;}
  .line2 .lineCon .img1{width:0.15rem;float: right;}

  .top_ipt span {font-size: 0.30rem;}
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
  }
</style>
