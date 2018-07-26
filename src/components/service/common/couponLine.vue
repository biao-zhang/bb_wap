<template>
  <div class="goumai" @click="showPopupPicker">

      <div class="line2">
        <div class="lineCon">
          <span class="s1">{{couponLineText[0]}}</span>
          <span class="s2"><span>{{datas.input1[0]}}</span><img class="img1" src="../img/next.png"/> </span>
        </div>
      </div>

    <popup-picker style="display: none" :show="pickerState" @on-hide="hide" @on-show="show" :data="pickerList" v-model="datas.input1"></popup-picker>
  </div>
</template>
<script>
  import { PopupPicker } from 'vux'
  import { mapState } from 'vuex'
  export default {
    data(){
      return{
        pickerState:false,
        pickerList: [['立即购买','今天-18时', '今天-19时', '今天-20时', '今天-21时', '今天-22时', '今天-23时', '今天-24时']],
      }
    },
    components:{PopupPicker},
    computed:{
      ...mapState('service',{
        datas (state) {
          return state[this.serviceType].couponLine
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
          return ['使用优惠券/积分','']
        }
      }
    },
    methods:{
      //      打开选择时间控件
      showPopupPicker(){
        if(this.serviceType==='runTo1'){
          this.pickerState=true;
        }else{
          this.$router.push({path:'/z/coupon'})
        }
      },
      show(){
        this.pickerState=true;
      },
      hide(){
        this.pickerState=false;
      }
    }
  }
</script>
<style scoped>
  .goumai{height:1rem;padding:0.3rem 0.17rem;box-sizing: border-box;}

  .line2{display: flex;}
  .line2 .lineCon{width:6.58rem;font-size: 0.3rem;line-height: 0.45rem;}
  .line2 .lineCon .s1{margin-right: 0.13rem;}
  .line2 .lineCon .s2{margin-right: -0.1rem;float: right}
  .line2 .lineCon .s2 .img1{width:0.15rem;}
</style>
