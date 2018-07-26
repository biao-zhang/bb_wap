<template>
  <div class="goumai">
    <div class="line2">
      <div class="lineCon">
        <span class="s1">{{datas.label}}</span>
        <input v-if="datas.label!='截止时间'&&datas.label!='预约时间'" type="text" @change="changeInputVal" v-model="datas.input2" class="s2" placeholder="有要求，尽管提"/>
        <div v-if="datas.label=='预约时间'" type="text"  class="s3" @click="showPopupPicker">{{datas.input2.name}}<img src="../img/next.png" style="width:0.15rem;margin-right: -0.15rem;margin-left: 0.1rem;"> </div>
        <div v-if="datas.label=='截止时间'" type="text"  class="s3" @click="showGroup">{{datas.input2.name}}<img src="../img/next.png" style="width:0.15rem;margin-right: -0.15rem;margin-left: 0.1rem;"> </div>
      </div>
    </div>
    <self-address v-if="pickerState" :state="pickerState" :list="listData" @close="pickerState=false" @change="getAddressVal"></self-address>
   <group style="display: none">
     <datetime v-model="value2" @on-change="groupChange"></datetime>
   </group>
  </div>
</template>
<script>
  import { mapState } from 'vuex'
  import { Popup,Datetime,Group } from 'vux'
  import selfAddress from '@/vux/selfAddress'
  export default {
    data(){
      return{
//        inputVal:'',
        pickerState:false,
        listData:[],  //所有整小时数
        value2:''
      }
    },
    components:{selfAddress,Popup,Datetime,Group},
    computed:{
      ...mapState('service',{
        datas (state) {
          return state[this.serviceType].remarks
        }
      }),
    },
    props:{
      serviceType:{
        type:String,
        default:''
      },
//      labelText:{
//        type:Array,
//        default:()=>{
//          return ['备  注','有要求，尽管提']
//        }
//      }
    },
    mounted(){
      if(this.datas.label=='预约时间'){
        this.getFullHours();
      }
      if(this.datas.label=='截止时间'){
        this.getFullDate();
      }
      setTimeout(()=>{
        console.log(this.datas)
      },2000)
    },
    methods:{
      changeInputVal(){

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
        this.datas.input2 = {value:new Date().getTime(),name:'立即预约'}
      },
      showGroup(){
        document.getElementsByClassName('weui-cell_access')[0].click()
      },
        //获取年月日
      getFullDate(){
        this.datas.input2 = {value:'',name:'请选择截止时间'}
      },
      groupChange(a){
        this.datas.input2 = {value:new Date(a).getTime().toString(),name:a}
      },

    }
  }
</script>
<style scoped>
  .goumai{height:1rem;padding:0.3rem 0.17rem;box-sizing: border-box;}

  .line2{display: flex;}
  .line2 .lineCon{width:6.58rem;font-size: 0.3rem;line-height: 0.45rem;color:#333;}
  .line2 .lineCon .s1{margin-right: 0.13rem;display: inline-block;width:1.3rem;}
  .line2 .lineCon .s2{border: 0;outline: 0;padding: 0;}
  .line2 .lineCon .s3{display: inline-block;width:5rem;float: right;text-align: right}
</style>
