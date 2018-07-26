<template>
  <div class="shopping">
    <!--头部-->
    <x-header :msg="msg" @xHeaderState="getXHeaderState" :state="allState.lChecked" @moreState="getMoreState" @settlement="settlement"></x-header>
    <div class="content">
      <div class="scrollBox" v-if="datas!=null">
        <div class="shopItem" v-for="(item,index) in datas.list" :key="index">
          <shop-name-box :datas="item" :moreState="moreState"></shop-name-box>
        </div>
      </div>
      <div class="scrollBox" v-if="datas==null">
        <img src="./img/cartIsNull.png" class="cartNullImg"><br><p style="text-align: center;font-size: 16px;color:#999;">空空如也<br>快去挑选自己心爱的宝贝吧!</p>
        <div style="color:#f86e0e;font-size: 20px;border:1px solid #f86e0e;border-radius: 25px;line-height: 50px;text-align: center;width:50%;margin:30px auto;font-weight: 600;" @click="toHome">去逛逛</div>
      </div>
    </div>
  </div>
</template>
<script>
  import xHeader from '@/components/shop/shoppingcart/components/xHeader'
  import shopNameBox from '@/components/shop/shoppingcart/components/shopName'
  import goodsItem from '@/components/shop/shoppingcart/components/goodsItem'
  import { b2cAddToCart,b2cGoodsNowBuy } from '@/api/personally'
  export default {
    data() {
      return {
        msg: "购物车",    //xHeader title
//        returnD:{},
        allState:{},

        moreState:true,
      }
    },
    computed: {
//      购物车数据
      datas(){
        return this.$store.state.cart.datas;
      },
      checkedIds(){
        let arr=[];
        if(this.datas==null) return arr;     //如果为空，直接返回
        for(let i=0;i<this.datas.list.length;i++){
          for(let s=0;s<this.datas.list[i].list.length;s++){
            if(this.datas.list[i].list[s].isCheck==1){
              arr.push(this.datas.list[i].list[s].cartId)
            }
          }
        }
        return arr;
      },
      goodsIds(){
        let arr=[];
        if(this.datas==null) return arr;       //如果为空，直接返回
        for(let i=0;i<this.datas.list.length;i++){
          for(let s=0;s<this.datas.list[i].list.length;s++){
            if(this.datas.list[i].list[s].isCheck==1){
              arr.push(this.datas.list[i].list[s].goodsId)
            }
          }
        }
        return arr;
      },
    },
    created(){
      this.$store.dispatch({
        type:'cart/cartList'
      })
    },
    mounted() {
      setTimeout(()=>{
        console.log(this.datas,'cartDatas')
        console.log(this.checkedIds)
      },2000)
    },
    components: {xHeader, shopNameBox, goodsItem},
    methods: {
//      全选
      getXHeaderState(a){
        this.$store.dispatch({
          type:'cart/allChecked',
          check:a,
        })
      },
//      编辑/完成切换
      getMoreState(){
//        let params = {
//          goodsId:'79037174060456925',
//          productId:'a75fc6fa0f6745d58e3add03f9842d75',
//          num:1,
//          isZy:2,
//          shopId:'790371722387',
//          terminalType:'wap',
//        }
//        b2cAddToCart(params).then((res)=>{            //020 加入购物车
//          console.log(res)
//          if(res.message=='success'){
//            this.$store.commit('setToastText','加入购物车成功')
//            this.$store.commit('setToastType','success')
//          }else{
//            this.$store.commit('setToastText',res.message)
//            this.$store.commit('setToastType','error')
//          }
//        }).catch((err)=>{
//          console.log(err)
//          this.$store.commit('setToastText','添加购物车失败')
//          this.$store.commit('setToastType','error')
//        })
      },
//      结算/删除
      settlement(a){
        if(this.datas.totalCount==0){
          this.$store.commit('setToastText','请选择将要操作的商品')
          this.$store.commit('setToastType','warn')
          return false;
        }
        if(a==0){      //删除
          this.$store.dispatch({
            type:'cart/delShopCart',
            cartId:this.checkedIds,
          })
        }else if(a==1){         //结算
          console.log('结算')
          this.$router.push({path:'/z/confirmOrder',query:{orderType:'cartOrder'}})

        }else if(a==2){          //收藏
          this.axios.post('/personally/user/selectBasicById').then((res)=>{
            if(res.data.message=='tokenIsNull'){
              this.$router.push({path:'/y/logIn'})
            }else{
              this.$store.dispatch({
                type:'cart/collectionCart',
                goodsIds:this.goodsIds.join(','),             //商品ID字符串以逗号分隔
                shopType:2,            //平台类型(2、b2c本地；1、合作终端；3、b2b本地；4、b2b全国)
                cartIds:this.checkedIds.join(','),              //购物车Id
              })
            }
          }).catch((err)=>{
            this.$store.commit('setToastText','服务器错误')
            this.$store.commit('setToastType','warn')
          })
        }else{}
      },
      toHome(){
        this.$router.push({path:'/'})
      },
    }
  }
</script>
<style scoped>
  .shopping{width:100%;height: 100%;}

  .content{width:100%;height: 100%;overflow: hidden;padding-top:46px;padding-bottom:1.2rem;box-sizing: border-box;}

  .content .scrollBox{width:100%;height: 100%;overflow: scroll}
  .content .scrollBox .cartNullImg{width:70%;margin: 30px 15%;}

  .content .shopItem{margin-top:0.1rem;background-color: white;}

</style>
