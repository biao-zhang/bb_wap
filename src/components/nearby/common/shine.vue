<template>
  <div class="shine">
    <img class="shineImg" src="../img/shine.png" :style="{'marginLeft':-shineImgMarL+'px'}" ref="shineImg"/>
    <div class="robPacketBox">
      <img src="../img/robPacket.png" @click="rob" class="img1 img1End"/>
    </div>
  </div>
</template>
<script>

  export default {
    data(){
      return{
        transState:false,
        shineImgMarL:0
      }
    },
    components:{},
    mounted(){
      var that = this;
      setTimeout(function () {
        that.shineImgMarL=(window.innerHeight-window.innerWidth)/2
      },20)
    },
    methods:{
      rob(){
        console.log("抢")
      }
    }
  }
</script>
<style scoped>
  .shine{width:100%;height: 100%;position: fixed;top:0;z-index: 200;background-color: rgba(0,0,0,0.5)}

  .shineImg{height:100%;-webkit-animation:trans 5s infinite linear}
  .robPacketBox{width:0px;height: 0px;position: fixed;top:50%;left: 50%;z-index: 201}
  .img1{width:0;display: block;margin-left: 0;margin-top:0;}
  .img1End{width:6.9rem;margin-left: -3.45rem;margin-top:-2.57rem;transition:all 1s linear;}

  @-webkit-keyframes trans {
    0%{
      -webkit-transform: rotate(0deg);
    }
    50%{
      -webkit-transform: rotate(180deg);;
    }
    100%{
      -webkit-transform: rotate(360deg);
    }
  }
</style>
