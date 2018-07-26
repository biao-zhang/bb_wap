<template>
  <div class="seckillProgress">
    <div class="progressBg" ref="progressBg"></div>
    <div class="progressItem" :style="{width:progressItem+'px'}"></div>
  </div>
</template>
<script>

  export default {
    data(){
      return{
        progressItem:0,
      }
    },
    props:{
      progressData:{
        type:Array,
        default:()=>{
          return[70,100];
        }
      }
    },
    mounted(){
      var that = this;
      setTimeout(function () {
        that.progressItem = that.$refs.progressBg.clientWidth*(that.progressData[0]/that.progressData[1])
      },20)
    },
    methods:{


    }
  }
</script>
<style scoped>
.seckillProgress{position: relative;height: 0.16rem;width:1.5rem;}
.seckillProgress .progressBg{position:absolute;width:1.5rem;height: 0.16rem;border-radius: 0.08rem;background-color: #e1c4b0; }
.seckillProgress .progressItem{position:absolute;width:0;height: 0.16rem;border-radius: 0.08rem;background-color: #f15352; }

</style>
