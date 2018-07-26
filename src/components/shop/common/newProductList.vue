<template>
  <div class="newproductlist">
    <router-link :to="{ path: '/y/shopGoodsDetail', query:{recommendId: newChildren.goodsId, goodsType: 1, activityType: 3}}">
      <div class="newlist1">
        <div class="left">
          <!--../img/ban1.png-->
          <img :src="newChildren.goodsImgMaster" alt="">
        </div>
        <div class="right">
          <p class="cent">{{newChildren.goodsName}}</p>
          <p class="money">￥{{newChildren.goodsPrice}}</p>
          <div class="jife">
            <span>返{{newChildren.backJifen}}积分</span>
            <p>月销量{{newChildren.saleNum}}{{newChildren.goodsUnit}}</p>
          </div>
        </div>
      </div>
    </router-link>

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
    mounted(){

    }

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
    .newproductlist{
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
  .jife{
    display: flex;
    justify-content: space-between;
    align-items:center;
    margin-top:0.15rem;
  }
    .jife span{
      color:#f15352;
      width:1.4rem;
      height:0.4rem;
      font-size:0.2rem;
      border:1px dashed #f15352;
      display: inline-block;
      text-align:center;
      line-height:0.4rem;
    }
    .jife p{
      font-size:0.24rem;
      color:#9a9a9a;
    }
</style>
