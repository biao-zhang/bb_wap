<template>
  <div class="housekeepName">
    <div class="line1">
      <img class="img1_1" src="../img/type.png"/>
      <span class="s1"><input type="text" @change="changeServiceTit" v-model="datas.input1" placeholder="请填写服务标题" class="input1"/></span>
    </div>
    <div class="hr"></div>
    <div class="line2">
      <div class="line1">
        <img class="img1_1" src="../img/nullImg.png"/><div class="tit1">标题图片</div>
      </div>
      <div class="photoBox">
        <div id="img5Box1">
          <img :src="item" v-for="(item,index) in imgDatas" @click="img5Click(index)" :class="{'active':curImg===index}">
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  const getImgURL = require('@/assets/js/getImgURL.js')
  import { mapState } from 'vuex'
  export default {
    data(){
      return{
        curImg:0,
      }
    },
    computed:{
      ...mapState('service',{
        datas (state) {
          return state[this.serviceType].serviceType
        }
      }),
    },
    props:{
      serviceType:{
        type:String,
        default:''
      },
      imgDatas:{
        type:Array,
        default:()=>{
          return []
        }
      },
    },
    mounted(){

    },
    methods:{
      changeServiceTit(){
//        this.$emit('getServiceTit',[this.serviceTit])
      },
      //      获取图片信息
      getInputItems(a){
        console.log(a)
        this.datas.input2.items=a;
      },
      getInput(a){
        console.log(a)
        this.datas.input2.files=a;
      },
//      切换五张备选图片
      img5Click(a){
        this.curImg = a;
        this.$store.state.service[this.serviceType].serviceType.input2=this.curImg;
        this.$emit('changeCurImg',this.imgDatas[a])
      }
    }
  }
</script>
<style scoped>
  .housekeepName{height: 3.3rem;font-size: 0.3rem;color:#333;}

  .line1{width:100%;height: 1rem;padding:0.3rem 0;line-height: 0.4rem;box-sizing: border-box;}
  .line1 .img1_1{width:0.26rem;vertical-align: middle;margin:0 0.28rem 0 0.2rem;}
  .line1 .tit1{display: inline-block;}
  .line1 .s1{float: right;margin-right: 0.23rem;width:6.1rem;}
  .line1 .s1 .input1{text-align:right;width:100%;}

  .hr{width:6rem;height:1px;margin:0 auto;background-color: #ededed;}

  .line2 .photoBox{display: flex;width: 100%;}
  .line2 #img5Box1{display: flex;margin-left: 0.2rem;}
  .line2 #img5Box1>img{width: 1.06rem;height: 1.06rem;margin-right: 0.1rem;border:1px solid transparent;}
  .line2 #img5Box1>img.active{border:1px solid #f86e0e;}

</style>
