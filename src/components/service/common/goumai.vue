<template>
  <div class="goumai">
    <div class="line1">
      <span class="goumaiTit">{{label1}}</span>
      <textarea v-model="datas.input1" @change="changeTextareaVal" rows="2" placeholder="客观，下个订单吧，什么都可以！请填写商品名字和数量。" maxlength="100" ></textarea>
    </div>
    <div class="hr"></div>
    <div class="line2" @click="showPopupPicker">
      <div class="lineCon">
        <span class="s1">{{label2}}</span>
        <span class="s2">{{datas.input2.name}}</span>
      </div>
      <div class="img1Box">
        <img class="img1" src="../img/next.png"/>
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
        listData:[],
      }
    },
    components:{selfAddress},
    computed:{
      ...mapState('service',{
        datas (state) {
          return state[this.serviceType].goumaiGoods
        }
      }),
    },
    props:{
      serviceType:{
        type:String,
        default:''
      },
      label1:{
        type:String,
        default:'购买商品'
      },
      label2:{
        type:String,
        default:'购买时间'
      },
    },
    mounted(){
      this.getFullHours();
    },
    methods:{
      changeTextareaVal(){
//        this.$emit('getData',[this.textareaVal,''])
      },
//      打开选择时间控件
      showPopupPicker(){
        this.pickerState=true;
      },
      getAddressVal(a,b){
        this.datas.input2={value:a[0],name:b[0]}
        this.$emit('changeTime')
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
        this.datas.input2 = {value:new Date().getTime(),name:'立即购买'}
      },
    }
  }
</script>
<style scoped>
  .goumai{height: 2.41rem;}
  .line1{font-size: 0.3rem;color:#333;line-height: 0.45rem;padding-top: 0.19rem;display: flex;}
  .line1 .goumaiTit{margin:0 0.14rem 0 0.17rem;display: inline-block;}
  .line1 textarea{border:0;line-height: 0.38rem;font-size: 0.3rem;color:#515151;width:5.08rem;height: 0.76rem;overflow:hidden; resize:none;outline: none;padding:0;}

  .hr{width:6rem;margin:0 0 0 0.56rem;height: 1px;background-color: #ededed;margin-top:0.4rem;}

  .line2{display: flex;margin-top: 0.36rem;}
  .line2 .lineCon{width:6.58rem;font-size: 0.3rem;line-height: 0.45rem;}
  .line2 .lineCon .s1{padding-left: 0.17rem;}
  .line2 .lineCon .s2{float: right}
  .line2 .img1Box{width:0.52rem;text-align: center;}
  .line2 .img1Box .img1{width:0.15rem;}
</style>
