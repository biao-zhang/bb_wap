<template>
  <div class="housekeepAddress">
    <div class="line1">
      <span class="s1" v-if="labelText[0]=='货物重量'">{{labelText[0]}}</span>
      <span class="s2" v-if="labelText[0]=='货物重量'">
        <input type="text" class="input1" v-model="datas.input1" @change="changeWeight" style="font-size: 0.3rem;" placeholder="货物重量不得超过40kg">
        <span class="s3">{{labelText[1]}}</span>
      </span>
      <span class="s1" v-if="labelText[0]!='货物重量'">{{labelText[0]}}</span>
      <span class="s2"  v-if="labelText[0]!='货物重量'">
        <span class="input1" @click="showPopupPicker">{{datas.input1.name}}</span>
      </span>
    </div>
    <div class="hr"></div>
    <div class="line2">
      <div class="lineCon">
        <span class="s1">服务发票</span>
        <span class="s2" :class="{orange:(datas.input2==0||datas.input2=='')}" @click="datas.input2=0">否</span>
        <span class="s3" :class="{orange:datas.input2==1}" @click="datas.input2=1">是</span>
      </div>
    </div>
    <self-address v-if="pickerState" :state="pickerState" :list="listData" @close="pickerState=false" @change="getAddressVal"></self-address>
  </div>
</template>
<script>
  import { mapState } from 'vuex'
  import selfAddress from '@/vux/selfAddress'
  export default {
    data(){
      return{
        pickerState:false,
//        pickerList: [['立即购买','今天-18时', '今天-19时', '今天-20时', '今天-21时', '今天-22时', '今天-23时', '今天-24时']],
        listData:[{value:'1',name:'立即购买'}],
      }
    },
    computed:{
      ...mapState('service',{
        datas (state) {
          return state[this.serviceType].housekeepTime
        }
      }),
    },
    components:{selfAddress},
    props:{
      serviceType:{
        type:String,
        default:''
      },
      labelText:{
        type:Array,
        default:()=>{
          return ['预约时间',''];
        }
      },
    },
    mounted(){
      if(this.labelText[0]!='货物重量'){
        this.getFullHours();     //获取取件时间列表
      }
      setTimeout(()=>{
        console.log(this.serviceType,this.datas)
      },5000)
    },
    methods:{
      changeWeight(){
        if(this.datas.input1<0){
          this.datas.input1=0;
        }else if(this.datas.input1>40){
          this.datas.input1=40;
        }else{

        }
      },
      //      打开选择时间控件
      showPopupPicker(){
          this.pickerState=true;
      },
      getAddressVal(a,b){

        this.datas.input1={value:a[0],name:b[0]}
        console.log(b,'2222222222')
        this.$emit('changeTime')
      },
      changeAddressState(){
        this.pickerState=true;
      },
      //获取整小时数
      getFullHours(){
        let now = new Date();
        let nowHoursNum = parseInt(now.getTime()/100000)*100000;
        console.log(nowHoursNum)
        let nowHours = now.getHours();
        let arr = [];
        let obj = {}
        for(let i=nowHours+1;i<=24;i++){
          obj={};
          obj.value = nowHoursNum.toString();
          nowHoursNum+=3600000;
          obj.name = '今天-'+i+'时';
          arr.push(obj)
        }
        this.listData = arr;
        this.datas.input1 = {value:new Date().getTime(),name:'立即预约'}
      }
    }
  }
</script>
<style scoped>
  .orange{color:#f86e0e}

  .housekeepAddress{height: 2.02rem;font-size: 0.3rem;color:#333;}

  .line1{height: 0.99rem;line-height:0.4rem;padding:0.3rem 0;box-sizing: border-box;}
  .line1 .s1{margin:0 0 0 0.17rem;}
  .line1 .s2{float: right;padding-right: 0.23rem;}
  .line1 .s2 .input1{text-align: right}
  .line1 .s2 .s3{color:#f86e0e;}

  .hr{width:6.5rem;margin-left: 0.56rem;height: 1px;background-color: #efefef;}

  .line2{display: flex;margin-top: 0.36rem;}
  .line2 .lineCon{width:6.58rem;font-size: 0.3rem;line-height: 0.45rem;}
  .line2 .lineCon .s1{padding-left: 0.17rem;}
  .line2 .lineCon .s2{margin-left:1.14rem;}
  .line2 .lineCon .s3{margin-left: 2.91rem;}
</style>
