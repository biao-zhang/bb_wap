<template>
  <div class="head">
    <x-header class="xheader" @on-click-back="title_back('title')" @on-click-more="title_more('title')"  @on-click-title="title_click(msg)" :left-options="{backText:''}" :title="msg" :right-options="{showMore:false}" ref="head">
      <a slot="right" ><router-link to="/service" class="titleRight">使用须知</router-link></a>
    </x-header>
  </div>
</template>
<script>
  import {XHeader} from 'vux'
  export default {
    data(){
      return{

      }
    },
    props:{
      msg:{
        type:String,
        default:'跑腿'
      }
    },
    components:{XHeader},
    mounted(){

    },
    methods:{
      title_back(back){
        console.log("titleBack"+back)
      },
      title_more(more){
        console.log("titleMore"+more)
      },
      title_click(cli){
        console.log("titleClick"+cli)
      }
    }
  }
</script>
<style scoped>
  .head{position: fixed;top:0;z-index: 10;width:100%}
  .xheader{width:100%;background-color: white;}

  .head >>> .vux-header .vux-header-title{font-size: 0.36rem;color:#111;}
  .head >>> .vux-header .vux-header-left .left-arrow:before{border-color:#111;}
  .vux-header .vux-header-right a .titleRight{font-size: 0.28rem;color:#f86e0e}
</style>
