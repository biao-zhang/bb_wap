<template>
  <div class="box">
    <div >
      <div class="portraitBox"><img class="portrait" :src="datas.userPortrait"/> </div>
      <div class="summary" :class="{'summaryB':!(reasonState===2)}">
        <div class="line1">
          <span class="s3">{{datas.serviceProvider}}</span>
          <div class="grade">
            <img v-if="starNum>=1" src="../img/smallStar.png"/><img v-if="starNum<1" src="../img/smallStarNull.png"/>
            <img v-if="starNum>=2" src="../img/smallStar.png"/><img v-if="starNum<2" src="../img/smallStarNull.png"/>
            <img v-if="starNum>=3" src="../img/smallStar.png"/><img v-if="starNum<3" src="../img/smallStarNull.png"/>
            <img v-if="starNum>=4" src="../img/smallStar.png"/><img v-if="starNum<4" src="../img/smallStarNull.png"/>
            <img v-if="starNum>=5" src="../img/smallStar.png"/><img v-if="starNum<5" src="../img/smallStarNull.png"/>
          </div>
          <div class="stateBox">
            <img v-if="reasonState===0" class="state" src="../img/img.png"/>
            <img v-if="reasonState===1" class="state" src="../img/ing.png"/>
            <img v-if="reasonState===2" class="state" src="../img/ed.png"/>
          </div>
        </div>
        <div class="line1"><span class="s1">服务类型:</span><span class="s2">{{datas.serviceProjectName}}</span> </div>
        <div class="line1"><span class="s1">订单编号:</span><span class="s2">{{datas.orderId}}</span> </div>
      </div>
    </div>
    <div class="reason" v-if="reasonState===2">
      <span class="s4"><img style="margin-right: 0.10rem" src="../img/smallStarNull.png">拒绝原因:</span>
      <span class="s5">
        发骄傲发骄傲发骄傲发骄傲发骄傲发骄傲发骄傲发骄傲发骄傲发骄傲
      </span>
    </div>
  </div>
</template>
<script>
  export default {
    data(){
      return{

      }
    },
    computed:{
      starNum(){
        return this.datas.helperLevel
      }
    },
    props:{
      reasonState:{
        type:Number,
        default:0
      },
      datas:{
        type:Object,
        default:function () {
          return {}
        }
      }
    }
  }
</script>
<style scoped>
  .box{width:100%;height: 100%;padding:0.15rem 0.2rem;box-sizing: border-box;background-color: white; border-bottom: 1px solid #eee;}

  .portraitBox{width:1rem;height: 1rem;border-radius: 50%;overflow: hidden;display: inline-block;vertical-align: top}
  .portraitBox .portrait{width:100%;height: 100%;}

  .summary{display: inline-block;width:5.9rem;padding-left: 0.12rem;padding-bottom:0.2rem;}

  .summary .line1 .s1{font-size: 0.28rem;color:#666;line-height: 0.38rem;}
  .summary .line1 .s2{line-height:0.38rem;font-size: 0.28rem;color:#666;}
  .summary .line1 .s3{line-height: 0.48rem;font-size: 0.3rem;color:#3c3c3c;}
  .summary .line1 .grade{display: inline-block;padding-left: 0.2rem;}
  .summary .line1 .grade img{width:0.2rem;padding:0 0.02rem;}
  .summary .line1 .stateBox{width:0.98rem;display: inline-block;float: right;margin-right: -0.21rem;}
  .summary .line1 .stateBox .state{width:100%;}

  .reason{width:100%;background-color: white;padding:0.1rem 0 0.25rem;}
  .reason .s4{width:1.4rem;}
  .reason .s4 img{width:0.24rem;font-size: 0.26rem;color:#333;}
</style>
