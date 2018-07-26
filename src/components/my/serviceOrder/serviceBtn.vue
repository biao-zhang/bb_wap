<template>
  <div class='serviceBtn'>
    <div class="serviceBtnContent">
      <div class="serviceBtnLeft">
        <span>共计：</span>
        <span style="color: #f86e0e">￥<span>16</span></span>
      </div>
      <div class="serviceBtnRight">
        <div class="cancel" @click="cancel">取消订单</div>
        <div class="pay" @click="pay">去付款</div>
      </div>
    </div>
  </div>
</template>
<script>
  /**
   * @props
   * @emit
   */

  export default{
    data(){
      return{

      }
    },
    props:{

    },
    mounted(){

    },
    methods:{
      cancel() {
        console.log('取消订单')
      },
      pay() {
        console.log('去付款')
      }
    },
  }
</script>
<style scoped>
  .serviceBtn {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
  }
  .serviceBtnContent {
    padding: 0.15rem 0.20rem;
    background-color: #ffffff;
    overflow: hidden;
    border-top:1px solid #eee;
  }
  .serviceBtnLeft {
    float: left;
    padding: 0.20rem;
  }
  .serviceBtnRight {
    float: right;
  }
  .cancel,.pay {
    padding: 0.20rem;
    float: left;
    border-radius: 3px;
  }
  .cancel {
    margin-right: 0.20rem;
    border:1px solid #cccccc;
  }
  .pay {
    background-color: #f86e0e;
    color: #ffffff;
  }
</style>
