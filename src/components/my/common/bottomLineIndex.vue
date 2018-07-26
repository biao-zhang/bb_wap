<template>
  <div class='bottomLineIndex'>
    <div>
      <router-link to="/z/terminalOrder">
        <div class="d1">
          <img src="../img/storeOrder.png" class="img1">
          <span class="s1">终端店订单</span>
        </div>
      </router-link>
    </div>
    <div>
      <router-link to="/x/shoppingCart">
        <div class="d1">
          <img src="../img/cart.png" class="img1">
          <span class="s1">商城购物车</span>
        </div>
      </router-link>
    </div>
    <div>
      <router-link to="/y/givePacket">
        <div class="d1">
          <img src="../img/hongbao.png" class="img1">
          <span class="s1">已发红包</span>
        </div>
      </router-link>
    </div>
    <div>
      <router-link to="/x/mySetting">
        <div class="d1">
          <img src="../img/set.png" class="img1">
          <span class="s1">设置</span>
        </div>
      </router-link>
    </div>
    <div>
      <router-link to="/y/teamwork">
        <div class="d1">
          <img src="../img/cooperation.png" class="img1">
          <span class="s1">我要合作</span>
        </div>
      </router-link>
    </div>
    <div>
      <router-link to="/y/serviceOne">
        <div class="d1">
          <img src="../img/CustomerService.png" class="img1">
          <span class="s1">常见问题</span>
        </div>
      </router-link>
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

    },
  }
</script>
<style scoped>
.bottomLineIndex{ width:100%;height: 3.7rem;background-color: white;display: flex;justify-content: space-around;flex-wrap: wrap;padding-top: 0.63rem;box-sizing: border-box;}

  .bottomLineIndex div{width:50%;}
  .bottomLineIndex div .d1{width:100%;height: 100%;}
  .bottomLineIndex div img{width:0.48rem;height: 0.48rem;vertical-align: middle;margin:0 0.4rem 0 0.7rem;}
  .bottomLineIndex div .s1{vertical-align: middle;font-size: 0.28rem;color: #6a6a6a;}
</style>
