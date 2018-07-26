<template>
  <div class="recommendedYou">
    <!--头部-->
    <x-header :msg="top" ref="xheader"></x-header>
    <!--图片-->
    <div class="picture">
      <img src="../img/ban1.png" alt="">
    </div>
    <!--列表-->
    <div class="list">
      <recommended-list v-for="(item,index) in 4" :key="index"></recommended-list>
    </div>
  </div>
</template>
<script>
  import xHeader from '@/components/shop/common/xHeader'
  import recommendedList from '@/components/shop/storedetails/assembly/recommendedList'

  export default {
    data(){
      return{
        top:"为您推荐"
      }
    },
    components:{xHeader,recommendedList},
  }
</script>
<style scoped>
  .recommendedYou{
    background:#fff;
    height:100%;
    padding-top:46px;
    box-sizing: border-box;
  }
    .picture{
      width:100%;
      height:2.6rem;
    }
    .picture img{
      width:100%;
      height:100%;
    }
  .list{
    padding:0 0.2rem;
    width:100%;
    box-sizing:border-box;
    display:flex;
    justify-content:space-between;
    flex-wrap: wrap
  }
</style>
