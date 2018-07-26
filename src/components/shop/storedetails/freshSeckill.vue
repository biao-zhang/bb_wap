<template>
  <div class="shopIndex">
    <div class="back_one" onclick="javascript:history.go(-1)">
      <img src="../img/back.png" alt="">
    </div>
    <!--头部-->
    <div class="tab-box">
      <input type="radio" name="demo" id="tab-switch-input1" checked="">
      <input type="radio" name="demo" id="tab-switch-input2">
      <input type="radio" name="demo" id="tab-switch-input3">
      <div class="tab-box-label">
        <label for="tab-switch-input1">商品</label>
        <label for="tab-switch-input2">详情</label>
        <label for="tab-switch-input3">评价</label>
      </div>
      <div class="tab-contents">
        <div class="tab-content">
          <fresh-seckill-item></fresh-seckill-item>
        </div>
        <div class="tab-content">
          <store-picture v-for="(item,index) in 2" :key="index"></store-picture>
        </div>
        <div class="tab-content">
          <evaluation-display></evaluation-display>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

  import freshSeckillItem from '@/components/shop/common/freshSeckillItem'
  import storePicture from '@/components/shop/storedetails/storePicture'
  import evaluationDisplay from '@/components/shop/storedetails/assembly/evaluationDisplay'

  export default {
    data(){
      return{
        pullTosHeight:0,   //LR滚动的高度


      }
    },
    components:{freshSeckillItem,storePicture,evaluationDisplay},
    mounted(){
      var that = this;
      setTimeout(function () {
        that.pullTosHeight = window.innerHeight-46;
      },20)
    }

  }



</script>
<style scoped>
  .shopIndex{background-color: #fff;height: 100%;}

  .shopIndex .pullTos{width:100%;height: 100%;padding-top:0.54rem;}
  /*返回按钮*/
  .back_one{
    position:fixed;
    width: 0.19rem;
    top: 0.29rem;
    left: 0.29rem;
    z-index:9;
  }
  .back_one img{
    width:100%;
    height:100%;
  }
  /*begin*/
  .tab-box input {
    display: none;
  }
  .tab-box-label{
    padding:0 2rem;
    box-sizing:border-box;
    width:100%;
    height:0.8rem;
    background:#fff;
    display: flex;
    justify-content: space-between;
    position: fixed;
    left: 0;
    right: 0;
    z-index: 6;
  }
  .tab-box label {
    height:0.76rem;
    background:#fff;
    color:#111111;
    display: inline-block;
    text-align: center;
    width:1rem;
    font-size:0.28rem;
    line-height:1.1rem;
  }
  .tab-content {
    width: 100%;
    height:100%;
    display: none;
    padding-top:0.8rem;
  }
  .tab-box input:nth-of-type(1):checked ~ .tab-contents .tab-content:nth-of-type(1),
  .tab-box input:nth-of-type(2):checked ~ .tab-contents .tab-content:nth-of-type(2),
  .tab-box input:nth-of-type(3):checked ~ .tab-contents .tab-content:nth-of-type(3) {
    display: block;
  }
  .tab-box input:nth-of-type(1):checked ~ .tab-box-label label:nth-of-type(1) ,
  .tab-box input:nth-of-type(2):checked ~ .tab-box-label label:nth-of-type(2),
  .tab-box input:nth-of-type(3):checked ~ .tab-box-label label:nth-of-type(3) {
    border-bottom:0.04rem solid #f86e0e;
  }


</style>
