<template>
  <div class="costDetail" v-on:click.stop="de($event)">
    <div class="pickerBox">
      <div class="pickerLogo"><img class="" src="../img/type.png"></div>
      <div class="line"><span class="s1">服务价：</span><span class="s2">￥{{datas.startingPrice}}</span> </div>
      <div class="line"><span class="s1">恶劣天气价：</span><span class="s2">￥{{datas.weatherPrice}}</span> </div>
      <div class="line"><span class="s1">夜班价：</span><span class="s2">￥{{datas.nightPrice}}</span> </div>
      <div class="clo"><img @click="cloPicker" src="../img/clo.png"/> </div>
    </div>
  </div>
</template>
<script>

  export default {
    props:{
      datas:{
        type:Object,
        default:()=>{
          return {}
        }
      }
    },
    methods:{
      cloPicker(){
        this.$emit('cloMask1','close')
      },
      de(a){
        a.preventDefault();
      }
    }
  }

</script>
<style scoped>
  .costDetail{}

  .costDetail{width:7.1rem;height: 4rem;background-color: white;border-radius: 0.1rem;position: fixed;z-index: 81;bottom:1rem;margin:0 0.2rem;padding:1.1rem 0;box-sizing: border-box;}
  .costDetail .pickerLogo{width:1.3rem;height: 1.3rem;position: absolute;top:-0.65rem;left: 0.7rem;background-color: white;border-radius: 50%;border:0.04rem solid #f86e0e;overflow: hidden;}
  .costDetail .pickerLogo img{width:100%;height: 100%;}
  .costDetail .line{width: 100%;line-height: 0.55rem;font-size: 0.3rem;color:#333;}
  .costDetail .line .s1{width: 3.6rem;text-align: right;display: inline-block;}
  .costDetail .line .s2{color:#f86e0e}
  .costDetail .pickerBox .clo{width:100%;text-align: center}
  .costDetail .pickerBox .clo img{width:0.38rem;margin-bottom: -0.7rem;}

</style>
