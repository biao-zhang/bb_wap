<template>
  <div class="shopNameBox">
    <div class="shopName">
      <img v-if="datas.isCheck==1" src="../../img/cartRadioTrue.png" @click="check(0)" class="img1">
      <img v-if="!datas.isCheck==1"  src="../../img/cartRadioFalse.png" @click="check(1)" class="img1">
      <img src="../img/storeDefaultImg.png" class="img2">
      <span class="s1 " >{{datas.shopName}}</span>
    </div>
    <div class="content">
      <div class="goodsItemBox" v-for="(item,index) in datas.list" :key="index">
        <goods-item :datas="item" :index="datas.shopId" :moreState="moreState"></goods-item>
      </div>
    </div>
  </div>
</template>
<script>
  import goodsItem from '@/components/shop/shoppingcart/components/goodsItem'
  export default {
    data(){
      return{
        radioState:0,   //shop的Radio的状态
      }
    },
    components:{goodsItem},
    computed:{

    },
    props:{
      datas:{
        type:Object,
        default:()=>{
          return {}
        }
      },
      moreState:{
        type:Boolean,
        default:true
      }
    },
    mounted(){

    },
    methods:{
      changeState(a){
        this.$emit('shopNameState',this.index,a)
      },
      getGoodsItemState(a,b){
        this.$emit('goodsItemState',this.index,a,b)
      },
      getGoodsItemNum(a,b){
        this.$emit('goodsItemNum',this.index,a,b)
      },
      //改变店铺的选中状态
      check(a){
        let arr = [],id='';
        for(let i=0;i<this.datas.list.length;i++){
          id = this.datas.list[i].cartId;
          arr.push(id)
        }
        arr=arr.join(',')
        this.$store.dispatch({
          type:'cart/checked',
          isCheck:a,
          cartId:arr,
        })
      }
    }
  }
</script>
<style scoped>
  .shopNameBox{width:100%;}
  .shopName{width:100%;height: 0.9rem;box-sizing: border-box;padding-top:0.2rem;border-bottom:1px solid #eee;}
  .shopName .img1{width:0.4rem;height: 0.4rem;margin:0.13rem 0.4rem 0.13rem 0.33rem;}
  .shopName .img2{width:0.4rem;height: 0.4rem;margin: 0.13rem 0.1rem 0.13rem 0;}
  .shopName .s1{line-height: 0.7rem;font-size: 0.26rem;color:#333;vertical-align: text-bottom;}
  .content .goodsItemBox{width:100%;height: 2.9rem;padding:0.29rem 0.2rem 0.07rem;box-sizing: border-box;border-bottom:1px solid #eee;}
  .content .goodsItemBox:last-child{border:0;}
</style>
