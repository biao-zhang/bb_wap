<template>
  <div class="preferredlist">
    <div class="newlist1">
      <div class="left">
        <!--../../img/ban1.png-->
        <img :src="newChildren.goodsImgMaster" alt="w">
      </div>
      <div class="right">
        <p class="cent">{{newChildren.goodsName}}</p>
        <p class="money">￥{{newChildren.goodsPrice}}</p>
        <p class="mouth">月销量{{ newChildren.goodsNum }}{{ newChildren.goodsUnit }}</p>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data(){
      return{

      }
    },
    props: {
      newChildren: {
        type: Object
      }
    },
    components:{},
  }
</script>
<style scoped>
  .left{
    width:2.5rem;
    height:2.5rem;
  }
  .left img{
    width:100%;
    height:100%;
  }
  .preferredlist{
    padding:0 0.3rem;
  }
  .newlist1{
    padding:0.3rem 0;
    border-bottom:1px solid #ededed;
    display:flex;
  }
  .right{
    flex:1;
    margin-left:0.2rem;
  }
  .cent{
    font-size:0.3rem;
    color:#3c3c3c;
    line-height:0.5rem;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    min-height:0.92rem;
  }
  .money{
    color:#f86e0e;
    font-size:0.34rem;
    margin-top:0.4rem;
  }
  .mouth{
    font-size:0.24rem;
    color:#9a9a9a;
    margin-top:0.15rem;
  }
</style>
