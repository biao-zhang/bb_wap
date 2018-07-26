<template>
  <div class="box">
    <img class="itemImg" :src="datas.welfareTitleImg" />
    <img v-if="datas.welfareState == 0" class="itemImg1" src="./img/state_1.png" />
    <img v-if="datas.welfareState == 2" class="itemImg1" src="./img/state_3.png" />
    <img v-if="datas.welfareState == 3" class="itemImg1" src="./img/state_2.png" />
    <img v-if="datas.welfareState == 4" class="itemImg1" src="./img/state_5.png" />
    <img v-if="datas.welfareState == 5" class="itemImg1" src="./img/state_4.png" />
    <div class="itemR">
      <p>{{datas.welfareTitle}}</p>
      <div class="itemRightB">
        <span>已报名：<span style="color:#f86e0e;display: inline-block;margin-bottom: 0.1rem">{{datas.peopleCounting}}人</span></span><br/>
        <span>活动时间：{{createOrderTime[0]}}/{{createOrderTime[1]}}/{{createOrderTime[2]}}</span>
      </div>
    </div>
  </div>
</template>
<script>
  import { time } from "../../untils/untils";

  export default {
    data(){
      return{
        createOrderTime:''
      }
    },
    props:{
      datas:{
        type:Object,
        default:function () {
          return {}
        }
      }
    },
    mounted(){
      // 时间戳转化
      this.createOrderTime = time(this.datas.createOrderTime)
    },
    methods:{

    },
  }
</script>
<style scoped>
.box{display: flex;justify-content: space-between;position: relative;}
  .box .itemImg{width:3rem;height: 1.8rem;}
  .box .itemR{height: 1.8rem;width:3.9rem;display: inline-flex;justify-content: space-between;flex-direction: column;}
  .box .itemR p{font-size: 0.3rem;color:#3c3c3c;display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;}
  .box .itemR .itemRightB{font-size: 0.24rem;color:#9a9a9a;}
.itemImg1{position: absolute;bottom: 0.1rem;left: 0;width:1rem;}
</style>
