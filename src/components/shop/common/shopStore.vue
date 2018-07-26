<template>
  <div class="shopStore">
      <div class="shopOne">
          <div class="oneTop">
              <div>
                <img v-if="datas.shopLogo"  :src='datas.shopLogo' alt="">
                 <img v-else  src='../img/name1.png' alt="">
              </div>
              <div class="zi">
                  <p>{{datas.shopName}}</p>
                  <p>店铺等级：<span v-if="datas.shopLevel">{{datas.shopLevel}}星</span>
                        <span v-else>{{datas.shopLevel}}0星</span>
                  </p>
              </div>
            <div class="left">
              <p>{{datas.shopGoodsCount}}</p>
              <p>全部宝贝</p>
            </div>
          </div>
          <!--底部-->
          <div class="shopBottom">
              <div class="right">
               
                  <p @click="toStore">进店逛逛</p>
              
              </div>
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

    props:{
      datas:{
        type:Object,
        default:function () {
          return {}
        }
      }
    },
    created(){

    },
    methods:{
      toStore(){
        if(this.$route.query.goodsType==2)
        {
          this.$router.push({path:'/x/storeGoodsClassify',query:{shopId:this.datas.shopId,isShop:1,}})
        }
        else{
             this.$router.push({path:'/x/storeIndex',query:{shopId:this.datas.shopId}})
        }
      },
    },
    mounted(){
        // console.log('load店铺',this.datas)
    },
    components:{},
  }
</script>
<style scoped>
    .shopOne{
      padding:0.2rem 0.2rem;

    }
    .oneTop{
      display:flex;
      justify-content: center;
      align-items: center;
    }
    .oneTop div:first-child{
      width:1.3rem;
      height:1.3rem;
    }
    .oneTop div img{
      width:100%;
      height:100%;
      border-radius:0.1rem;
    }
    .oneTop div:nth-child(2){
      margin-left:0.2rem;
    }
    .oneTop div:last-child{
      flex:1;
      padding-left:0.28rem;
    }
    .zi p{
      line-height:0.66rem;
    }
    .zi p:first-child{
      font-size:0.34rem;
      color:#3c3c3c;
    }
    .zi p:last-child{
      font-size:0.24rem;
      color:#6a6a6a;
      font-weight:600;
    }
    .oneTop div p span{
      color:#f86e0e;
    }
  /*底部*/
  .shopBottom{
    padding:0 1rem;
    display:flex;
    justify-content: space-between;
    margin-top:0.18rem;
  }
    .left p{
      text-align:center;
    }
    .left{
      width:2rem;
    }
    .right{
      border:0.02rem solid #fa6e00;
      border-radius:0.4rem;
      width:2rem;
      height:0.8rem;
      text-align: center;
    }
    .left p{
      line-height:0.3rem;
    }
    .left p:first-child{
      font-size:0.32rem;
      color:#fa6e00;
      margin-top:0.05rem;
    }
    .left p:last-child{
      font-size:0.24rem;
      color:#999999;
      margin-top:0.12rem;
    }
    .shopBottom div{
      margin: 0 auto;
      line-height:0.8rem;
      /*align-items: center;*/
      text-align:center;
    }
    .shopBottom div p{
      color:#fa6e00;
      font-size:0.28rem;
    }
</style>
